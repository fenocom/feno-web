"use client";

import "./styles/resume-editor.css";

import { EditorContent, useEditor } from "@tiptap/react";
import { extensionsConfig } from "./extensions/config";
import { template } from "./templates/default-1/template";

export const ResumeEditor = () => {
  const editor = useEditor({
    content: template,
    immediatelyRender: false,
    extensions: extensionsConfig,
  });

  return (
    <EditorContent
      className="w-[210mm] p-0 min-h-[297mm] outline-none box-border nodrag"
      editor={editor}
    />
  );
};
