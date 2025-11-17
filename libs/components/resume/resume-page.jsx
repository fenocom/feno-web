"use client";

import StarterKit from "@tiptap/starter-kit";
import { useEditor, EditorContent } from "@tiptap/react";
import { GridColumn, GridNode } from "./extensions/grid";
import { ResumeSlashCommand } from "./extensions/slash-command";
import { classicTemplate } from "./templates/classic";
import { buildDocFromTemplate } from "./utils/build-doc";

const classicDoc = buildDocFromTemplate(classicTemplate);

export const ResumeEditor = () => {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
        bulletList: { keepMarks: true },
        orderedList: { keepMarks: true },
      }),
      GridColumn,
      GridNode,
      ResumeSlashCommand,
    ],
    content: classicDoc,
  });

  return <EditorContent editor={editor} />;
};
