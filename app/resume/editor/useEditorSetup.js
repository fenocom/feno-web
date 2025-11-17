"use client";

import { useEditor } from "@tiptap/react";
import Placeholder from "@tiptap/extension-placeholder";

import { useResumeContext } from "../context/ResumeContext.jsx";
import { extensions as baseExtensions } from "../extensions/index.js";

const placeholderExtension = Placeholder.configure({
  placeholder: "Start typing your story…",
});

export const useEditorSetup = () => {
  const { document, setDocument } = useResumeContext();

  const editor = useEditor({
    extensions: [...baseExtensions, placeholderExtension],
    content: document,
    autofocus: "start",
    editorProps: {
      attributes: {
        class: "prose prose-slate max-w-none focus:outline-none",
      },
    },
    onUpdate: ({ editor: instance }) => {
      setDocument(instance.getJSON());
    },
  });

  return editor;
};


