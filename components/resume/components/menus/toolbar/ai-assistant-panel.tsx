"use client";

import { AiIcon } from "@/components/common/ai-icon";
import {
    buildMessagesWithAttachments,
    buildSystemPrompt,
    buildUserPrompt,
    createAttachment,
    extractJsonFromResponse,
    revokeAttachmentPreview,
    streamCompletion,
    validateFile,
} from "@/lib/ai";
import type { Attachment } from "@/lib/ai/types";
import { useAiUsage } from "@/lib/hooks/use-ai-usage";
import { Button, TextArea } from "@heroui/react";
import { IconLoader2, IconPaperclip, IconSend } from "@tabler/icons-react";
import type { Editor, JSONContent } from "@tiptap/core";
import { useCallback, useRef, useState } from "react";
import { FileAttachmentPreview } from "./file-attachment-preview";

interface AiAssistantPanelProps {
    editor: Editor | null;
    onGeneratingChange?: (isGenerating: boolean) => void;
}

const MODEL_ID = "gemini-2.0-flash";

export const AiAssistantPanel = ({
    editor,
    onGeneratingChange,
}: AiAssistantPanelProps) => {
    const [prompt, setPrompt] = useState("");
    const [attachments, setAttachments] = useState<Attachment[]>([]);
    const [isGenerating, setIsGenerating] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const abortControllerRef = useRef<AbortController | null>(null);
    const {
        hasAccess,
        remaining,
        limit,
        periodType,
        isLimitReached,
        isLoading: isLoadingUsage,
        usage,
        refetch,
    } = useAiUsage();

    const handleFileSelect = useCallback(
        async (e: React.ChangeEvent<HTMLInputElement>) => {
            const files = e.target.files;
            if (!files) return;

            setError(null);
            const newAttachments: Attachment[] = [];

            for (const file of Array.from(files)) {
                const validation = validateFile(file);
                if (!validation.valid) {
                    setError(validation.error || "Invalid file");
                    continue;
                }

                try {
                    const attachment = await createAttachment(file);
                    newAttachments.push(attachment);
                } catch {
                    setError(`Failed to process ${file.name}`);
                }
            }

            setAttachments((prev) => [...prev, ...newAttachments]);
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
        },
        [],
    );

    const handleRemoveAttachment = useCallback((id: string) => {
        setAttachments((prev) => {
            const attachment = prev.find((a) => a.id === id);
            if (attachment) {
                revokeAttachmentPreview(attachment);
            }
            return prev.filter((a) => a.id !== id);
        });
    }, []);

    const handleBuild = useCallback(async () => {
        if (!editor || !prompt.trim()) return;

        setError(null);
        setIsGenerating(true);
        onGeneratingChange?.(true);

        editor.setEditable(false);

        abortControllerRef.current = new AbortController();

        try {
            const currentContent = editor.getJSON();
            const systemPrompt = buildSystemPrompt();
            const userPrompt = buildUserPrompt(currentContent, prompt);
            const messages = buildMessagesWithAttachments(
                systemPrompt,
                userPrompt,
                attachments,
            );

            let fullResponse = "";

            for await (const chunk of streamCompletion(
                MODEL_ID,
                messages,
                abortControllerRef.current.signal,
            )) {
                fullResponse += chunk;
            }

            const jsonString = extractJsonFromResponse(fullResponse);
            const newContent: JSONContent = JSON.parse(jsonString);

            if (newContent.type !== "doc" || !newContent.content) {
                throw new Error("Invalid resume structure");
            }

            editor.commands.setContent(newContent);
            setPrompt("");
            attachments.forEach(revokeAttachmentPreview);
            setAttachments([]);
            refetch();
        } catch (err) {
            if (err instanceof Error && err.name === "AbortError") {
                return;
            }
            setError(
                err instanceof Error
                    ? err.message
                    : "Failed to generate resume",
            );
        } finally {
            editor.setEditable(true);
            setIsGenerating(false);
            onGeneratingChange?.(false);
            abortControllerRef.current = null;
        }
    }, [editor, prompt, attachments, onGeneratingChange, refetch]);

    const handleCancel = useCallback(() => {
        abortControllerRef.current?.abort();
    }, []);

    return (
        <div className="w-full h-full flex flex-col">
            <div className="flex items-center justify-between px-4 py-2 border-b border-black/5">
                <div className="flex items-center gap-2">
                    <AiIcon size={24} />
                    <span className="font-semibold text-sm">AI Assistant</span>
                </div>
                {!isLoadingUsage && hasAccess && usage?.usage && (
                    <span
                        className={`text-xs px-2 py-1 rounded ${
                            remaining === 0
                                ? "bg-red-100 text-red-600"
                                : remaining <= 3
                                  ? "bg-yellow-100 text-yellow-700"
                                  : "bg-black/5 text-black/50"
                        }`}
                    >
                        {remaining}/{limit}{" "}
                        {periodType === "daily" ? "today" : "this month"}
                    </span>
                )}
            </div>

            {!isLoadingUsage && !hasAccess && (
                <div className="px-4 py-3 bg-gradient-to-r from-purple-50 to-pink-50 text-sm text-purple-700">
                    Upgrade to Premium to use AI features
                </div>
            )}

            {isLimitReached && (
                <div className="px-4 py-2 bg-red-50 text-red-600 text-xs">
                    You've reached your {periodType} limit. Resets{" "}
                    {periodType === "daily" ? "tomorrow" : "next month"}.
                </div>
            )}

            <FileAttachmentPreview
                attachments={attachments}
                onRemove={handleRemoveAttachment}
            />

            {error && (
                <div className="px-4 py-2 bg-red-50 text-red-600 text-xs">
                    {error}
                </div>
            )}

            <div className="flex-1 relative">
                <TextArea
                    placeholder={
                        !hasAccess
                            ? "Premium subscription required..."
                            : isLimitReached
                              ? "Usage limit reached..."
                              : "Ask AI to help with your resume..."
                    }
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    rows={6}
                    className="w-full h-full outline-none resize-none text-sm p-3 transition-colors"
                    disabled={isGenerating || !hasAccess || isLimitReached}
                />

                <input
                    ref={fileInputRef}
                    type="file"
                    accept=".png,.jpg,.jpeg,.txt,.md,.pdf"
                    multiple
                    onChange={handleFileSelect}
                    className="hidden"
                />

                <div className="absolute bottom-2 right-2 flex gap-2">
                    {isGenerating ? (
                        <Button
                            size="sm"
                            variant="ghost"
                            onPress={handleCancel}
                            className="text-red-500"
                        >
                            Cancel
                        </Button>
                    ) : (
                        <>
                            <Button
                                size="sm"
                                variant="ghost"
                                onPress={() => fileInputRef.current?.click()}
                                aria-label="Upload Attachment"
                                isDisabled={!hasAccess || isLimitReached}
                            >
                                <IconPaperclip size={18} /> Add files
                            </Button>
                            <Button
                                size="sm"
                                className="bg-black text-white"
                                onPress={handleBuild}
                                isDisabled={
                                    !prompt.trim() ||
                                    !editor ||
                                    !hasAccess ||
                                    isLimitReached
                                }
                                aria-label="Build"
                            >
                                <IconSend size={16} /> Build
                            </Button>
                        </>
                    )}
                    {isGenerating && (
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                            <IconLoader2 size={16} className="animate-spin" />
                            <span>Generating...</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
