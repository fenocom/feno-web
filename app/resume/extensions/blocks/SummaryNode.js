import { Node } from "@tiptap/core";

export const SummaryNode = Node.create({
  name: "summary",
  group: "block",
  content: "inline*",
  parseHTML() {
    return [{ tag: 'section[data-node="summary"]' }];
  },
  renderHTML({ HTMLAttributes }) {
    return [
      "section",
      { ...HTMLAttributes, "data-node": "summary", class: "space-y-1 text-base leading-7 text-slate-600" },
      ["div", { class: "section-title uppercase tracking-[0.4em] text-xs text-slate-500" }, "Summary"],
      ["p", {}, 0],
    ];
  },
});


