import { Button } from "@heroui/react";
import { IconBold, IconItalic, IconUnderline } from "@tabler/icons-react";
import type { Editor } from "@tiptap/react";

interface NodeOptionsProps {
    editor: Editor;
}

export const NodeOptions = ({ editor }: NodeOptionsProps) => {
    return (
        <div className="flex items-center gap-1">
            <Button
                isIconOnly
                size="sm"
                variant="ghost"
                onPress={() => editor.chain().focus().toggleBold().run()}
                className={`p-1 min-w-8 h-8 rounded-md hover:bg-black/10 ${
                    editor.isActive("bold")
                        ? "text-blue"
                        : "text-fg-resting hover:text-fg-hovering"
                }`}
            >
                <IconBold size={18} />
            </Button>
            <Button
                isIconOnly
                size="sm"
                variant="ghost"
                onPress={() => editor.chain().focus().toggleItalic().run()}
                className={`p-1 min-w-8 h-8 rounded-md hover:bg-black/10 ${
                    editor.isActive("italic")
                        ? "text-blue"
                        : "text-fg-resting hover:text-fg-hovering"
                }`}
            >
                <IconItalic size={18} />
            </Button>
            <Button
                isIconOnly
                size="sm"
                variant="ghost"
                onPress={() => editor.chain().focus().toggleUnderline().run()}
                className={`p-1 min-w-8 h-8 rounded-md hover:bg-black/10 ${
                    editor.isActive("underline")
                        ? "text-blue"
                        : "text-fg-resting hover:text-fg-hovering"
                }`}
            >
                <IconUnderline size={18} />
            </Button>
        </div>
    );
};
