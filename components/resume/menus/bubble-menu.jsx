"use client";

import { BubbleMenu } from "@tiptap/react/menus";
import { useEditorState } from "@tiptap/react";
import { useState, useEffect } from "react";
import TypographyDropdown from "../../common/typography-dropdown";
import { Button, Slider } from "@radix-ui/themes";
import { Bold, Italic, Link as LinkIcon, Link2Off } from "lucide-react";
import { FontSlider } from "../../common/slider/index"
import { ColorPicker } from "../../atoms/color-picker";

import "./style.css";

export default function BubbleMenuGlobal({ editor }) {
  if (!editor) return null;

  const editorState = useEditorState({
    editor,
    selector: (ctx) => ({
      isBold: ctx.editor.isActive("bold"),
      isItalic: ctx.editor.isActive("italic"),
      isLink: ctx.editor.isActive("link"),
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

  const setLink = () => {
    const prev = editor.getAttributes("link").href;
    const url = window.prompt("Enter URL", prev || "");
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    try {
      editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
    } catch {}
  };

  const unsetLink = () => {
    editor.chain().focus().unsetLink().run();
  };

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
        <ColorPicker color={editorState.color} onChange={(c) => applyColor(c)} />

        <TypographyDropdown editor={editor} currentFont={editorState.fontFamily} />

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
          <Bold size={16} />
        </Button>

        <Button
          size="1"
          className={`bm-btn ${editorState.isItalic ? "active" : ""}`}
          onMouseDown={stopBubble}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <Italic size={16} />
        </Button>

        <Button
          size="1"
          className={`bm-btn ${editorState.isLink ? "active" : ""}`}
          onMouseDown={stopBubble}
          onClick={setLink}
        >
          <LinkIcon size={16} />
        </Button>

        <Button
          size="1"
          className="bm-btn"
          onMouseDown={stopBubble}
          disabled={!editorState.isLink}
          onClick={unsetLink}
        >
          <Link2Off size={16} />
        </Button>

        <div className="slider-wrapper" onMouseDown={stopBubble}>
          <FontSlider value={fontSize} onChange={applyFontSize} />
        </div>
      </div>
    </BubbleMenu>
  );
}
