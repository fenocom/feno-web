import { Popover } from "@heroui/react";
import { HexColorPicker } from "react-colorful";

interface ColorPickerProps {
    color: string;
    onChange: (color: string) => void;
}

export function ColorPicker({ color, onChange }: ColorPickerProps) {
    return (
        <Popover>
            <Popover.Trigger>
                <div
                    role="button"
                    tabIndex={0}
                    className="w-7 h-7 rounded-md border border-white/20 cursor-pointer"
                    style={{ backgroundColor: color }}
                />
            </Popover.Trigger>
            <Popover.Content
                placement="top"
                className="p-0 border-none bg-transparent shadow-none"
            >
                <div className="bg-neutral-800 p-3 rounded-lg shadow-xl relative">
                    <HexColorPicker
                        color={color}
                        onChange={onChange}
                        className="w-[170px]! h-[150px]!"
                    />
                    <div className="absolute left-1/2 -bottom-2 -translate-x-1/2 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-neutral-800" />
                </div>
            </Popover.Content>
        </Popover>
    );
}
