"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export interface UserResume {
    id: string;
    user_id: string;
    name: string;
    resume_data: Record<string, unknown>;
    is_default: boolean;
    created_at: string;
    updated_at: string;
}

interface UseResumesOptions {
    autoSaveDelay?: number;
}

export function useResumes(options: UseResumesOptions = {}) {
    const { autoSaveDelay = 2000 } = options;

    const [resumes, setResumes] = useState<UserResume[]>([]);
    const [currentResume, setCurrentResume] = useState<UserResume | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

    const autoSaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const pendingDataRef = useRef<Record<string, unknown> | null>(null);

    const fetchResumes = useCallback(async () => {
        try {
            const response = await fetch("/api/resumes");
            if (!response.ok) {
                if (response.status === 401) {
                    setResumes([]);
                    setIsLoading(false);
                    return;
                }
                throw new Error("Failed to fetch resumes");
            }
            const data = await response.json();
            setResumes(data.resumes || []);
        } catch (err) {
            setError(
                err instanceof Error ? err.message : "Failed to fetch resumes",
            );
        } finally {
            setIsLoading(false);
        }
    }, []);

    const fetchDefaultResume = useCallback(async () => {
        try {
            const response = await fetch("/api/resumes?default=true");
            if (!response.ok) {
                if (response.status === 401) {
                    return null;
                }
                throw new Error("Failed to fetch default resume");
            }
            const data = await response.json();
            return data.resume as UserResume | null;
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Failed to fetch default resume",
            );
            return null;
        }
    }, []);

    const createResume = useCallback(
        async (
            name: string,
            resumeData: Record<string, unknown>,
            isDefault = false,
        ) => {
            try {
                setIsSaving(true);
                const response = await fetch("/api/resumes", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ name, resumeData, isDefault }),
                });

                if (!response.ok) {
                    throw new Error("Failed to create resume");
                }

                const data = await response.json();
                const newResume = data.resume as UserResume;

                setResumes((prev) => [newResume, ...prev]);
                setCurrentResume(newResume);
                setHasUnsavedChanges(false);

                return newResume;
            } catch (err) {
                setError(
                    err instanceof Error
                        ? err.message
                        : "Failed to create resume",
                );
                return null;
            } finally {
                setIsSaving(false);
            }
        },
        [],
    );

    const updateResume = useCallback(
        async (
            resumeId: string,
            updates: {
                name?: string;
                resumeData?: Record<string, unknown>;
                isDefault?: boolean;
            },
        ) => {
            try {
                setIsSaving(true);
                const response = await fetch(`/api/resumes/${resumeId}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(updates),
                });

                if (!response.ok) {
                    throw new Error("Failed to update resume");
                }

                const data = await response.json();
                const updatedResume = data.resume as UserResume;

                setResumes((prev) =>
                    prev.map((r) => (r.id === resumeId ? updatedResume : r)),
                );

                if (currentResume?.id === resumeId) {
                    setCurrentResume(updatedResume);
                }

                setHasUnsavedChanges(false);
                return updatedResume;
            } catch (err) {
                setError(
                    err instanceof Error
                        ? err.message
                        : "Failed to update resume",
                );
                return null;
            } finally {
                setIsSaving(false);
            }
        },
        [currentResume],
    );

    const deleteResume = useCallback(
        async (resumeId: string) => {
            try {
                const response = await fetch(`/api/resumes/${resumeId}`, {
                    method: "DELETE",
                });

                if (!response.ok) {
                    throw new Error("Failed to delete resume");
                }

                setResumes((prev) => prev.filter((r) => r.id !== resumeId));

                if (currentResume?.id === resumeId) {
                    setCurrentResume(null);
                }

                return true;
            } catch (err) {
                setError(
                    err instanceof Error
                        ? err.message
                        : "Failed to delete resume",
                );
                return false;
            }
        },
        [currentResume],
    );

    const selectResume = useCallback((resume: UserResume | null) => {
        setCurrentResume(resume);
        setHasUnsavedChanges(false);
    }, []);

    const scheduleAutoSave = useCallback(
        (resumeData: Record<string, unknown>) => {
            if (!currentResume) return;

            pendingDataRef.current = resumeData;
            setHasUnsavedChanges(true);

            if (autoSaveTimeoutRef.current) {
                clearTimeout(autoSaveTimeoutRef.current);
            }

            autoSaveTimeoutRef.current = setTimeout(async () => {
                if (pendingDataRef.current && currentResume) {
                    await updateResume(currentResume.id, {
                        resumeData: pendingDataRef.current,
                    });
                    pendingDataRef.current = null;
                }
            }, autoSaveDelay);
        },
        [currentResume, autoSaveDelay, updateResume],
    );

    const saveNow = useCallback(async () => {
        if (autoSaveTimeoutRef.current) {
            clearTimeout(autoSaveTimeoutRef.current);
            autoSaveTimeoutRef.current = null;
        }

        if (pendingDataRef.current && currentResume) {
            await updateResume(currentResume.id, {
                resumeData: pendingDataRef.current,
            });
            pendingDataRef.current = null;
        }
    }, [currentResume, updateResume]);

    useEffect(() => {
        fetchResumes();
    }, [fetchResumes]);

    useEffect(() => {
        return () => {
            if (autoSaveTimeoutRef.current) {
                clearTimeout(autoSaveTimeoutRef.current);
            }
        };
    }, []);

    return {
        resumes,
        currentResume,
        isLoading,
        isSaving,
        error,
        hasUnsavedChanges,
        fetchResumes,
        fetchDefaultResume,
        createResume,
        updateResume,
        deleteResume,
        selectResume,
        scheduleAutoSave,
        saveNow,
    };
}
