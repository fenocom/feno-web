"use client";

import { Button } from "@heroui/react";
import { type Editor, useEditorState } from "@tiptap/react";
import { BubbleMenu } from "@tiptap/react/menus";
import { IconBold, IconItalic, IconLink, IconLinkOff } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { ColorPicker } from "../../atoms/color-picker";
import { FontSlider } from "../../common/slider";
import TypographyDropdown from "../../common/typography-dropdown";

export default function BubbleMenuGlobal({ editor }: { editor: Editor }) {
    if (!editor) return null;

    const editorState = useEditorState({
        editor,
        selector: (ctx) => ({
            isBold: ctx.editor.isActive("bold"),
            isItalic: ctx.editor.isActive("italic"),
            isLink: ctx.editor.isActive("link"),
            fontSize:
                Number.parseInt(
                    ctx.editor
                        .getAttributes("textStyle")
                        ?.fontSize?.replace("px", ""),
                ) || 16,
            color: ctx.editor.getAttributes("textStyle")?.color || "#000000",
            fontFamily: ctx.editor.getAttributes("textStyle")?.fontFamily || "",
        }),
    });

    const [fontSize, setFontSize] = useState(16);
    useEffect(() => setFontSize(editorState.fontSize), [editorState.fontSize]);

    const shouldShow = ({ editor }: { editor: Editor }) => !editor.state.selection.empty;

    const applyFontSize = (size: number) => {
        setFontSize(size);
        editor
            .chain()
            .focus()
            .setFontSize(size + "px")
            .run();
    };

    const applyColor = (color: string) => {
        editor.chain().focus().setColor(color).run();
    };

    const stopBubble = (e: React.MouseEvent) => e.stopPropagation();

    const setLink = () => {
        const prev = editor.getAttributes("link").href;
        const url = window.prompt("Enter URL", prev || "");
        if (url === null) return;
        if (url === "") {
            editor.chain().focus().extendMarkRange("link").unsetLink().run();
            return;
        }
        try {
            editor
                .chain()
                .focus()
                .extendMarkRange("link")
                .setLink({ href: url })
                .run();
        } catch { }
    };

    const unsetLink = () => {
        editor.chain().focus().unsetLink().run();
    };

    return (
        <BubbleMenu
            editor={editor}
            shouldShow={shouldShow}
            className="z-9999"

        >
            <div
                className="relative flex items-center gap-2 bg-neutral-800 px-4 py-2 rounded-xl"
                onMouseDown={stopBubble}
            >
                <ColorPicker
                    color={editorState.color}
                    onChange={(c) => applyColor(c)}
                />

                <TypographyDropdown
                    editor={editor}
                    currentFont={editorState.fontFamily}
                />

                <input
                    type="number"
                    min={8}
                    max={64}
                    value={fontSize}
                    onMouseDown={stopBubble}
                    onChange={(e) =>
                        applyFontSize(Number.parseInt(e.target.value))
                    }
                    className="w-10 h-7 bg-[#444] text-white text-sm rounded-md text-center focus:outline-none"
                />

                <Button
                    isIconOnly
                    size="sm"
                    onMouseDown={stopBubble}
                    onPress={() => editor.chain().focus().toggleBold().run()}
                    className={`p-1 rounded-md ${editorState.isBold ? "bg-white/20" : "bg-transparent"
                        } text-white min-w-0 h-auto`}
                >
                    <IconBold size={16} />
                </Button>

                <Button
                    isIconOnly
                    size="sm"
                    onMouseDown={stopBubble}
                    onPress={() => editor.chain().focus().toggleItalic().run()}
                    className={`p-1 rounded-md ${editorState.isItalic ? "bg-white/20" : "bg-transparent"
                        } text-white min-w-0 h-auto`}
                >
                    <IconItalic size={16} />
                </Button>

                <Button
                    isIconOnly
                    size="sm"
                    onMouseDown={stopBubble}
                    onPress={setLink}
                    className={`p-1 rounded-md ${editorState.isLink ? "bg-white/20" : "bg-transparent"
                        } text-white min-w-0 h-auto`}
                >
                    <IconLink size={16} />
                </Button>

                <Button
                    isIconOnly
                    size="sm"
                    onMouseDown={stopBubble}
                    isDisabled={!editorState.isLink}
                    onPress={unsetLink}
                    className="p-1 rounded-md text-white disabled:opacity-30 bg-transparent min-w-0 h-auto"
                >
                    <IconLinkOff size={16} />
                </Button>

                <div className="absolute w-[140px] -top-6 left-1/2 -translate-x-1/2">
                    <FontSlider value={fontSize} onChange={applyFontSize} />
                </div>
            </div>
        </BubbleMenu>
    );
}
