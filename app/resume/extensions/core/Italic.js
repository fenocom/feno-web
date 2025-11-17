import Italic from "@tiptap/extension-italic";

export const CustomItalic = Italic.extend({
  renderHTML({ HTMLAttributes }) {
    return ["em", { ...HTMLAttributes, class: "italic text-slate-600" }, 0];
  },
});


