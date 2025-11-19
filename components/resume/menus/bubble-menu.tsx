"use client";

import { BubbleMenu } from "@tiptap/react/menus";
import { useEditorState } from "@tiptap/react";
import type { Editor } from "@tiptap/react";

export default function BubbleMenuGlobal({ editor }: { editor: Editor }) {
  if (!editor) return null;

  const { isBold, isItalic, isHighlight } = useEditorState({
    editor,
    selector: (ctx) => ({
      isBold: ctx.editor.isActive("bold"),
      isItalic: ctx.editor.isActive("italic"),
      isHighlight: ctx.editor.isActive("highlight"),
    }),
  });

  const shouldShow = ({ editor }: { editor: Editor }) => {
    try {
      const { empty } = editor.state.selection;
      return !empty;
    } catch (_e) {
      return true;
    }
  };

  return (
    <BubbleMenu
      editor={editor}
      shouldShow={shouldShow}
      className="resume-bubble-menu-wrapper"
    >
      <div className="resume-bubble-menu">
        <button
          type="button"
          aria-label="Bold"
          className={`rm-btn ${isBold ? "active" : ""}`}
          onMouseDown={(e) => e.preventDefault()} // prevent editor losing focus
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <strong>B</strong>
        </button>

        <button
          type="button"
          aria-label="Italic"
          className={`rm-btn ${isItalic ? "active" : ""}`}
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <em>I</em>
        </button>

        <button
          type="button"
          aria-label="Highlight"
          className={`rm-btn ${isHighlight ? "active" : ""}`}
          onMouseDown={(e) => e.preventDefault()}
        >
          <span style={{ fontWeight: 600 }}>H</span>
        </button>
      </div>
    </BubbleMenu>
  );
}
