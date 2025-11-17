import { Node } from "@tiptap/core";

export const EducationNode = Node.create({
  name: "education",
  group: "block",
  content: "inline*",
  addAttributes() {
    return {
      school: { default: "" },
      degree: { default: "" },
      dates: { default: "" },
    };
  },
  parseHTML() {
    return [{ tag: 'section[data-node="education"]' }];
  },
  renderHTML({ HTMLAttributes }) {
    const { school, degree, dates } = HTMLAttributes;
    return [
      "section",
      { "data-node": "education", class: "experience-card" },
      ["h3", {}, school ?? ""],
      ["div", { class: "metadata" }, `${degree ?? ""} • ${dates ?? ""}`],
      ["div", {}, 0],
    ];
  },
});


