"use client";

import { BubbleMenu } from "@tiptap/react/menus";
import { useEditorState } from "@tiptap/react";
import { useState, useEffect } from "react";
import "./style.css"

export default function BubbleMenuGlobal({ editor }) {
  if (!editor) return null;

  // ---- GET ACTIVE STATE FROM EDITOR ----
  const editorState = useEditorState({
    editor,
    selector: (ctx) => {
      return {
        isBold: ctx.editor.isActive("bold"),
        isItalic: ctx.editor.isActive("italic"),

        // Read font size mark
        fontSize:
          parseInt(
            ctx.editor.getAttributes("textStyle")?.fontSize?.replace("px", "")
          ) || 16,

        // Text color detection
        color: ctx.editor.getAttributes("textStyle")?.color || "#000000",
      };
    },
  });

  const [fontSize, setFontSize] = useState(16);

  // Sync React fontSize state with editor state
  useEffect(() => {
    setFontSize(editorState.fontSize);
  }, [editorState.fontSize]);

  // ---- Should show only when text is selected ----
  const shouldShow = ({ editor }) => {
    const { empty } = editor.state.selection;
    return !empty;
  };

  const applyFontSize = (size) => {
    setFontSize(size);
    editor.chain().focus().setMark("textStyle", { fontSize: `${size}px` }).run();
  };

  const applyColor = (color) => {
    editor.chain().focus().setColor(color).run();
  };

  return (
    <BubbleMenu editor={editor} shouldShow={shouldShow} className="bubble-wrap">
      <div className="bubble-menu">

        {/* 🎨 Color Picker */}
        <input
          type="color"
          className="color-picker"
          value={editorState.color}
          onMouseDown={(e) => e.preventDefault()}
          onInput={(e) => applyColor(e.target.value)}
        />

        {/* Aa Typography (placeholder button) */}
        <button className="bm-btn" onMouseDown={(e) => e.preventDefault()}>
          Aa
        </button>

        {/* Font Size Number Input */}
        <input
          type="number"
          min={8}
          max={64}
          className="font-size-input"
          value={fontSize}
          onMouseDown={(e) => e.preventDefault()}
          onChange={(e) => applyFontSize(parseInt(e.target.value))}
        />

        {/* Bold */}
        <button
          className={`bm-btn ${editorState.isBold ? "active" : ""}`}
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          B
        </button>

        {/* Italic */}
        <button
          className={`bm-btn ${editorState.isItalic ? "active" : ""}`}
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          I
        </button>

        {/* More */}
        <button className="bm-btn" onMouseDown={(e) => e.preventDefault()}>
          …
        </button>

        {/* ---- SLIDER (Below the menu) ---- */}
        <div className="slider-wrapper">
          <input
            type="range"
            min={8}
            max={64}
            value={fontSize}
            className="font-slider"
            onMouseDown={(e) => e.preventDefault()}
            onChange={(e) => applyFontSize(parseInt(e.target.value))}
          />
        </div>
      </div>
    </BubbleMenu>
  );
}