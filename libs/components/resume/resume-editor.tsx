"use client";

import "./resume-editor.css";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Grid, GridColumn } from "./extensions/grid";

export const ResumeEditor = () => {
  const editor = useEditor({
    content: {
      type: "doc",
      content: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "This is a normal paragraph before the grid.",
            },
          ],
        },
        {
          type: "grid",
          attrs: {
            columnWidth: [50, 50],
          },
          content: [
            {
              type: "gridColumn",
              content: [
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      text: "I am in the Left Column.",
                    },
                  ],
                },
              ],
            },
            {
              type: "gridColumn",
              content: [
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      text: "I am in the Right Column.",
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "This is a normal paragraph after the grid.",
            },
          ],
        },
      ],
    },
    immediatelyRender: false,
    extensions: [StarterKit, Grid, GridColumn],
  });

  return <EditorContent editor={editor} />;
};
