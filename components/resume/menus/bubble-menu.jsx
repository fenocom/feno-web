"use client";

import { BubbleMenu } from "@tiptap/react/menus";
import { useEditorState } from "@tiptap/react";
import { useState, useEffect } from "react";
import TypographyDropdown from "../../common/typography-dropdown";
import { Button } from "@radix-ui/themes";
import { Bold, Italic, Link as LinkIcon, Link2Off } from "lucide-react";
import { FontSlider } from "../../common/slider";
import { ColorPicker } from "../../atoms/color-picker";

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
      className="z-[9999]"
      tippyOptions={{
        interactive: true,
        duration: 0,
        hideOnClick: false,
        placement: "top",
      }}
    >
      <div
        className="relative flex items-center gap-2 bg-[#2f2f2f] px-4 py-2 rounded-xl"
        onMouseDown={stopBubble}
      >
        <ColorPicker color={editorState.color} onChange={(c) => applyColor(c)} />

        <TypographyDropdown editor={editor} currentFont={editorState.fontFamily} />

        <input
          type="number"
          min={8}
          max={64}
          value={fontSize}
          onMouseDown={stopBubble}
          onChange={(e) => applyFontSize(parseInt(e.target.value))}
          className="w-10 h-7 bg-[#444] text-white text-sm rounded-md text-center focus:outline-none"
        />

        <Button
          size="1"
          onMouseDown={stopBubble}
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-1 rounded-md ${
            editorState.isBold ? "bg-white/20" : "bg-transparent"
          } text-white`}
        >
          <Bold size={16} />
        </Button>

        <Button
          size="1"
          onMouseDown={stopBubble}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-1 rounded-md ${
            editorState.isItalic ? "bg-white/20" : "bg-transparent"
          } text-white`}
        >
          <Italic size={16} />
        </Button>

        <Button
          size="1"
          onMouseDown={stopBubble}
          onClick={setLink}
          className={`p-1 rounded-md ${
            editorState.isLink ? "bg-white/20" : "bg-transparent"
          } text-white`}
        >
          <LinkIcon size={16} />
        </Button>

        <Button
          size="1"
          onMouseDown={stopBubble}
          disabled={!editorState.isLink}
          onClick={unsetLink}
          className="p-1 rounded-md text-white disabled:opacity-30"
        >
          <Link2Off size={16} />
        </Button>

        <div className="absolute w-[140px] -top-6 left-1/2 -translate-x-1/2">
          <FontSlider value={fontSize} onChange={applyFontSize} />
        </div>
      </div>
    </BubbleMenu>
  );
}
