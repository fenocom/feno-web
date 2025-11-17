"use client";

import { FloatingMenu as TiptapFloatingMenu } from "@tiptap/react";

export function FloatingMenu({ editor }) {
  if (!editor) return null;

  return (
    <TiptapFloatingMenu
      editor={editor}
      className="flex gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm shadow-xl"
      tippyOptions={{ duration: 120 }}
    >
      <button
        type="button"
        className="rounded-full px-3 py-1 text-slate-600 hover:bg-slate-100"
        onClick={() => editor.chain().focus().toggleCustomSection().run()}
      >
        Section
      </button>
      <button
        type="button"
        className="rounded-full px-3 py-1 text-slate-600 hover:bg-slate-100"
        onClick={() =>
          editor.chain().focus().insertContent({ type: "skills" }).run()
        }
      >
        Skills
      </button>
    </TiptapFloatingMenu>
  );
}
