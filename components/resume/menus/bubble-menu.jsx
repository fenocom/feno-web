"use client";

import { BubbleMenu } from "@tiptap/react/menus";
import { useEditorState } from "@tiptap/react";
import { useState, useEffect } from "react";
import TypographyDropdown from "./typography-dropdown";
import "./style.css";

export default function BubbleMenuGlobal({ editor }) {
  if (!editor) return null;

  const editorState = useEditorState({
    editor,
    selector: (ctx) => ({
      isBold: ctx.editor.isActive("bold"),
      isItalic: ctx.editor.isActive("italic"),
      fontSize:
        parseInt(
          ctx.editor.getAttributes("textStyle")?.fontSize?.replace("px", "")
        ) || 16,
      color: ctx.editor.getAttributes("textStyle")?.color || "#000000",
      fontFamily: ctx.editor.getAttributes("textStyle")?.fontFamily || "",
    }),
  });

  const [fontSize, setFontSize] = useState(16);

  useEffect(() => setFontSize(editorState.fontSize), [editorState.fontSize]);

  const shouldShow = ({ editor }) => !editor.state.selection.empty;

  const applyFontSize = (size) => {
    setFontSize(size);
    editor
      .chain()
      .focus()
      .setMark("textStyle", { fontSize: `${size}px` })
      .run();
  };

  const applyColor = (c) => {
    editor.chain().focus().setColor(c).run();
  };

  return (
    <BubbleMenu
      editor={editor}
      shouldShow={shouldShow}
      className="bubble-wrap"
      tippyoptions={{
        interactive: true,
        duration: 0,
        hideOnClick: false,
        placement: "top",
      }}
    >
      <div className="bubble-menu">

        {/* 🎨 Color */}
        <input
          type="color"
          className="color-picker"
          value={editorState.color}
          onMouseDown={(e) => e.preventDefault()}
          onInput={(e) => applyColor(e.target.value)}
        />

        {/* Aa Font-Family Dropdown */}
        <TypographyDropdown
          editor={editor}
          currentFont={editorState.fontFamily}
        />

        {/* Font size number */}
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

        {/* Slider */}
        <div className="slider-wrapper">
          <input
            type="range"
            min={8}
            max={64}
            value={fontSize}
            onChange={(e) => applyFontSize(parseInt(e.target.value))}
            onMouseDown={(e) => e.preventDefault()}
            className="font-slider"
          />
        </div>
      </div>
    </BubbleMenu>
  );
}
