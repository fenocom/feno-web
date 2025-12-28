import { streamGeminiResponse } from "@/lib/ai/stream-utils";
import { ratelimit } from "@/lib/ratelimit";
import { checkAiUsageLimit, incrementAiUsage } from "@/lib/services/ai-usage";
import { createClient } from "@/lib/supabase/server";
import { getUserTier } from "@/lib/tier";
import type { NextRequest } from "next/server";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL = "gemini-2.0-flash";

function buildRestylePrompt(html: string, templatePrompt: string) {
    return `You are an expert web developer. Your task is to restyle an existing portfolio website to match a new design template.

CURRENT HTML:
${html}

NEW TEMPLATE STYLE INSTRUCTIONS:
${templatePrompt}

I'm showing you a screenshot of the target design. Use this screenshot as the PRIMARY visual reference for layout, colors, typography, and spacing.

REQUIREMENTS:
1. Keep ALL the content from the current HTML (text, links, images, etc.)
2. Completely restyle the layout, colors, typography, and spacing to match the template screenshot
3. Use Tailwind CSS v4: <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
4. Define CSS variables: "--feno-color-hue" and "--feno-color-chroma" based on the template's color scheme
5. Define font families as CSS variables with "--feno-font-family-" prefix
6. Use Tabler Icons: <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@3.31.0/dist/tabler-icons.min.css" />
7. Make the layout responsive
8. Return the COMPLETE HTML document starting with <!DOCTYPE html>
9. Do not add any comments or explanations - only return HTML code

Return the complete restyled HTML:`;
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
        const { html, templateId } = await req.json();

        if (!html || !templateId) {
            return new Response(
                JSON.stringify({ error: "Missing html or templateId" }),
                {
                    status: 400,
                    headers: { "Content-Type": "application/json" },
                },
            );
        }

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

        const { data: imageData, error: imageError } = await supabase.storage
            .from("portfolio-templates")
            .download(template.image_path);

        if (imageError || !imageData) {
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

        const prompt = buildRestylePrompt(html, template.prompt);

        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:streamGenerateContent?alt=sse&key=${GEMINI_API_KEY}`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    contents: [
                        {
                            role: "user",
                            parts: [
                                { text: prompt },
                                {
                                    inlineData: {
                                        mimeType: template.mime_type,
                                        data: base64,
                                    },
                                },
                            ],
                        },
                    ],
                }),
            },
        );

        if (!response.ok) {
            return new Response(
                JSON.stringify({ error: "Failed to communicate with AI" }),
                {
                    status: 500,
                    headers: { "Content-Type": "application/json" },
                },
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
