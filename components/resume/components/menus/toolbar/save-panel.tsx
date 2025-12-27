"use client";

import type { UserResume } from "@/lib/hooks/use-resumes";
import { Button, Input, Separator, Spinner } from "@heroui/react";
import {
    IconCheck,
    IconCloudUpload,
    IconDeviceFloppy,
    IconDownload,
    IconFile,
    IconLoader2,
    IconPlus,
} from "@tabler/icons-react";
import { useState } from "react";

interface SavePanelProps {
    currentResume: UserResume | null;
    resumes: UserResume[];
    isSaving: boolean;
    hasUnsavedChanges: boolean;
    onSaveNow: () => void;
    onSaveNew: (name: string) => void;
    onExport: () => void;
    onClose: () => void;
}

export function SavePanel({
    currentResume,
    resumes,
    isSaving,
    hasUnsavedChanges,
    onSaveNow,
    onSaveNew,
    onExport,
    onClose,
}: SavePanelProps) {
    const [showNewForm, setShowNewForm] = useState(false);
    const [newName, setNewName] = useState("");

    const handleSaveNew = () => {
        if (!newName.trim()) return;
        onSaveNew(newName.trim());
        setNewName("");
        setShowNewForm(false);
        onClose();
    };

    if (!currentResume) {
        return (
            <div className="w-full h-full flex flex-col">
                <div className="flex items-center justify-between px-4 py-3 border-b border-black/5">
                    <div className="flex items-center gap-2">
                        <IconCloudUpload size={20} />
                        <span className="font-semibold text-sm">
                            Save Resume
                        </span>
                    </div>
                </div>
                <div className="flex-1 p-4">
                    {showNewForm ? (
                        <div className="space-y-3">
                            <Input
                                autoFocus
                                placeholder="Enter resume name..."
                                value={newName}
                                onChange={(e) => setNewName(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") handleSaveNew();
                                    if (e.key === "Escape")
                                        setShowNewForm(false);
                                }}
                                className="w-full"
                            />
                            <div className="flex gap-2">
                                <Button
                                    className="flex-1 bg-black text-white"
                                    onPress={handleSaveNew}
                                    isDisabled={!newName.trim()}
                                >
                                    Save
                                </Button>
                                <Button
                                    variant="secondary"
                                    onPress={() => setShowNewForm(false)}
                                >
                                    Cancel
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            <p className="text-sm text-black/60">
                                Save your resume to the cloud to access it from
                                anywhere.
                            </p>
                            <Button
                                className="w-full bg-black text-white flex items-center gap-2"
                                onPress={() => setShowNewForm(true)}
                            >
                                <IconCloudUpload size={18} />
                                Save to Cloud
                            </Button>
                        </div>
                    )}
                    <Separator className="my-3" />
                    <Button
                        variant="ghost"
                        className="w-full flex items-center gap-2"
                        onPress={onExport}
                    >
                        <IconDownload size={18} />
                        Download as PDF
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full h-full flex flex-col">
            <div className="flex items-center justify-between px-4 py-3 border-b border-black/5">
                <div className="flex items-center gap-2">
                    <IconDeviceFloppy size={20} />
                    <span className="font-semibold text-sm">Save</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                    {isSaving ? (
                        <>
                            <IconLoader2
                                size={14}
                                className="animate-spin text-black/40"
                            />
                            <span className="text-black/50">Saving...</span>
                        </>
                    ) : hasUnsavedChanges ? (
                        <>
                            <span className="w-2 h-2 rounded-full bg-orange-400" />
                            <span className="text-black/50">
                                Unsaved changes
                            </span>
                        </>
                    ) : (
                        <>
                            <IconCheck size={14} className="text-green-500" />
                            <span className="text-black/50">
                                All changes saved
                            </span>
                        </>
                    )}
                </div>
            </div>
            <div className="flex-1 p-4 space-y-3">
                <div className="flex items-center gap-3 p-3 bg-black/5 rounded-lg">
                    <IconFile size={20} className="text-black/50" />
                    <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm truncate">
                            {currentResume.name}
                        </div>
                        <div className="text-xs text-black/50">
                            Current resume
                        </div>
                    </div>
                </div>

                <Button
                    className="w-full bg-black text-white flex items-center gap-2"
                    onPress={onSaveNow}
                    isDisabled={isSaving || !hasUnsavedChanges}
                >
                    {isSaving ? (
                        <Spinner size="sm" />
                    ) : (
                        <IconDeviceFloppy size={18} />
                    )}
                    {isSaving ? "Saving..." : "Save Now"}
                </Button>

                {showNewForm ? (
                    <div className="space-y-2">
                        <Input
                            autoFocus
                            placeholder="New resume name..."
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") handleSaveNew();
                                if (e.key === "Escape") setShowNewForm(false);
                            }}
                            className="w-full"
                        />
                        <div className="flex gap-2">
                            <Button
                                variant="secondary"
                                className="flex-1"
                                onPress={handleSaveNew}
                                isDisabled={!newName.trim()}
                            >
                                Save as New
                            </Button>
                            <Button
                                variant="ghost"
                                onPress={() => setShowNewForm(false)}
                            >
                                Cancel
                            </Button>
                        </div>
                    </div>
                ) : (
                    <Button
                        variant="secondary"
                        className="w-full flex items-center gap-2"
                        onPress={() => setShowNewForm(true)}
                    >
                        <IconPlus size={18} />
                        Save as New Resume
                    </Button>
                )}

                <Separator className="my-3" />
                <Button
                    variant="ghost"
                    className="w-full flex items-center gap-2"
                    onPress={onExport}
                >
                    <IconDownload size={18} />
                    Download as PDF
                </Button>
            </div>
        </div>
    );
}