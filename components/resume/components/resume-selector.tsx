"use client";

import type { UserResume } from "@/lib/hooks/use-resumes";
import { Button, Input, Spinner } from "@heroui/react";
import { IconFile, IconPlus, IconTrash } from "@tabler/icons-react";
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

    const handleDelete = async (e: React.MouseEvent, resumeId: string) => {
        e.stopPropagation();
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
            <div className="w-full max-w-xl p-8">
                <div className="bg-white rounded-2xl shadow-xl border border-black/10 overflow-hidden">
                    <div className="p-6 border-b border-black/5">
                        <h2 className="text-xl font-semibold text-black">
                            Your Resumes
                        </h2>
                        <p className="text-sm text-black/60 mt-1">
                            Select a resume to continue editing or create a new
                            one
                        </p>
                    </div>

                    <div className="max-h-80 overflow-y-auto">
                        {resumes.length === 0 ? (
                            <div className="p-8 text-center">
                                <IconFile
                                    size={48}
                                    className="mx-auto text-black/20 mb-4"
                                    stroke={1.5}
                                />
                                <p className="text-black/60">
                                    No resumes yet. Create your first one!
                                </p>
                            </div>
                        ) : (
                            <div className="divide-y divide-black/5">
                                {resumes.map((resume) => (
                                    <button
                                        key={resume.id}
                                        type="button"
                                        onClick={() => onSelect(resume)}
                                        className="w-full px-6 py-4 flex items-center justify-between hover:bg-black/5 transition-colors text-left group"
                                    >
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2">
                                                <span className="font-medium text-black truncate">
                                                    {resume.name}
                                                </span>
                                                {resume.is_default && (
                                                    <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-700 rounded">
                                                        Default
                                                    </span>
                                                )}
                                            </div>
                                            <span className="text-xs text-black/50">
                                                Last edited{" "}
                                                {formatDate(resume.updated_at)}
                                            </span>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={(e) =>
                                                handleDelete(e, resume.id)
                                            }
                                            disabled={deletingId === resume.id}
                                            className="p-2 text-black/30 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                                        >
                                            {deletingId === resume.id ? (
                                                <Spinner size="sm" />
                                            ) : (
                                                <IconTrash size={18} />
                                            )}
                                        </button>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="p-4 border-t border-black/5 bg-black/[0.02]">
                        {isCreating ? (
                            <div className="flex gap-2">
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
                                    className="flex-1"
                                />
                                <Button
                                    size="sm"
                                    className="bg-black text-white"
                                    onPress={handleCreate}
                                    isDisabled={!newResumeName.trim()}
                                >
                                    Create
                                </Button>
                                <Button
                                    size="sm"
                                    variant="ghost"
                                    onPress={() => {
                                        setIsCreating(false);
                                        setNewResumeName("");
                                    }}
                                >
                                    Cancel
                                </Button>
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
