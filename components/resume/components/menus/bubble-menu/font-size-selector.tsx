import { Label, Slider } from "@heroui/react";

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
                    className="h-8 min-w-10 px-2 text-fg-resting hover:text-fg-hovering font-medium hover:bg-black/10"
                >
                    {currentSize}
                </Button>
            </Popover.Trigger>
            <Popover.Content
                className="px-3 py-2 bg-white border border-black/10 w-[200px] rounded-xl shadow-lg"
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
            className="w-full gap-1"
        >
            <Label>Font size</Label>
            <Slider.Track>
                <Slider.Fill />
                <Slider.Thumb />
            </Slider.Track>
        </Slider>
    );
}
