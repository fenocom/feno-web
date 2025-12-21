"use client";

import { Avatar } from "@heroui/react";
import type { JSONContent } from "@tiptap/core";
import { TemplatePreview } from "../../../template-preview";

export interface Template {
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

interface TemplateCardProps {
        template: Template;
        onSelect?: (t: Template) => void;
        scale?: number;
}

export const TemplateCard = ({
        template,
        onSelect,
        scale = 0.28,
}: TemplateCardProps) => (
        <div
                className="p-1 border w-fit backdrop-blur-lg bg-black/2 h-fit border-black/10 rounded-xl cursor-pointer group relative transition-all overflow-hidden hover:border-black/20"
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
