"use client";

import { AuroraBorder } from "@/components/resume/components/aurora-border";
import { DottedBackground } from "@/components/resume/dotted-bg";
import { useAuth } from "@/lib/auth/context";
import { Spinner } from "@heroui/react";
import { useState } from "react";
import { PortfolioToolbar } from "./toolbar/portfolio-toolbar";
import { PortfolioWizard } from "./wizard/portfolio-wizard";

export function PortfolioPage() {
    const { isLoading: isAuthLoading } = useAuth();
    const [portfolio, _setPortfolio] = useState<{
        html_content?: string;
    } | null>(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedHtml, setGeneratedHtml] = useState("");

    // TODO: Fetch portfolio from DB

    const hasContent = !!(portfolio?.html_content || generatedHtml);

    if (isAuthLoading) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
                <div className="flex flex-col items-center gap-4">
                    <Spinner size="lg" color="current" className="text-black" />
                    <span className="text-black/60">Loading...</span>
                </div>
            </div>
        );
    }

    if (hasContent) {
        return (
            <div className="w-full min-h-screen relative bg-white">
                {/* Using iframe for isolation or direct HTML? 
                     Direct HTML allows Tailwind if classes match. 
                     Prompt says "html content will be the entire viewport". 
                 */}
                <iframe
                    srcDoc={generatedHtml || portfolio?.html_content}
                    className="w-full h-screen border-none"
                    title="Portfolio"
                />

                <div className="fixed bottom-0 left-0 right-0 z-50 pointer-events-none">
                    <div className="pointer-events-auto">
                        <PortfolioToolbar />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="relative w-full min-h-screen flex justify-center px-2 sm:px-10 py-12 pb-32 overflow-x-hidden">
            <div className="no-print">
                <DottedBackground />
            </div>

            <AuroraBorder
                isActive={isGenerating}
                className="z-10 w-full max-w-[90vw] h-[80vh]"
            >
                <div className="p-1 border border-black/5 relative bg-black/5 rounded-xl backdrop-blur-sm transition-colors duration-300 h-full w-full">
                    <div className="relative rounded-lg border border-black/5 overflow-hidden bg-white h-full flex flex-col">
                        <PortfolioWizard
                            onGenerate={(html) => setGeneratedHtml(html)}
                            isGenerating={isGenerating}
                            setIsGenerating={setIsGenerating}
                        />
                    </div>
                </div>
            </AuroraBorder>

            <div className="no-print relative z-10">
                <PortfolioToolbar isDisabled={isGenerating} />
            </div>
        </div>
    );
}
