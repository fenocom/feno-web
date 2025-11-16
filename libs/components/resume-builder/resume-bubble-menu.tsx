"use client";

import { Button } from "@/libs/ui/button";
import { cn } from "@/libs/utils/misc";
import {
    IconBold,
    IconCode,
    IconItalic,
    IconLink,
    IconStrikethrough,
} from "@tabler/icons-react";
import { BubbleMenu as TiptapBubbleMenu } from "@tiptap/react/menus";
import type { Editor } from "@tiptap/react";

interface ResumeBubbleMenuProps {
    editor: Editor;
}

export function ResumeBubbleMenu({ editor }: ResumeBubbleMenuProps) {
    return (
        <TiptapBubbleMenu
            editor={editor}
            tippyOptions={{ duration: 100 }}
            className="flex items-center gap-1 bg-white border border-gray-200 rounded-lg shadow-lg p-1"
        >
            <Button
                size="sm"
                variant="ghost"
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={cn(
                    "h-8 w-8 p-0",
                    editor.isActive("bold") ? "bg-gray-100" : "",
                )}
            >
                <IconBold size={16} />
            </Button>
            <Button
                size="sm"
                variant="ghost"
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={cn(
                    "h-8 w-8 p-0",
                    editor.isActive("italic") ? "bg-gray-100" : "",
                )}
            >
                <IconItalic size={16} />
            </Button>
            <Button
                size="sm"
                variant="ghost"
                onClick={() => editor.chain().focus().toggleStrike().run()}
                className={cn(
                    "h-8 w-8 p-0",
                    editor.isActive("strike") ? "bg-gray-100" : "",
                )}
            >
                <IconStrikethrough size={16} />
            </Button>
            <Button
                size="sm"
                variant="ghost"
                onClick={() => editor.chain().focus().toggleCode().run()}
                className={cn(
                    "h-8 w-8 p-0",
                    editor.isActive("code") ? "bg-gray-100" : "",
                )}
            >
                <IconCode size={16} />
            </Button>
            <div className="w-px h-6 bg-gray-300 mx-1" />
            <Button
                size="sm"
                variant="ghost"
                onClick={() => {
                    const previousUrl = editor.getAttributes("link").href;
                    const url = window.prompt("URL", previousUrl);

                    if (url === null) {
                        return;
                    }

                    if (url === "") {
                        editor.chain().focus().extendMarkRange("link").unsetLink().run();
                        return;
                    }

                    editor
                        .chain()
                        .focus()
                        .extendMarkRange("link")
                        .setLink({ href: url })
                        .run();
                }}
                className={cn(
                    "h-8 w-8 p-0",
                    editor.isActive("link") ? "bg-gray-100" : "",
                )}
            >
                <IconLink size={16} />
            </Button>
        </TiptapBubbleMenu>
    );
}

