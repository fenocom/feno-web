"use client";

import "./styles/resume-editor.css";

import { EditorContent, useEditor } from "@tiptap/react";
import { extensionsConfig } from "./extensions/config";
import { template } from "./templates/default-1/template";
import { template as classicTemplate } from "./templates/classic/template";
import BubbleMenuGlobal from "./menus/bubble-menu";

export const ResumeEditor = () => {
  const editor = useEditor({
    content: classicTemplate,
    immediatelyRender: false,
    extensions: extensionsConfig as any, // Temporary fix for Tiptap extension type incompatibility
  });

  return (
    <>
      {editor && <BubbleMenuGlobal editor={editor} />}
      <EditorContent
        className="w-[210mm] p-0 min-h-[297mm] outline-none box-border nodrag"
        editor={editor}
      />
    </>
  );
};
