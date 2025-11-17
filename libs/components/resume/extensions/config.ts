import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Typography from "@tiptap/extension-typography";
import Link from "@tiptap/extension-link";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import { Color } from "@tiptap/extension-color";
import { TextStyle } from "@tiptap/extension-text-style";
import Image from "@tiptap/extension-image";
import Heading from "@tiptap/extension-heading";
import Paragraph from "@tiptap/extension-paragraph";
import { mergeAttributes } from "@tiptap/core";
import { Grid, GridColumn } from "./grid";

const styleAttribute = {
  default: {},
  parseHTML: (element: HTMLElement) => {
    const data = element.getAttribute("data-styles");
    return data ? JSON.parse(data) : {};
  },
  renderHTML: (attributes: Record<string, string | number>) => {
    const styles = attributes.styles;
    if (!styles || Object.keys(styles).length === 0) {
      return {};
    }
    const styleString = Object.entries(styles)
      .map(([key, value]) => `${key}: ${value}`)
      .join("; ");
    return {
      "data-styles": JSON.stringify(styles),
      style: styleString,
    };
  },
};

export const extensionsConfig = [
  StarterKit.configure({
    heading: false,
    paragraph: false,
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
  Heading.extend({
    addAttributes() {
      return {
        ...this.parent?.(),
        styles: styleAttribute,
      };
    },
    renderHTML({ node, HTMLAttributes }) {
      const hasLevel = this.options.levels.includes(node.attrs.level);
      const level = hasLevel ? node.attrs.level : this.options.levels[0];

      const classes: Record<number, string> = {
        1: "text-4xl font-bold mb-4",
        2: "text-xl font-bold mb-2 mt-4",
        3: "text-lg font-bold mb-2",
        4: "text-base font-bold",
      };

      return [
        `h${level}`,
        mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
          class: classes[level],
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
        mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
          class: "text-sm leading-relaxed mb-1.5",
        }),
        0,
      ];
    },
  }),
  Grid,
  GridColumn,
  Image.configure({
    inline: true,
    allowBase64: true,
  }),
  TextStyle,
  Color,
  Typography,
  Link.configure({
    openOnClick: false,
    autolink: true,
    HTMLAttributes: {
      class: "text-blue-500 hover:underline cursor-pointer",
    },
  }),
  TaskList,
  TaskItem.configure({
    nested: true,
  }),
  Placeholder.configure({
    placeholder: "Type something...",
  }),
];
