import { Mark } from "@tiptap/core";

export const Underline = Mark.create({
  name: "underline",
  parseHTML() {
    return [
      { tag: "u" },
      { style: "text-decoration", consuming: false },
    ];
  },
  renderHTML({ HTMLAttributes }) {
    return [
      "span",
      {
        ...HTMLAttributes,
        style: "text-decoration:underline",
      },
      0,
    ];
  },
  addCommands() {
    return {
      toggleUnderline:
        () =>
        ({ commands }) =>
          commands.toggleMark(this.name),
    };
  },
});


