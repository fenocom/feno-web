const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL = "gemini-2.0-flash";

const SUMMARIZE_PROMPT = `You are a creative narrative analyst working with portfolio materials. You've been given structured resume data that contains personal or professional information. Your task is to transform this information into a compelling narrative structure that highlights the user's journey, achievements, and unique qualities.

- Extract key narrative elements: background story, challenges overcome, achievements, skills developed, and future aspirations.
- Identify unique personal or professional qualities that make the user stand out.
- Organize information into a coherent storyline with clear progression.
- Preserve specific accomplishments, metrics, and concrete examples that demonstrate impact.
- Format the information in a way that enables creative storytelling in a portfolio context.
- Include emotional elements or personal motivations when present.
- Structure the output as a narrative outline with clear sections.

Your output should provide a rich foundation for creative portfolio generation while maintaining factual accuracy.`;

export async function summarizeResumeForPortfolio(
    resumeData: Record<string, unknown>,
): Promise<string> {
    if (!GEMINI_API_KEY) {
        throw new Error("GEMINI_API_KEY not configured");
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
                                text: `${SUMMARIZE_PROMPT}\n\nResume Data:\n${JSON.stringify(resumeData, null, 2)}`,
                            },
                        ],
                    },
                ],
            }),
        },
    );

    if (!response.ok) {
        const text = await response.text();
        console.error("Gemini summarization error:", text);
        throw new Error("Failed to summarize resume");
    }

    const data = await response.json();
    const summary =
        data.candidates?.[0]?.content?.parts?.[0]?.text ||
        JSON.stringify(resumeData, null, 2);

    return summary;
}
