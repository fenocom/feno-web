"use client";

import { Button } from "@heroui/react";
import { IconDeviceFloppy } from "@tabler/icons-react";
import { useCallback, useState } from "react";

interface SaveTemplateButtonProps {
    getEditorContent: () => unknown;
}

export function SaveTemplateButton({
    getEditorContent,
}: SaveTemplateButtonProps) {
    const [isSaving, setIsSaving] = useState(false);
    const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">(
        "idle",
    );

    const handleSave = useCallback(async () => {
        setIsSaving(true);
        setSaveStatus("idle");

        try {
            const content = getEditorContent();

            const response = await fetch("/api/admin/templates", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ resume_data: content }),
            });

            if (!response.ok) throw new Error("Failed to save template");

            setSaveStatus("success");
            setTimeout(() => setSaveStatus("idle"), 2000);
        } catch (error) {
            console.error("Error saving template:", error);
            setSaveStatus("error");
            setTimeout(() => setSaveStatus("idle"), 2000);
        } finally {
            setIsSaving(false);
        }
    }, [getEditorContent]);

    const statusColor =
        saveStatus === "success"
            ? "text-green-600"
            : saveStatus === "error"
              ? "text-red-600"
              : "text-black";

    const title =
        saveStatus === "success"
            ? "Template saved!"
            : saveStatus === "error"
              ? "Failed to save"
              : "Save as template";

    return (
        <span title={title}>
            <Button
                isIconOnly
                size="sm"
                variant="ghost"
                isDisabled={isSaving}
                onPress={handleSave}
                className={`p-1 min-w-8 h-8 rounded-md hover:bg-black/10 ${statusColor}`}
            >
                {isSaving ? (
                    <span className="animate-spin">
                        <IconDeviceFloppy size={18} />
                    </span>
                ) : (
                    <IconDeviceFloppy size={18} />
                )}
            </Button>
        </span>
    );
}
