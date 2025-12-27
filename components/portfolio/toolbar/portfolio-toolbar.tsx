"use client";

import { AiIcon } from "@/components/common/ai-icon";
import { useAuth } from "@/lib/auth/context";
import { Button, Tooltip } from "@heroui/react";
import {
    IconCode,
    IconDeviceFloppy,
    IconLayoutDashboard,
    IconRefresh,
    IconWorldUpload,
} from "@tabler/icons-react";
import clsx from "clsx";
import { motion } from "framer-motion";
import NextLink from "next/link";
import { PortfolioButton } from "@/components/portfolio-button";

interface PortfolioToolbarProps {
    isDisabled?: boolean;
}

export function PortfolioToolbar({ isDisabled = false }: PortfolioToolbarProps) {
    const { user } = useAuth();

    return (
        <motion.div
            className="fixed bottom-6 left-1/2 -translate-x-1/2 shadow-xl z-50 rounded-3xl border border-black/10 bg-white overflow-hidden flex flex-col pointer-events-auto"
            initial={{ width: "auto", height: "52px" }}
            animate={{ height: "52px" }}
        >
            <div className="relative z-10 text-black w-full">
                <div className="flex justify-center w-full">
                    <div className="flex gap-2 items-center px-3 py-2 whitespace-nowrap">
                        <Tooltip delay={0}>
                            <Button
                                isIconOnly
                                className={clsx(
                                    "bg-transparent data-[hover=true]:bg-black/5 min-w-fit w-fit h-fit p-1 rounded-full",
                                )}
                                isDisabled={isDisabled}
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
                                    isDisabled={isDisabled}
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
                                    isDisabled={isDisabled}
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
                                    isDisabled={isDisabled}
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
                                            isDisabled={isDisabled}
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
                                            isDisabled={isDisabled}
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
