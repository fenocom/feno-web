"use client";

import Editor from "@monaco-editor/react";

interface JsonEditorPanelProps {
    value: string;
    onChange?: (value: string | undefined) => void;
    readOnly?: boolean;
}

export function JsonEditorPanel({
    value,
    onChange,
    readOnly,
}: JsonEditorPanelProps) {
    return (
        <div className="h-full w-full bg-[#fffffe]">
            <Editor
                height="100%"
                defaultLanguage="json"
                value={value}
                onChange={onChange}
                options={{
                    readOnly,
                    minimap: { enabled: false },
                    fontSize: 13,
                    wordWrap: "on",
                    formatOnPaste: true,
                    formatOnType: true,
                    scrollBeyondLastLine: false,
                    padding: { top: 16, bottom: 16 },
                    fontFamily: "var(--font-mono)",
                }}
            />
        </div>
    );
}
