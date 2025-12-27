import {
    ALLOWED_EXTENSIONS,
    type Attachment,
    type AttachmentType,
    MAX_FILE_SIZE,
    MIME_TYPES,
} from "./types";

export function validateFile(file: File): { valid: boolean; error?: string } {
    if (file.size > MAX_FILE_SIZE) {
        return { valid: false, error: "File size must be less than 1MB" };
    }

    const extension = file.name.split(".").pop()?.toLowerCase();
    if (
        !extension ||
        !ALLOWED_EXTENSIONS.includes(
            extension as (typeof ALLOWED_EXTENSIONS)[number],
        )
    ) {
        return {
            valid: false,
            error: `Allowed formats: ${ALLOWED_EXTENSIONS.join(", ")}`,
        };
    }

    const attachmentType = MIME_TYPES[file.type];
    if (!attachmentType) {
        return { valid: false, error: "Unsupported file type" };
    }

    return { valid: true };
}

export function getAttachmentType(file: File): AttachmentType {
    return MIME_TYPES[file.type] || "text";
}

export async function fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            const result = reader.result as string;
            const base64 = result.split(",")[1];
            resolve(base64);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

export async function readTextFile(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsText(file);
    });
}

export async function createAttachment(file: File): Promise<Attachment> {
    const type = getAttachmentType(file);
    const id = crypto.randomUUID();

    const attachment: Attachment = {
        id,
        file,
        type,
    };

    if (type === "image") {
        attachment.preview = URL.createObjectURL(file);
        attachment.content = await fileToBase64(file);
    } else if (type === "text") {
        attachment.content = await readTextFile(file);
    } else if (type === "pdf") {
        attachment.content = await fileToBase64(file);
    }

    return attachment;
}

export function revokeAttachmentPreview(attachment: Attachment): void {
    if (attachment.preview) {
        URL.revokeObjectURL(attachment.preview);
    }
}
