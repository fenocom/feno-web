import { ratelimit } from "@/lib/ratelimit";
import { checkAiUsageLimit, incrementAiUsage } from "@/lib/services/ai-usage";
import { createClient } from "@/lib/supabase/server";
import { getUserTier } from "@/lib/tier";
import type { NextRequest } from "next/server";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL = "gemini-2.0-flash";

interface GeminiPart {
    text?: string;
    inlineData?: {
        mimeType: string;
        data: string;
    };
}

interface GeminiContent {
    role: "user" | "model";
    parts: GeminiPart[];
}

export async function POST(req: NextRequest) {
    if (!GEMINI_API_KEY) {
        return new Response(
            JSON.stringify({ error: "GEMINI_API_KEY not configured" }),
            { status: 500, headers: { "Content-Type": "application/json" } },
        );
    }

    const supabase = await createClient();
    const {
        data: { user },
        error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
        return new Response(
            JSON.stringify({ error: "Authentication required" }),
            { status: 401, headers: { "Content-Type": "application/json" } },
        );
    }

    if (ratelimit) {
        const { success } = await ratelimit.limit(user.id);
        if (!success) {
            return new Response(
                JSON.stringify({ error: "Too many requests" }),
                {
                    status: 429,
                    headers: { "Content-Type": "application/json" },
                },
            );
        }
    }

    const tier = getUserTier(user);

    if (tier < 2) {
        return new Response(
            JSON.stringify({
                error: "AI features require a premium subscription",
            }),
            { status: 403, headers: { "Content-Type": "application/json" } },
        );
    }

    const { allowed, usage } = await checkAiUsageLimit(user.id, tier);

    if (!allowed) {
        const resetDate = new Date(usage.resetsAt);
        const resetStr =
            usage.periodType === "monthly"
                ? resetDate.toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                  })
                : "tomorrow";

        return new Response(
            JSON.stringify({
                error: `You've reached your limit of ${usage.limit} AI calls. Resets ${resetStr}.`,
                usage,
            }),
            { status: 429, headers: { "Content-Type": "application/json" } },
        );
    }

    try {
        const { messages } = await req.json();

        const systemInstruction = messages.find(
            (m: { role: string }) => m.role === "system",
        );
        const otherMessages = messages.filter(
            (m: { role: string }) => m.role !== "system",
        );

        const contents: GeminiContent[] = otherMessages.map(
            (msg: { role: string; content: string; images?: string[] }) => {
                const parts: GeminiPart[] = [{ text: msg.content }];

                if (msg.images?.length) {
                    for (const image of msg.images) {
                        parts.push({
                            inlineData: {
                                mimeType: "image/jpeg",
                                data: image,
                            },
                        });
                    }
                }

                return {
                    role: msg.role === "assistant" ? "model" : "user",
                    parts,
                };
            },
        );

        const requestBody: {
            contents: GeminiContent[];
            systemInstruction?: { parts: { text: string }[] };
        } = { contents };

        if (systemInstruction) {
            requestBody.systemInstruction = {
                parts: [{ text: systemInstruction.content }],
            };
        }

        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:streamGenerateContent?alt=sse&key=${GEMINI_API_KEY}`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(requestBody),
            },
        );

        if (!response.ok) {
            const text = await response.text();
            console.error("Gemini Error:", text);
            let errorMessage = "Failed to communicate with Gemini";
            try {
                const errorData = JSON.parse(text);
                errorMessage = errorData.error?.message || errorMessage;
            } catch {}
            return new Response(JSON.stringify({ error: errorMessage }), {
                status: 500,
                headers: { "Content-Type": "application/json" },
            });
        }

        await incrementAiUsage(user.id, tier);

        const encoder = new TextEncoder();
        const stream = new ReadableStream({
            async start(controller) {
                const reader = response.body?.getReader();
                if (!reader) {
                    controller.close();
                    return;
                }

                const decoder = new TextDecoder();
                let buffer = "";

                while (true) {
                    const { done, value } = await reader.read();
                    if (done) break;

                    buffer += decoder.decode(value, { stream: true });
                    const lines = buffer.split("\n");
                    buffer = lines.pop() || "";

                    for (const line of lines) {
                        if (line.startsWith("data: ")) {
                            const jsonStr = line.slice(6);
                            if (jsonStr.trim() === "[DONE]") continue;

                            try {
                                const data = JSON.parse(jsonStr);
                                const text =
                                    data.candidates?.[0]?.content?.parts?.[0]
                                        ?.text;
                                if (text) {
                                    controller.enqueue(
                                        encoder.encode(
                                            `${JSON.stringify({
                                                message: { content: text },
                                                done: false,
                                            })}\n`,
                                        ),
                                    );
                                }
                            } catch {}
                        }
                    }
                }

                controller.enqueue(
                    encoder.encode(
                        `${JSON.stringify({
                            message: { content: "" },
                            done: true,
                        })}\n`,
                    ),
                );
                controller.close();
            },
        });

        return new Response(stream, {
            headers: {
                "Content-Type": "text/event-stream",
                "Cache-Control": "no-cache",
                Connection: "keep-alive",
            },
        });
    } catch (error) {
        console.error("AI Chat Error:", error);
        return new Response(
            JSON.stringify({ error: "Internal Server Error" }),
            { status: 500, headers: { "Content-Type": "application/json" } },
        );
    }
}
