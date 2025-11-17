import { mergeAttributes, Node } from "@tiptap/core";

export const GridColumn = Node.create({
  name: "gridColumn",
  group: "block",
  content: "block+",
  isolating: true,

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
