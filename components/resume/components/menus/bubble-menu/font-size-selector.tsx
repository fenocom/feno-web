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
                    className="h-8 min-w-[40px] px-2 text-fg-resting hover:text-fg-hovering font-medium hover:bg-black/10"
                >
                    {currentSize}
                </Button>
            </Popover.Trigger>
            <Popover.Content
                className="p-4 bg-white border border-black/10 w-[162px] rounded-xl shadow-lg"
                placement="top"
            >
                <div className="flex flex-col gap-3">
                    <div className="text-center text-lg font-medium text-fg-hovering">
                        {currentSize}px
                    </div>
                    <FontSlider value={currentSize} onChange={handleSizeChange} />
                </div>
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
            <Slider.Track className="h-1.5 bg-black/10 rounded-full">
                <Slider.Fill className="bg-blue rounded-full" />
                <Slider.Thumb className="w-4 h-4 bg-white border-2 border-blue rounded-full shadow-md" />
            </Slider.Track>
        </Slider>
    );
}
