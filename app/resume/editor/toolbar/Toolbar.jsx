"use client";

import { Fragment } from "react";

import { ColorPicker } from "./ColorPicker.jsx";
import { ToolbarButton } from "./ToolbarButton.jsx";

const toolGroups = [
  {
    id: "formatting",
    items: [
      {
        id: "bold",
        label: "Bold",
        command: (editor) => editor.chain().focus().toggleBold().run(),
        isActive: (editor) => editor.isActive("bold"),
      },
      {
        id: "italic",
        label: "Italic",
        command: (editor) => editor.chain().focus().toggleItalic().run(),
        isActive: (editor) => editor.isActive("italic"),
      },
      {
        id: "underline",
        label: "Underline",
        command: (editor) => editor.chain().focus().toggleUnderline().run(),
        isActive: (editor) => editor.isActive("underline"),
      },
      {
        id: "highlight",
        label: "Highlight",
        command: (editor) => editor.chain().focus().toggleHighlight().run(),
        isActive: (editor) => editor.isActive("highlight"),
      },
    ],
  },
  {
    id: "blocks",
    items: [
      {
        id: "bulletList",
        label: "Bullets",
        command: (editor) => editor.chain().focus().toggleBulletList().run(),
        isActive: (editor) => editor.isActive("bulletList"),
      },
      {
        id: "orderedList",
        label: "Numbered",
        command: (editor) => editor.chain().focus().toggleOrderedList().run(),
        isActive: (editor) => editor.isActive("orderedList"),
      },
      {
        id: "blockquote",
        label: "Quote",
        command: (editor) => editor.chain().focus().toggleBlockquote().run(),
        isActive: (editor) => editor.isActive("blockquote"),
      },
    ],
  },
];

export function Toolbar({ editor }) {
  if (!editor) return null;

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 bg-white px-4 py-3">
      <div className="flex flex-wrap items-center gap-3">
        {toolGroups.map((group, groupIndex) => (
          <Fragment key={group.id}>
            {group.items.map((tool) => (
              <ToolbarButton
                key={tool.id}
                label={tool.label}
                isActive={tool.isActive?.(editor)}
                onClick={() => tool.command(editor)}
              />
            ))}
            {groupIndex < toolGroups.length - 1 ? (
              <div className="h-6 w-px bg-slate-200" />
            ) : null}
          </Fragment>
        ))}
      </div>
      <div className="flex items-center gap-3">
        <ColorPicker
          onChange={(color) => {
            editor.chain().focus().setHighlight({ color }).run();
          }}
        />
        <ToolbarButton
          label="Undo"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
        />
        <ToolbarButton
          label="Redo"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
        />
      </div>
    </div>
  );
}
