import { Slider } from "@heroui/react";

interface FontSliderProps {
    value: number;
    onChange: (value: number) => void;
    min?: number;
    max?: number;
}
import { Button, Popover } from "@heroui/react";
import type { Editor } from "@tiptap/react";
import { useEffect, useState } from "react";

interface FontSizeSelectorProps {
    editor: Editor;
}

export const FontSizeSelector = ({ editor }: FontSizeSelectorProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const currentSize =
        Number.parseInt(
            editor.getAttributes("textStyle")?.fontSize?.replace("px", ""),
        ) || 16;

    const handleSizeChange = (size: number) => {
        editor.chain().focus().setFontSize(`${size}px`).run();
    };
    useEffect(() => {
        if (editor.state.selection.empty) {
            setIsOpen(false);
        }
    }, [editor.state.selection]);
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
            <Popover.Content
                className="p-4 bg-neutral-900 border border-neutral-800 w-48"
                placement="top"
            >
                <FontSlider value={currentSize} onChange={handleSizeChange} />
            </Popover.Content>
        </Popover>
    );
};

export function FontSlider({
    value,
    onChange,
    min = 8,
    max = 64,
}: FontSliderProps) {
    return (
        <Slider
            minValue={min}
            maxValue={max}
            value={value}
            onChange={(v) => onChange(v as number)}
            step={1}
            aria-label="Font Size"
            className="w-full"
        >
            <Slider.Track className="h-1 bg-black rounded-full border border-transparent">
                <Slider.Fill className="bg-white rounded-full" />
                <Slider.Thumb className="w-3.5 h-3.5 bg-white border border-black rounded-full shadow-sm" />
            </Slider.Track>
        </Slider>
    );
}
