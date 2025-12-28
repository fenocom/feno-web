"use client";

import { AuroraBorder } from "@/components/resume/components/aurora-border";
import { DottedBackground } from "@/components/resume/dotted-bg";
import { useAuth } from "@/lib/auth/context";
import { usePortfolio } from "@/lib/hooks/use-portfolio";
import { Spinner } from "@heroui/react";
import { useCallback, useRef, useState } from "react";
import {
    BubbleMenu,
    type ElementStyles,
    type SelectedElement,
} from "./bubble-menu";
import {
    PortfolioView,
    type PortfolioViewHandle,
    type SelectedSection,
} from "./portfolio-view";
import { PortfolioToolbar } from "./toolbar/portfolio-toolbar";
import { PortfolioWizard } from "./wizard/portfolio-wizard";

export type DeviceType = "desktop" | "tablet" | "mobile";

export function PortfolioPage() {
    const { isLoading: isAuthLoading, user } = useAuth();
    const {
        portfolio,
        isLoading: isPortfolioLoading,
        saveHtml,
        publish,
        unpublish,
        isSaving,
    } = usePortfolio();
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedHtml, setGeneratedHtml] = useState("");
    const [device, setDevice] = useState<DeviceType>("desktop");
    const [selectorMode, setSelectorMode] = useState(false);
    const [selectedSection, setSelectedSection] =
        useState<SelectedSection | null>(null);
    const [editMode, setEditMode] = useState(false);
    const [selectedElement, setSelectedElement] =
        useState<SelectedElement | null>(null);

    const portfolioViewRef = useRef<PortfolioViewHandle>(null);
    const containerRef = useRef<HTMLDivElement>(null);

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

    const handleStyleChange = useCallback(
        (property: keyof ElementStyles, value: string) => {
            portfolioViewRef.current?.applyStyle(property, value);
            // Update the selected element's styles locally for immediate feedback
            if (selectedElement) {
                setSelectedElement({
                    ...selectedElement,
                    styles: { ...selectedElement.styles, [property]: value },
                });
            }
        },
        [selectedElement],
    );

    const handleCloseBubbleMenu = useCallback(() => {
        setSelectedElement(null);
        setEditMode(false);
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
            <div
                ref={containerRef}
                className="w-full min-h-screen relative bg-neutral-100 flex flex-col items-center"
            >
                <PortfolioView
                    ref={portfolioViewRef}
                    html={currentHtml}
                    device={device}
                    selectorMode={selectorMode}
                    onSectionSelect={setSelectedSection}
                    editMode={editMode}
                    onElementSelect={setSelectedElement}
                    onHtmlUpdate={handleHtmlChange}
                />
                <PortfolioToolbar
                    html={currentHtml}
                    onHtmlChange={handleHtmlChange}
                    onSave={handleSave}
                    onPublish={publish}
                    onUnpublish={unpublish}
                    device={device}
                    onDeviceChange={setDevice}
                    portfolio={portfolio}
                    isSaving={isSaving}
                    isAuthenticated={!!user}
                    selectorMode={selectorMode}
                    onSelectorModeChange={setSelectorMode}
                    selectedSection={selectedSection}
                    editMode={editMode}
                    onEditModeChange={setEditMode}
                />
                {editMode && selectedElement && (
                    <BubbleMenu
                        element={selectedElement}
                        onStyleChange={handleStyleChange}
                        onClose={handleCloseBubbleMenu}
                        containerRef={containerRef}
                    />
                )}
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
