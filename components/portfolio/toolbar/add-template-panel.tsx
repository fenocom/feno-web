"use client";

import { createPortfolioTemplate } from "@/lib/hooks/use-portfolio-templates";
import { Button, Input, Spinner, TextArea } from "@heroui/react";
import { IconCloudUpload, IconX } from "@tabler/icons-react";
import { useRef, useState } from "react";

interface AddTemplatePanelProps {
    onClose: () => void;
}

export function AddTemplatePanel({ onClose }: AddTemplatePanelProps) {
    const [name, setName] = useState("");
    const [prompt, setPrompt] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleSubmit = async () => {
        if (!name || !prompt || !file) return;
        setIsSubmitting(true);
        try {
            await createPortfolioTemplate(name, prompt, file);
            onClose();
        } catch (error) {
            console.error(error);
            alert("Failed to create template");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="w-full h-full flex flex-col">
            <div className="flex items-center justify-between px-4 py-3 border-b border-black/5">
                <div className="flex items-center gap-2">
                    <IconCloudUpload size={20} />
                    <span className="font-semibold text-sm">Add Template</span>
                </div>
                <button
                    type="button"
                    onClick={onClose}
                    className="p-1 hover:bg-black/5 rounded-md transition-colors"
                >
                    <IconX size={16} />
                </button>
            </div>
            <div className="flex-1 p-4 space-y-4 overflow-y-auto">
                <Input
                    placeholder="Template Name (e.g. Minimal Dark)"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <div className="space-y-2">
                    <div className="text-sm font-medium">Reference Image</div>
                    <input
                        type="file"
                        ref={fileInputRef}
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                            if (e.target.files?.[0]) {
                                setFile(e.target.files[0]);
                            }
                        }}
                    />
                    <Button
                        variant="ghost"
                        className="w-full h-24 border-2 border-dashed border-black/10 flex flex-col gap-2 items-center justify-center"
                        onPress={() => fileInputRef.current?.click()}
                    >
                        {file ? (
                            <div className="text-center">
                                <span className="font-medium text-black">
                                    {file.name}
                                </span>
                                <div className="text-xs text-black/50">
                                    Click to change
                                </div>
                            </div>
                        ) : (
                            <>
                                <IconCloudUpload
                                    size={24}
                                    className="text-black/40"
                                />
                                <span className="text-black/60">
                                    Upload Image
                                </span>
                            </>
                        )}
                    </Button>
                </div>

                <TextArea
                    placeholder="Describe the template style..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    rows={4}
                />

                <Button
                    className="w-full bg-black text-white"
                    onPress={handleSubmit}
                    isDisabled={!name || !prompt || !file || isSubmitting}
                >
                    {isSubmitting ? (
                        <Spinner size="sm" color="current" />
                    ) : (
                        "Create Template"
                    )}
                </Button>
            </div>
        </div>
    );
}
