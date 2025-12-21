"use client";

import { useAuth } from "@/lib/auth/context";
import { Button, Input } from "@heroui/react";
import { IconCheck, IconDeviceFloppy, IconX } from "@tabler/icons-react";
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
                                <h3 className="text-lg font-semibold text-black">Save as Template</h3>
                                <Button
                                        isIconOnly
                                        variant="ghost"
                                        size="sm"
                                        onPress={onClose}
                                        className="rounded-full"
                                >
                                        <IconX size={18} />
                                </Button>
                        </div>

                        <div className="flex flex-col md:flex-row gap-8">
                                <div className="shrink-0">
                                        <TemplatePreview content={content} scale={0.35} />
                                </div>

                                <div className="flex-1 flex flex-col gap-5">
                                        <div className="space-y-4 flex-1">
                                                <div className="space-y-1.5">
                                                        <label className="text-xs font-semibold uppercase tracking-wider text-neutral-500 ml-1">
                                                                Template Name
                                                        </label>
                                                        <Input
                                                                placeholder="e.g., Professional Modern"
                                                                value={name}
                                                                onChange={(e) => setName(e.target.value)}
                                                                className="w-full bg-neutral-50 hover:bg-neutral-100 focus-within:bg-white border-none shadow-none rounded-xl px-4 py-3 text-sm"
                                                        />
                                                </div>

                                                <div className="space-y-1.5">
                                                        <label className="text-xs font-semibold uppercase tracking-wider text-neutral-500 ml-1">
                                                                Author
                                                        </label>
                                                        <Input
                                                                placeholder="e.g., Jane Doe"
                                                                value={author}
                                                                onChange={(e) => setAuthor(e.target.value)}
                                                                className="w-full bg-neutral-50 hover:bg-neutral-100 focus-within:bg-white border-none shadow-none rounded-xl px-4 py-3 text-sm"
                                                        />
                                                </div>
                                        </div>

                                        <div className="pt-4 mt-auto">
                                                <Button
                                                        size="lg"
                                                        className={`font-semibold rounded-xl w-full text-white ${saveStatus === "success" ? "bg-green-600" : "bg-black"}`}
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
