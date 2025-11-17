"use client";

import { EditorContent } from "@tiptap/react";

import { useEditorSetup } from "./useEditorSetup.js";

export function ResumeEditor() {
  const editor = useEditorSetup();

  return (
    <div className="flex w-full justify-center bg-slate-100/70 p-4 md:p-10">
      <div className="w-full max-w-[860px]">
        <div
          className="resume-sheet mx-auto w-full max-w-[820px] rounded-[1.25rem] border border-slate-200 bg-white shadow-2xl shadow-slate-500/10"
          style={{ width: "210mm", minHeight: "297mm", padding: "48px" }}
        >
          {editor ? (
            <EditorContent editor={editor} className="h-full w-full" />
          ) : (
            <div className="flex h-full min-h-[400px] items-center justify-center text-sm text-slate-500">
              Preparing editor…
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
