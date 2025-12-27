"use client";

import type { Attachment } from "@/lib/ai/types";
import { IconFile, IconFileText, IconPhoto, IconX } from "@tabler/icons-react";

interface FileAttachmentPreviewProps {
    attachments: Attachment[];
    onRemove: (id: string) => void;
}

export function FileAttachmentPreview({
    attachments,
    onRemove,
}: FileAttachmentPreviewProps) {
    if (attachments.length === 0) return null;

    return (
        <div className="flex flex-wrap gap-2 p-2 border-b border-black/5">
            {attachments.map((attachment) => (
                <div
                    key={attachment.id}
                    className="relative group flex items-center gap-2 bg-black/5 rounded-lg px-2 py-1"
                >
                    {attachment.type === "image" && attachment.preview ? (
                        <img
                            src={attachment.preview}
                            alt={attachment.file.name}
                            className="w-8 h-8 object-cover rounded"
                        />
                    ) : attachment.type === "image" ? (
                        <IconPhoto size={16} className="text-blue-500" />
                    ) : attachment.type === "pdf" ? (
                        <IconFile size={16} className="text-red-500" />
                    ) : (
                        <IconFileText size={16} className="text-gray-500" />
                    )}
                    <span className="text-xs max-w-[100px] truncate">
                        {attachment.file.name}
                    </span>
                    <button
                        type="button"
                        onClick={() => onRemove(attachment.id)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity p-0.5 hover:bg-black/10 rounded"
                    >
                        <IconX size={12} />
                    </button>
                </div>
            ))}
        </div>
    );
}
