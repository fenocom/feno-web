"use client";

import {
    getTemplateImageUrl,
    usePortfolioTemplates,
    type PortfolioTemplate,
} from "@/lib/hooks/use-portfolio-templates";
import { Button, Spinner } from "@heroui/react";
import { IconCheck, IconSparkles, IconX } from "@tabler/icons-react";
import clsx from "clsx";
import { useEffect, useState } from "react";

interface TemplatesPanelProps {
    onSelect: (template: PortfolioTemplate) => void;
    onClose: () => void;
    isRestyling: boolean;
    selectedId?: string;
}

interface UsageData {
    limit: number;
    used: number;
    remaining: number;
    periodType: "monthly" | "daily";
}

interface UsageResponse {
    hasAccess: boolean;
    usage: UsageData | null;
}

export function TemplatesPanel({
    onSelect,
    onClose,
    isRestyling,
    selectedId,
}: TemplatesPanelProps) {
    const { templates, isLoading } = usePortfolioTemplates();
    const [usage, setUsage] = useState<UsageResponse | null>(null);

    useEffect(() => {
        fetch("/api/ai/usage")
            .then((res) => res.json())
            .then(setUsage)
            .catch(() => {});
    }, []);

    const hasAccess = usage?.hasAccess ?? false;
    const remaining = usage?.usage?.remaining ?? 0;
    const limit = usage?.usage?.limit ?? 0;
    const isLimitReached = hasAccess && remaining === 0;

    return (
        <div className="flex flex-col h-full w-full">
            <div className="flex items-center justify-between px-4 py-2 border-b border-black/5">
                <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm">Change Style</span>
                    <span className="text-xs text-black/40 flex items-center gap-1">
                        <IconSparkles size={12} /> 1 credit
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    {hasAccess && usage?.usage && (
                        <span className={`text-xs px-2 py-1 rounded ${remaining === 0 ? "bg-red-100 text-red-600" : remaining <= 3 ? "bg-yellow-100 text-yellow-700" : "bg-black/5 text-black/50"}`}>
                            {remaining}/{limit}
                        </span>
                    )}
                    <Button
                        isIconOnly
                        size="sm"
                        variant="ghost"
                        onPress={onClose}
                        isDisabled={isRestyling}
                        className="text-black/60"
                    >
                        <IconX size={16} />
                    </Button>
                </div>
            </div>

            {!hasAccess && (
                <div className="px-4 py-3 bg-gradient-to-r from-purple-50 to-pink-50 text-sm text-purple-700">
                    Upgrade to Premium to change styles
                </div>
            )}

            {isLimitReached && (
                <div className="px-4 py-2 bg-red-50 text-red-600 text-xs">
                    You've reached your {usage?.usage?.periodType} limit.
                </div>
            )}

            <div className="flex-1 overflow-y-auto p-3">
                {isLoading ? (
                    <div className="flex items-center justify-center h-full">
                        <Spinner size="lg" />
                    </div>
                ) : (
                    <div className="grid grid-cols-3 gap-2">
                        {templates.map((template) => (
                            <button
                                type="button"
                                key={template.id}
                                onClick={() => !isRestyling && hasAccess && !isLimitReached && onSelect(template)}
                                disabled={isRestyling || !hasAccess || isLimitReached}
                                className={clsx(
                                    "relative rounded-lg border-2 overflow-hidden transition-all text-left flex flex-col h-[200px]",
                                    selectedId === template.id
                                        ? "border-black ring-2 ring-black/10"
                                        : "border-transparent hover:border-black/20 bg-black/5",
                                    (isRestyling || !hasAccess || isLimitReached) && "opacity-50 cursor-not-allowed",
                                )}
                            >
                                <div className="w-full flex-1 relative bg-white overflow-y-auto scrollbar-hide">
                                    <img
                                        src={getTemplateImageUrl(template.image_path)}
                                        alt={template.name}
                                        className="w-full h-auto block"
                                    />
                                </div>
                                <div className="p-2 bg-white border-t border-black/5 shrink-0">
                                    <span className="font-medium text-xs truncate block">
                                        {template.name}
                                    </span>
                                </div>
                                {selectedId === template.id && (
                                    <div className="absolute top-2 right-2 bg-black text-white rounded-full p-1 shadow-lg z-10">
                                        <IconCheck size={10} />
                                    </div>
                                )}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {isRestyling && (
                <div className="px-4 py-3 border-t border-black/5 bg-black/5">
                    <div className="flex items-center gap-2 text-sm text-black/60">
                        <Spinner size="sm" />
                        <span>Restyling portfolio...</span>
                    </div>
                </div>
            )}
        </div>
    );
}
