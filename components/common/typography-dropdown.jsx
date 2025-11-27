"use client";

import * as Popover from "@radix-ui/react-popover";
import { Check } from "lucide-react";

const FONT_OPTIONS = [
  { label: "Inter", value: "Inter, sans-serif" },
  { label: "Georgia", value: "Georgia, serif" },
  { label: "Times New Roman", value: "Times New Roman, serif" },
  { label: "Mono", value: "ui-monospace, monospace" },
];

export default function TypographyDropdown({ editor, currentFont }) {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button className="bm-btn" onMouseDown={(e) => e.preventDefault()}>
          Aa
        </button>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          side="bottom"
          align="start"
          sideOffset={6}
          className="z-[999] bg-white text-black shadow-lg border rounded-lg p-2 w-48"
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <div className="flex flex-col gap-1">
            {FONT_OPTIONS.map((f) => (
              <button
                key={f.value}
                style={{ fontFamily: f.value }}
                className="flex items-center justify-between px-3 py-1.5 rounded hover:bg-gray-100 text-sm"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => {
                  editor
                    .chain()
                    .focus()
                    .setMark("textStyle", { fontFamily: f.value })
                    .run();
                }}
              >
                {f.label}
                {currentFont === f.value && <Check size={16} />}
              </button>
            ))}
          </div>
          <Popover.Arrow className="fill-white" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
