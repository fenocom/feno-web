import { Node, mergeAttributes } from "@tiptap/core";
import { parseStyles, renderStyles } from "../../utils";

export const GridColumn = Node.create({
  name: "gridColumn",
  group: "block",
  content: "block+",
  isolating: true,

  addAttributes() {
    return {
      styles: {
        default: {},
        parseHTML: (element) => parseStyles(element),
        renderHTML: (attributes) => renderStyles(attributes.styles),
      },
    };
  },

  parseHTML() {
    return [{ tag: "div[data-type='grid-column']" }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      mergeAttributes(HTMLAttributes, { "data-type": "grid-column" }),
      0,
    ];
  },
});
