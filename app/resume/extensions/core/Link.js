import Link from "@tiptap/extension-link";

export const CustomLink = Link.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      HTMLAttributes: {
        class: "text-indigo-600 underline",
        rel: "noreferrer",
        target: "_blank",
      },
    };
  },
});


