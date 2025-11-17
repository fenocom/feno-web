"use client";

import { BubbleMenu } from "@tiptap/react";

const blocks = [
  {
    label: "Heading 1",
    handler: (editor) =>
      editor.chain().focus().toggleHeading({ level: 1 }).run(),
  },
  {
    label: "Heading 2",
    handler: (editor) =>
      editor.chain().focus().toggleHeading({ level: 2 }).run(),
  },
  {
    label: "Paragraph",
    handler: (editor) => editor.chain().focus().setParagraph().run(),
  },
  {
    label: "Bullet List",
    handler: (editor) => editor.chain().focus().toggleBulletList().run(),
  },
  {
    label: "Numbered List",
    handler: (editor) => editor.chain().focus().toggleOrderedList().run(),
  },
];

export function BlockMenu({ editor }) {
  if (!editor) return null;

  return (
    <BubbleMenu
      editor={editor}
      tippyOptions={{
        duration: 120,
        placement: "left",
      }}
      className="flex gap-2 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl"
    >
      {blocks.map((block) => (
        <button
          key={block.label}
          type="button"
          className="rounded-lg px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-100"
          onClick={() => block.handler(editor)}
        >
          {block.label}
        </button>
      ))}
    </BubbleMenu>
  );
}
