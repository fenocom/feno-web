"use client";

import { Button } from "@heroui/react";
import { IconCheck, IconX } from "@tabler/icons-react";
import { useCallback, useEffect, useState } from "react";

interface CodePanelProps {
    html: string;
    onApply: (html: string) => void;
    onClose: () => void;
}

export function CodePanel({ html, onApply, onClose }: CodePanelProps) {
    const [code, setCode] = useState(html);
    const [hasChanges, setHasChanges] = useState(false);

    useEffect(() => {
        setCode(html);
        setHasChanges(false);
    }, [html]);

    const handleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setCode(e.target.value);
        setHasChanges(e.target.value !== html);
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
            <div className="flex-1 p-2 overflow-hidden">
                <textarea
                    value={code}
                    onChange={handleChange}
                    className="w-full h-full font-mono text-xs bg-black/5 rounded-lg p-3 resize-none outline-none focus:ring-2 focus:ring-black/10"
                    spellCheck={false}
                />
            </div>
        </div>
    );
}
