"use client";

import { extractResumeData } from "@/lib/resume-parser/extractor";
import { injectResumeData } from "@/lib/resume-parser/injector";
import type { JSONContent } from "@tiptap/core";
import { useCallback, useEffect, useRef, useState } from "react";
import { AiLayout } from "./ai-builder/ai-layout";
import type { Template } from "./components/menus/toolbar/templates-panel/template-card";
import { Toolbar } from "./components/menus/toolbar/toolbar";
import { ResumeEditor, type ResumeEditorRef } from "./components/resume-editor";
import { DottedBackground } from "./dotted-bg";

export const ResumePage = () => {
    const editorRef = useRef<ResumeEditorRef>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [showLeftShadow, setShowLeftShadow] = useState(false);
    const [showRightShadow, setShowRightShadow] = useState(false);

    // AI Mode State
    const [isAiMode, setIsAiMode] = useState(false);
    const [aiJsonContent, setAiJsonContent] = useState<string>("");
    const [currentContent, setCurrentContent] = useState<
        JSONContent | undefined
    >(undefined);
    const [isGenerating, setIsGenerating] = useState(false);

    const toggleAiMode = useCallback(() => {
        if (!isAiMode) {
            const json = editorRef.current?.editor?.getJSON();
            if (json) {
                setCurrentContent(json);
                setAiJsonContent(JSON.stringify(json, null, 2));
            }
            setIsAiMode(true);
        } else {
            try {
                const parsed = JSON.parse(aiJsonContent);
                setCurrentContent(parsed);
            } catch (e) {
                console.error("Failed to parse JSON on exit", e);
            }
            setIsAiMode(false);
        }
    }, [isAiMode, aiJsonContent]);

    const handleAiMessage = async (message: string) => {
        setIsGenerating(true);
        try {
            // Include current JSON in context so AI knows what to modify
            const contextMessage = `Current Resume JSON:\n\`\`\`json\n${aiJsonContent}\n\`\`\`\n\nUser Request: ${message}\n\nPlease provide the updated JSON for the resume based on the request. Return ONLY the JSON code block.`;

            const response = await fetch("/api/ai/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    messages: [{ role: "user", content: contextMessage }],
                }),
            });

            if (!response.ok) throw new Error("AI request failed");

            const data = await response.json();
            const aiText = data.message?.content || "";

            // Simple extraction of JSON code block
            const jsonMatch =
                aiText.match(/```json\n([\s\S]*?)\n```/) ||
                aiText.match(/```\n([\s\S]*?)\n```/);
            if (jsonMatch?.[1]) {
                setAiJsonContent(jsonMatch[1]);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsGenerating(false);
        }
    };

    const checkScroll = useCallback(() => {
        if (!scrollContainerRef.current) return;

        const { scrollLeft, scrollWidth, clientWidth } =
            scrollContainerRef.current;

        setShowLeftShadow(scrollLeft > 0);
        // Using a small threshold (1px) to account for potential rounding issues
        setShowRightShadow(scrollLeft < scrollWidth - clientWidth - 1);
    }, []);

    useEffect(() => {
        checkScroll();
        window.addEventListener("resize", checkScroll);
        return () => window.removeEventListener("resize", checkScroll);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [checkScroll]);

    const handleExport = () => {
        editorRef.current?.exportPdf();
    };

    const getEditorContent = useCallback(() => {
        return editorRef.current?.editor?.getJSON() ?? null;
    }, []);

    const handleTemplateSelect = useCallback((template: Template) => {
        if (!editorRef.current?.editor) return;

        const currentContent = editorRef.current.editor.getJSON();
        const extractedData = extractResumeData(currentContent);
        // If template.resume_data is just the JSON structure, passing it directly is correct.
        const newContent = injectResumeData(
            template.resume_data,
            extractedData,
        );

        editorRef.current.editor.commands.setContent(newContent);
    }, []);

    if (isAiMode) {
        return (
            <>
                <AiLayout
                    editorRef={editorRef}
                    initialJson={aiJsonContent}
                    onJsonChange={setAiJsonContent}
                    onAiMessage={handleAiMessage}
                    isGenerating={isGenerating}
                />
                <div className="fixed bottom-6 z-50 left-1/2 -translate-x-1/2">
                    <Toolbar
                        onExport={handleExport}
                        getEditorContent={getEditorContent}
                        onTemplateSelect={handleTemplateSelect}
                        onToggleAiMode={toggleAiMode}
                    />
                </div>
            </>
        );
    }

    return (
        <div className="resume-page-wrapper relative w-full min-h-screen flex justify-center px-2 sm:px-10 py-12 pb-32">
            <div className="no-print">
                <DottedBackground />
            </div>

            <div className="resume-inner-container p-1 border border-black/5 relative bg-black/5 rounded-xl z-10 backdrop-blur-sm transition-colors duration-300 focus-within:bg-blue-500/5 focus-within:border-blue-500/20 h-fit max-w-full">
                <div className="resume-scroll-container relative rounded-lg border border-black/5 overflow-hidden">
                    <div
                        ref={scrollContainerRef}
                        className="overflow-x-auto"
                        onScroll={checkScroll}
                    >
                        <div className="min-w-fit">
                            <ResumeEditor
                                ref={editorRef}
                                initialContent={currentContent}
                            />
                        </div>
                    </div>
                    {/* Scroll shadows */}
                    <div
                        className={`no-print pointer-events-none absolute top-0 left-0 bottom-0 w-8 bg-linear-to-r from-black/5 to-transparent z-10 transition-opacity duration-300 ${showLeftShadow ? "opacity-100" : "opacity-0"}`}
                    />
                    <div
                        className={`no-print pointer-events-none absolute top-0 right-0 bottom-0 w-8 bg-linear-to-l from-black/5 to-transparent z-10 transition-opacity duration-300 ${showRightShadow ? "opacity-100" : "opacity-0"}`}
                    />
                </div>
                <div className="no-print top-0 left-0 absolute pointer-events-none w-full h-full bg-[url('/noise.png')] bg-repeat bg-size-[50px] rounded-xl z-[-1]" />
            </div>

            <div className="no-print relative z-10">
                <Toolbar
                    onExport={handleExport}
                    getEditorContent={getEditorContent}
                    onTemplateSelect={handleTemplateSelect}
                    onToggleAiMode={toggleAiMode}
                />
            </div>
        </div>
    );
};
