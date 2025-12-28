"use client";

import {
    getTemplateImageUrl,
    usePortfolioTemplates,
} from "@/lib/hooks/use-portfolio-templates";
import { type UserResume, useResumes } from "@/lib/hooks/use-resumes";
import { Button, Spinner } from "@heroui/react";
import {
    IconArrowRight,
    IconCheck,
    IconFile,
    IconSparkles,
} from "@tabler/icons-react";
import clsx from "clsx";
import NextLink from "next/link";
import { useRef, useState } from "react";

interface PortfolioWizardProps {
    onGenerate: (html: string) => void;
    isGenerating: boolean;
    setIsGenerating: (generating: boolean) => void;
}

export function PortfolioWizard({
    onGenerate,
    isGenerating,
    setIsGenerating,
}: PortfolioWizardProps) {
    const [step, setStep] = useState<"template" | "resume">("template");
    const [selectedTemplate, setSelectedTemplate] = useState<string | null>(
        null,
    );
    const [selectedResume, setSelectedResume] = useState<UserResume | null>(
        null,
    );
    const [streamedContent, setStreamedContent] = useState("");
    const contentRef = useRef<HTMLDivElement>(null);

    const { resumes, isLoading: isResumesLoading } = useResumes();
    const { templates, isLoading: isTemplatesLoading } =
        usePortfolioTemplates();

    const cleanHtml = (html: string) => {
        return html
            .replace(/^```html\n?/, "")
            .replace(/^```\n?/, "")
            .replace(/\n?```$/, "");
    };

    const handleGenerate = async () => {
        if (!selectedTemplate || !selectedResume) return;

        setIsGenerating(true);
        setStreamedContent("");

        try {
            const response = await fetch("/api/ai/portfolio/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    resumeId: selectedResume.id,
                    templateId: selectedTemplate,
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to generate portfolio");
            }

            const reader = response.body?.getReader();
            if (!reader) return;

            const decoder = new TextDecoder();
            let accumulatedHtml = "";

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value, { stream: true });
                const lines = chunk.split("\n");

                for (const line of lines) {
                    if (!line.trim()) continue;
                    try {
                        const data = JSON.parse(line);
                        if (data.done) break;
                        if (data.content) {
                            accumulatedHtml += data.content;
                            setStreamedContent((prev) => prev + data.content);
                            if (contentRef.current) {
                                contentRef.current.scrollTop =
                                    contentRef.current.scrollHeight;
                            }
                        }
                    } catch {}
                }
            }

            onGenerate(cleanHtml(accumulatedHtml));
        } catch (error) {
            console.error(error);
            setIsGenerating(false);
        }
    };

    if (isGenerating) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center h-full w-full max-w-[90vw] max-h-[90vh]">
                <Spinner
                    size="lg"
                    color="current"
                    className="mb-4 text-black"
                />
                <h3 className="text-xl font-medium mb-2">
                    Generating your portfolio...
                </h3>
                <div
                    ref={contentRef}
                    className="w-full flex-1 max-w-4xl bg-black/5 rounded-xl p-4 overflow-y-auto text-left font-mono text-xs text-black/70 whitespace-pre-wrap shadow-inner"
                >
                    {streamedContent || "Waiting for stream..."}
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 flex flex-col h-full w-full">
            <div className="border-b border-black/5 px-6 py-4 flex items-center justify-between shrink-0">
                <h2 className="text-lg font-semibold">
                    {step === "template"
                        ? "Choose a Style"
                        : "Select Content Source"}
                </h2>
                <div className="flex gap-2 text-sm text-black/40">
                    <span
                        className={clsx(
                            step === "template" && "text-black font-medium",
                        )}
                    >
                        1. Style
                    </span>
                    <span>/</span>
                    <span
                        className={clsx(
                            step === "resume" && "text-black font-medium",
                        )}
                    >
                        2. Content
                    </span>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 min-h-0">
                {step === "template" ? (
                    isTemplatesLoading ? (
                        <div className="flex items-center justify-center h-40">
                            <Spinner size="lg" />
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                            {templates.map((template) => (
                                <button
                                    type="button"
                                    key={template.id}
                                    onClick={() =>
                                        setSelectedTemplate(template.id)
                                    }
                                    className={clsx(
                                        "group relative rounded-lg border-2 overflow-hidden transition-all text-left flex flex-col w-full h-[450px]",
                                        selectedTemplate === template.id
                                            ? "border-black ring-2 ring-black/5 ring-offset-2"
                                            : "border-transparent hover:border-black/10 bg-black/5",
                                    )}
                                >
                                    <div className="w-full flex-1 relative bg-white overflow-y-auto scrollbar-hide">
                                        <div className="relative w-full min-h-full">
                                            <img
                                                src={getTemplateImageUrl(
                                                    template.image_path,
                                                )}
                                                alt={template.name}
                                                className="w-full h-auto block"
                                            />
                                        </div>
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors pointer-events-none" />
                                    </div>
                                    <div className="p-2 bg-white border-t border-black/5 shrink-0">
                                        <span className="font-medium text-xs">
                                            {template.name}
                                        </span>
                                    </div>
                                    {selectedTemplate === template.id && (
                                        <div className="absolute top-2 right-2 bg-black text-white rounded-full p-1 shadow-lg z-10">
                                            <IconCheck size={12} />
                                        </div>
                                    )}
                                </button>
                            ))}
                        </div>
                    )
                ) : (
                    <div className="max-w-2xl mx-auto space-y-4 w-full">
                        {isResumesLoading ? (
                            <div className="text-center py-12">
                                <Spinner size="lg" />
                            </div>
                        ) : resumes.length === 0 ? (
                            <div className="text-center py-12 border-2 border-dashed border-black/10 rounded-xl">
                                <p className="mb-4 text-black/60">
                                    No resumes found.
                                </p>
                                <NextLink href="/resume">
                                    <Button
                                        variant="ghost"
                                        className="border border-black/10"
                                    >
                                        Create Resume
                                    </Button>
                                </NextLink>
                            </div>
                        ) : (
                            <div className="grid gap-3">
                                {resumes.map((resume) => (
                                    <button
                                        type="button"
                                        key={resume.id}
                                        onClick={() =>
                                            setSelectedResume(resume)
                                        }
                                        className={clsx(
                                            "flex items-center gap-4 p-4 rounded-xl border transition-all text-left w-full",
                                            selectedResume?.id === resume.id
                                                ? "border-black bg-black/5"
                                                : "border-black/10 hover:border-black/30 bg-white",
                                        )}
                                    >
                                        <div className="p-3 bg-white rounded-lg border border-black/5 text-black/60 shrink-0">
                                            <IconFile size={24} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-medium truncate">
                                                {resume.name}
                                            </h3>
                                            <p className="text-sm text-black/50">
                                                Last updated:{" "}
                                                {new Date(
                                                    resume.updated_at,
                                                ).toLocaleDateString()}
                                            </p>
                                        </div>
                                        {selectedResume?.id === resume.id && (
                                            <div className="text-black shrink-0">
                                                <IconCheck size={20} />
                                            </div>
                                        )}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>

            <div className="border-t border-black/5 p-4 flex justify-between items-center bg-white shrink-0">
                {step === "resume" ? (
                    <Button variant="ghost" onPress={() => setStep("template")}>
                        Back
                    </Button>
                ) : (
                    <div />
                )}

                {step === "template" ? (
                    <Button
                        className="bg-black text-white"
                        isDisabled={!selectedTemplate}
                        onPress={() => setStep("resume")}
                    >
                        Next: Select Content <IconArrowRight size={16} />
                    </Button>
                ) : (
                    <Button
                        className="bg-black text-white"
                        isDisabled={!selectedResume}
                        onPress={handleGenerate}
                    >
                        Generate Portfolio <IconSparkles size={16} />
                    </Button>
                )}
            </div>
        </div>
    );
}
