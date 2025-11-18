// libs/components/resume/resume-editor.jsx
"use client";

import React from "react";
import "./resume-editor.css";

import { EditorContent, useEditor } from "@tiptap/react";
import { extensionsConfig } from "./extensions/config";
import { template as defaultTemplate } from "./templates/default-1/template";

import BubbleMenuGlobal from "../resume/menus/bubble-menu"
import TemplateSelector from "./template-selector";

/**
 * ResumeEditor
 * - Creates tiptap editor with your extensionsConfig (StarterKit + custom nodes)
 * - Renders global BubbleMenu for inline text formatting
 * - TemplateSelector calls handleTemplateChange to set content in editor
 */
export const ResumeEditor = () => {
  const editor = useEditor({
    immediatelyRender: false,
    content: defaultTemplate,
    // If your templates are ProseMirror json, use content: defaultTemplate
    // Immediately render default false is optional — keeping false if you had it.
    // For Next.js client component, ensure useEditor runs only client-side.
    extensions: extensionsConfig,
    autofocus: false,
  });

  const handleTemplateChange = (newTemplate) => {
    if (!editor) return;
    // newTemplate can be ProseMirror doc JSON or HTML; pass false to avoid parse errors?
    editor.commands.setContent(newTemplate, false);
    editor.chain().focus().run();
  };

  return (
    <div className="resume-editor-root relative">
      <div className="w-[210mm] mt-4">
        <TemplateSelector onSelect={handleTemplateChange} />
      </div>

      {/* Render Bubble menu only if editor is ready */}
      {editor && <BubbleMenuGlobal editor={editor} />}

      <div className="resume-editor-canvas">
        <EditorContent
          className="w-[210mm] p-6 min-h-[297mm] outline-none box-border bg-white"
          editor={editor}
        />
      </div>
    </div>
  );
};
