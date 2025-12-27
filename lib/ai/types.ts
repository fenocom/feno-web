export type AttachmentType = "image" | "text" | "pdf";

export interface Attachment {
    id: string;
    file: File;
    type: AttachmentType;
    preview?: string;
    content?: string;
}

export interface LLMMessage {
    role: "user" | "assistant" | "system";
    content: string;
    images?: string[];
}

export interface LLMRequest {
    model: string;
    messages: LLMMessage[];
    stream?: boolean;
}

export interface LLMResponse {
    message: {
        role: string;
        content: string;
    };
    done: boolean;
}

export interface LLMStreamChunk {
    message: {
        content: string;
    };
    done: boolean;
}

export const ALLOWED_EXTENSIONS = [
    "png",
    "jpg",
    "jpeg",
    "txt",
    "md",
    "pdf",
] as const;
export const MAX_FILE_SIZE = 1024 * 1024;

export const MIME_TYPES: Record<string, AttachmentType> = {
    "image/png": "image",
    "image/jpeg": "image",
    "text/plain": "text",
    "text/markdown": "text",
    "application/pdf": "pdf",
};
