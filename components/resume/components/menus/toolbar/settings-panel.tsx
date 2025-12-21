"use client";

import { useAuth } from "@/lib/auth/context";
import { Avatar, Button, Separator } from "@heroui/react";
import { IconLogout, IconX } from "@tabler/icons-react";
import { motion } from "framer-motion";

interface SettingsPanelProps {
        onClose: () => void;
}

export function SettingsPanel({ onClose }: SettingsPanelProps) {
        const { user, isAdmin, signOut } = useAuth();

        if (!user) return null;

        const handleSignOut = async () => {
                await signOut();
                onClose();
        };

        const getUserInitials = () => {
                const name = user.user_metadata?.full_name || user.email || "";
                return (
                        name
                                .split(" ")
                                .map((n: string) => n[0])
                                .join("")
                                .toUpperCase()
                                .slice(0, 2) || "?"
                );
        };

        const getUserName = () => {
                return user.user_metadata?.full_name || user.email?.split("@")[0] || "";
        };

        return (
                <div className="overflow-hidden w-full border-b border-black/10">
                        <div className="px-4 py-4">
                                <div className="flex items-center justify-between gap-4">
                                        <div className="flex items-center gap-3">
                                                <Avatar>
                                                        <Avatar.Image
                                                                src={user.user_metadata?.avatar_url}
                                                                alt={getUserName()}
                                                        />
                                                        <Avatar.Fallback>{getUserInitials()}</Avatar.Fallback>
                                                </Avatar>
                                                <div className="flex flex-col">
                                                        <div className="flex items-center gap-2">
                                                                <span className="text-sm font-medium text-neutral-900">
                                                                        {getUserName()}
                                                                </span>
                                                                {isAdmin && (
                                                                        <span className="px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide bg-neutral-900 text-white rounded-full">
                                                                                Admin
                                                                        </span>
                                                                )}
                                                        </div>
                                                        <span className="text-xs text-neutral-500">
                                                                {user.email}
                                                        </span>
                                                </div>
                                        </div>

                                        <div className="flex items-center gap-2">
                                                <Button
                                                        size="sm"
                                                        variant="ghost"
                                                        onPress={handleSignOut}
                                                        className="h-8 px-3 rounded-lg text-red-600 hover:bg-red-50 font-medium flex items-center gap-1.5"
                                                >
                                                        <IconLogout size={16} />
                                                        Sign out
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
                </div>
        );
}
