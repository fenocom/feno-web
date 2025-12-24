"use client";

import { AiIcon } from "@/components/common/ai-icon";
import { Button, Dropdown, Label, TextArea } from "@heroui/react";
import { IconEye, IconPaperclip, IconSend } from "@tabler/icons-react";
import { useState } from "react";

interface AiAssistantPanelProps {
        onClose: () => void;
}

const MODELS = [
        { id: "llama3", label: "Llama 3" },
        { id: "deepseek", label: "DeepSeek" },
        { id: "mistral", label: "Mistral" },
];

export const AiAssistantPanel = ({ onClose }: AiAssistantPanelProps) => {
        const [prompt, setPrompt] = useState("");
        const [selectedModel, setSelectedModel] = useState<string>("llama3");

        const handleSend = async () => {
                setPrompt("");
        };

        const currentModelLabel =
                MODELS.find((m) => m.id === selectedModel)?.label || selectedModel;

        return (
                <div className="w-full h-full flex flex-col">
                        <div className="flex justify-between items-center px-4 py-2 border-b border-black/5">
                                <div className="flex items-center gap-2">
                                        <AiIcon size={20} />
                                        <span className="font-semibold text-sm">AI Assistant</span>
                                </div>
                                <Dropdown>
                                        <Dropdown.Trigger>
                                                <Button
                                                        size="sm"
                                                        variant="ghost"
                                                        className="w-full bg-black/5 border-none h-8 min-h-8 text-xs px-3 justify-between font-normal"
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
                                        </Dropdown.Trigger>
                                        <Dropdown.Popover>
                                                <Dropdown.Menu
                                                        onAction={(key) =>
                                                                setSelectedModel(key as string)
                                                        }
                                                        selectionMode="single"
                                                        selectedKeys={[selectedModel]}
                                                >
                                                        {MODELS.map((model) => (
                                                                <Dropdown.Item
                                                                        id={model.id}
                                                                        key={model.id}
                                                                        textValue={model.label}
                                                                >
                                                                        <Label className="text-xs cursor-pointer">
                                                                                {model.label}
                                                                        </Label>
                                                                </Dropdown.Item>
                                                        ))}
                                                </Dropdown.Menu>
                                        </Dropdown.Popover>
                                </Dropdown>
                        </div>

                        <div className="flex-1 relative">
                                <TextArea
                                        placeholder="Ask AI to help with your resume..."
                                        value={prompt}
                                        onChange={(e) => setPrompt(e.target.value)}
                                        rows={6}
                                        className="w-full h-full outline-none resize-none text-sm p-3 transition-colors"
                                />

                                <div className="absolute bottom-2 right-2 flex gap-2">
                                        <Button
                                                size="sm"
                                                variant="ghost"
                                                aria-label="Upload Attachment"
                                        >
                                                <IconPaperclip size={18} /> Add files
                                        </Button>
                                        <Button
                                                size="sm"
                                                className="bg-black text-white"
                                                onPress={handleSend}
                                                aria-label="Send"
                                        >
                                                <IconSend size={16} /> Build
                                        </Button>
                                </div>
                        </div>
                </div>
        );
};
