"use client";

import { Button } from "@heroui/react";
import clsx from "clsx";
import { useState } from "react";

interface ColorPickerProps {
    color: string;
    onChange: (color: string) => void;
    showTransparent?: boolean;
}

const PRESET_COLORS = [
    "#000000",
    "#374151",
    "#6b7280",
    "#9ca3af",
    "#ffffff",
    "#ef4444",
    "#f97316",
    "#eab308",
    "#22c55e",
    "#14b8a6",
    "#3b82f6",
    "#8b5cf6",
    "#ec4899",
    "#f43f5e",
    "#0ea5e9",
    "#6366f1",
];

export function ColorPicker({
    color,
    onChange,
    showTransparent,
}: ColorPickerProps) {
    const [inputValue, setInputValue] = useState(color);

    const handleInputChange = (value: string) => {
        setInputValue(value);
        if (/^#[0-9A-Fa-f]{6}$/.test(value) || value === "transparent") {
            onChange(value);
        }
    };

    const handleInputBlur = () => {
        if (
            !/^#[0-9A-Fa-f]{6}$/.test(inputValue) &&
            inputValue !== "transparent"
        ) {
            setInputValue(color);
        }
    };

    return (
        <div className="w-48">
            <div className="grid grid-cols-8 gap-1 mb-3">
                {PRESET_COLORS.map((presetColor) => (
                    <button
                        key={presetColor}
                        type="button"
                        onClick={() => {
                            onChange(presetColor);
                            setInputValue(presetColor);
                        }}
                        className={clsx(
                            "w-5 h-5 rounded border border-black/10 transition-transform hover:scale-110",
                            color === presetColor &&
                                "ring-2 ring-blue-500 ring-offset-1",
                        )}
                        style={{ backgroundColor: presetColor }}
                    />
                ))}
            </div>

            {showTransparent && (
                <Button
                    size="sm"
                    variant="ghost"
                    className="w-full mb-2 text-xs"
                    onPress={() => {
                        onChange("transparent");
                        setInputValue("transparent");
                    }}
                >
                    Transparent
                </Button>
            )}

            <div className="flex gap-2 items-center">
                <div
                    className="w-8 h-8 rounded border border-black/10 flex-shrink-0"
                    style={{
                        backgroundColor:
                            color === "transparent" ? "transparent" : color,
                    }}
                />
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => handleInputChange(e.target.value)}
                    onBlur={handleInputBlur}
                    placeholder="#000000"
                    className="flex-1 px-2 py-1 text-sm border border-black/10 rounded focus:outline-none focus:ring-1 focus:ring-purple-500"
                />
            </div>
        </div>
    );
}
