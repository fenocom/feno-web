import { Node } from "@tiptap/core";

export const PersonalInfoNode = Node.create({
  name: "personalInfo",
  group: "block",
  atom: true,
  defining: true,
  addAttributes() {
    return {
      title: { default: "Product Designer" },
      location: { default: "Remote" },
      email: { default: "hello@example.com" },
      phone: { default: "" },
    };
  },
  parseHTML() {
    return [{ tag: 'section[data-node="personal-info"]' }];
  },
  renderHTML({ HTMLAttributes }) {
    const { title, location, email, phone } = HTMLAttributes;
    return [
      "section",
      { "data-node": "personal-info", class: "space-y-1 text-sm text-slate-600" },
      [
        "p",
        { class: "text-base font-medium text-slate-900" },
        title ?? "Product Designer",
      ],
      ["p", {}, location ?? ""],
      ["p", {}, email ?? ""],
      ["p", {}, phone ?? ""],
    ];
  },
});


