"use client";

import { AiIcon } from "@/components/common/ai-icon";
import { useAuth } from "@/lib/auth/context";
import { Button, Separator } from "@heroui/react";
import {
        IconDeviceFloppy,
        IconDownload,
        IconLayoutDashboard,
        IconPalette,
        IconSettings,
} from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { PortfolioButton } from "../../../components/portfolio-button";
import { SaveTemplatePanel } from "./save-template-panel";
import { SettingsPanel } from "./settings-panel";
import { TemplatesPanel } from "./templates-panel";

interface ToolbarProps {
        onExport?: () => void;
        getEditorContent?: () => unknown;
}

export default function Toolbar({ onExport, getEditorContent }: ToolbarProps) {
        const { user, isAdmin } = useAuth();
        const [isSettingsOpen, setIsSettingsOpen] = useState(false);
        const [isSaveMode, setIsSaveMode] = useState(false);
        const [isTemplatesOpen, setIsTemplatesOpen] = useState(false);
        const toolbarRef = useRef<HTMLDivElement>(null);

        useEffect(() => {
                if (!isSettingsOpen && !isSaveMode && !isTemplatesOpen) return;

                const handleClickOutside = (event: MouseEvent) => {
                        if (
                                toolbarRef.current &&
                                !toolbarRef.current.contains(event.target as Node)
                        ) {
                                setIsSettingsOpen(false);
                                setIsSaveMode(false);
                                setIsTemplatesOpen(false);
                        }
                };

                document.addEventListener("mousedown", handleClickOutside);
                return () =>
                        document.removeEventListener("mousedown", handleClickOutside);
        }, [isSettingsOpen, isSaveMode, isTemplatesOpen]);

        return (
                <motion.div
                        ref={toolbarRef}
                        layout
                        initial={{ y: 40, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{
                                layout: { type: "spring", bounce: 0.2, duration: 0.4 },
                                opacity: { duration: 0.2 },
                        }}
                        className="fixed bottom-6 left-1/2 -translate-x-1/2 shadow-xl z-999 rounded-4xl bg-white overflow-hidden"
                        style={{ transformOrigin: "bottom center" }}
                >
                        <div className="relative z-10 text-black">
                                <motion.div
                                        layout
                                        className="border border-black/10 rounded-4xl bg-white"
                                >
                                        <AnimatePresence initial={false}>
                                                <motion.div
                                                        key="default-toolbar"
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        exit={{ opacity: 0 }}
                                                        transition={{ duration: 0.2 }}
                                                >
                                                        <AnimatePresence>

                                                                {isSaveMode && isAdmin && getEditorContent && (
                                                                        <SaveTemplatePanel
                                                                                key="save-panel"
                                                                                onClose={() => setIsSaveMode(false)}
                                                                                getEditorContent={getEditorContent}
                                                                        />
                                                                )}
                                                                {isTemplatesOpen && (
                                                                        <TemplatesPanel
                                                                                key="templates-panel"
                                                                                onClose={() => setIsTemplatesOpen(false)}
                                                                                onSelect={(t) => console.log("Selected:", t)}
                                                                        />
                                                                )}
                                                                {isSettingsOpen && user && (
                                                                        <SettingsPanel
                                                                                onClose={() =>
                                                                                        setIsSettingsOpen(false)
                                                                                }
                                                                        />
                                                                )}
                                                        </AnimatePresence>

                                                        <div className="flex gap-2 items-center px-3 py-2">
                                                                <AiIcon size={28} />
                                                                <Separator
                                                                        orientation="vertical"
                                                                        className="h-6"
                                                                />

                                                                <div className="flex gap-1 items-center">
                                                                        <Button
                                                                                isIconOnly
                                                                                size="sm"
                                                                                variant="ghost"
                                                                                onPress={() =>
                                                                                        setIsTemplatesOpen(true)
                                                                                }
                                                                                className="p-1 min-w-8 h-8 rounded-md text-black hover:bg-black/10"
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
                                                                                onPress={() =>
                                                                                        setIsSettingsOpen(
                                                                                                !isSettingsOpen,
                                                                                        )
                                                                                }
                                                                                className={`p-1 min-w-8 h-8 rounded-md hover:bg-black/10 ${isSettingsOpen
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
                                                                                        onPress={() =>
                                                                                                setIsSaveMode(true)
                                                                                        }
                                                                                        className="p-1 min-w-8 h-8 rounded-md text-black hover:bg-black/10"
                                                                                >
                                                                                        <IconDeviceFloppy size={18} />
                                                                                </Button>
                                                                        )}
                                                                </div>

                                                                <Separator
                                                                        orientation="vertical"
                                                                        className="h-6"
                                                                />
                                                                <PortfolioButton />
                                                        </div>
                                                </motion.div>
                                        </AnimatePresence>
                                </motion.div>
                        </div>

                        <div className="top-0 left-0 absolute pointer-events-none w-full h-full bg-[url('/noise.png')] bg-repeat bg-size-[50px] opacity-50" />
                </motion.div>
        );
}
