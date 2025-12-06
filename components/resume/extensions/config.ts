import { mergeAttributes } from "@tiptap/core";
import { Color } from "@tiptap/extension-color";
import Heading from "@tiptap/extension-heading";
import Highlight from "@tiptap/extension-highlight";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Paragraph from "@tiptap/extension-paragraph";
import Placeholder from "@tiptap/extension-placeholder";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import { FontSize } from "@tiptap/extension-text-style/font-size";
import Typography from "@tiptap/extension-typography";
import StarterKit from "@tiptap/starter-kit";

import { FontFamily } from "./font-family";
import { Grid, GridColumn } from "./grid";

const styleAttribute = {
    default: {},
    parseHTML: (element: HTMLElement) => {
        const data = element.getAttribute("data-styles");
        return data ? JSON.parse(data) : {};
    },
    renderHTML: (attributes: Record<string, unknown>) => {
        const styles = attributes.styles as
            | Record<string, string | number>
            | undefined;
        if (!styles || Object.keys(styles).length === 0) return {};

        const styleString = Object.entries(styles)
            .map(([k, v]) => `${k}: ${v}`)
            .join("; ");

        return {
            "data-styles": JSON.stringify(styles),
            style: styleString,
        };
    },
};

export const extensionsConfig = [
    StarterKit.configure({
        strike: false, // disabling strike
        heading: false, // Because you're overriding Heading manually
        paragraph: false, // Overridden below
        bulletList: {
            keepMarks: true,
            keepAttributes: false,
            HTMLAttributes: {
                class: "list-disc list-outside leading-normal ml-4 space-y-1",
            },
        },
        orderedList: {
            keepMarks: true,
            keepAttributes: false,
            HTMLAttributes: {
                class: "list-decimal list-outside leading-normal ml-4 space-y-1",
            },
        },
        listItem: {
            HTMLAttributes: {
                class: "pl-1",
            },
        },
    }),

    Highlight,
    FontFamily,
    FontSize,

    Heading.extend({
        addAttributes() {
            return {
                ...this.parent?.(),
                styles: styleAttribute,
            };
        },
        renderHTML({ node, HTMLAttributes }) {
            const level = this.options.levels.includes(node.attrs.level)
                ? node.attrs.level
                : 1;

            const classes = {
                1: "text-4xl font-bold mb-4",
                2: "text-xl font-bold mb-2 mt-4",
                3: "text-lg font-bold mb-2",
                4: "text-base font-bold",
            };

            return [
                `h${level}`,
                mergeAttributes(HTMLAttributes, {
                    class: classes[level as 1 | 2 | 3 | 4],
                }),
                0,
            ];
        },
    }),

    Paragraph.extend({
        addAttributes() {
            return {
                ...this.parent?.(),
                styles: styleAttribute,
            };
        },
        renderHTML({ HTMLAttributes }) {
            return [
                "p",
                mergeAttributes(HTMLAttributes, {
                    class: "text-sm leading-relaxed mb-1.5",
                }),
                0,
            ];
        },
    }),

    Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: "https",
        validate: (href) => /^https?:\/\//.test(href),
        HTMLAttributes: {
            class: "text-blue-500 underline cursor-pointer",
        },
    }),

    Grid,
    GridColumn,

    Image.configure({
        inline: true,
        allowBase64: true,
    }),

    Color,
    Typography,

    TaskList,
    TaskItem.configure({
        nested: true,
    }),

    Placeholder.configure({
        placeholder: "Type something...",
    }),
];
