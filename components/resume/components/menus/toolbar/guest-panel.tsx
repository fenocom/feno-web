"use client";

import { Button } from "@heroui/react";
import { IconLogin, IconX } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

interface GuestPanelProps {
        onClose: () => void;
}

export function GuestPanel({ onClose }: GuestPanelProps) {
        const router = useRouter();

        return (
                <div className="overflow-hidden w-full h-full flex items-center px-6">
                        <div className="flex items-center justify-between w-full">
                                <div className="flex flex-col">
                                        <span className="font-bold text-neutral-900 text-base">You are not Logged in</span>
                                        <span className="text-sm text-neutral-500">
                                                Login in to save and manage your resumes
                                        </span>
                                </div>
                                <div className="flex items-center gap-2">
                                        <Button
                                                size="sm"
                                                className="h-9 px-4 rounded-xl bg-black text-white font-medium flex items-center gap-2"
                                                onPress={() => {
                                                        router.push("/login");
                                                        onClose();
                                                }}
                                        >
                                                <IconLogin size={18} />
                                                Login
                                        </Button>
                                        <Button
                                                isIconOnly
                                                size="sm"
                                                variant="ghost"
                                                onPress={onClose}
                                                className="p-1 min-w-8 h-8 rounded-full text-black hover:bg-black/10"
                                        >
                                                <IconX size={18} />
                                        </Button>
                                </div>
                        </div>
                </div>
        );
}
