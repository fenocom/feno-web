"use client";

import { Avatar, Button, Input, Spinner, Tooltip } from "@heroui/react";
import {
        IconArrowsMaximize,
        IconArrowsMinimize,
        IconChevronLeft,
        IconChevronRight,
        IconSearch,
        IconX,
} from "@tabler/icons-react";
import type { JSONContent } from "@tiptap/core";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
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

export function TemplatesPanel({ onClose, onSelect, isExpanded, onToggleExpand }: TemplatesPanelProps) {
        const [templates, setTemplates] = useState<Template[]>([]);
        const [isLoading, setIsLoading] = useState(true);
        const [page, setPage] = useState(1);
        const [totalPages, setTotalPages] = useState(1);
        const [filterAuthor, setFilterAuthor] = useState("");
        const [debouncedAuthor, setDebouncedAuthor] = useState("");

        useEffect(() => {
                const timer = setTimeout(() => {
                        setDebouncedAuthor(filterAuthor);
                        setPage(1); // Reset page on filter change
                }, 500);
                return () => clearTimeout(timer);
        }, [filterAuthor]);

        useEffect(() => {
                const fetchTemplates = async () => {
                        setIsLoading(true);
                        try {
                                const params = new URLSearchParams({
                                        page: page.toString(),
                                        limit: isExpanded ? "20" : "10", // Load more items in expanded mode
                                        author: debouncedAuthor,
                                });
                                const res = await fetch(`/api/admin/templates?${params}`);
                                const data = await res.json();
                                if (data.data) {
                                        setTemplates(data.data);
                                        setTotalPages(
                                                Math.ceil(
                                                        (data.metadata?.total || 0) /
                                                        (data.metadata?.limit || 10),
                                                ),
                                        );
                                }
                        } catch (err) {
                                console.error("Failed to fetch templates", err);
                        } finally {
                                setIsLoading(false);
                        }
                };

                fetchTemplates();
        }, [page, debouncedAuthor, isExpanded]);

        return (
                <div className="w-full h-full flex flex-col overflow-hidden">
                        <div className="flex items-center justify-between gap-4 px-4 py-2 border-b border-black/5">
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

                        <div
                                className={`flex flex-1 relative ${isExpanded
                                        ? "overflow-y-auto flex-row flex-wrap p-4 gap-6"
                                        : "overflow-x-auto flex gap-6 p-4 scrollbar-hide items-center justify-center min-h-[300px]"
                                        }`}
                        >
                                {isLoading && templates.length === 0 ? (
                                        <div className="absolute inset-0 flex items-center justify-center">
                                                <Spinner />
                                        </div>
                                ) : (
                                        <AnimatePresence mode="popLayout">
                                                {templates.map((template) => (
                                                        <div
                                                                className="p-1 border w-fit h-fit border-black/10 rounded-xl cursor-pointer group relative transition-all overflow-hidden shrink-0"
                                                                key={template.id}
                                                                onClick={() => onSelect?.(template)}
                                                        >

                                                                <TemplatePreview
                                                                        content={template.resume_data}
                                                                        scale={0.28}
                                                                        className="pointer-events-none"
                                                                />

                                                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />

                                                                <div className="absolute bottom-0 left-0 right-0 z-20 h-32 flex flex-col justify-end p-4 bg-gradient-to-t from-black/90 via-black/40 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                                                        <div className="flex items-end justify-between">
                                                                                <div className="flex-1 min-w-0">
                                                                                        <p className="text-white font-semibold text-sm shadow-black/50 drop-shadow-sm truncate">
                                                                                                {template.name || "Untitled Template"}
                                                                                        </p>
                                                                                        <p className="text-white/70 text-xs">
                                                                                                Resume
                                                                                        </p>
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
                                                ))}
                                        </AnimatePresence>
                                )}

                                {!isLoading && templates.length === 0 && (
                                        <div className="w-full h-full flex items-center justify-center text-neutral-400">
                                                No templates found.
                                        </div>
                                )}
                        </div>

                </div>
        );
}
