"use client";

import "./resume-editor.css";

import { EditorContent, useEditor } from "@tiptap/react";
import { extensionsConfig } from "./extensions/config";
import { template as defaultTemplate } from "./templates/default-1/template";
import TemplateSelector from "./template-selector";

export const ResumeEditor = () => {
  const editor = useEditor({
    content: defaultTemplate,
    immediatelyRender: false,
    extensions: extensionsConfig,
  });

  const handleTemplateChange = (newTemplate) => {
    if (!editor) return;
    editor.commands.setContent(newTemplate, false);
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-[210mm] mt-4">
        <TemplateSelector onSelect={handleTemplateChange} />
      </div>
      
      <EditorContent
        className="w-[210mm] p-0 min-h-[297mm] outline-none box-border bg-white"
        editor={editor}
      />
    </div>
  );
};
