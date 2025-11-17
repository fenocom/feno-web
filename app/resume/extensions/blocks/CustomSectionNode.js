import { Node } from "@tiptap/core";

export const CustomSectionNode = Node.create({
  name: "customSection",
  group: "block",
  content: "inline*",
  addAttributes() {
    return {
      title: { default: "Custom Section" },
    };
  },
  parseHTML() {
    return [{ tag: 'section[data-node="custom-section"]' }];
  },
  renderHTML({ HTMLAttributes }) {
    return [
      "section",
      { "data-node": "custom-section", class: "space-y-2" },
      ["div", { class: "section-title" }, HTMLAttributes.title ?? "Custom section"],
      ["div", {}, 0],
    ];
  },
  addCommands() {
    return {
      toggleCustomSection:
        (attributes) =>
        ({ commands }) =>
          commands.insertContent({ type: this.name, attrs: attributes }),
    };
  },
});


