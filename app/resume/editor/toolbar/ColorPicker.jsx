"use client";

import { useState } from "react";
import { HexColorPicker } from "react-colorful";

export function ColorPicker({ onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [color, setColor] = useState("#6366F1");

  const handleColorChange = (value) => {
    setColor(value);
    onChange?.(value);
  };

  return (
    <div className="relative">
      <button
        type="button"
        className="flex h-9 items-center gap-2 rounded-md border border-slate-200 px-3 text-sm"
        onClick={() => setIsOpen((prev) => !prev)}
        style={{ background: color, color: "#fff" }}
      >
        Color
      </button>
      {isOpen ? (
        <div className="absolute right-0 z-20 mt-2 rounded-xl border border-slate-200 bg-white p-3 shadow-xl">
          <HexColorPicker color={color} onChange={handleColorChange} />
        </div>
      ) : null}
    </div>
  );
}
