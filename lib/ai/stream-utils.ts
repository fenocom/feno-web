import type { StreamChunk } from "./types";

export interface GeminiTokenUsage {
    promptTokenCount: number;
    candidatesTokenCount: number;
    totalTokenCount: number;
}

export function cleanHtmlResponse(text: string): string {
    return text
        .replace(/^```html\n?/, "")
        .replace(/^```\n?/, "")
        .replace(/\n?```$/, "");
}

export async function parseStreamResponse(
    response: Response,
    onChunk?: (content: string) => void,
): Promise<string> {
    const reader = response.body?.getReader();
    if (!reader) throw new Error("No response body");

    const decoder = new TextDecoder();
    let accumulated = "";

    while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n");

        for (const line of lines) {
            if (!line.trim()) continue;
            try {
                const data: StreamChunk = JSON.parse(line);
                if (data.done) break;
                if (data.content) {
                    accumulated += data.content;
                    onChunk?.(data.content);
                }
            } catch {}
        }
    }

    return cleanHtmlResponse(accumulated);
}

export function extractTokenUsage(
    data: Record<string, unknown>,
): GeminiTokenUsage | null {
    const usage = data.usageMetadata as Record<string, number> | undefined;
    if (!usage) return null;
    return {
        promptTokenCount: usage.promptTokenCount ?? 0,
        candidatesTokenCount: usage.candidatesTokenCount ?? 0,
        totalTokenCount: usage.totalTokenCount ?? 0,
    };
}

export interface StreamResult {
    stream: ReadableStream;
    getTokenUsage: () => GeminiTokenUsage | null;
}

export async function streamGeminiResponse(
    geminiResponse: Response,
): Promise<StreamResult> {
    const encoder = new TextEncoder();
    let tokenUsage: GeminiTokenUsage | null = null;

    const stream = new ReadableStream({
        async start(controller) {
            const reader = geminiResponse.body?.getReader();
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
                                data.candidates?.[0]?.content?.parts?.[0]?.text;
                            if (text) {
                                controller.enqueue(
                                    encoder.encode(
                                        `${JSON.stringify({ content: text, done: false })}\n`,
                                    ),
                                );
                            }
                            const usage = extractTokenUsage(data);
                            if (usage) {
                                tokenUsage = usage;
                            }
                        } catch {}
                    }
                }
            }

            controller.enqueue(
                encoder.encode(
                    `${JSON.stringify({ content: "", done: true })}\n`,
                ),
            );
            controller.close();
        },
    });

    return {
        stream,
        getTokenUsage: () => tokenUsage,
    };
}
