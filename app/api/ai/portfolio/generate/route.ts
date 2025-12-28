import { initialWebsiteGenerator } from "@/lib/ai/portfolio-generator";
import { ratelimit } from "@/lib/ratelimit";
import { checkAiUsageLimit, incrementAiUsage } from "@/lib/services/ai-usage";
import { getResumeById } from "@/lib/services/user-resumes";
import { createClient } from "@/lib/supabase/server";
import { getUserTier } from "@/lib/tier";
import type { NextRequest } from "next/server";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL = "gemini-2.0-flash";

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
                error: "Portfolio generation requires a premium subscription",
            }),
            { status: 403, headers: { "Content-Type": "application/json" } },
        );
    }

    const { allowed, usage } = await checkAiUsageLimit(user.id, tier);

    if (!allowed) {
        return new Response(
            JSON.stringify({
                error: `Limit reached. Resets ${new Date(usage.resetsAt).toLocaleDateString()}.`,
            }),
            { status: 429, headers: { "Content-Type": "application/json" } },
        );
    }

    try {
        const { resumeId, templateId } = await req.json();

        if (!resumeId || !templateId) {
            return new Response(
                JSON.stringify({ error: "Missing required fields" }),
                {
                    status: 400,
                    headers: { "Content-Type": "application/json" },
                },
            );
        }

        const resume = await getResumeById(resumeId, user.id);
        if (!resume) {
            return new Response(JSON.stringify({ error: "Resume not found" }), {
                status: 404,
                headers: { "Content-Type": "application/json" },
            });
        }

        // Fetch template from DB
        const { data: template, error: templateError } = await supabase
            .from("portfolio_templates")
            .select("*")
            .eq("id", templateId)
            .single();

        if (templateError || !template) {
            return new Response(
                JSON.stringify({ error: "Template not found" }),
                {
                    status: 404,
                    headers: { "Content-Type": "application/json" },
                },
            );
        }

        // Download image from storage
        const { data: imageData, error: imageError } = await supabase.storage
            .from("portfolio-templates")
            .download(template.image_path);

        if (imageError || !imageData) {
            console.error("Failed to download template image:", imageError);
            return new Response(
                JSON.stringify({ error: "Failed to access template image" }),
                {
                    status: 500,
                    headers: { "Content-Type": "application/json" },
                },
            );
        }

        const arrayBuffer = await imageData.arrayBuffer();
        const base64 = Buffer.from(arrayBuffer).toString("base64");

        const messages = await initialWebsiteGenerator({
            resumeContent: JSON.stringify(resume.resume_data, null, 2),
            templatePrompt: template.prompt,
            templateImage: {
                base64,
                mimeType: template.mime_type,
            },
        });

        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:streamGenerateContent?alt=sse&key=${GEMINI_API_KEY}`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ contents: messages }),
            },
        );

        if (!response.ok) {
            const text = await response.text();
            console.error("Gemini Error:", text);
            return new Response(
                JSON.stringify({ error: "Failed to communicate with Gemini" }),
                {
                    status: 500,
                    headers: { "Content-Type": "application/json" },
                },
            );
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
                                                content: text,
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
                            content: "",
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
        console.error("Portfolio Generation Error:", error);
        return new Response(
            JSON.stringify({ error: "Internal Server Error" }),
            { status: 500, headers: { "Content-Type": "application/json" } },
        );
    }
}
