import { TextStyle } from "@tiptap/extension-text-style";

export const FontFamily = TextStyle.extend({
    addAttributes() {
        return {
            ...this.parent?.(),
            fontFamily: {
                default: null,
                parseHTML: (element) => element.style.fontFamily || null,
                renderHTML: (attrs) => {
                    if (!attrs.fontFamily) return {};
                    return { style: `font-family: ${attrs.fontFamily};` };
                },
            },
        };
    },

    addCommands() {
        return {
            setFontFamily:
                (fontFamily: string) =>
                ({ chain }) => {
                    return chain().setMark("textStyle", { fontFamily }).run();
                },

            unsetFontFamily:
                () =>
                ({ chain }) => {
                    return chain()
                        .setMark("textStyle", { fontFamily: null })
                        .run();
                },
        };
    },
});
