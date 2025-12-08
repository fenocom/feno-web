import { Button, Popover } from "@heroui/react";
import { IconColorPicker, IconHighlight } from "@tabler/icons-react";
import type { Editor } from "@tiptap/react";
import { HexColorPicker } from "react-colorful";

interface ColorSelectorProps {
    editor: Editor;
    type: "text" | "highlight";
}

export const ColorSelector = ({ editor, type }: ColorSelectorProps) => {
    const attribute = type === "text" ? "textStyle" : "highlight";
    const currentColor =
        type === "text"
            ? editor.getAttributes("textStyle")?.color || "#000000"
            : editor.getAttributes("highlight")?.color || "transparent";

    const label = type === "text" ? "Text Color" : "Highlight Color";
    const Icon = type === "text" ? IconColorPicker : IconHighlight;

    const handleChange = (color: string) => {
        if (type === "text") {
            editor.chain().focus().setColor(color).run();
        } else {
            editor.chain().focus().setHighlight({ color: color }).run();
        }
    };

    return (
        <Popover>
            <Popover.Trigger>
                <Button
                    isIconOnly
                    size="sm"
                    variant="ghost"
                    className="p-1 min-w-8 h-8 rounded-md text-neutral-400 hover:text-white"
                >
                    <Icon
                        size={18}
                        style={{
                            color: type === "text" ? currentColor : undefined,
                        }}
                    />
                    {type === "highlight" && currentColor !== "transparent" && (
                        <div
                            className="absolute bottom-1 right-1 w-2 h-2 rounded-full border border-neutral-800"
                            style={{ backgroundColor: currentColor }}
                        />
                    )}
                </Button>
            </Popover.Trigger>
            <Popover.Content
                className="p-0 border-none bg-transparent shadow-none"
                placement="top"
            >
                <div className="bg-neutral-800 p-3 rounded-lg shadow-xl relative">
                    <HexColorPicker
                        color={
                            currentColor === "transparent"
                                ? "#ffffff"
                                : currentColor
                        }
                        onChange={handleChange}
                        className="w-[170px]! h-[150px]!"
                    />
                    <div className="flex gap-1 mt-2 flex-wrap w-[170px]">
                        {[
                            "#000000",
                            "#ffffff",
                            "#ef4444",
                            "#eab308",
                            "#22c55e",
                            "#3b82f6",
                            "#a855f7",
                        ].map((c) => (
                            <button
                                key={c}
                                className="w-5 h-5 rounded-full border border-white/20"
                                style={{ backgroundColor: c }}
                                onClick={() => handleChange(c)}
                            />
                        ))}
                        {type === "highlight" && (
                            <button
                                className="w-5 h-5 rounded-full border border-white/20 bg-transparent flex items-center justify-center relative overflow-hidden"
                                onClick={() =>
                                    editor
                                        .chain()
                                        .focus()
                                        .unsetHighlight()
                                        .run()
                                }
                                title="No Highlight"
                            >
                                <div className="absolute inset-0 border-t border-red-500 rotate-45 transform origin-center top-1/2" />
                            </button>
                        )}
                    </div>
                </div>
            </Popover.Content>
        </Popover>
    );
};
