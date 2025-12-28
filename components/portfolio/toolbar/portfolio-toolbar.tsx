"use client";

import { AiIcon } from "@/components/common/ai-icon";
import type { UserPortfolio } from "@/lib/hooks/use-portfolio";
import type { PortfolioTemplate } from "@/lib/hooks/use-portfolio-templates";
import { useAuth } from "@/lib/auth/context";
import { Button, Tooltip } from "@heroui/react";
import {
    IconCode,
    IconDeviceFloppy,
    IconLayoutDashboard,
    IconLoader2,
    IconPalette,
    IconPlus,
    IconWorldUpload,
} from "@tabler/icons-react";
import clsx from "clsx";
import { motion } from "framer-motion";
import NextLink from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { DeviceType } from "../portfolio-page";
import { AddTemplatePanel } from "./add-template-panel";
import { AiPanel } from "./ai-panel";
import { CodePanel } from "./code-panel";
import { DeviceToggle } from "./device-toggle";
import { SubdomainPanel } from "./subdomain-panel";
import { TemplatesPanel } from "./templates-panel";

interface PortfolioToolbarProps {
    html?: string;
    onHtmlChange?: (html: string) => void;
    onSave?: () => Promise<void>;
    onPublish?: (subdomain: string) => Promise<boolean>;
    onUnpublish?: () => Promise<boolean>;
    device?: DeviceType;
    onDeviceChange?: (device: DeviceType) => void;
    portfolio?: UserPortfolio | null;
    isSaving?: boolean;
    isAuthenticated?: boolean;
}

type ActivePanel = "ai" | "code" | "subdomain" | "templates" | "add-template" | null;

export function PortfolioToolbar({
    html = "",
    onHtmlChange,
    onSave,
    onPublish,
    onUnpublish,
    device = "desktop",
    onDeviceChange,
    portfolio,
    isSaving = false,
    isAuthenticated = false,
}: PortfolioToolbarProps) {
    const { isAdmin } = useAuth();
    const [activePanel, setActivePanel] = useState<ActivePanel>(null);
    const [isRestyling, setIsRestyling] = useState(false);
    const [selectedTemplateId, setSelectedTemplateId] = useState<string>();
    const toolbarRef = useRef<HTMLDivElement>(null);

    const hasContent = !!html;
    const isDisabled = !hasContent;

    useEffect(() => {
        if (!activePanel) return;
        const handleClickOutside = (event: MouseEvent) => {
            if (toolbarRef.current && !toolbarRef.current.contains(event.target as Node)) {
                if (!isRestyling) setActivePanel(null);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [activePanel, isRestyling]);

    const handleTemplateSelect = useCallback(async (template: PortfolioTemplate) => {
        const cleanHtml = (text: string) => {
            return text.replace(/^```html\n?/, "").replace(/^```\n?/, "").replace(/\n?```$/, "");
        };
        if (!html || isRestyling) return;

        setSelectedTemplateId(template.id);
        setIsRestyling(true);

        try {
            const response = await fetch("/api/ai/portfolio/restyle", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ html, templateId: template.id }),
            });

            if (!response.ok) {
                throw new Error("Failed to restyle portfolio");
            }

            const reader = response.body?.getReader();
            if (!reader) throw new Error("No response body");

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
                        if (data.content) accumulatedHtml += data.content;
                    } catch {}
                }
            }

            onHtmlChange?.(cleanHtml(accumulatedHtml));
            setActivePanel(null);
        } catch (err) {
            console.error(err);
        } finally {
            setIsRestyling(false);
            setSelectedTemplateId(undefined);
        }
    }, [html, isRestyling, onHtmlChange]);

    const getDimensions = () => {
        switch (activePanel) {
            case "ai": return { width: "450px", height: "320px" };
            case "code": return { width: "600px", height: "500px" };
            case "subdomain": return { width: "380px", height: "320px" };
            case "templates": return { width: "500px", height: "400px" };
            case "add-template": return { width: "400px", height: "500px" };
            default: return { width: "auto", height: "52px" };
        }
    };

    const { width, height } = getDimensions();

    const renderPanel = () => {
        switch (activePanel) {
            case "ai":
                return <AiPanel html={html} onApply={(h) => { onHtmlChange?.(h); setActivePanel(null); }} onClose={() => setActivePanel(null)} />;
            case "code":
                return <CodePanel html={html} onApply={(h) => { onHtmlChange?.(h); setActivePanel(null); }} onClose={() => setActivePanel(null)} />;
            case "subdomain":
                return <SubdomainPanel portfolio={portfolio ?? null} onPublish={onPublish ?? (async () => false)} onUnpublish={onUnpublish ?? (async () => false)} onClose={() => setActivePanel(null)} isSaving={isSaving} />;
            case "templates":
                return <TemplatesPanel onSelect={handleTemplateSelect} onClose={() => !isRestyling && setActivePanel(null)} isRestyling={isRestyling} selectedId={selectedTemplateId} />;
            case "add-template":
                return <AddTemplatePanel onClose={() => setActivePanel(null)} />;
            default:
                return null;
        }
    };

    return (
        <motion.div
            ref={toolbarRef}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 shadow-xl z-50 rounded-3xl border border-black/10 bg-white overflow-hidden flex flex-col pointer-events-auto"
            initial={{ width: "auto", height: "52px" }}
            animate={{ width, height }}
            transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
        >
            <div className="w-full relative flex-1 overflow-hidden">
                <div className={clsx("w-full h-full transition-opacity duration-300", activePanel ? "relative z-10 opacity-100" : "absolute inset-0 invisible opacity-0 pointer-events-none")}>
                    {renderPanel()}
                </div>
            </div>

            <div className={clsx("relative z-10 text-black w-full", activePanel && "border-t border-black/10")}>
                <div className="flex justify-center w-full">
                    <div className="flex gap-2 items-center px-3 py-2 whitespace-nowrap">
                        <Tooltip delay={0}>
                            <Button
                                isIconOnly
                                className={clsx("bg-transparent data-[hover=true]:bg-black/5 min-w-fit w-fit h-fit p-1 rounded-full", activePanel === "ai" && "bg-black/10")}
                                isDisabled={isDisabled || isRestyling}
                                onPress={() => setActivePanel(activePanel === "ai" ? null : "ai")}
                            >
                                <AiIcon size={28} />
                            </Button>
                            <Tooltip.Content><p>AI Editor</p></Tooltip.Content>
                        </Tooltip>

                        <Tooltip delay={0}>
                            <NextLink href="/control-center">
                                <Button isIconOnly size="sm" variant="ghost" isDisabled={!!activePanel || isRestyling} className="p-1 min-w-8 h-8 rounded-md hover:bg-black/10 text-black">
                                    <IconLayoutDashboard size={18} />
                                </Button>
                            </NextLink>
                            <Tooltip.Content><p>Control Center</p></Tooltip.Content>
                        </Tooltip>

                        <div className="w-px h-6 bg-black/10 mx-1" />

                        {hasContent && onDeviceChange && (
                            <>
                                <DeviceToggle device={device} onChange={onDeviceChange} isDisabled={!!activePanel || isRestyling} />
                                <div className="w-px h-6 bg-black/10 mx-1" />
                            </>
                        )}

                        <div className="flex gap-1 items-center">
                            <Tooltip delay={0}>
                                <Button
                                    isIconOnly size="sm" variant="ghost"
                                    isDisabled={isDisabled}
                                    onPress={() => setActivePanel(activePanel === "templates" ? null : "templates")}
                                    className={clsx("p-1 min-w-8 h-8 rounded-md hover:bg-black/10 text-black", activePanel === "templates" && "bg-black/10")}
                                >
                                    {isRestyling ? <IconLoader2 size={18} className="animate-spin" /> : <IconPalette size={18} />}
                                </Button>
                                <Tooltip.Content><p>Change Style</p></Tooltip.Content>
                            </Tooltip>

                            <Tooltip delay={0}>
                                <Button
                                    isIconOnly size="sm" variant="ghost"
                                    isDisabled={isDisabled || isRestyling}
                                    onPress={() => setActivePanel(activePanel === "code" ? null : "code")}
                                    className={clsx("p-1 min-w-8 h-8 rounded-md hover:bg-black/10 text-black", activePanel === "code" && "bg-black/10")}
                                >
                                    <IconCode size={18} />
                                </Button>
                                <Tooltip.Content><p>Edit Code</p></Tooltip.Content>
                            </Tooltip>

                            {isAuthenticated && (
                                <>
                                    <Tooltip delay={0}>
                                        <Button
                                            isIconOnly size="sm" variant="ghost"
                                            isDisabled={isDisabled || isSaving || isRestyling}
                                            onPress={onSave}
                                            className="p-1 min-w-8 h-8 rounded-md hover:bg-black/10 text-black"
                                        >
                                            {isSaving ? <IconLoader2 size={18} className="animate-spin" /> : <IconDeviceFloppy size={18} />}
                                        </Button>
                                        <Tooltip.Content><p>{isSaving ? "Saving..." : "Save"}</p></Tooltip.Content>
                                    </Tooltip>

                                    <Tooltip delay={0}>
                                        <Button
                                            isIconOnly size="sm" variant="ghost"
                                            isDisabled={isDisabled || isRestyling}
                                            onPress={() => setActivePanel(activePanel === "subdomain" ? null : "subdomain")}
                                            className={clsx("p-1 min-w-8 h-8 rounded-md hover:bg-black/10 text-black", activePanel === "subdomain" && "bg-black/10")}
                                        >
                                            <IconWorldUpload size={18} />
                                        </Button>
                                        <Tooltip.Content><p>Publish</p></Tooltip.Content>
                                    </Tooltip>
                                </>
                            )}

                            {isAdmin && (
                                <Tooltip delay={0}>
                                    <Button
                                        isIconOnly size="sm" variant="ghost"
                                        isDisabled={isRestyling}
                                        onPress={() => setActivePanel(activePanel === "add-template" ? null : "add-template")}
                                        className={clsx("p-1 min-w-8 h-8 rounded-md hover:bg-black/10 text-black", activePanel === "add-template" && "bg-black/10")}
                                    >
                                        <IconPlus size={18} />
                                    </Button>
                                    <Tooltip.Content><p>Add Template</p></Tooltip.Content>
                                </Tooltip>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="top-0 left-0 absolute pointer-events-none w-full h-full bg-[url('/noise.png')] bg-repeat bg-size-[50px] opacity-50 z-0" />
        </motion.div>
    );
}
