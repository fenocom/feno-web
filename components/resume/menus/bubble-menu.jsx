"use client";

import { BubbleMenu } from "@tiptap/react/menus";
import { useEditorState } from "@tiptap/react";
import { useState, useEffect } from "react";
import TypographyDropdown from "./typography-dropdown";
import { Button } from "@radix-ui/themes";
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
    editor.chain().focus().setFontSize(size + "px").run();
  };

  const applyColor = (color) => {
    editor.chain().focus().setColor(color).run();
  };

  const stopBubble = (e) => e.stopPropagation();

  return (
    <BubbleMenu
      editor={editor}
      shouldShow={shouldShow}
      className="bubble-wrap"
      tippyOptions={{
        interactive: true,
        duration: 0,
        hideOnClick: false,
        placement: "top",
      }}
    >
      <div className="bubble-menu" onMouseDown={stopBubble}>

        <input
          type="color"
          className="color-picker"
          value={editorState.color}
          onMouseDown={stopBubble}
          onChange={(e) => applyColor(e.target.value)}
        />

        <TypographyDropdown
          editor={editor}
          currentFont={editorState.fontFamily}
        />

        <input
          type="number"
          min={8}
          max={64}
          className="font-size-input"
          value={fontSize}
          onMouseDown={stopBubble}
          onChange={(e) => applyFontSize(parseInt(e.target.value))}
        />

        <Button
          size="1"
          className={`bm-btn ${editorState.isBold ? "active" : ""}`}
          onMouseDown={stopBubble}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          B
        </Button>

        <Button
          size="1"
          className={`bm-btn ${editorState.isItalic ? "active" : ""}`}
          onMouseDown={stopBubble}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          I
        </Button>

        <div className="slider-wrapper">
          <input
            type="range"
            min={8}
            max={64}
            className="font-slider"
            value={fontSize}
            onMouseDown={stopBubble}
            onChange={(e) => applyFontSize(parseInt(e.target.value))}
          />
        </div>

      </div>
    </BubbleMenu>
  );
}
