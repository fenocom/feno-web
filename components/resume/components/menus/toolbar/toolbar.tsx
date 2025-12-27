"use client";

import { AiIcon } from "@/components/common/ai-icon";
import { useAuth } from "@/lib/auth/context";
import type { UserResume } from "@/lib/hooks/use-resumes";
import { Button, Separator } from "@heroui/react";
import {
    IconDeviceFloppy,
    IconLayoutGrid,
    IconPalette,
    IconSettings,
    IconTargetArrow,
} from "@tabler/icons-react";
import type { Editor } from "@tiptap/core";
import clsx from "clsx";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { PortfolioButton } from "../../../components/portfolio-button";
import { AiAssistantPanel } from "./ai-assistant-panel";
import { AtsPanel } from "./ats-panel";
import { SavePanel } from "./save-panel";
import { SaveTemplatePanel } from "./save-template-panel";
import { SettingsPanel } from "./settings-panel";
import { TemplatesPanel } from "./templates-panel";
import type { Template } from "./templates-panel/template-card";

interface ToolbarProps {
    onExport?: () => void;
    getEditorContent?: () => unknown;
    getEditor?: () => Editor | null;
    onTemplateSelect?: (template: Template) => void;
    onAiGeneratingChange?: (isGenerating: boolean) => void;
    currentResume?: UserResume | null;
    resumes?: UserResume[];
    isSaving?: boolean;
    hasUnsavedChanges?: boolean;
    onSaveNow?: () => void;
    onSaveNew?: (name: string) => void;
    onSwitchResume?: (resume: UserResume) => void;
}

type ActivePanel =
    | "templates"
    | "settings"
    | "admin-save"
    | "ai"
    | "ats"
    | "save"
    | null;

export function Toolbar({
    onExport,
    getEditorContent,
    getEditor,
    onTemplateSelect,
    onAiGeneratingChange,
    currentResume,
    resumes = [],
    isSaving = false,
    hasUnsavedChanges = false,
    onSaveNow,
    onSaveNew,
    onSwitchResume,
}: ToolbarProps) {
    const { isAdmin, user } = useAuth();
    const [activePanel, setActivePanel] = useState<ActivePanel>(null);
    const [isTemplatesExpanded, setIsTemplatesExpanded] = useState(false);
    const [isAiGenerating, setIsAiGenerating] = useState(false);
    const toolbarRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!activePanel) return;

        const handleClickOutside = (event: MouseEvent) => {
            if (
                toolbarRef.current &&
                !toolbarRef.current.contains(event.target as Node)
            ) {
                if (!isAiGenerating) {
                    setActivePanel(null);
                    setIsTemplatesExpanded(false);
                }
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, [activePanel, isAiGenerating]);

    const handleAiGeneratingChange = (generating: boolean) => {
        setIsAiGenerating(generating);
        onAiGeneratingChange?.(generating);
    };

    const togglePanel = (panel: ActivePanel) => {
        if (isAiGenerating) return;

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
        if (activePanel === "admin-save") {
            return { width: "700px", height: "552px" };
        }
        if (activePanel === "settings") {
            return { width: "500px", height: "124px" };
        }
        if (activePanel === "ai") {
            return { width: "500px", height: "350px" };
        }
        if (activePanel === "ats") {
            return { width: "500px", height: "450px" };
        }
        if (activePanel === "save") {
            return {
                width: "380px",
                height: currentResume ? "380px" : "280px",
            };
        }
        const baseWidth = isAdmin ? 374 : 338;
        return { width: `${baseWidth}px`, height: "52px" };
    };

    const { width, height } = getDimensions();

    return (
        <motion.div
            ref={toolbarRef}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 shadow-xl z-50 rounded-3xl border border-black/10 bg-white overflow-hidden flex flex-col"
            animate={{ width, height }}
            transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
        >
            <div className="w-full relative flex-1 overflow-hidden">
                <div
                    className={clsx(
                        "w-full h-full transition-opacity duration-300",
                        activePanel === "admin-save"
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
                        onSelect={(t) => onTemplateSelect?.(t)}
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
                <div
                    className={clsx(
                        "w-full h-full transition-opacity duration-300",
                        activePanel === "ai"
                            ? "relative z-10 opacity-100"
                            : "absolute inset-0 invisible opacity-0 pointer-events-none",
                    )}
                >
                    <AiAssistantPanel
                        editor={getEditor?.() ?? null}
                        onGeneratingChange={handleAiGeneratingChange}
                    />
                </div>
                <div
                    className={clsx(
                        "w-full h-full transition-opacity duration-300",
                        activePanel === "ats"
                            ? "relative z-10 opacity-100"
                            : "absolute inset-0 invisible opacity-0 pointer-events-none",
                    )}
                >
                    <AtsPanel
                        editor={getEditor?.() ?? null}
                        onAnalyzingChange={handleAiGeneratingChange}
                    />
                </div>
                <div
                    className={clsx(
                        "w-full h-full transition-opacity duration-300",
                        activePanel === "save"
                            ? "relative z-10 opacity-100"
                            : "absolute inset-0 invisible opacity-0 pointer-events-none",
                    )}
                >
                    {user && (
                        <SavePanel
                            currentResume={currentResume ?? null}
                            resumes={resumes}
                            isSaving={isSaving}
                            hasUnsavedChanges={hasUnsavedChanges}
                            onSaveNow={() => onSaveNow?.()}
                            onSaveNew={(name) => onSaveNew?.(name)}
                            onSwitchResume={(resume) =>
                                onSwitchResume?.(resume)
                            }
                            onExport={() => onExport?.()}
                            onClose={() => setActivePanel(null)}
                        />
                    )}
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
                        <Button
                            isIconOnly
                            className={clsx(
                                "bg-transparent data-[hover=true]:bg-black/5 min-w-fit w-fit h-fit p-1 rounded-full",
                                activePanel === "ai" && "bg-black/5",
                            )}
                            onPress={() => togglePanel("ai")}
                            isDisabled={isAiGenerating && activePanel !== "ai"}
                        >
                            <AiIcon size={28} />
                        </Button>
                        <Button
                            isIconOnly
                            size="sm"
                            variant="ghost"
                            onPress={() => togglePanel("ats")}
                            isDisabled={isAiGenerating && activePanel !== "ats"}
                            className={clsx(
                                "p-1 min-w-8 h-8 rounded-md hover:bg-black/10 text-black",
                                activePanel === "ats" && "bg-black/10",
                            )}
                        >
                            <IconTargetArrow size={18} />
                        </Button>
                        <Separator orientation="vertical" className="h-6" />

                        <div className="flex gap-1 items-center">
                            <Button
                                isIconOnly
                                size="sm"
                                variant="ghost"
                                onPress={() => togglePanel("templates")}
                                isDisabled={isAiGenerating}
                                className={clsx(
                                    "p-1 min-w-8 h-8 rounded-md hover:bg-black/10 text-black",
                                    activePanel === "templates" &&
                                        "bg-black/10",
                                )}
                            >
                                <IconPalette size={18} />
                            </Button>
                            {user && (
                                <Button
                                    isIconOnly
                                    size="sm"
                                    variant="ghost"
                                    onPress={() => togglePanel("save")}
                                    isDisabled={isAiGenerating}
                                    className={clsx(
                                        "p-1 min-w-8 h-8 rounded-md hover:bg-black/10 text-black",
                                        activePanel === "save" && "bg-black/10",
                                    )}
                                >
                                    <IconDeviceFloppy size={18} />
                                </Button>
                            )}
                            <Button
                                isIconOnly
                                size="sm"
                                variant="ghost"
                                onPress={() => togglePanel("settings")}
                                isDisabled={isAiGenerating}
                                className={clsx(
                                    "p-1 min-w-8 h-8 rounded-md hover:bg-black/10 text-black",
                                    activePanel === "settings" && "bg-black/10",
                                )}
                            >
                                <IconSettings size={18} />
                            </Button>
                            {isAdmin && getEditorContent && (
                                <Button
                                    isIconOnly
                                    size="sm"
                                    variant="ghost"
                                    onPress={() => togglePanel("admin-save")}
                                    isDisabled={isAiGenerating}
                                    className={clsx(
                                        "p-1 min-w-8 h-8 rounded-md hover:bg-black/10 text-black",
                                        activePanel === "admin-save" &&
                                            "bg-black/10",
                                    )}
                                >
                                    <IconLayoutGrid size={18} />
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
