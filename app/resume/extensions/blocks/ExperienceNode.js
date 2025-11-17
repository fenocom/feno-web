import { Node } from "@tiptap/core";

export const ExperienceNode = Node.create({
  name: "experience",
  group: "block",
  content: "inline*",
  addAttributes() {
    return {
      company: { default: "" },
      role: { default: "" },
      dates: { default: "" },
    };
  },
  parseHTML() {
    return [{ tag: 'section[data-node="experience"]' }];
  },
  renderHTML({ HTMLAttributes }) {
    const { company, role, dates } = HTMLAttributes;
    return [
      "section",
      { "data-node": "experience", class: "experience-card" },
      ["h3", {}, role ?? ""],
      ["div", { class: "metadata" }, `${company ?? ""} • ${dates ?? ""}`],
      ["div", {}, 0],
    ];
  },
});


