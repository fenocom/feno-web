"use client";

import type { UserResume } from "@/lib/hooks/use-resumes";
import { Button, Input, Spinner } from "@heroui/react";
import {
    IconChevronRight,
    IconFile,
    IconPlus,
    IconTrash,
} from "@tabler/icons-react";
import { useState } from "react";

interface ResumeSelectorProps {
    resumes: UserResume[];
    isLoading: boolean;
    onSelect: (resume: UserResume) => void;
    onCreateNew: (name: string) => void;
    onDelete: (resumeId: string) => void;
}

export function ResumeSelector({
    resumes,
    isLoading,
    onSelect,
    onCreateNew,
    onDelete,
}: ResumeSelectorProps) {
    const [isCreating, setIsCreating] = useState(false);
    const [newResumeName, setNewResumeName] = useState("");
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const handleCreate = () => {
        if (!newResumeName.trim()) return;
        onCreateNew(newResumeName.trim());
        setNewResumeName("");
        setIsCreating(false);
    };

    const handleDelete = async (resumeId: string) => {
        setDeletingId(resumeId);
        await onDelete(resumeId);
        setDeletingId(null);
    };

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    };

    if (isLoading) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
                <div className="flex flex-col items-center gap-4">
                    <Spinner size="lg" />
                    <span className="text-black/60">
                        Loading your resumes...
                    </span>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
            <div className="w-full max-w-md mx-4">
                <div className="bg-white rounded-2xl shadow-xl border border-black/10 overflow-hidden">
                    <div className="px-4 py-3 border-b border-black/5">
                        <div className="flex items-center gap-2">
                            <IconFile size={20} />
                            <span className="font-semibold text-sm">
                                Your Resumes
                            </span>
                        </div>
                    </div>

                    <div className="max-h-80 overflow-y-auto p-4">
                        {resumes.length === 0 ? (
                            <div className="py-8 text-center">
                                <IconFile
                                    size={48}
                                    className="mx-auto text-black/20 mb-4"
                                    stroke={1.5}
                                />
                                <p className="text-sm text-black/60">
                                    No resumes yet. Create your first one!
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-1">
                                {resumes.map((resume) => (
                                    <div
                                        key={resume.id}
                                        className="flex items-center gap-2 group"
                                    >
                                        <button
                                            type="button"
                                            onClick={() => onSelect(resume)}
                                            className="flex-1 flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-black/5 transition-colors text-left"
                                        >
                                            <IconFile
                                                size={18}
                                                className="text-black/40 shrink-0"
                                            />
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-medium text-sm text-black truncate">
                                                        {resume.name}
                                                    </span>
                                                    {resume.is_default && (
                                                        <span className="text-xs px-1.5 py-0.5 bg-blue-100 text-blue-700 rounded">
                                                            Default
                                                        </span>
                                                    )}
                                                </div>
                                                <span className="text-xs text-black/50">
                                                    {formatDate(
                                                        resume.updated_at,
                                                    )}
                                                </span>
                                            </div>
                                            <IconChevronRight
                                                size={16}
                                                className="text-black/30 shrink-0"
                                            />
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleDelete(resume.id)
                                            }
                                            disabled={deletingId === resume.id}
                                            className="p-2 text-black/30 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100 shrink-0"
                                        >
                                            {deletingId === resume.id ? (
                                                <Spinner size="sm" />
                                            ) : (
                                                <IconTrash size={16} />
                                            )}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="p-4 border-t border-black/5">
                        {isCreating ? (
                            <div className="space-y-2">
                                <Input
                                    autoFocus
                                    placeholder="Resume name..."
                                    value={newResumeName}
                                    onChange={(e) =>
                                        setNewResumeName(e.target.value)
                                    }
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") handleCreate();
                                        if (e.key === "Escape") {
                                            setIsCreating(false);
                                            setNewResumeName("");
                                        }
                                    }}
                                    className="w-full"
                                />
                                <div className="flex gap-2">
                                    <Button
                                        className="flex-1 bg-black text-white"
                                        onPress={handleCreate}
                                        isDisabled={!newResumeName.trim()}
                                    >
                                        Create
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        onPress={() => {
                                            setIsCreating(false);
                                            setNewResumeName("");
                                        }}
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <Button
                                className="w-full bg-black text-white flex items-center gap-2"
                                onPress={() => setIsCreating(true)}
                            >
                                <IconPlus size={18} />
                                Create New Resume
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
