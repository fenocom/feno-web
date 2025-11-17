import { Extension } from "@tiptap/core";
import Suggestion from "@tiptap/suggestion";

const paragraph = (text = "") => ({
  type: "paragraph",
  content: text
    ? [
        {
          type: "text",
          text,
        },
      ]
    : [],
});

const heading = (text, level = 2) => ({
  type: "heading",
  attrs: { level },
  content: [
    {
      type: "text",
      text,
    },
  ],
});

const gridNode = () => ({
  type: "grid_node",
  content: [
    {
      type: "grid_column",
      content: [paragraph("Left column content")],
    },
    {
      type: "grid_column",
      content: [paragraph("Right column content")],
    },
  ],
});

const listNode = (items = ["New bullet"]) => ({
  type: "bulletList",
  content: items.map((item) => ({
    type: "listItem",
    content: [paragraph(item)],
  })),
});

const sectionCommand = (title, placeholder) => ({
  title: `Insert ${title} section`,
  keywords: [title.toLowerCase(), "section"],
  action: ({ editor, range }) => {
    editor
      .chain()
      .focus()
      .deleteRange(range)
      .insertContent([heading(title), paragraph(placeholder)])
      .run();
  },
});

const defaultCommands = [
  sectionCommand("Summary", "Describe your profile..."),
  sectionCommand("Experience", "Add your recent role..."),
  sectionCommand("Projects", "Share a project highlight..."),
  sectionCommand("Education", "Add your education details..."),
  {
    title: "Add bullet list",
    keywords: ["bullet", "list"],
    action: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).insertContent(listNode()).run();
    },
  },
  {
    title: "Insert bullet item",
    keywords: ["item", "bullet"],
    action: ({ editor, range }) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .toggleBulletList()
        .insertContent("Bullet text")
        .run();
    },
  },
  {
    title: "Insert two-column grid",
    keywords: ["grid", "columns", "layout"],
    action: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).insertContent(gridNode()).run();
    },
  },
  {
    title: "Insert divider",
    keywords: ["divider", "separator"],
    action: ({ editor, range }) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .setHorizontalRule()
        .run();
    },
  },
];

const commandList = () => {
  let component;
  let selectedIndex = 0;

  const selectItem = (props) => {
    const item = props.items[selectedIndex];
    if (item) {
      item.action(props);
    }
  };

  const updateList = (props) => {
    if (!component) return;

    component.innerHTML = "";
    props.items.forEach((item, index) => {
      const option = document.createElement("button");
      option.type = "button";
      option.className = "slash-command__item";
      option.style.background = "transparent";
      option.style.border = "none";
      option.style.color = "#f5f5f5";
      option.style.padding = "6px 12px";
      option.style.textAlign = "left";
      option.style.borderRadius = "6px";
      option.style.cursor = "pointer";
      option.textContent = item.title;
      option.dataset.index = String(index);
      if (index === selectedIndex) {
        option.classList.add("is-active");
        option.style.background = "#2f2f2f";
      }
      option.addEventListener("mousedown", (event) => {
        event.preventDefault();
        selectedIndex = index;
        selectItem(props);
      });
      component.appendChild(option);
    });

    const rect = props.clientRect?.();
    if (rect) {
      component.style.position = "absolute";
      component.style.left = `${rect.left}px`;
      component.style.top = `${rect.bottom + 4}px`;
    }
  };

  return {
    onStart: (props) => {
      selectedIndex = 0;
      component = document.createElement("div");
      component.className = "slash-command";
      component.style.background = "#1f1f1f";
      component.style.borderRadius = "8px";
      component.style.padding = "4px";
      component.style.boxShadow = "0 8px 30px rgba(0,0,0,0.3)";
      component.style.zIndex = "999";
      component.style.display = "flex";
      component.style.flexDirection = "column";
      document.body.appendChild(component);
      updateList(props);
    },
    onUpdate: (props) => {
      selectedIndex = Math.min(selectedIndex, props.items.length - 1);
      updateList(props);
    },
    onKeyDown: (props) => {
      if (props.event.key === "ArrowDown") {
        selectedIndex =
          (selectedIndex + 1) % Math.max(props.items.length, 1);
        updateList(props);
        return true;
      }
      if (props.event.key === "ArrowUp") {
        selectedIndex =
          (selectedIndex + props.items.length - 1) %
          Math.max(props.items.length, 1);
        updateList(props);
        return true;
      }
      if (props.event.key === "Enter") {
        selectItem(props);
        return true;
      }
      return false;
    },
    onExit: () => {
      if (component) {
        component.remove();
        component = null;
      }
    },
  };
};

export const ResumeSlashCommand = Extension.create({
  name: "resumeSlashCommand",

  addOptions() {
    return {
      commands: defaultCommands,
      suggestion: {
        char: "/",
      },
    };
  },

  addProseMirrorPlugins() {
    const commands = this.options.commands;
    return [
      Suggestion({
        editor: this.editor,
        char: this.options.suggestion.char,
        render: commandList,
        items: ({ query = "" }) => {
          const normalizedQuery = query.toLowerCase();
          return commands
            .filter((item) => {
              const haystack = [item.title, ...(item.keywords || [])]
                .join(" ")
                .toLowerCase();
              return haystack.includes(normalizedQuery);
            })
            .slice(0, 5);
        },
        command: ({ editor, range, props }) => {
          props.action({ editor, range });
        },
      }),
    ];
  },
});

