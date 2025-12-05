"use client";

import * as Popover from "@radix-ui/react-popover";
import { HexColorPicker } from "react-colorful";

export function ColorPicker({ color, onChange }) {
    return (
        <Popover.Root>
            <Popover.Trigger asChild>
                <button
                    className="w-7 h-7 rounded-md border border-white/20 cursor-pointer"
                    style={{ backgroundColor: color }}
                />
            </Popover.Trigger>

            <Popover.Portal>
                <Popover.Content
                    side="top"
                    align="center"
                    sideOffset={8}
                    className="bg-neutral-800 p-3 rounded-lg shadow-xl relative"
                >
                    <HexColorPicker
                        color={color}
                        onChange={onChange}
                        className="w-[170px]! h-[150px]!"
                    />

                    <Popover.Arrow className="fill-neutral-800" />
                </Popover.Content>
            </Popover.Portal>
        </Popover.Root>
    );
}
