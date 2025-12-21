"use client";

import { useAuth } from "@/lib/auth/context";
import type { JSONContent } from "@tiptap/core";
import { useEffect, useState } from "react";
import { Form } from "./form";
import { Header } from "./header";
import { PreviewCard } from "./preview-card";

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
    const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">("idle");

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
        <div className="p-6 overflow-hidden w-full h-full">
            <Header onClose={onClose} />
            <div className="flex flex-col md:flex-row gap-8">
                <PreviewCard
                    content={content}
                    name={name}
                    author={author}
                    avatarUrl={user?.user_metadata?.avatar_url}
                />
                <Form
                    name={name}
                    setName={setName}
                    author={author}
                    avatarUrl={user?.user_metadata?.avatar_url}
                    saveStatus={saveStatus}
                    onSave={handleSave}
                />
            </div>
        </div>
    );
}
