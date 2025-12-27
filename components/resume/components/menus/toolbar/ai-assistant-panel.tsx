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
import { Button, Popover, TextArea } from "@heroui/react";
import { IconLoader2, IconPaperclip, IconSend } from "@tabler/icons-react";
import type { Editor, JSONContent } from "@tiptap/core";
import { useCallback, useRef, useState } from "react";
import { FileAttachmentPreview } from "./file-attachment-preview";

interface AiAssistantPanelProps {
    editor: Editor | null;
    onGeneratingChange?: (isGenerating: boolean) => void;
}

const MODELS = [
    { id: "llama3.2-vision", label: "Llama 3.2 Vision" },
    { id: "deepseek-r1", label: "DeepSeek R1" },
    { id: "mistral", label: "Mistral" },
];

export const AiAssistantPanel = ({
    editor,
    onGeneratingChange,
}: AiAssistantPanelProps) => {
    const [prompt, setPrompt] = useState("");
    const [selectedModel, setSelectedModel] =
        useState<string>("llama3.2-vision");
    const [attachments, setAttachments] = useState<Attachment[]>([]);
    const [isGenerating, setIsGenerating] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const abortControllerRef = useRef<AbortController | null>(null);

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
                selectedModel,
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
    }, [editor, prompt, attachments, selectedModel, onGeneratingChange]);

    const handleCancel = useCallback(() => {
        abortControllerRef.current?.abort();
    }, []);

    const currentModelLabel =
        MODELS.find((m) => m.id === selectedModel)?.label || selectedModel;

    return (
        <div className="w-full h-full flex flex-col">
            <div className="flex justify-between items-center px-4 py-2 border-b border-black/5">
                <div className="flex items-center gap-2">
                    <AiIcon size={20} />
                    <span className="font-semibold text-sm">AI Assistant</span>
                </div>
                <Popover>
                    <Popover.Trigger>
                        <Button
                            size="sm"
                            variant="ghost"
                            className="w-full bg-black/5 border-none h-8 min-h-8 text-xs px-3 justify-between font-normal"
                            isDisabled={isGenerating}
                        >
                            {currentModelLabel}
                            <svg
                                width="10"
                                height="6"
                                viewBox="0 0 10 6"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="ml-2"
                            >
                                <path
                                    d="M1 1L5 5L9 1"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </Button>
                    </Popover.Trigger>
                    <Popover.Content
                        placement="bottom"
                        className="z-50 bg-white shadow-lg border rounded-lg p-1 min-w-[160px]"
                    >
                        <div className="flex flex-col">
                            {MODELS.map((model) => (
                                <Button
                                    key={model.id}
                                    size="sm"
                                    variant="ghost"
                                    className={`justify-start text-xs px-3 py-1.5 ${
                                        selectedModel === model.id
                                            ? "bg-black/5"
                                            : ""
                                    }`}
                                    onPress={() => setSelectedModel(model.id)}
                                >
                                    {model.label}
                                </Button>
                            ))}
                        </div>
                    </Popover.Content>
                </Popover>
            </div>

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
                    placeholder="Ask AI to help with your resume..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    rows={6}
                    className="w-full h-full outline-none resize-none text-sm p-3 transition-colors"
                    disabled={isGenerating}
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
                            >
                                <IconPaperclip size={18} /> Add files
                            </Button>
                            <Button
                                size="sm"
                                className="bg-black text-white"
                                onPress={handleBuild}
                                isDisabled={!prompt.trim() || !editor}
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
