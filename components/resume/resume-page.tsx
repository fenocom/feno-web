"use client";

import { useResumes } from "@/lib/hooks/use-resumes";
import { extractResumeData } from "@/lib/resume-parser/extractor";
import { injectResumeData } from "@/lib/resume-parser/injector";
import { motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { ResumeEditorWrapper } from "./components/resume-editor-wrapper";
import { ResumeLoadingPlaceholder } from "./components/resume-loading-placeholder";
import type { Template } from "./components/menus/toolbar/templates-panel/template-card";
import { Toolbar } from "./components/menus/toolbar/toolbar";
import { ResumeEditor, type ResumeEditorRef } from "./components/resume-editor";
import { DottedBackground } from "./dotted-bg";

interface ResumePageProps {
    initialResumeId?: string;
}

export const ResumePage = ({ initialResumeId }: ResumePageProps) => {
    const editorRef = useRef<ResumeEditorRef>(null);
    const [isAiGenerating, setIsAiGenerating] = useState(false);
    const [editorReady, setEditorReady] = useState(false);

    const shouldFetch = !!initialResumeId;

    const {
        resumes,
        currentResume,
        isLoading: isResumesLoading,
        isSaving,
        hasUnsavedChanges,
        createResume,
        selectResume,
        scheduleAutoSave,
        saveNow,
    } = useResumes({ enabled: shouldFetch });

    useEffect(() => {
        if (!shouldFetch || isResumesLoading) return;

        if (initialResumeId) {
            const foundResume = resumes.find((r) => r.id === initialResumeId);
            if (foundResume) {
                selectResume(foundResume);
            }
        }
    }, [
        shouldFetch,
        isResumesLoading,
        initialResumeId,
        resumes,
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

    const isLoading = shouldFetch && (isResumesLoading || !currentResume);

    return (
        <div className="resume-page-wrapper relative w-full min-h-screen flex justify-center px-2 sm:px-10 py-12 pb-32">
            <div className="no-print">
                <DottedBackground />
            </div>

            <ResumeEditorWrapper isAiGenerating={isAiGenerating}>
                {isLoading ? (
                    <ResumeLoadingPlaceholder />
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <ResumeEditor
                            ref={editorRef}
                            onUpdate={handleEditorUpdate}
                            onReady={handleEditorReady}
                        />
                    </motion.div>
                )}
            </ResumeEditorWrapper>

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
                    onSaveNow={handleSaveNow}
                    onSaveNew={handleSaveNew}
                    isDisabled={isLoading}
                />
            </div>
        </div>
    );
};