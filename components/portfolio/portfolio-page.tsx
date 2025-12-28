"use client";

import { AuroraBorder } from "@/components/resume/components/aurora-border";
import { DottedBackground } from "@/components/resume/dotted-bg";
import { useAuth } from "@/lib/auth/context";
import { usePortfolio } from "@/lib/hooks/use-portfolio";
import { Spinner } from "@heroui/react";
import { useCallback, useState } from "react";
import { PortfolioToolbar } from "./toolbar/portfolio-toolbar";
import { PortfolioView } from "./portfolio-view";
import { PortfolioWizard } from "./wizard/portfolio-wizard";

export type DeviceType = "desktop" | "tablet" | "mobile";

export function PortfolioPage() {
    const { isLoading: isAuthLoading, user } = useAuth();
    const { portfolio, isLoading: isPortfolioLoading, saveHtml, publish, unpublish, isSaving } = usePortfolio();
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedHtml, setGeneratedHtml] = useState("");
    const [device, setDevice] = useState<DeviceType>("desktop");

    const currentHtml = generatedHtml || portfolio?.html_content || "";
    const hasContent = !!currentHtml;

    const handleSave = useCallback(async () => {
        if (currentHtml) {
            await saveHtml(currentHtml);
        }
    }, [currentHtml, saveHtml]);

    const handleHtmlChange = useCallback((html: string) => {
        setGeneratedHtml(html);
    }, []);

    const handleRegenerate = useCallback(() => {
        setGeneratedHtml("");
    }, []);

    if (isAuthLoading || isPortfolioLoading) {
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
            <div className="w-full min-h-screen relative bg-neutral-100 flex flex-col items-center">
                <PortfolioView html={currentHtml} device={device} />
                <PortfolioToolbar
                    html={currentHtml}
                    onHtmlChange={handleHtmlChange}
                    onSave={handleSave}
                    onPublish={publish}
                    onUnpublish={unpublish}
                    onRegenerate={handleRegenerate}
                    device={device}
                    onDeviceChange={setDevice}
                    portfolio={portfolio}
                    isSaving={isSaving}
                    isAuthenticated={!!user}
                />
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
        </div>
    );
}
