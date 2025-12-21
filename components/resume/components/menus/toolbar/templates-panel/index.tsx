"use client";

import { Spinner } from "@heroui/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Virtuoso, VirtuosoGrid } from "react-virtuoso";
import { GridItem, HorizontalList } from "./grid-components";
import { Header } from "./header";
import { TemplateCard, type Template } from "./template-card";

interface TemplatesPanelProps {
    onClose: () => void;
    onSelect?: (template: Template) => void;
    isExpanded: boolean;
    onToggleExpand: () => void;
}

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
    const scrollerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const scroller = scrollerRef.current;
        if (!scroller || isExpanded) return;

        const handleWheel = (e: WheelEvent) => {
            if (e.deltaY === 0) return;
            e.preventDefault();
            scroller.scrollBy({
                left: e.deltaY,
                behavior: "auto",
            });
        };

        scroller.addEventListener("wheel", handleWheel, { passive: false });
        return () => scroller.removeEventListener("wheel", handleWheel);
    }, [isExpanded]);

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
            <Header
                onClose={onClose}
                isExpanded={isExpanded}
                onToggleExpand={onToggleExpand}
            />
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
                                />
                            </div>
                        )}
                    />
                ) : (
                    <Virtuoso
                        horizontalDirection
                        scrollerRef={(ref) => {
                            if (ref instanceof HTMLDivElement) {
                                (scrollerRef as any).current = ref;
                            }
                        }}
                        style={{
                            height: "100%",
                            width: "100%",
                            overflowY: "hidden",
                            padding: "12px",
                            display: "flex",
                            alignItems: "center",
                        }}
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
                                />
                            </div>
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
