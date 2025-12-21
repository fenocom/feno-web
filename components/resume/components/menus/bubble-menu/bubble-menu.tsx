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
                                className="flex items-center shadow-xl z-999 rounded-4xl border border-black/10"
                        >
                                <div className="relative z-10 bg-white rounded-4xl">
                                        <div className="flex gap-2 items-center px-3 py-2 rounded-4xl">
                                                <FontFamilySelector editor={editor} />
                                                <Separator
                                                        orientation="vertical"
                                                        className="h-6 bg-black/20"
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
                                </div>
                        </motion.div>
                </BubbleMenu>
        );
};
