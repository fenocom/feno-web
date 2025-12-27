import type { Attachment, LLMMessage, LLMStreamChunk } from "./types";

export async function* streamCompletion(
    _model: string,
    messages: LLMMessage[],
    signal?: AbortSignal,
): AsyncGenerator<string, void, unknown> {
    const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages }),
        signal,
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(
            error.error || `Request failed: ${response.statusText}`,
        );
    }

    const reader = response.body?.getReader();
    if (!reader) {
        throw new Error("No response body");
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
            if (!line.trim()) continue;
            try {
                const chunk: LLMStreamChunk = JSON.parse(line);
                if (chunk.message?.content) {
                    yield chunk.message.content;
                }
                if (chunk.done) return;
            } catch {}
        }
    }
}

export function buildMessagesWithAttachments(
    systemPrompt: string,
    userPrompt: string,
    attachments: Attachment[],
): LLMMessage[] {
    const messages: LLMMessage[] = [{ role: "system", content: systemPrompt }];

    const images: string[] = [];
    let textContent = userPrompt;

    for (const attachment of attachments) {
        if (attachment.type === "image" && attachment.content) {
            images.push(attachment.content);
        } else if (attachment.type === "text" && attachment.content) {
            textContent += `\n\n--- Attached File: ${attachment.file.name} ---\n${attachment.content}`;
        } else if (attachment.type === "pdf" && attachment.content) {
            textContent += `\n\n--- Attached PDF: ${attachment.file.name} (base64 encoded) ---\n${attachment.content}`;
        }
    }

    const userMessage: LLMMessage = {
        role: "user",
        content: textContent,
    };

    if (images.length > 0) {
        userMessage.images = images;
    }

    messages.push(userMessage);
    return messages;
}

export function extractJsonFromResponse(response: string): string {
    const jsonMatch = response.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (jsonMatch) {
        return jsonMatch[1].trim();
    }

    const bracketMatch = response.match(/\{[\s\S]*\}/);
    if (bracketMatch) {
        return bracketMatch[0];
    }

    return response;
}
