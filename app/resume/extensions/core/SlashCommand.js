"use client";

import { Extension } from "@tiptap/core";
import Suggestion from "@tiptap/suggestion";

const text = (value) => ({
  type: "text",
  text: value,
});

const insertNode = (title, keywords, content) => ({
  title,
  keywords,
  action: ({ editor, range }) => {
    editor.chain().focus().deleteRange(range).insertContent(content).run();
  },
});

const formatCommand = (title, keywords, handler) => ({
  title,
  keywords,
  action: ({ editor, range }) => {
    editor.chain().focus().deleteRange(range).run();
    handler(editor);
  },
});

const resumeCommands = [
  insertNode("Personal info", ["header", "contact"], {
    type: "personalInfo",
    attrs: {
      title: "Product Designer",
      location: "Remote",
      email: "hello@example.com",
      phone: "(123) 456-7890",
    },
  }),
  insertNode("Summary section", ["summary", "intro"], {
    type: "summary",
    content: [text("Write a short overview of your experience.")],
  }),
  insertNode("Experience block", ["experience", "work"], {
    type: "experience",
    attrs: {
      company: "Feno",
      role: "Senior Product Designer",
      dates: "2022 — Present",
    },
    content: [text("Highlight responsibilities or achievements.")],
  }),
  insertNode("Project block", ["projects"], {
    type: "project",
    attrs: {
      name: "Project name",
      url: "https://example.com",
    },
    content: [text("Describe what made this project special.")],
  }),
  insertNode("Education block", ["education", "school"], {
    type: "education",
    attrs: {
      school: "University",
      degree: "B.A. Design",
      dates: "2015 — 2019",
    },
    content: [text("Share relevant coursework or achievements.")],
  }),
  insertNode("Skills chips", ["skills"], {
    type: "skills",
    attrs: { items: ["Strategy", "Wireframing", "User research"] },
  }),
  insertNode("Custom section", ["section"], {
    type: "customSection",
    attrs: { title: "Custom section" },
    content: [text("Add any additional details here.")],
  }),
];

const formattingCommands = [
  formatCommand("Bold", ["bold", "strong"], (editor) =>
    editor.chain().focus().toggleBold().run(),
  ),
  formatCommand("Italic", ["italic"], (editor) =>
    editor.chain().focus().toggleItalic().run(),
  ),
  formatCommand("Underline", ["underline"], (editor) =>
    editor.chain().focus().toggleUnderline().run(),
  ),
  formatCommand("Highlight", ["highlight"], (editor) =>
    editor.chain().focus().toggleHighlight().run(),
  ),
  formatCommand("Bullet list", ["bullet", "list"], (editor) =>
    editor.chain().focus().toggleBulletList().run(),
  ),
  formatCommand("Numbered list", ["numbered", "list"], (editor) =>
    editor.chain().focus().toggleOrderedList().run(),
  ),
  formatCommand("Quote block", ["quote"], (editor) =>
    editor.chain().focus().toggleBlockquote().run(),
  ),
];

const defaultCommands = [...resumeCommands, ...formattingCommands];

const createCommandRenderer = () => {
  let dom;
  let selectedIndex = 0;

  const selectItem = (props) => {
    const item = props.items[selectedIndex];
    if (item) {
      item.action(props);
    }
  };

  const update = (props) => {
    if (!dom) return;
    dom.innerHTML = "";
    const items = props.items ?? [];

    if (items.length === 0) {
      dom.style.display = "none";
      return;
    }

    dom.style.display = "flex";
    items.forEach((item, index) => {
      const option = document.createElement("button");
      option.type = "button";
      option.textContent = item.title;
      option.className =
        "slash-item text-sm text-slate-600 hover:text-slate-900 rounded-lg px-3 py-2";
      option.style.border = "none";
      option.style.background =
        index === selectedIndex ? "rgba(79,70,229,0.12)" : "transparent";
      option.style.cursor = "pointer";
      option.style.textAlign = "left";
      option.style.transition = "background 0.15s ease";
      option.onmousedown = (event) => {
        event.preventDefault();
        selectedIndex = index;
        selectItem(props);
      };
      dom.appendChild(option);
    });

    const rect = props.clientRect?.();
    if (rect) {
      dom.style.left = `${rect.left}px`;
      dom.style.top = `${rect.bottom + 6}px`;
    }
  };

  return {
    onStart: (props) => {
      selectedIndex = 0;
      dom = document.createElement("div");
      dom.className = "slash-menu";
      dom.style.position = "absolute";
      dom.style.zIndex = "1000";
      dom.style.display = "flex";
      dom.style.flexDirection = "column";
      dom.style.minWidth = "240px";
      dom.style.padding = "8px";
      dom.style.borderRadius = "14px";
      dom.style.border = "1px solid rgba(15,23,42,0.1)";
      dom.style.background = "#fff";
      dom.style.boxShadow = "0 12px 40px rgba(15,23,42,0.14)";
      document.body.appendChild(dom);
      update(props);
    },
    onUpdate: (props) => {
      selectedIndex = Math.min(selectedIndex, props.items.length - 1);
      update(props);
    },
    onKeyDown: (props) => {
        // SAFETY CHECKS
        if (!props || !Array.isArray(props.items) || props.items.length === 0) {
          return false;
        }
      
        const { event, items } = props;
      
        if (event.key === "ArrowDown") {
          selectedIndex = (selectedIndex + 1) % items.length;
          update(props);
          return true;
        }
      
        if (event.key === "ArrowUp") {
          selectedIndex = (selectedIndex - 1 + items.length) % items.length;
          update(props);
          return true;
        }
      
        if (event.key === "Enter") {
          selectItem(props);
          return true;
        }
      
        return false;
    },
      
    onExit: () => {
      dom?.remove();
      dom = null;
    },
  };
};

export const SlashCommand = Extension.create({
  name: "slashCommand",
  addOptions() {
    return {
      commands: defaultCommands,
      suggestion: { char: "/" },
    };
  },
  addProseMirrorPlugins() {
    return [
      Suggestion({
        editor: this.editor,
        char: this.options.suggestion.char,
        render: createCommandRenderer,
        items: ({ query }) => {
          const normalized = query?.toLowerCase() ?? "";
          return this.options.commands
            .filter((item) => {
              const haystack = [item.title, ...(item.keywords ?? [])]
                .join(" ")
                .toLowerCase();
              return haystack.includes(normalized);
            })
            .slice(0, 7);
        },
        command: ({ editor, range, props }) => {
          props.action({ editor, range });
        },
      }),
    ];
  },
});


