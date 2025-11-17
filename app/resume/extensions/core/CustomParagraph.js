import Paragraph from "@tiptap/extension-paragraph";

export const CustomParagraph = Paragraph.extend({
  renderHTML({ HTMLAttributes }) {
    return [
      "p",
      {
        ...HTMLAttributes,
        class: "text-base leading-7 text-slate-600",
      },
      0,
    ];
  },
});


