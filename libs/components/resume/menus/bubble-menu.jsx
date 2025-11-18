// libs/components/resume/menus/BubbleMenu.jsx
"use client";

import React from "react";
import { BubbleMenu } from "@tiptap/react/menus";
import { useEditorState } from "@tiptap/react";

/**
 * Global Bubble Menu for the resume editor.
 * - Uses BubbleMenu from '@tiptap/react/menus' (correct for tiptap v2)
 * - Shows Bold / Italic / Highlight buttons when selection present
 *
 * Props:
 *  - editor: the Tiptap editor instance
 */
export default function BubbleMenuGlobal({ editor }) {
  if (!editor) return null;

  // read active state for buttons (keeps UI in sync)
  const { isBold, isItalic, isHighlight } = useEditorState({
    editor,
    selector: (ctx) => ({
      isBold: ctx.editor.isActive("bold"),
      isItalic: ctx.editor.isActive("italic"),
      isHighlight: ctx.editor.isActive("highlight"),
    }),
  });

  // shouldShow default behavior is ok (shows for text selection),
  // but we can guard explicitly: only when selection has content
  const shouldShow = ({ editor }) => {
    try {
      // editor.state.selection.content()?.size > 0  (some builds don't include content())
      const { empty } = editor.state.selection;
      return !empty;
    } catch (e) {
      return true;
    }
  };

  return (
    <BubbleMenu
      editor={editor}
      // options shape here is passed to tippy via prop name 'tippyOptions'
      // note: older doc uses `options` — in v2 use `tippyOptions`
      tippyoptions={{ duration: 100, placement: "top", offset: [0, 8] }}
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
          onClick={() => editor.chain().focus().toggleHighlight().run()}
        >
          <span style={{ fontWeight: 600 }}>H</span>
        </button>
      </div>
    </BubbleMenu>
  );
}
