"use client";

import type { UserPortfolio } from "@/lib/hooks/use-portfolio";
import { Button, Input } from "@heroui/react";
import { IconCheck, IconExternalLink, IconWorldUpload, IconX } from "@tabler/icons-react";
import { useCallback, useEffect, useState } from "react";

interface SubdomainPanelProps {
    portfolio: UserPortfolio | null;
    onPublish: (subdomain: string) => Promise<boolean>;
    onUnpublish: () => Promise<boolean>;
    onClose: () => void;
    isSaving: boolean;
}

export function SubdomainPanel({
    portfolio,
    onPublish,
    onUnpublish,
    onClose,
    isSaving,
}: SubdomainPanelProps) {
    const [subdomain, setSubdomain] = useState(portfolio?.subdomain || "");
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setSubdomain(portfolio?.subdomain || "");
    }, [portfolio?.subdomain]);

    const handlePublish = useCallback(async () => {
        const validateSubdomain = (value: string) => {
            if (value.length < 3) return "Subdomain must be at least 3 characters";
            if (value.length > 30) return "Subdomain must be less than 30 characters";
            if (!/^[a-z0-9-]+$/.test(value)) return "Only lowercase letters, numbers, and hyphens";
            if (value.startsWith("-") || value.endsWith("-")) return "Cannot start or end with hyphen";
            return null;
        };
        const validationError = validateSubdomain(subdomain);
        if (validationError) {
            setError(validationError);
            return;
        }

        setError(null);
        const success = await onPublish(subdomain);
        if (!success) {
            setError("Subdomain already taken or error occurred");
        }
    }, [subdomain, onPublish]);

    const handleUnpublish = useCallback(async () => {
        await onUnpublish();
    }, [onUnpublish]);

    const isPublished = portfolio?.is_published;
    const liveUrl = isPublished ? `https://${portfolio?.subdomain}.feno.me` : null;

    return (
        <div className="flex flex-col h-full w-full">
            <div className="flex items-center justify-between px-4 py-2 border-b border-black/5">
                <span className="font-semibold text-sm">Publish Portfolio</span>
                <Button
                    isIconOnly
                    size="sm"
                    variant="ghost"
                    onPress={onClose}
                    className="text-black/60"
                >
                    <IconX size={16} />
                </Button>
            </div>

            <div className="flex-1 p-4 space-y-4">
                {isPublished && liveUrl && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                        <div className="flex items-center gap-2 text-green-700 text-sm font-medium mb-1">
                            <IconCheck size={16} /> Published
                        </div>
                        <a
                            href={liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-green-600 hover:underline flex items-center gap-1"
                        >
                            {liveUrl} <IconExternalLink size={14} />
                        </a>
                    </div>
                )}

                <div className="space-y-2">
                    <label htmlFor="subdomain-input" className="text-sm font-medium">Subdomain</label>
                    <div className="flex items-center gap-2">
                        <Input
                            id="subdomain-input"
                            value={subdomain}
                            onChange={(e) => {
                                setSubdomain(e.target.value.toLowerCase());
                                setError(null);
                            }}
                            placeholder="your-name"
                            className="flex-1"
                            disabled={isSaving}
                        />
                        <span className="text-sm text-black/50">.feno.me</span>
                    </div>
                    {error && <p className="text-xs text-red-500">{error}</p>}
                </div>

                <div className="flex gap-2 pt-2">
                    {isPublished ? (
                        <Button
                            variant="ghost"
                            onPress={handleUnpublish}
                            isDisabled={isSaving}
                            className="flex-1 border border-red-200 text-red-600"
                        >
                            Unpublish
                        </Button>
                    ) : null}
                    <Button
                        className="flex-1 bg-black text-white"
                        onPress={handlePublish}
                        isDisabled={isSaving || !subdomain}
                    >
                        <IconWorldUpload size={16} />
                        {isPublished ? "Update" : "Publish"}
                    </Button>
                </div>
            </div>
        </div>
    );
}
