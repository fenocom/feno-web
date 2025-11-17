import { Node } from "@tiptap/core";

export const ProjectNode = Node.create({
  name: "project",
  group: "block",
  content: "inline*",
  addAttributes() {
    return {
      name: { default: "" },
      url: { default: "" },
    };
  },
  parseHTML() {
    return [{ tag: 'section[data-node="project"]' }];
  },
  renderHTML({ HTMLAttributes }) {
    const { name, url } = HTMLAttributes;
    return [
      "section",
      { "data-node": "project", class: "space-y-1" },
      [
        "h3",
        { class: "text-base font-semibold text-slate-900" },
        name ?? "Project",
      ],
      [
        "a",
        { href: url ?? "#", class: "text-sm text-indigo-600 underline" },
        url ?? "Link",
      ],
      ["div", {}, 0],
    ];
  },
});


