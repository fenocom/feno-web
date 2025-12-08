import { FontSlider } from "@/components/common/slider";
import { Button, Popover } from "@heroui/react";
import { type Editor } from "@tiptap/react";
import { useState } from "react";

interface FontSizeSelectorProps {
    editor: Editor;
}

export const FontSizeSelector = ({ editor }: FontSizeSelectorProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const currentSize = Number.parseInt(
        editor.getAttributes("textStyle")?.fontSize?.replace("px", "")
    ) || 16;

    const handleSizeChange = (size: number) => {
        editor.chain().focus().setFontSize(`${size}px`).run();
    };

    return (
        <Popover isOpen={isOpen} onOpenChange={setIsOpen}>
            <Popover.Trigger>
                <Button
                    size="sm"
                    variant="ghost"
                    onPress={() => setIsOpen(true)}
                    className="h-8 min-w-[40px] px-2 text-neutral-400 hover:text-white font-medium"
                >
                    {currentSize}
                </Button>
            </Popover.Trigger>
            <Popover.Content className="p-4 bg-neutral-900 border border-neutral-800 w-48" placement="top">
                <FontSlider value={currentSize} onChange={handleSizeChange} />
            </Popover.Content>
        </Popover>
    );
};
