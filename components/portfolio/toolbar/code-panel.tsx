"use client";

import { Button } from "@heroui/react";
import { IconCheck, IconX } from "@tabler/icons-react";
import Editor, { useMonaco } from "@monaco-editor/react";
import { useCallback, useEffect, useState } from "react";

interface CodePanelProps {
    html: string;
    onApply: (html: string) => void;
    onClose: () => void;
}

export function CodePanel({ html, onApply, onClose }: CodePanelProps) {
    const [code, setCode] = useState(html);
    const [hasChanges, setHasChanges] = useState(false);
    const monaco = useMonaco();

    useEffect(() => {
        if (monaco) {
            monaco.editor.defineTheme("feno-light", {
                base: "vs",
                inherit: true,
                rules: [],
                colors: {
                    "editor.background": "#f5f5f5",
                    "editor.lineHighlightBackground": "#00000008",
                    "editorLineNumber.foreground": "#00000040",
                    "editorIndentGuide.background": "#00000010",
                },
            });
            monaco.editor.setTheme("feno-light");
        }
    }, [monaco]);

    useEffect(() => {
        setCode(html);
        setHasChanges(false);
    }, [html]);

    const handleChange = useCallback((value: string | undefined) => {
        const newCode = value ?? "";
        setCode(newCode);
        setHasChanges(newCode !== html);
    }, [html]);

    const handleApply = useCallback(() => {
        onApply(code);
        setHasChanges(false);
    }, [code, onApply]);

    return (
        <div className="flex flex-col h-full w-full">
            <div className="flex items-center justify-between px-4 py-2 border-b border-black/5">
                <span className="font-semibold text-sm">Edit HTML</span>
                <div className="flex gap-2">
                    <Button
                        size="sm"
                        variant="ghost"
                        onPress={onClose}
                        className="text-black/60"
                    >
                        <IconX size={16} /> Cancel
                    </Button>
                    <Button
                        size="sm"
                        className="bg-black text-white"
                        onPress={handleApply}
                        isDisabled={!hasChanges}
                    >
                        <IconCheck size={16} /> Apply
                    </Button>
                </div>
            </div>
            <div className="flex-1 overflow-hidden rounded-lg m-2 bg-[#f5f5f5]">
                <Editor
                    height="100%"
                    language="html"
                    value={code}
                    onChange={handleChange}
                    theme="feno-light"
                    options={{
                        minimap: { enabled: false },
                        fontSize: 12,
                        lineNumbers: "on",
                        scrollBeyondLastLine: false,
                        wordWrap: "on",
                        padding: { top: 12, bottom: 12 },
                        renderLineHighlight: "line",
                        scrollbar: {
                            verticalScrollbarSize: 8,
                            horizontalScrollbarSize: 8,
                        },
                    }}
                />
            </div>
        </div>
    );
}
