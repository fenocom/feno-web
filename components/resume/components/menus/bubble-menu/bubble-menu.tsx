import { Separator } from "@heroui/react";
import { type Editor, useEditorState } from "@tiptap/react";
import { BubbleMenu } from "@tiptap/react/menus";
import { motion } from "framer-motion";
import { ColorSelector } from "./color-selector";
import { FontFamilySelector } from "./font-family-selector";
import { FontSizeSelector } from "./font-size-selector";
import { LinkSelector } from "./link-selector";
import { NodeOptions } from "./node-options";

interface BubbleMenuProps {
    editor: Editor;
}

export const BubbleMenuGlobal = ({ editor }: BubbleMenuProps) => {
    const shouldShow = ({ editor }: { editor: Editor }) => {
        return !editor.state.selection.empty;
    };

    // Force re-render on selection update to ensure state consistency
    useEditorState({
        editor,
        selector: (ctx) => ({
            selection: ctx.editor.state.selection,
        }),
    });

    return (
        <BubbleMenu editor={editor} shouldShow={shouldShow}>
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="flex items-center shadow-xl z-[999] rounded-4xl"
            >
                <div className="absolute inset-0 w-full h-full rounded-4xl border border-white overflow-hidden backdrop-blur-sm backdrop-invert-10 backdrop-grayscale" />
                <div className="flex gap-2 items-center px-3 py-2 relative z-10 mix-blend-difference text-white">
                    <FontFamilySelector editor={editor} />
                    <Separator
                        orientation="vertical"
                        className="h-6 bg-white/20"
                    />
                    <FontSizeSelector editor={editor} />
                    <Separator
                        orientation="vertical"
                        className="h-6 bg-white/20"
                    />
                    <NodeOptions editor={editor} />
                    <Separator
                        orientation="vertical"
                        className="h-6 bg-white/20"
                    />
                    <div className="flex gap-1">
                        <ColorSelector editor={editor} type="text" />
                        <ColorSelector editor={editor} type="highlight" />
                    </div>
                    <Separator
                        orientation="vertical"
                        className="h-6 bg-white/20"
                    />
                    <LinkSelector editor={editor} />
                </div>
                <div className="top-0 left-0 absolute pointer-events-none w-full h-full bg-[url('/noise.png')] bg-repeat bg-size-[50px] rounded-4xl opacity-50" />
            </motion.div>
        </BubbleMenu>
    );
}
