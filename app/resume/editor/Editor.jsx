"use client";

import { EditorContent } from "@tiptap/react";

import { useEditorSetup } from "./useEditorSetup.js";
import { Toolbar } from "./toolbar/Toolbar.jsx";
import { BlockMenu } from "./menus/BlockMenu.jsx";
import { FloatingMenu } from "./menus/FloatingMenu.jsx";

export function ResumeEditor() {
  const editor = useEditorSetup();

  if (!editor) {
    return (
      <div className="flex h-full min-h-[520px] items-center justify-center text-sm text-slate-500">
        Preparing editor…
      </div>
    );
  }

  return (
    <div className="flex h-full min-h-[640px] flex-col">
      <Toolbar editor={editor} />
      <div className="relative flex-1 overflow-auto bg-slate-25 p-4">
        <div className="mx-auto max-w-[700px] rounded-xl bg-white p-6 shadow-lg">
          <EditorContent editor={editor} />
        </div>
        <BlockMenu editor={editor} />
        <FloatingMenu editor={editor} />
      </div>
    </div>
  );
}
