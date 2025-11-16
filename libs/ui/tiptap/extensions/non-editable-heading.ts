import { Heading, mergeAttributes } from "@tiptap/core";

export const NonEditableHeading = Heading.extend({
    name: "nonEditableHeading",

    addAttributes() {
        return {
            ...this.parent?.(),
            contenteditable: {
                default: "false",
                parseHTML: () => "false",
                renderHTML: () => ({
                    contenteditable: "false",
                }),
            },
        };
    },

    addNodeView() {
        return ({ node, HTMLAttributes }) => {
            const dom = document.createElement(`h${node.attrs.level}`);
            const attrs = mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
                contenteditable: "false",
                class: "resume-section-title",
            });

            Object.entries(attrs).forEach(([key, value]) => {
                if (key === "class") {
                    dom.className = value as string;
                } else {
                    dom.setAttribute(key, String(value));
                }
            });

            return {
                dom,
                contentDOM: null,
            };
        };
    },
});

