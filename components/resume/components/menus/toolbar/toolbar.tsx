"use client";

import { AiIcon } from "@/components/common/ai-icon";
import { useAuth } from "@/lib/auth/context";
import { Button, Separator } from "@heroui/react";
import {
    IconDeviceFloppy,
    IconDownload,
    IconPalette,
    IconSettings,
} from "@tabler/icons-react";
import clsx from "clsx";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { PortfolioButton } from "../../../components/portfolio-button";
import { SaveTemplatePanel } from "./save-template-panel";
import { SettingsPanel } from "./settings-panel";
import { TemplatesPanel } from "./templates-panel";

interface ToolbarProps {
    onExport?: () => void;
    getEditorContent?: () => unknown;
}

type ActivePanel = "templates" | "settings" | "save" | null;

export function Toolbar({ onExport, getEditorContent }: ToolbarProps) {
    const { isAdmin } = useAuth();
    const [activePanel, setActivePanel] = useState<ActivePanel>(null);
    const [isTemplatesExpanded, setIsTemplatesExpanded] = useState(false);
    const toolbarRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!activePanel) return;

        const handleClickOutside = (event: MouseEvent) => {
            if (
                toolbarRef.current &&
                !toolbarRef.current.contains(event.target as Node)
            ) {
                setActivePanel(null);
                setIsTemplatesExpanded(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, [activePanel]);

    const togglePanel = (panel: ActivePanel) => {
        if (activePanel === panel) {
            setActivePanel(null);
            setIsTemplatesExpanded(false);
        } else {
            setActivePanel(panel);
            if (panel !== "templates") {
                setIsTemplatesExpanded(false);
            }
        }
    };

    const getDimensions = () => {
        if (activePanel === "templates") {
            return {
                width: "90vw",
                height: isTemplatesExpanded ? "90vh" : "480px",
            };
        }
        if (activePanel === "save") {
            return { width: "700px", height: "552px" };
        }
        if (activePanel === "settings") {
            return { width: "500px", height: "124px" };
        }
        return { width: isAdmin ? "338px" : "302px", height: "52px" };
    };

    const { width, height } = getDimensions();

    return (
        <motion.div
            ref={toolbarRef}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 shadow-xl z-50 rounded-3xl border border-black/10 bg-white overflow-hidden flex flex-col"
            animate={{
                width,
                height,
            }}
            transition={{
                type: "spring",
                bounce: 0.15,
                duration: 0.5,
            }}
        >
            <div className="w-full relative flex-1 overflow-hidden">
                <div
                    className={clsx(
                        "w-full h-full transition-opacity duration-300",
                        activePanel === "save"
                            ? "relative z-10 opacity-100"
                            : "absolute inset-0 invisible opacity-0 pointer-events-none",
                    )}
                >
                    {isAdmin && getEditorContent && (
                        <SaveTemplatePanel
                            onClose={() => setActivePanel(null)}
                            getEditorContent={getEditorContent}
                        />
                    )}
                </div>
                <div
                    className={clsx(
                        "w-full h-full transition-opacity duration-300",
                        activePanel === "templates"
                            ? "relative z-10 opacity-100"
                            : "absolute inset-0 invisible opacity-0 pointer-events-none",
                    )}
                >
                    <TemplatesPanel
                        onClose={() => {
                            setActivePanel(null);
                            setIsTemplatesExpanded(false);
                        }}
                        onSelect={(t) => console.log("Selected:", t)}
                        isExpanded={isTemplatesExpanded}
                        onToggleExpand={() =>
                            setIsTemplatesExpanded(!isTemplatesExpanded)
                        }
                    />
                </div>
                <div
                    className={clsx(
                        "w-full h-full transition-opacity duration-300",
                        activePanel === "settings"
                            ? "relative z-10 opacity-100"
                            : "absolute inset-0 invisible opacity-0 pointer-events-none",
                    )}
                >
                    <SettingsPanel onClose={() => setActivePanel(null)} />
                </div>
            </div>
            <div
                className={clsx(
                    "relative z-10 text-black w-full",
                    activePanel && "border-t border-black/10",
                )}
            >
                <div className="flex justify-center w-full">
                    <div className="flex gap-2 items-center px-3 py-2 whitespace-nowrap">
                        <AiIcon size={28} />
                        <Separator orientation="vertical" className="h-6" />

                        <div className="flex gap-1 items-center">
                            <Button
                                isIconOnly
                                size="sm"
                                variant="ghost"
                                onPress={() => togglePanel("templates")}
                                className={`p-1 min-w-8 h-8 rounded-md hover:bg-black/10 ${
                                    activePanel === "templates"
                                        ? "bg-black/10"
                                        : ""
                                } text-black`}
                            >
                                <IconPalette size={18} />
                            </Button>
                            <Button
                                isIconOnly
                                size="sm"
                                variant="ghost"
                                onPress={onExport}
                                className="p-1 min-w-8 h-8 rounded-md text-black hover:bg-black/10"
                            >
                                <IconDownload size={18} />
                            </Button>
                            <Button
                                isIconOnly
                                size="sm"
                                variant="ghost"
                                onPress={() => togglePanel("settings")}
                                className={`p-1 min-w-8 h-8 rounded-md hover:bg-black/10 ${
                                    activePanel === "settings"
                                        ? "bg-black/10"
                                        : ""
                                } text-black`}
                            >
                                <IconSettings size={18} />
                            </Button>
                            {isAdmin && getEditorContent && (
                                <Button
                                    isIconOnly
                                    size="sm"
                                    variant="ghost"
                                    onPress={() => togglePanel("save")}
                                    className={`p-1 min-w-8 h-8 rounded-md hover:bg-black/10 ${
                                        activePanel === "save"
                                            ? "bg-black/10"
                                            : ""
                                    } text-black`}
                                >
                                    <IconDeviceFloppy size={18} />
                                </Button>
                            )}
                        </div>

                        <Separator orientation="vertical" className="h-6" />
                        <PortfolioButton />
                    </div>
                </div>
            </div>

            <div className="top-0 left-0 absolute pointer-events-none w-full h-full bg-[url('/noise.png')] bg-repeat bg-size-[50px] opacity-50 z-0" />
        </motion.div>
    );
}
