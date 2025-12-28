"use client";

import {
    getTemplateImageUrl,
    usePortfolioTemplates,
    type PortfolioTemplate,
} from "@/lib/hooks/use-portfolio-templates";
import { Button, Spinner } from "@heroui/react";
import { IconCheck, IconX } from "@tabler/icons-react";
import clsx from "clsx";

interface TemplatesPanelProps {
    onSelect: (template: PortfolioTemplate) => void;
    onClose: () => void;
    isRestyling: boolean;
    selectedId?: string;
}

export function TemplatesPanel({
    onSelect,
    onClose,
    isRestyling,
    selectedId,
}: TemplatesPanelProps) {
    const { templates, isLoading } = usePortfolioTemplates();

    return (
        <div className="flex flex-col h-full w-full">
            <div className="flex items-center justify-between px-4 py-2 border-b border-black/5">
                <span className="font-semibold text-sm">Change Style</span>
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
                                onClick={() => !isRestyling && onSelect(template)}
                                disabled={isRestyling}
                                className={clsx(
                                    "relative rounded-lg border-2 overflow-hidden transition-all text-left flex flex-col h-[200px]",
                                    selectedId === template.id
                                        ? "border-black ring-2 ring-black/10"
                                        : "border-transparent hover:border-black/20 bg-black/5",
                                    isRestyling && "opacity-50 cursor-not-allowed",
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
