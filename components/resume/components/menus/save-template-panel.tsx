"use client";

import { useAuth } from "@/lib/auth/context";
import { Avatar, Button, Input, Tooltip } from "@heroui/react";
import { IconX } from "@tabler/icons-react";
import type { JSONContent } from "@tiptap/core";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { TemplatePreview } from "../template-preview";

interface SaveTemplatePanelProps {
        onClose: () => void;
        getEditorContent: () => unknown;
}

export function SaveTemplatePanel({
        onClose,
        getEditorContent,
}: SaveTemplatePanelProps) {
        const { user } = useAuth();
        const [name, setName] = useState("");
        const [author, setAuthor] = useState("");
        const [content, setContent] = useState<JSONContent | undefined>(undefined);
        const [isSaving, setIsSaving] = useState(false);
        const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">(
                "idle",
        );

        useEffect(() => {
                if (user?.user_metadata?.full_name) {
                        setAuthor(user.user_metadata.full_name);
                } else if (user?.email) {
                        setAuthor(user.email.split("@")[0]);
                }
        }, [user]);

        useEffect(() => {
                const c = getEditorContent();
                if (c) setContent(c as JSONContent);
        }, [getEditorContent]);

        const handleSave = async () => {
                if (!name.trim()) return;

                setIsSaving(true);
                setSaveStatus("idle");

                try {
                        const response = await fetch("/api/admin/templates", {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({
                                        name,
                                        author,
                                        category: "resume",
                                        resume_data: content,
                                }),
                        });

                        if (!response.ok) throw new Error("Failed to save template");

                        setSaveStatus("success");
                        setTimeout(() => {
                                onClose();
                                setSaveStatus("idle");
                        }, 1500);
                } catch (error) {
                        console.error("Error saving template:", error);
                        setSaveStatus("error");
                } finally {
                        setIsSaving(false);
                }
        };

        return (
                <motion.div
                        initial={{ opacity: 0, width: 320 }}
                        animate={{ opacity: 1, width: 700 }}
                        exit={{ opacity: 0, width: 320 }}
                        transition={{ duration: 0.4, type: "spring", bounce: 0.2 }}
                        className="p-6 overflow-hidden"
                >
                        <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-semibold text-black">
                                        Save as Template
                                </h3>
                                <Button
                                        isIconOnly
                                        size="sm"
                                        onPress={onClose}
                                        className="min-w-8 w-8 h-8 text-neutral-500 hover:text-black rounded-full"
                                >
                                        <IconX size={18} />
                                </Button>
                        </div>

                        <div className="flex flex-col md:flex-row gap-8">
                                <div className="shrink-0">
                                        <div className="relative rounded-xl overflow-hidden shadow-lg border border-neutral-200 bg-neutral-100 group">
                                                <TemplatePreview content={content} scale={0.35} />

                                                <div className="absolute bottom-0 left-0 right-0 z-20 h-40 flex flex-col justify-end p-4 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-100 transition-opacity">
                                                        <div className="flex items-end justify-between">
                                                                <div>
                                                                        <p className="text-white font-semibold text-sm shadow-black/50 drop-shadow-sm">
                                                                                {name || "Untitled Template"}
                                                                        </p>
                                                                        <p className="text-white/70 text-xs">
                                                                                Resume
                                                                        </p>
                                                                </div>
                                                                <Tooltip>
                                                                        <Tooltip.Trigger>
                                                                                <div className="cursor-pointer ring-2 ring-white/20 rounded-full">
                                                                                        <Avatar size="sm">
                                                                                                <Avatar.Image
                                                                                                        src={user?.user_metadata?.avatar_url}
                                                                                                        alt={author}
                                                                                                />
                                                                                                <Avatar.Fallback>
                                                                                                        {author.slice(0, 2).toUpperCase()}
                                                                                                </Avatar.Fallback>
                                                                                        </Avatar>
                                                                                </div>
                                                                        </Tooltip.Trigger>
                                                                        <Tooltip.Content>
                                                                                <div className="px-1 py-2 min-w-40">
                                                                                        <div className="flex items-center gap-2">
                                                                                                <Avatar size="sm">
                                                                                                        <Avatar.Image
                                                                                                                src={user?.user_metadata?.avatar_url}
                                                                                                                alt={author}
                                                                                                        />
                                                                                                        <Avatar.Fallback>
                                                                                                                {author.slice(0, 2).toUpperCase()}
                                                                                                        </Avatar.Fallback>
                                                                                                </Avatar>
                                                                                                <div>
                                                                                                        <div className="text-small font-bold">
                                                                                                                {author}
                                                                                                        </div>
                                                                                                        <div className="text-tiny text-neutral-500">
                                                                                                                Creator
                                                                                                        </div>
                                                                                                </div>
                                                                                        </div>
                                                                                </div>
                                                                        </Tooltip.Content>
                                                                </Tooltip>
                                                        </div>
                                                </div>
                                        </div>
                                </div>

                                <div className="flex-1 flex flex-col gap-5">
                                        <div className="space-y-4 flex-1">
                                                <div className="space-y-1.5">
                                                        <span className="block text-xs font-semibold uppercase tracking-wider text-neutral-500 ml-1">
                                                                Template Name
                                                        </span>
                                                        <Input
                                                                aria-label="Template Name"
                                                                placeholder="e.g., Professional Modern"
                                                                value={name}
                                                                onChange={(e) => setName(e.target.value)}
                                                                className="w-full bg-neutral-50 hover:bg-neutral-100 focus-within:bg-white border-none shadow-none rounded-xl px-4 py-3 text-sm"
                                                        />
                                                </div>

                                                <div className="space-y-1.5">
                                                        <span className="block text-xs font-semibold uppercase tracking-wider text-neutral-500 ml-1">
                                                                Author
                                                        </span>
                                                        <div className="flex items-center gap-3 p-3 bg-neutral-50 rounded-xl border border-neutral-100/50">
                                                                <Avatar size="sm">
                                                                        <Avatar.Image src={user?.user_metadata?.avatar_url} alt={author} />
                                                                        <Avatar.Fallback>{author.slice(0, 2).toUpperCase()}</Avatar.Fallback>
                                                                </Avatar>
                                                                <div className="flex flex-col">
                                                                        <span className="text-sm font-medium text-neutral-900">
                                                                                {author || "Unknown"}
                                                                        </span>
                                                                        <span className="text-xs text-neutral-500">
                                                                                Template Creator
                                                                        </span>
                                                                </div>
                                                        </div>
                                                </div>
                                        </div>

                                        <div className="pt-4 mt-auto">
                                                <Button
                                                        size="lg"
                                                        className={`font-semibold rounded-xl text-white ${saveStatus === "success" ? "bg-green-600" : "bg-black"}`}
                                                        onPress={handleSave}
                                                >
                                                        {saveStatus === "success"
                                                                ? "Saved Successfully"
                                                                : "Save Template"}
                                                </Button>
                                        </div>
                                </div>
                        </div>
                </motion.div>
        );
}
