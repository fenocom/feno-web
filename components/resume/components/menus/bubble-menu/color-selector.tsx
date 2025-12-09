import { Button, Popover } from "@heroui/react";
import { IconColorPicker, IconHighlight } from "@tabler/icons-react";
import type { Editor } from "@tiptap/react";
import { useEffect, useState } from "react";
import { HexColorPicker } from "react-colorful";

interface ColorSelectorProps {
    editor: Editor;
    type: "text" | "highlight";
}

export const ColorSelector = ({ editor, type }: ColorSelectorProps) => {
    const currentColor =
        type === "text"
            ? editor.getAttributes("textStyle")?.color || "#000000"
            : editor.getAttributes("highlight")?.color || "transparent";

    const Icon = type === "text" ? IconColorPicker : IconHighlight;

    const handleChange = (color: string) => {
        if (type === "text") {
            editor.chain().focus().setColor(color).run();
        } else {
            editor.chain().focus().setHighlight({ color: color }).run();
        }
    };

    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (editor.state.selection.empty) {
            setIsOpen(false);
        }
    }, [editor.state.selection]);

    return (
        <Popover isOpen={isOpen} onOpenChange={setIsOpen}>
            <Popover.Trigger>
                <Button
                    isIconOnly
                    size="sm"
                    variant="ghost"
                    className="p-1 min-w-8 h-8 text-white rounded-md hover:bg-white/10"

                >
                    <Icon
                        size={18}
                        className="text-white"
                    />
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
                                type="button"
                                key={c}
                                className="w-5 h-5 rounded-full border border-white/20"
                                style={{ backgroundColor: c }}
                                onClick={() => handleChange(c)}
                            />
                        ))}
                        {type === "highlight" && (
                            <button
                                type="button"
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
