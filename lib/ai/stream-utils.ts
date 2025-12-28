import type { StreamChunk } from "./types";

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

export async function streamGeminiResponse(
    geminiResponse: Response,
): Promise<ReadableStream> {
    const encoder = new TextEncoder();

    return new ReadableStream({
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
                        } catch {}
                    }
                }
            }

            controller.enqueue(
                encoder.encode(`${JSON.stringify({ content: "", done: true })}\n`),
            );
            controller.close();
        },
    });
}
