import Heading from "@tiptap/extension-heading";

export const CustomHeading = Heading.extend({
  addAttributes() {
    return {
      level: {
        default: 2,
      },
    };
  },
  renderHTML({ node, HTMLAttributes }) {
    const level = this.options.levels.includes(node.attrs.level) ? node.attrs.level : this.options.levels[0];
    const classes = {
      1: "text-4xl font-semibold tracking-tight text-slate-900",
      2: "text-xl font-semibold uppercase tracking-[0.4em] text-indigo-500",
      3: "text-lg font-semibold text-slate-800",
    };
    return [
      `h${level}`,
      {
        ...HTMLAttributes,
        class: classes[level] ?? classes[2],
      },
      0,
    ];
  },
}).configure({
  levels: [1, 2, 3],
});


