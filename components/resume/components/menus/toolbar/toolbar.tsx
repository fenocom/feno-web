"use client";

import { AiIcon } from "@/components/common/ai-icon";
import { MorphSurface } from "@/components/ui/morph-surface";
import { useAuth } from "@/lib/auth/context";
import { Button, Separator } from "@heroui/react";
import {
    IconDeviceFloppy,
    IconDownload,
    IconPalette,
    IconSettings,
} from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState } from "react";
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
    const { user, isAdmin } = useAuth();
    const [activePanel, setActivePanel] = useState<ActivePanel>(null);
    const [isTemplatesExpanded, setIsTemplatesExpanded] = useState(false);

    const togglePanel = (panel: ActivePanel) => {
        if (activePanel === panel) {
            setActivePanel(null);
            setIsTemplatesExpanded(false);
        } else {
            setActivePanel(panel);
            // Reset expansion when switching to templates (or keeping it false)
            if (panel !== "templates") {
                setIsTemplatesExpanded(false);
            }
        }
    };

    const getDimensions = () => {
        if (activePanel === "templates") {
            return {
                width: "90vw",
                height: isTemplatesExpanded ? "90vh" : "340px",
            };
        }
        if (activePanel === "save") {
            return {
                width: 700,
                height: "auto",
            };
        }
        if (activePanel === "settings") {
            return {
                width: 320,
                height: "auto",
            };
        }
        return {
            width: "auto",
            height: "auto",
        };
    };

    const { width: expandedWidth, height: expandedHeight } = getDimensions();

    return (
        <MorphSurface
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
            isOpen={!!activePanel}
            onOpenChange={(open) => !open && setActivePanel(null)}
            collapsedWidth="auto"
            collapsedHeight={60}
            expandedWidth={expandedWidth}
            expandedHeight={expandedHeight}
            renderTrigger={() => (
                <div className="flex gap-2 items-center px-3 py-2 whitespace-nowrap h-full">
                    <AiIcon size={28} />
                    <Separator orientation="vertical" className="h-6" />

                    <div className="flex gap-1 items-center">
                        <Button
                            isIconOnly
                            size="sm"
                            variant="ghost"
                            onPress={(e) => {
                                // @ts-ignore
                                e.continuePropagation();
                                togglePanel("templates");
                            }}
                            className={`p-1 min-w-8 h-8 rounded-md hover:bg-black/10 ${
                                activePanel === "templates" ? "bg-black/10" : ""
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
                            onPress={(e) => {
                                // @ts-ignore
                                e.continuePropagation();
                                togglePanel("settings");
                            }}
                            className={`p-1 min-w-8 h-8 rounded-md hover:bg-black/10 ${
                                activePanel === "settings" ? "bg-black/10" : ""
                            } text-black`}
                        >
                            <IconSettings size={18} />
                        </Button>
                        {isAdmin && getEditorContent && (
                            <Button
                                isIconOnly
                                size="sm"
                                variant="ghost"
                                onPress={(e) => {
                                    // @ts-ignore
                                    e.continuePropagation();
                                    togglePanel("save");
                                }}
                                className={`p-1 min-w-8 h-8 rounded-md hover:bg-black/10 ${
                                    activePanel === "save" ? "bg-black/10" : ""
                                } text-black`}
                            >
                                <IconDeviceFloppy size={18} />
                            </Button>
                        )}
                    </div>

                    <Separator orientation="vertical" className="h-6" />
                    <PortfolioButton />
                </div>
            )}
            renderContent={({ onClose }) => (
                <div className="w-full h-full">
                    {activePanel === "save" && isAdmin && getEditorContent && (
                        <SaveTemplatePanel
                            onClose={onClose}
                            getEditorContent={getEditorContent}
                        />
                    )}
                    {activePanel === "templates" && (
                        <TemplatesPanel
                            onClose={onClose}
                            onSelect={(t) => console.log("Selected:", t)}
                            isExpanded={isTemplatesExpanded}
                            onToggleExpand={() =>
                                setIsTemplatesExpanded(!isTemplatesExpanded)
                            }
                        />
                    )}
                    {activePanel === "settings" && user && (
                        <SettingsPanel onClose={onClose} />
                    )}
                </div>
            )}
        />
    );
}
