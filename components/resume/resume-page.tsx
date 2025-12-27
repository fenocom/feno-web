"use client";

import { useAuth } from "@/lib/auth/context";
import { type UserResume, useResumes } from "@/lib/hooks/use-resumes";
import { extractResumeData } from "@/lib/resume-parser/extractor";
import { injectResumeData } from "@/lib/resume-parser/injector";
import { useCallback, useEffect, useRef, useState } from "react";
import { AuroraBorder } from "./components/aurora-border";
import type { Template } from "./components/menus/toolbar/templates-panel/template-card";
import { Toolbar } from "./components/menus/toolbar/toolbar";
import { ResumeEditor, type ResumeEditorRef } from "./components/resume-editor";
import { ResumeSelector } from "./components/resume-selector";
import { DottedBackground } from "./dotted-bg";

export const ResumePage = () => {
    const { user, isLoading: isAuthLoading } = useAuth();
    const editorRef = useRef<ResumeEditorRef>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [showLeftShadow, setShowLeftShadow] = useState(false);
    const [showRightShadow, setShowRightShadow] = useState(false);
    const [isAiGenerating, setIsAiGenerating] = useState(false);
    const [showSelector, setShowSelector] = useState(false);
    const [editorReady, setEditorReady] = useState(false);
    const hasInitializedRef = useRef(false);

    const {
        resumes,
        currentResume,
        isLoading: isResumesLoading,
        isSaving,
        hasUnsavedChanges,
        createResume,
        deleteResume,
        selectResume,
        scheduleAutoSave,
    } = useResumes();

    const checkScroll = useCallback(() => {
        if (!scrollContainerRef.current) return;

        const { scrollLeft, scrollWidth, clientWidth } =
            scrollContainerRef.current;

        setShowLeftShadow(scrollLeft > 0);
        setShowRightShadow(scrollLeft < scrollWidth - clientWidth - 1);
    }, []);

    useEffect(() => {
        checkScroll();
        window.addEventListener("resize", checkScroll);
        return () => window.removeEventListener("resize", checkScroll);
    }, [checkScroll]);

    // Show selector for logged in users with no current resume
    useEffect(() => {
        if (isAuthLoading || isResumesLoading || hasInitializedRef.current)
            return;

        if (user && !currentResume && resumes.length > 0) {
            setShowSelector(true);
        }
        hasInitializedRef.current = true;
    }, [user, currentResume, resumes, isAuthLoading, isResumesLoading]);

    // Load resume content into editor when selected
    useEffect(() => {
        if (!currentResume || !editorRef.current?.editor || !editorReady)
            return;

        const resumeData = currentResume.resume_data;
        if (resumeData && typeof resumeData === "object") {
            editorRef.current.editor.commands.setContent(resumeData);
        }
    }, [currentResume, editorReady]);

    // Auto-save on content change
    const handleEditorUpdate = useCallback(() => {
        if (!currentResume || !editorRef.current?.editor) return;

        const content = editorRef.current.editor.getJSON();
        scheduleAutoSave(content as Record<string, unknown>);
    }, [currentResume, scheduleAutoSave]);

    const handleEditorReady = useCallback(() => {
        setEditorReady(true);
    }, []);

    const handleExport = () => {
        editorRef.current?.exportPdf();
    };

    const getEditorContent = useCallback(() => {
        return editorRef.current?.editor?.getJSON() ?? null;
    }, []);

    const getEditor = useCallback(() => {
        return editorRef.current?.editor ?? null;
    }, []);

    const handleTemplateSelect = useCallback((template: Template) => {
        if (!editorRef.current?.editor) return;

        const currentContent = editorRef.current.editor.getJSON();
        const extractedData = extractResumeData(currentContent);
        const newContent = injectResumeData(
            template.resume_data,
            extractedData,
        );

        editorRef.current.editor.commands.setContent(newContent);
    }, []);

    const handleResumeSelect = useCallback(
        (resume: UserResume) => {
            selectResume(resume);
            setShowSelector(false);
        },
        [selectResume],
    );

    const handleCreateNewResume = useCallback(
        async (name: string) => {
            const defaultContent = editorRef.current?.editor?.getJSON() ?? {};
            const newResume = await createResume(
                name,
                defaultContent as Record<string, unknown>,
                resumes.length === 0,
            );
            if (newResume) {
                setShowSelector(false);
            }
        },
        [createResume, resumes.length],
    );

    const handleDeleteResume = useCallback(
        async (resumeId: string) => {
            await deleteResume(resumeId);
        },
        [deleteResume],
    );

    const handleOpenSelector = useCallback(() => {
        if (user) {
            setShowSelector(true);
        }
    }, [user]);

    return (
        <div className="resume-page-wrapper relative w-full min-h-screen flex justify-center px-2 sm:px-10 py-12 pb-32">
            <div className="no-print">
                <DottedBackground />
            </div>

            <AuroraBorder
                isActive={isAiGenerating}
                className="h-fit max-w-full z-10"
            >
                <div className="resume-inner-container p-1 border border-black/5 relative bg-black/5 rounded-xl backdrop-blur-sm transition-colors duration-300 focus-within:bg-blue-500/5 focus-within:border-blue-500/20 h-fit max-w-full">
                    <div className="resume-scroll-container relative rounded-lg border border-black/5 overflow-hidden">
                        <div
                            ref={scrollContainerRef}
                            className="overflow-x-auto"
                            onScroll={checkScroll}
                        >
                            <div className="min-w-fit">
                                <ResumeEditor
                                    ref={editorRef}
                                    onUpdate={handleEditorUpdate}
                                    onReady={handleEditorReady}
                                />
                            </div>
                        </div>

                        <div
                            className={`no-print pointer-events-none absolute top-0 left-0 bottom-0 w-8 bg-linear-to-r from-black/5 to-transparent z-10 transition-opacity duration-300 ${showLeftShadow ? "opacity-100" : "opacity-0"}`}
                        />

                        <div
                            className={`no-print pointer-events-none absolute top-0 right-0 bottom-0 w-8 bg-linear-to-l from-black/5 to-transparent z-10 transition-opacity duration-300 ${showRightShadow ? "opacity-100" : "opacity-0"}`}
                        />
                    </div>

                    <div className="no-print top-0 left-0 absolute pointer-events-none w-full h-full bg-[url('/noise.png')] bg-repeat bg-size-[50px] rounded-xl z-[-1]" />
                </div>
            </AuroraBorder>

            <div className="no-print relative z-10">
                <Toolbar
                    onExport={handleExport}
                    getEditorContent={getEditorContent}
                    getEditor={getEditor}
                    onTemplateSelect={handleTemplateSelect}
                    onAiGeneratingChange={setIsAiGenerating}
                    currentResume={currentResume}
                    isSaving={isSaving}
                    hasUnsavedChanges={hasUnsavedChanges}
                    onOpenResumeSelector={handleOpenSelector}
                />
            </div>

            {showSelector && user && (
                <ResumeSelector
                    resumes={resumes}
                    isLoading={isResumesLoading}
                    onSelect={handleResumeSelect}
                    onCreateNew={handleCreateNewResume}
                    onDelete={handleDeleteResume}
                />
            )}
        </div>
    );
};
