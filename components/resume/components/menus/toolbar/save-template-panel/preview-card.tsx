"use client";

import { Avatar, Tooltip } from "@heroui/react";
import type { JSONContent } from "@tiptap/core";
import { TemplatePreview } from "../../../template-preview";

interface PreviewCardProps {
    content?: JSONContent;
    name: string;
    author: string;
    avatarUrl?: string;
}

export const PreviewCard = ({
    content,
    name,
    author,
    avatarUrl,
}: PreviewCardProps) => (
    <div className="shrink-0">
        <div className="relative rounded-xl overflow-hidden shadow-lg border border-neutral-200 bg-neutral-100 group">
            <TemplatePreview content={content} scale={0.35} />
            <div className="absolute bottom-0 left-0 right-0 z-20 h-40 flex flex-col justify-end p-4 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-100 transition-opacity">
                <div className="flex items-end justify-between">
                    <div>
                        <p className="text-white font-semibold text-sm shadow-black/50 drop-shadow-sm">
                            {name || "Untitled Template"}
                        </p>
                        <p className="text-white/70 text-xs">Resume</p>
                    </div>
                    {avatarUrl !== undefined && (
                        <Tooltip>
                            <Tooltip.Trigger>
                                <div className="cursor-pointer ring-2 ring-white/20 rounded-full">
                                    <Avatar size="sm">
                                        <Avatar.Image
                                            src={avatarUrl}
                                            alt={author}
                                        />
                                        <Avatar.Fallback>
                                            {author.slice(0, 2).toUpperCase()}
                                        </Avatar.Fallback>
                                    </Avatar>
                                </div>
                            </Tooltip.Trigger>
                            <Tooltip.Content>
                                <div className="px-1 py-2 min-w-40">
                                    <div className="flex items-center gap-2">
                                        <Avatar size="sm">
                                            <Avatar.Image
                                                src={avatarUrl}
                                                alt={author}
                                            />
                                            <Avatar.Fallback>
                                                {author
                                                    .slice(0, 2)
                                                    .toUpperCase()}
                                            </Avatar.Fallback>
                                        </Avatar>
                                        <div>
                                            <div className="text-small font-bold">
                                                {author}
                                            </div>
                                            <div className="text-tiny text-neutral-500">
                                                Creator
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Tooltip.Content>
                        </Tooltip>
                    )}
                </div>
            </div>
        </div>
    </div>
);
