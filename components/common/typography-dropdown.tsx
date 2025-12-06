import { Popover } from "@heroui/react";
import { IconCheck } from "@tabler/icons-react";
import type { Editor } from "@tiptap/react";

const FONT_OPTIONS = [
    { label: "Inter", value: "Inter, sans-serif" },
    { label: "Georgia", value: "Georgia, serif" },
    { label: "Times New Roman", value: "Times New Roman, serif" },
    { label: "Mono", value: "ui-monospace, monospace" },
];

interface TypographyDropdownProps {
    editor: Editor;
    currentFont: string;
}

export default function TypographyDropdown({ editor, currentFont }: TypographyDropdownProps) {
    return (
        <Popover>
            <Popover.Trigger>
                <button
                    className="bm-btn text-white"
                    onMouseDown={(e) => e.preventDefault()}
                >
                    Aa
                </button>
            </Popover.Trigger>
            <Popover.Content
                placement="bottom"
                className="z-999 bg-white text-black shadow-lg border rounded-lg p-2 w-48"
            >
                <div className="flex flex-col gap-1">
                    {FONT_OPTIONS.map((f) => (
                        <button
                            key={f.value}
                            style={{ fontFamily: f.value }}
                            className="flex items-center justify-between px-3 py-1.5 rounded hover:bg-gray-100 text-sm cursor-pointer"
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={() => {
                                editor
                                    .chain()
                                    .focus()
                                    .setMark("textStyle", {
                                        fontFamily: f.value,
                                    })
                                    .run();
                            }}
                        >
                            {f.label}
                            {currentFont === f.value && <IconCheck size={16} />}
                        </button>
                    ))}
                </div>
            </Popover.Content>
        </Popover>
    );
}
