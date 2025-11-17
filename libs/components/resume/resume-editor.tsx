"use client";

import "./resume-editor.css";

import { EditorContent, useEditor } from "@tiptap/react";
import { extensionsConfig } from "./extensions/config";

export const ResumeEditor = () => {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: extensionsConfig,
  });

  return <EditorContent editor={editor} />;
};
