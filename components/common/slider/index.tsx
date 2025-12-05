import { Slider } from "@heroui/react";

interface FontSliderProps {
    value: number;
    onChange: (value: number) => void;
    min?: number;
    max?: number;
}

export function FontSlider({ value, onChange, min = 8, max = 64 }: FontSliderProps) {
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
