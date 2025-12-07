import { mergeAttributes, Node } from "@tiptap/core";

export interface PageOptions {
    types: string[];
}

declare module "@tiptap/core" {
    interface Commands<ReturnType> {
        page: {
            setPageFormat: (format: string) => ReturnType;
            setPageBackground: (color: string) => ReturnType;
        };
    }
}

export const Page = Node.create({
    name: "page",

    group: "block",

    content: "block+",

    defining: true,

    isolating: true,

    addAttributes() {
        return {
            format: {
                default: "a4",
                parseHTML: (element) => element.getAttribute("data-format"),
                renderHTML: (attributes) => {
                    return {
                        "data-format": attributes.format,
                        class: `page-format-${attributes.format}`,
                    };
                },
            },
            backgroundColor: {
                default: "#E0F7FA", // Light blue default as requested
                parseHTML: (element) => element.getAttribute("data-background-color"),
                renderHTML: (attributes) => {
                    return {
                        "data-background-color": attributes.backgroundColor,
                        style: `background-color: ${attributes.backgroundColor};`,
                    };
                },
            },
        };
    },

    parseHTML() {
        return [
            {
                tag: 'div[data-type="page"]',
            },
        ];
    },

    renderHTML({ HTMLAttributes }) {
        return [
            "div",
            mergeAttributes(HTMLAttributes, {
                "data-type": "page",
                class: "resume-page shadow-lg transition-all duration-300",
            }),
            0,
        ];
    },

    addCommands() {
        return {
            setPageFormat:
                (format) =>
                ({ commands }) => {
                    return commands.updateAttributes("page", { format });
                },
            setPageBackground:
                (backgroundColor) =>
                ({ commands }) => {
                    return commands.updateAttributes("page", { backgroundColor });
                },
        };
    },
});

