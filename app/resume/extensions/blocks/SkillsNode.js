import { Node } from "@tiptap/core";

export const SkillsNode = Node.create({
  name: "skills",
  group: "block",
  atom: true,
  addAttributes() {
    return {
      items: {
        default: ["Product strategy", "Wireframing", "User research"],
      },
    };
  },
  parseHTML() {
    return [{ tag: 'section[data-node="skills"]' }];
  },
  renderHTML({ HTMLAttributes }) {
    const items = HTMLAttributes.items ?? [];
    return [
      "section",
      { "data-node": "skills", class: "space-y-2" },
      ["div", { class: "section-title" }, "Skills"],
      [
        "ul",
        {
          class:
            "m-0 flex flex-wrap gap-2 list-none p-0 text-sm text-slate-600",
        },
        ...items.map((skill) => [
          "li",
          { class: "rounded-full bg-slate-100 px-3 py-1 text-slate-700" },
          skill,
        ]),
      ],
    ];
  },
});


