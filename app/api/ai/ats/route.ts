import { extractTokenUsage } from "@/lib/ai/stream-utils";
import { ratelimit } from "@/lib/ratelimit";
import { checkAiUsageLimit, incrementAiUsage } from "@/lib/services/ai-usage";
import { createClient } from "@/lib/supabase/server";
import { getUserTier } from "@/lib/tier";
import type { NextRequest } from "next/server";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL = "gemini-2.0-flash";

const ATS_SYSTEM_PROMPT = `You are an expert ATS (Applicant Tracking System) analyzer. Your job is to evaluate resumes and provide:

1. An ATS compatibility score from 0-100
2. Key issues that might cause the resume to be rejected by ATS systems
3. Specific, actionable suggestions to improve the resume

Analyze the resume for:
- Keyword optimization and relevance
- Proper formatting (simple, parseable structure)
- Section organization (contact, experience, education, skills)
- Action verbs and quantifiable achievements
- Spelling and grammar
- Length appropriateness
- Missing critical sections

Respond in JSON format:
{
  "score": <number 0-100>,
  "summary": "<brief 1-2 sentence summary>",
  "strengths": ["<strength 1>", "<strength 2>", ...],
  "issues": [
    {"severity": "high|medium|low", "issue": "<description>", "suggestion": "<how to fix>"}
  ],
  "keywords": {
    "found": ["<keyword1>", "<keyword2>"],
    "missing": ["<suggested keyword1>", "<suggested keyword2>"]
  }
}`;

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
                error: "ATS analysis requires a premium subscription",
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
        const { resumeText } = await req.json();

        if (!resumeText || typeof resumeText !== "string") {
            return new Response(
                JSON.stringify({ error: "Resume text is required" }),
                {
                    status: 400,
                    headers: { "Content-Type": "application/json" },
                },
            );
        }

        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    contents: [
                        {
                            role: "user",
                            parts: [
                                {
                                    text: `Analyze this resume:\n\n${resumeText}`,
                                },
                            ],
                        },
                    ],
                    systemInstruction: {
                        parts: [{ text: ATS_SYSTEM_PROMPT }],
                    },
                }),
            },
        );

        if (!response.ok) {
            const text = await response.text();
            console.error("Gemini Error:", text);
            let errorMessage = "Failed to analyze resume";
            try {
                const errorData = JSON.parse(text);
                errorMessage = errorData.error?.message || errorMessage;
            } catch {}
            return new Response(JSON.stringify({ error: errorMessage }), {
                status: 500,
                headers: { "Content-Type": "application/json" },
            });
        }

        const data = await response.json();

        const tokenUsage = extractTokenUsage(data);
        await incrementAiUsage(user.id, tier, tokenUsage ? {
            inputTokens: tokenUsage.promptTokenCount,
            outputTokens: tokenUsage.candidatesTokenCount,
            totalTokens: tokenUsage.totalTokenCount,
        } : undefined);

        const resultText = data.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!resultText) {
            return new Response(
                JSON.stringify({ error: "No analysis result" }),
                {
                    status: 500,
                    headers: { "Content-Type": "application/json" },
                },
            );
        }

        let analysis: Record<string, unknown>;
        try {
            const jsonMatch = resultText.match(/```(?:json)?\s*([\s\S]*?)```/);
            const jsonStr = jsonMatch ? jsonMatch[1].trim() : resultText;
            analysis = JSON.parse(jsonStr) as Record<string, unknown>;
        } catch {
            return new Response(
                JSON.stringify({ error: "Failed to parse analysis result" }),
                {
                    status: 500,
                    headers: { "Content-Type": "application/json" },
                },
            );
        }

        return new Response(JSON.stringify({ analysis }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("ATS Analysis Error:", error);
        return new Response(
            JSON.stringify({ error: "Internal Server Error" }),
            { status: 500, headers: { "Content-Type": "application/json" } },
        );
    }
}
