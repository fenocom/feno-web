"use client";

import { AiIcon } from "@/components/common/ai-icon";
import { PortfolioButton } from "@/components/resume/components/portfolio-button";
import { useAuth } from "@/lib/auth/context";
import { Button, Tooltip } from "@heroui/react";
import {
    IconCode,
    IconDeviceFloppy,
    IconLayoutDashboard,
    IconPlus,
    IconRefresh,
    IconWorldUpload,
} from "@tabler/icons-react";
import clsx from "clsx";
import { motion } from "framer-motion";
import NextLink from "next/link";
import { useEffect, useRef, useState } from "react";
import { AddTemplatePanel } from "./add-template-panel";

interface PortfolioToolbarProps {
    isDisabled?: boolean;
}

type ActivePanel = "add-template" | null;

export function PortfolioToolbar({
    isDisabled = false,
}: PortfolioToolbarProps) {
    const { user, isAdmin } = useAuth();
    const [activePanel, setActivePanel] = useState<ActivePanel>(null);
    const toolbarRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!activePanel) return;

        const handleClickOutside = (event: MouseEvent) => {
            if (
                toolbarRef.current &&
                !toolbarRef.current.contains(event.target as Node)
            ) {
                setActivePanel(null);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, [activePanel]);

    const getDimensions = () => {
        if (activePanel === "add-template") {
            return { width: "400px", height: "500px" };
        }
        return { width: "auto", height: "52px" };
    };

    const { width, height } = getDimensions();

    return (
        <motion.div
            ref={toolbarRef}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 shadow-xl z-50 rounded-3xl border border-black/10 bg-white overflow-hidden flex flex-col pointer-events-auto"
            initial={{ width: "auto", height: "52px" }}
            animate={{ width, height }}
            transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
        >
            <div className="w-full relative flex-1 overflow-hidden">
                <div
                    className={clsx(
                        "w-full h-full transition-opacity duration-300",
                        activePanel === "add-template"
                            ? "relative z-10 opacity-100"
                            : "absolute inset-0 invisible opacity-0 pointer-events-none",
                    )}
                >
                    {activePanel === "add-template" && (
                        <AddTemplatePanel
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
                        <Tooltip delay={0}>
                            <Button
                                isIconOnly
                                className={clsx(
                                    "bg-transparent data-[hover=true]:bg-black/5 min-w-fit w-fit h-fit p-1 rounded-full",
                                )}
                                isDisabled={isDisabled || !!activePanel}
                            >
                                <AiIcon size={28} />
                            </Button>
                            <Tooltip.Content>
                                <p>AI Assistant</p>
                            </Tooltip.Content>
                        </Tooltip>

                        <Tooltip delay={0}>
                            <NextLink href="/control-center">
                                <Button
                                    isIconOnly
                                    size="sm"
                                    variant="ghost"
                                    isDisabled={isDisabled || !!activePanel}
                                    className="p-1 min-w-8 h-8 rounded-md hover:bg-black/10 text-black"
                                >
                                    <IconLayoutDashboard size={18} />
                                </Button>
                            </NextLink>
                            <Tooltip.Content>
                                <p>Control Center</p>
                            </Tooltip.Content>
                        </Tooltip>

                        <div className="w-px h-6 bg-black/10 mx-1" />

                        <div className="flex gap-1 items-center">
                            <Tooltip delay={0}>
                                <Button
                                    isIconOnly
                                    size="sm"
                                    variant="ghost"
                                    isDisabled={isDisabled || !!activePanel}
                                    className="p-1 min-w-8 h-8 rounded-md hover:bg-black/10 text-black"
                                >
                                    <IconRefresh size={18} />
                                </Button>
                                <Tooltip.Content>
                                    <p>Regenerate</p>
                                </Tooltip.Content>
                            </Tooltip>

                            <Tooltip delay={0}>
                                <Button
                                    isIconOnly
                                    size="sm"
                                    variant="ghost"
                                    isDisabled={isDisabled || !!activePanel}
                                    className="p-1 min-w-8 h-8 rounded-md hover:bg-black/10 text-black"
                                >
                                    <IconCode size={18} />
                                </Button>
                                <Tooltip.Content>
                                    <p>Edit Code</p>
                                </Tooltip.Content>
                            </Tooltip>

                            {user && (
                                <>
                                    <Tooltip delay={0}>
                                        <Button
                                            isIconOnly
                                            size="sm"
                                            variant="ghost"
                                            isDisabled={
                                                isDisabled || !!activePanel
                                            }
                                            className="p-1 min-w-8 h-8 rounded-md hover:bg-black/10 text-black"
                                        >
                                            <IconDeviceFloppy size={18} />
                                        </Button>
                                        <Tooltip.Content>
                                            <p>Save</p>
                                        </Tooltip.Content>
                                    </Tooltip>

                                    <Tooltip delay={0}>
                                        <Button
                                            isIconOnly
                                            size="sm"
                                            variant="ghost"
                                            isDisabled={
                                                isDisabled || !!activePanel
                                            }
                                            className="p-1 min-w-8 h-8 rounded-md hover:bg-black/10 text-black"
                                        >
                                            <IconWorldUpload size={18} />
                                        </Button>
                                        <Tooltip.Content>
                                            <p>Publish</p>
                                        </Tooltip.Content>
                                    </Tooltip>
                                </>
                            )}

                            {isAdmin && (
                                <Tooltip delay={0}>
                                    <Button
                                        isIconOnly
                                        size="sm"
                                        variant="ghost"
                                        onPress={() =>
                                            setActivePanel("add-template")
                                        }
                                        isDisabled={isDisabled}
                                        className={clsx(
                                            "p-1 min-w-8 h-8 rounded-md hover:bg-black/10 text-black",
                                            activePanel === "add-template" &&
                                                "bg-black/10",
                                        )}
                                    >
                                        <IconPlus size={18} />
                                    </Button>
                                    <Tooltip.Content>
                                        <p>Add Template</p>
                                    </Tooltip.Content>
                                </Tooltip>
                            )}
                        </div>

                        <div className="w-px h-6 bg-black/10 mx-1" />
                        <PortfolioButton />
                    </div>
                </div>
            </div>

            <div className="top-0 left-0 absolute pointer-events-none w-full h-full bg-[url('/noise.png')] bg-repeat bg-size-[50px] opacity-50 z-0" />
        </motion.div>
    );
}
