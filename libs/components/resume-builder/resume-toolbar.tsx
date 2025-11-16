"use client";

import { Button } from "@/libs/ui/button";
import { cn } from "@/libs/utils/misc";
import {
    IconBold,
    IconHeading,
    IconItalic,
    IconLink,
    IconList,
    IconListNumbers,
} from "@tabler/icons-react";
import type { Editor } from "@tiptap/react";

interface ResumeToolbarProps {
    editor: Editor;
}

export function ResumeToolbar({ editor }: ResumeToolbarProps) {
    if (!editor) {
        return null;
    }

    return (
        <div className="flex items-center gap-1 flex-wrap border-b border-gray-200 pb-3 mb-4">
            <Button
                size="sm"
                variant="ghost"
                onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 1 }).run()
                }
                className={cn(
                    "p-2",
                    editor.isActive("heading", { level: 1 })
                        ? "bg-gray-200"
                        : "",
                )}
            >
                <IconHeading size={16} />
            </Button>
            <Button
                size="sm"
                variant="ghost"
                onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 2 }).run()
                }
                className={cn(
                    "p-2",
                    editor.isActive("heading", { level: 2 })
                        ? "bg-gray-200"
                        : "",
                )}
            >
                <IconHeading size={14} />
            </Button>
            <div className="w-px h-6 bg-gray-300 mx-1" />
            <Button
                size="sm"
                variant="ghost"
                onClick={() => editor.chain().focus().toggleBold().run()}
                disabled={!editor.can().chain().focus().toggleBold().run()}
                className={cn(
                    "p-2",
                    editor.isActive("bold") ? "bg-gray-200" : "",
                )}
            >
                <IconBold size={16} />
            </Button>
            <Button
                size="sm"
                variant="ghost"
                onClick={() => editor.chain().focus().toggleItalic().run()}
                disabled={!editor.can().chain().focus().toggleItalic().run()}
                className={cn(
                    "p-2",
                    editor.isActive("italic") ? "bg-gray-200" : "",
                )}
            >
                <IconItalic size={16} />
            </Button>
            <div className="w-px h-6 bg-gray-300 mx-1" />
            <Button
                size="sm"
                variant="ghost"
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={cn(
                    "p-2",
                    editor.isActive("bulletList") ? "bg-gray-200" : "",
                )}
            >
                <IconList size={16} />
            </Button>
            <Button
                size="sm"
                variant="ghost"
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={cn(
                    "p-2",
                    editor.isActive("orderedList") ? "bg-gray-200" : "",
                )}
            >
                <IconListNumbers size={16} />
            </Button>
            <div className="w-px h-6 bg-gray-300 mx-1" />
            <Button
                size="sm"
                variant="ghost"
                onClick={() => {
                    const url = window.prompt("Enter URL");
                    if (url) {
                        editor.chain().focus().setLink({ href: url }).run();
                    }
                }}
                className={cn(
                    "p-2",
                    editor.isActive("link") ? "bg-gray-200" : "",
                )}
            >
                <IconLink size={16} />
            </Button>
        </div>
    );
}
