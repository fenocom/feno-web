"use client";

import { useAuth } from "@/lib/auth/context";
import { type UserResume, useResumes } from "@/lib/hooks/use-resumes";
import { extractResumeData } from "@/lib/resume-parser/extractor";
import { injectResumeData } from "@/lib/resume-parser/injector";
import { Spinner } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { AuroraBorder } from "./components/aurora-border";
import type { Template } from "./components/menus/toolbar/templates-panel/template-card";
import { Toolbar } from "./components/menus/toolbar/toolbar";
import { ResumeEditor, type ResumeEditorRef } from "./components/resume-editor";
import { ResumeSelector } from "./components/resume-selector";
import { DottedBackground } from "./dotted-bg";

interface ResumePageProps {
    initialResumeId?: string;
}

export const ResumePage = ({ initialResumeId }: ResumePageProps) => {
    const router = useRouter();
    const { user, isLoading: isAuthLoading } = useAuth();
    const editorRef = useRef<ResumeEditorRef>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [showLeftShadow, setShowLeftShadow] = useState(false);
    const [showRightShadow, setShowRightShadow] = useState(false);
    const [isAiGenerating, setIsAiGenerating] = useState(false);
    const [showSelector, setShowSelector] = useState(false);
    const [editorReady, setEditorReady] = useState(false);
    const [isInitialized, setIsInitialized] = useState(false);

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
        saveNow,
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

    useEffect(() => {
        if (isAuthLoading || isResumesLoading || isInitialized) return;

        if (initialResumeId) {
            const foundResume = resumes.find((r) => r.id === initialResumeId);
            if (foundResume) {
                selectResume(foundResume);
                setShowSelector(false);
            } else {
                if (resumes.length > 0) {
                    setShowSelector(true);
                }
            }
        }
        setIsInitialized(true);
    }, [
        resumes,
        isAuthLoading,
        isResumesLoading,
        isInitialized,
        initialResumeId,
        selectResume,
    ]);

    useEffect(() => {
        if (!currentResume || !editorRef.current?.editor || !editorReady)
            return;
        const resumeData = currentResume.resume_data;
        if (resumeData && typeof resumeData === "object") {
            editorRef.current.editor.commands.setContent(resumeData);
        }
    }, [currentResume, editorReady]);

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
            router.push(`/resume/${resume.id}`);
        },
        [selectResume, router],
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
                window.history.replaceState(
                    null,
                    "",
                    `/resume/${newResume.id}`,
                );
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

    const handleSaveNow = useCallback(() => {
        saveNow();
    }, [saveNow]);

    const handleSaveNew = useCallback(
        async (name: string) => {
            const content = editorRef.current?.editor?.getJSON() ?? {};
            const newResume = await createResume(
                name,
                content as Record<string, unknown>,
                false,
            );
            if (newResume) {
                window.history.replaceState(
                    null,
                    "",
                    `/resume/${newResume.id}`,
                );
            }
        },
        [createResume],
    );

    const handleSwitchResume = useCallback(
        (resume: UserResume) => {
            selectResume(resume);
            router.push(`/resume/${resume.id}`);
        },
        [selectResume, router],
    );

    const isLoading = isAuthLoading || (user && isResumesLoading);
    const effectiveLoading = isLoading || (!!initialResumeId && !isInitialized);

    const shouldShowEditor = !user || isInitialized;

    if (effectiveLoading) {
        return (
            <div className="resume-page-wrapper relative w-full min-h-screen flex justify-center px-2 sm:px-10 py-12 pb-32">
                <div className="no-print">
                    <DottedBackground />
                </div>
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
                    <div className="flex flex-col items-center gap-4">
                        <Spinner size="lg" />
                        <span className="text-black/60">Loading...</span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="resume-page-wrapper relative w-full min-h-screen flex justify-center px-2 sm:px-10 py-12 pb-32">
            <div className="no-print">
                <DottedBackground />
            </div>

            {shouldShowEditor && (
                <>
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
                            resumes={resumes}
                            isSaving={isSaving}
                            hasUnsavedChanges={hasUnsavedChanges}
                            onSaveNow={handleSaveNow}
                            onSaveNew={handleSaveNew}
                            onSwitchResume={handleSwitchResume}
                        />
                    </div>
                </>
            )}

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
