import { streamGeminiResponse } from "@/lib/ai/stream-utils";
import { ratelimit } from "@/lib/ratelimit";
import { checkAiUsageLimit, incrementAiUsage } from "@/lib/services/ai-usage";
import { createClient } from "@/lib/supabase/server";
import { getUserTier } from "@/lib/tier";
import type { NextRequest } from "next/server";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL = "gemini-2.0-flash";

function buildEditPrompt(html: string, instruction: string) {
    return `You are an expert web developer. Your task is to modify an existing HTML portfolio website based on the user's instruction.

CURRENT HTML:
${html}

USER INSTRUCTION:
${instruction}

REQUIREMENTS:
1. Modify the HTML based on the user's instruction.
2. Keep all existing Tailwind CSS and styling unless explicitly asked to change.
3. Preserve the overall structure and layout unless instructed otherwise.
4. Maintain the existing CSS variables (--feno-color-hue, --feno-color-chroma, --feno-font-family-*).
5. Return the COMPLETE modified HTML document starting with <!DOCTYPE html>.
6. Do not add any comments or explanations.
7. Only return the HTML code, nothing else.

Return the complete modified HTML:`;
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
                { status: 429, headers: { "Content-Type": "application/json" } },
            );
        }
    }

    const tier = getUserTier(user);

    if (tier < 2) {
        return new Response(
            JSON.stringify({ error: "Premium subscription required" }),
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
        const { html, instruction } = await req.json();

        if (!html || !instruction) {
            return new Response(
                JSON.stringify({ error: "Missing html or instruction" }),
                { status: 400, headers: { "Content-Type": "application/json" } },
            );
        }

        const prompt = buildEditPrompt(html, instruction);

        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:streamGenerateContent?alt=sse&key=${GEMINI_API_KEY}`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    contents: [{ role: "user", parts: [{ text: prompt }] }],
                }),
            },
        );

        if (!response.ok) {
            return new Response(
                JSON.stringify({ error: "Failed to communicate with AI" }),
                { status: 500, headers: { "Content-Type": "application/json" } },
            );
        }

        await incrementAiUsage(user.id, tier);

        const { stream } = await streamGeminiResponse(response);

        return new Response(stream, {
            headers: {
                "Content-Type": "text/event-stream",
                "Cache-Control": "no-cache",
                Connection: "keep-alive",
            },
        });
    } catch {
        return new Response(
            JSON.stringify({ error: "Internal Server Error" }),
            { status: 500, headers: { "Content-Type": "application/json" } },
        );
    }
}
