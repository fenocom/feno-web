import Highlight from "@tiptap/extension-highlight";

export const CustomHighlight = Highlight.extend({
  addAttributes() {
    return {
      color: {
        default: "#FEF3C7",
        parseHTML: (element) => element.getAttribute("data-color") ?? "#FEF3C7",
        renderHTML: (attributes) => ({
          "data-color": attributes.color,
          style: `background:${attributes.color}`,
        }),
      },
    };
  },
});


