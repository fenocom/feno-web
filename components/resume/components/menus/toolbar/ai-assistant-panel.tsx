"use client";

import { AiIcon } from "@/components/common/ai-icon";
import { Button, TextArea } from "@heroui/react";
import { IconEye, IconPaperclip, IconSend } from "@tabler/icons-react";
import { useState } from "react";

interface AiAssistantPanelProps {
    onClose: () => void;
}

export const AiAssistantPanel = ({ onClose }: AiAssistantPanelProps) => {
    const [prompt, setPrompt] = useState("");
    const [selectedModel, setSelectedModel] = useState<string>("llama3");

    const handleSend = async () => {
        // Implement send logic here
        console.log("Sending:", prompt, "Model:", selectedModel);
        // Reset or close? "dont show chat history" implies one-off or just input.
        setPrompt("");
    };

    return (
        <div className="w-full h-full flex flex-col p-4 gap-4">
            <div className="flex justify-between items-center pb-2 border-b border-black/5">
                <div className="flex items-center gap-2">
                    <AiIcon size={20} />
                    <span className="font-semibold text-sm">AI Assistant</span>
                </div>
                {/* Model Switcher */}
                <div className="w-40">
                    <div className="relative">
                        <select
                            aria-label="Select Model"
                            className="w-full bg-black/5 border-none h-8 min-h-8 text-xs rounded-lg px-2 appearance-none outline-none cursor-pointer hover:bg-black/10 transition-colors"
                            value={selectedModel}
                            onChange={(e) => setSelectedModel(e.target.value)}
                        >
                            <option value="llama3">Llama 3</option>
                            <option value="deepseek">DeepSeek</option>
                            <option value="mistral">Mistral</option>
                        </select>
                        <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                            <svg
                                width="10"
                                height="6"
                                viewBox="0 0 10 6"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M1 1L5 5L9 1"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex-1 relative">
                <TextArea
                    placeholder="Ask AI to help with your resume..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    rows={6}
                    className="w-full h-full bg-transparent outline-none resize-none text-sm p-3 bg-black/5 rounded-lg hover:bg-black/10 transition-colors"
                />

                <div className="absolute bottom-2 right-2 flex gap-2">
                    <Button
                        isIconOnly
                        size="sm"
                        variant="ghost"
                        className="text-gray-500 hover:text-black"
                        aria-label="Upload Attachment"
                    >
                        <IconPaperclip size={18} />
                    </Button>
                    <Button
                        isIconOnly
                        size="sm"
                        variant="ghost"
                        className="text-gray-500 hover:text-black"
                        aria-label="Preview"
                    >
                        <IconEye size={18} />
                    </Button>
                    <Button
                        isIconOnly
                        size="sm"
                        className="bg-black text-white"
                        onPress={handleSend}
                        aria-label="Send"
                    >
                        <IconSend size={16} />
                    </Button>
                </div>
            </div>
        </div>
    );
};
