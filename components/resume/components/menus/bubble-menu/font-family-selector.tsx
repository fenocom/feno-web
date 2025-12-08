import { Button, Dropdown, DropdownItem, DropdownMenu } from "@heroui/react";
import { IconChevronDown } from "@tabler/icons-react";
import { type Editor } from "@tiptap/react";

const FONT_OPTIONS = [
    { label: "Inter", value: "Inter, sans-serif" },
    { label: "Arial", value: "Arial, sans-serif" },
    { label: "Helvetica", value: "Helvetica, sans-serif" },
    { label: "Times New Roman", value: "Times New Roman, serif" },
    { label: "Georgia", value: "Georgia, serif" },
    { label: "Garamond", value: "Garamond, serif" },
    { label: "Courier New", value: "Courier New, monospace" },
    { label: "Verdana", value: "Verdana, sans-serif" },
];

interface FontFamilySelectorProps {
    editor: Editor;
}

export const FontFamilySelector = ({ editor }: FontFamilySelectorProps) => {
    const currentFont = editor.getAttributes("textStyle")?.fontFamily || "Inter";
    const currentLabel = FONT_OPTIONS.find((f) => f.value === currentFont)?.label || "Font";

    return (
        <Dropdown>
            <Dropdown.Trigger>
                <span className="truncate max-w-[80px]">{currentLabel}</span>
                <IconChevronDown size={14} />
            </Dropdown.Trigger>
            <Dropdown.Menu
                aria-label="Font Family Selection"
                className="max-h-60 overflow-y-auto bg-neutral-900 border border-neutral-800 rounded-lg p-1"
            >
                {FONT_OPTIONS.map((font) => (
                    <Dropdown.Item
                        key={font.value}
                        onPress={() => editor.chain().focus().setMark("textStyle", { fontFamily: font.value }).run()}
                        style={{ fontFamily: font.value }}
                    >
                        {font.label}
                    </Dropdown.Item>
                ))}
            </Dropdown.Menu>
        </Dropdown>
    );
};
