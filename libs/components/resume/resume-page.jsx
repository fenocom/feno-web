"use client";
import StarterKit from "@tiptap/starter-kit";
import { useEditor, EditorContent } from "@tiptap/react";
import { GridNode } from "./extensions/grid";

export const ResumeEditor = () => {
    const editor = useEditor({
        extensions: [
          StarterKit,
          GridColumn, // must be registered so children node type exists
          GridNode,
          // ...other extensions
        ],
        content: {
          type: "doc",
          content: [
            {
              type: "grid_node",
              content: [
                {
                  type: "grid_column",
                  content: [
                    { type: "paragraph", content: [{ type: "text", text: "Column 1 content" }] },
                  ],
                },
                {
                  type: "grid_column",
                  content: [
                    { type: "paragraph", content: [{ type: "text", text: "Column 2 content" }] },
                  ],
                },
              ],
            },
          ],
        },
      });

  return <EditorContent editor={editor} />;
};
