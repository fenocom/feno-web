"use client";

import { AiIcon } from "@/components/common/ai-icon";
import { parseStreamResponse } from "@/lib/ai/stream-utils";
import { useAiUsage } from "@/lib/hooks/use-ai-usage";
import { Button, TextArea, Tooltip } from "@heroui/react";
import { IconLoader2, IconPointer, IconSend, IconX } from "@tabler/icons-react";
import clsx from "clsx";
import { useCallback, useRef, useState } from "react";
import type { SelectedSection } from "../portfolio-view";

interface AiPanelProps {
    html: string;
    onApply: (html: string) => void;
    onClose: () => void;
    selectorMode?: boolean;
    onSelectorModeChange?: (mode: boolean) => void;
    selectedSection?: SelectedSection | null;
}

export function AiPanel({
    html,
    onApply,
    onClose,
    selectorMode = false,
    onSelectorModeChange,
    selectedSection,
}: AiPanelProps) {
    const [prompt, setPrompt] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const abortControllerRef = useRef<AbortController | null>(null);
    const { hasAccess, remaining, limit, isLimitReached, usage, refetch } =
        useAiUsage();

    const replaceSectionInHtml = useCallback(
        (
            fullHtml: string,
            sectionIndex: number,
            newSectionHtml: string,
        ): string => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(fullHtml, "text/html");
            const sections = doc.querySelectorAll(".feno-section");

            if (sections[sectionIndex]) {
                const tempContainer = document.createElement("div");
                tempContainer.innerHTML = newSectionHtml;
                const newSection = tempContainer.firstElementChild;
                if (newSection) {
                    sections[sectionIndex].replaceWith(newSection);
                }
            }

            return `<!DOCTYPE html>\n${doc.documentElement.outerHTML}`;
        },
        [],
    );

    const handleSubmit = useCallback(async () => {
        if (!prompt.trim() || isGenerating) return;

        const isEditingSection = !!selectedSection;

        setIsGenerating(true);
        setError(null);
        abortControllerRef.current = new AbortController();

        try {
            const body = isEditingSection
                ? {
                      sectionHtml: selectedSection.html,
                      sectionIndex: selectedSection.index,
                      instruction: prompt,
                  }
                : { html, instruction: prompt };

            const response = await fetch("/api/ai/portfolio/edit", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
                signal: abortControllerRef.current.signal,
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || "Failed to edit portfolio");
            }

            const result = await parseStreamResponse(response);

            if (isEditingSection) {
                const updatedHtml = replaceSectionInHtml(
                    html,
                    selectedSection.index,
                    result,
                );
                onApply(updatedHtml);
            } else {
                onApply(result);
            }

            setPrompt("");
            onSelectorModeChange?.(false);
            refetch();
        } catch (err) {
            if (err instanceof Error && err.name !== "AbortError") {
                setError(err.message);
            }
        } finally {
            setIsGenerating(false);
            abortControllerRef.current = null;
        }
    }, [
        html,
        prompt,
        isGenerating,
        selectedSection,
        onApply,
        onSelectorModeChange,
        replaceSectionInHtml,
        refetch,
    ]);

    const handleCancel = useCallback(() => {
        abortControllerRef.current?.abort();
    }, []);

    return (
        <div className="flex flex-col h-full w-full">
            <div className="flex items-center justify-between px-4 py-2 border-b border-black/5">
                <div className="flex items-center gap-2">
                    <AiIcon size={20} />
                    <span className="font-semibold text-sm">AI Editor</span>
                    <Tooltip delay={0}>
                        <Button
                            isIconOnly
                            size="sm"
                            variant="ghost"
                            onPress={() =>
                                onSelectorModeChange?.(!selectorMode)
                            }
                            className={clsx(
                                "min-w-7 w-7 h-7 rounded-md",
                                selectorMode
                                    ? "bg-blue-500 text-white"
                                    : "text-black/60 hover:bg-black/5",
                            )}
                        >
                            <IconPointer size={14} />
                        </Button>
                        <Tooltip.Content>
                            <p>
                                {selectorMode
                                    ? "Exit selector mode"
                                    : "Select section to edit"}
                            </p>
                        </Tooltip.Content>
                    </Tooltip>
                </div>
                <div className="flex items-center gap-2">
                    {hasAccess && usage?.usage && (
                        <span
                            className={`text-xs px-2 py-1 rounded ${remaining === 0 ? "bg-red-100 text-red-600" : "bg-black/5 text-black/50"}`}
                        >
                            {remaining}/{limit}
                        </span>
                    )}
                    <Button
                        isIconOnly
                        size="sm"
                        variant="ghost"
                        onPress={onClose}
                        className="text-black/60"
                    >
                        <IconX size={16} />
                    </Button>
                </div>
            </div>

            {!hasAccess && (
                <div className="px-4 py-3 bg-gradient-to-r from-purple-50 to-pink-50 text-sm text-purple-700">
                    Upgrade to Premium to use AI features
                </div>
            )}

            {selectedSection && (
                <div className="px-4 py-2 bg-blue-50 text-blue-700 text-xs flex items-center justify-between">
                    <span>Editing section {selectedSection.index + 1}</span>
                    <Button
                        size="sm"
                        variant="ghost"
                        className="text-blue-600 h-5 min-w-0 px-2"
                        onPress={() => onSelectorModeChange?.(false)}
                    >
                        Clear
                    </Button>
                </div>
            )}

            {error && (
                <div className="px-4 py-2 bg-red-50 text-red-600 text-xs">
                    {error}
                </div>
            )}

            <div className="flex-1 p-3 flex flex-col gap-3">
                <TextArea
                    placeholder={
                        !hasAccess
                            ? "Premium required..."
                            : isLimitReached
                              ? "Limit reached..."
                              : selectorMode && !selectedSection
                                ? "Click on a section in the preview to select it..."
                                : selectedSection
                                  ? "Describe changes for this section..."
                                  : "Describe changes you want to make..."
                    }
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    rows={4}
                    className="w-full text-sm"
                    disabled={isGenerating || !hasAccess || isLimitReached}
                />

                <div className="flex justify-end gap-2">
                    {isGenerating ? (
                        <>
                            <Button
                                size="sm"
                                variant="ghost"
                                onPress={handleCancel}
                                className="text-red-500"
                            >
                                Cancel
                            </Button>
                            <div className="flex items-center gap-2 text-sm text-black/50">
                                <IconLoader2
                                    size={16}
                                    className="animate-spin"
                                />
                                Editing...
                            </div>
                        </>
                    ) : (
                        <Button
                            size="sm"
                            className="bg-black text-white"
                            onPress={handleSubmit}
                            isDisabled={
                                !prompt.trim() || !hasAccess || isLimitReached
                            }
                        >
                            <IconSend size={14} /> Apply
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}
