"use client";

import { Avatar, Button, Spinner, Tooltip } from "@heroui/react";
import {
        IconArrowsMaximize,
        IconArrowsMinimize,
        IconX,
} from "@tabler/icons-react";
import type { JSONContent } from "@tiptap/core";
import { forwardRef, useCallback, useEffect, useState } from "react";
import { Virtuoso, VirtuosoGrid } from "react-virtuoso";
import { TemplatePreview } from "../../template-preview";

interface Template {
        id: string;
        name: string;
        author: string;
        creator?: {
                avatar_url: string;
        };
        category: string;
        resume_data: JSONContent;
        created_at: string;
}

interface TemplatesPanelProps {
        onClose: () => void;
        onSelect?: (template: Template) => void;
        isExpanded: boolean;
        onToggleExpand: () => void;
}

const TemplateCard = ({
        template,
        onSelect,
        scale = 0.28,
}: { template: Template; onSelect?: (t: Template) => void; scale?: number }) => (
        <div
                className="p-1 border w-fit h-fit border-black/10 rounded-xl cursor-pointer group relative transition-all overflow-hidden bg-white hover:border-black/20"
                onClick={() => onSelect?.(template)}
        >
                <div className="w-fit h-fit pointer-events-none overflow-hidden">
                        <TemplatePreview
                                content={template.resume_data}
                                scale={scale}
                                className="w-full h-full origin-top-left"
                        />
                </div>

                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/2 transition-colors" />

                <div className="absolute bottom-0 left-0 right-0 z-20 h-32 flex rounded-xl flex-col justify-end p-4 bg-gradient-to-t from-black/90 via-black/40 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <div className="flex items-end justify-between">
                                <div className="flex-1 min-w-0">
                                        <p className="text-white font-semibold text-sm shadow-black/50 drop-shadow-sm truncate">
                                                {template.name || "Untitled Template"}
                                        </p>
                                        <p className="text-white/70 text-xs">Resume</p>
                                </div>
                                {template.author && (
                                        <div className="cursor-pointer ring-2 ring-white/20 rounded-full ml-2 shrink-0">
                                                <Avatar className="size-6 text-[10px]" size="sm">
                                                        <Avatar.Image
                                                                src={template.creator?.avatar_url}
                                                                alt={template.author}
                                                        />
                                                        <Avatar.Fallback>
                                                                {template.author.slice(0, 2).toUpperCase()}
                                                        </Avatar.Fallback>
                                                </Avatar>
                                        </div>
                                )}
                        </div>
                </div>
        </div>
);


const VerticalList = forwardRef<HTMLDivElement, any>(({ style, children, ...props }, ref) => (
        <div
                ref={ref}
                {...props}
                style={style}
                className="flex gap-3 p-3 justify-center"
        >
                {children}
        </div>
));
VerticalList.displayName = "VerticalList";

const HorizontalList = forwardRef<HTMLDivElement, any>(({ style, children, ...props }, ref) => (
        <div
                ref={ref}
                {...props}
                style={style}
                className="flex flex-wrap"
        >
                {children}
        </div>
));
HorizontalList.displayName = "HorizontalList";

const GridItem = ({ children, ...props }: any) => (
        <div {...props} className="shrink-0">
                {children}
        </div>
);

export function TemplatesPanel({
        onClose,
        onSelect,
        isExpanded,
        onToggleExpand,
}: TemplatesPanelProps) {
        const [templates, setTemplates] = useState<Template[]>([]);
        const [isLoading, setIsLoading] = useState(false);
        const [hasMore, setHasMore] = useState(true);
        const [page, setPage] = useState(1);

        const loadTemplates = useCallback(async () => {
                if (isLoading || !hasMore) return;
                setIsLoading(true);
                try {
                        const params = new URLSearchParams({
                                page: page.toString(),
                                limit: "5",
                        });
                        const res = await fetch(`/api/admin/templates?${params}`);
                        const data = await res.json();

                        if (data.data && data.data.length > 0) {
                                setTemplates((prev) => [...prev, ...data.data]);
                                if (data.data.length < 5) {
                                        setHasMore(false);
                                } else {
                                        setPage((p) => p + 1);
                                }
                        } else {
                                setHasMore(false);
                        }
                } catch (err) {
                        console.error("Failed to fetch templates", err);
                } finally {
                        setIsLoading(false);
                }
        }, [page, hasMore, isLoading]);

        useEffect(() => {
                if (page === 1 && templates.length === 0) {
                        loadTemplates();
                }
        }, [loadTemplates, page, templates.length]);

        return (
                <div className="w-full h-full flex flex-col overflow-hidden bg-white">
                        <div className="flex items-center justify-between gap-4 px-4 py-2 border-b border-black/5 shrink-0 h-[52px]">
                                <div className="flex items-center gap-4 flex-1">
                                        <h3 className="text-lg font-semibold whitespace-nowrap">
                                                Templates
                                        </h3>
                                </div>

                                <div className="flex items-center gap-2">
                                        <Tooltip>
                                                <Tooltip.Trigger>
                                                        <Button
                                                                variant="ghost"
                                                                isIconOnly
                                                                size="sm"
                                                                onPress={onToggleExpand}
                                                        >
                                                                {isExpanded ? (
                                                                        <IconArrowsMinimize size={20} />
                                                                ) : (
                                                                        <IconArrowsMaximize size={20} />
                                                                )}
                                                        </Button>
                                                </Tooltip.Trigger>
                                                <Tooltip.Content>
                                                        <p>{isExpanded ? "Collapse" : "Expand view"}</p>
                                                </Tooltip.Content>
                                        </Tooltip>
                                        <Button
                                                isIconOnly
                                                variant="ghost"
                                                size="sm"
                                                onPress={onClose}
                                        >
                                                <IconX size={20} />
                                        </Button>
                                </div>
                        </div>

                        <div className="flex-1 w-full relative">
                                {isExpanded ? (
                                        <VirtuosoGrid
                                                style={{ height: "100%", width: "100%" }}
                                                totalCount={templates.length}
                                                endReached={loadTemplates}
                                                overscan={200}
                                                components={{
                                                        List: HorizontalList,
                                                        Item: GridItem,
                                                        Footer: () =>
                                                                isLoading ? (
                                                                        <div className="w-full flex justify-center py-4">
                                                                                <Spinner size="lg" />
                                                                        </div>
                                                                ) : null,
                                                }}
                                                itemContent={(index) => (
                                                        <div className="p-1.5">
                                                                <TemplateCard
                                                                        template={templates[index]}
                                                                        onSelect={onSelect}
                                                                        scale={0.28}
                                                                /></div>
                                                )}
                                        />
                                ) : (
                                        <Virtuoso
                                                horizontalDirection
                                                style={{ height: "100%", width: "100%", overflowY: "hidden", padding: "12px", display: "flex", alignItems: "center" }}
                                                data={templates}
                                                endReached={loadTemplates}
                                                overscan={200}
                                                defaultItemHeight={322}
                                                itemContent={(_index, template) => (
                                                        <div className="px-1.5 w-fit h-full flex items-center">
                                                                <TemplateCard
                                                                        template={template}
                                                                        onSelect={onSelect}
                                                                        scale={0.28}
                                                                /></div>
                                                )}
                                                components={{
                                                        Footer: () =>
                                                                isLoading ? (
                                                                        <div className="h-full flex items-center px-4">
                                                                                <Spinner size="lg" />
                                                                        </div>
                                                                ) : null,
                                                }}
                                        />
                                )}

                                {!isLoading && templates.length === 0 && (
                                        <div className="absolute inset-0 flex items-center justify-center text-neutral-400">
                                                No templates found.
                                        </div>
                                )}
                        </div>
                </div>
        );
}
