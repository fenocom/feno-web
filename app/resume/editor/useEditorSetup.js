"use client";

import { useEditor } from "@tiptap/react";
import Placeholder from "@tiptap/extension-placeholder";

import { useResumeContext } from "../context/ResumeContext.jsx";
import { extensions as baseExtensions } from "../extensions/index.js";

const placeholderExtension = Placeholder.configure({
  placeholder: "Use / to add resume sections or formatting.",
});

export const useEditorSetup = () => {
  const { document, setDocument } = useResumeContext();

  const editor = useEditor({
    extensions: [...baseExtensions, placeholderExtension],
    content: document,
    autofocus: "start",
    editorProps: {
      attributes: {
        class:
          "resume-editor-content prose prose-slate max-w-none whitespace-pre-wrap focus:outline-none text-slate-800",
        spellCheck: "true",
      },
    },
    onUpdate: ({ editor: instance }) => {
      setDocument(instance.getJSON());
    },
  });

  return editor;
};


