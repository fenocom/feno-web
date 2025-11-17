import Bold from "@tiptap/extension-bold";

export const CustomBold = Bold.extend({
  renderHTML({ HTMLAttributes }) {
    return ["strong", { ...HTMLAttributes, class: "font-semibold text-slate-900" }, 0];
  },
});


