"use client";

import {
    ResumeEditor,
    type ResumeEditorRef,
} from "@/components/resume/components/resume-editor";
import { Button } from "@heroui/react";
import { IconCode, IconEye } from "@tabler/icons-react";
import clsx from "clsx";
import { type RefObject, useEffect, useState } from "react";
import { Group, Panel, Separator } from "react-resizable-panels";
import { ChatPanel } from "./chat-panel";
import { JsonEditorPanel } from "./json-editor-panel";

interface AiLayoutProps {
    editorRef: RefObject<ResumeEditorRef | null>;
    initialJson: string;
    onJsonChange: (json: string) => void;
    onAiMessage: (message: string) => Promise<void>;
    isGenerating: boolean;
}

export function AiLayout({
    editorRef,
    initialJson,
    onJsonChange,
    onAiMessage,
    isGenerating,
}: AiLayoutProps) {
    const [activeTab, setActiveTab] = useState<"preview" | "json">("preview");
    const [jsonContent, setJsonContent] = useState(initialJson);

    // Sync external initialJson changes to local state if needed (e.g. from AI)
    useEffect(() => {
        setJsonContent(initialJson);
    }, [initialJson]);

    const handleJsonChange = (value: string | undefined) => {
        if (value) {
            setJsonContent(value);
            onJsonChange(value);
        }
    };

    useEffect(() => {
        if (activeTab === "preview" && editorRef.current?.editor) {
            try {
                const parsed = JSON.parse(jsonContent);
                // Check if content is actually different to avoid unnecessary updates if possible,
                // but for now direct update is safer for consistency.
                editorRef.current.editor.commands.setContent(parsed);
            } catch (_e) {
                // Ignore invalid JSON while typing
            }
        }
    }, [jsonContent, activeTab, editorRef]);

    return (
        <div className="fixed inset-0 top-0 z-40 bg-white flex flex-col h-screen w-screen">
            <div className="flex-1 overflow-hidden">
                <Group orientation="horizontal">
                    <Panel defaultSize={70} minSize={30}>
                        <div className="flex flex-col h-full">
                            <div className="flex items-center gap-1 p-2 border-b border-black/5 bg-gray-50/50">
                                <Button
                                    size="sm"
                                    variant="ghost"
                                    className={clsx(
                                        "gap-2",
                                        activeTab === "preview"
                                            ? "bg-white shadow-sm font-medium"
                                            : "text-gray-500",
                                    )}
                                    onPress={() => setActiveTab("preview")}
                                >
                                    <IconEye size={16} />
                                    Preview
                                </Button>
                                <Button
                                    size="sm"
                                    variant="ghost"
                                    className={clsx(
                                        "gap-2",
                                        activeTab === "json"
                                            ? "bg-white shadow-sm font-medium"
                                            : "text-gray-500",
                                    )}
                                    onPress={() => setActiveTab("json")}
                                >
                                    <IconCode size={16} />
                                    JSON
                                </Button>
                            </div>
                            <div className="flex-1 overflow-hidden relative bg-gray-50/50">
                                <div
                                    className={clsx(
                                        "h-full w-full overflow-auto",
                                        activeTab === "preview"
                                            ? "block"
                                            : "hidden",
                                    )}
                                >
                                    <div className="min-h-full p-8 flex justify-center scale-[0.8] origin-top">
                                        <ResumeEditor
                                            ref={editorRef}
                                            readOnly={true}
                                            initialContent={
                                                initialJson
                                                    ? JSON.parse(initialJson)
                                                    : undefined
                                            }
                                        />
                                    </div>
                                </div>
                                <div
                                    className={clsx(
                                        "h-full w-full",
                                        activeTab === "json"
                                            ? "block"
                                            : "hidden",
                                    )}
                                >
                                    <JsonEditorPanel
                                        value={jsonContent}
                                        onChange={handleJsonChange}
                                        readOnly={isGenerating}
                                    />
                                </div>
                            </div>
                        </div>
                    </Panel>

                    <Separator className="w-1 bg-black/5 hover:bg-blue-500/50 transition-colors" />

                    <Panel defaultSize={30} minSize={20}>
                        <ChatPanel
                            onSendMessage={onAiMessage}
                            isLoading={isGenerating}
                        />
                    </Panel>
                </Group>
            </div>
        </div>
    );
}
