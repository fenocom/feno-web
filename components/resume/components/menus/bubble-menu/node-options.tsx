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
                className={`p-1 min-w-8 h-8 rounded-md ${
                    editor.isActive("bold")
                        ? "bg-white/20 text-white"
                        : "text-neutral-400 hover:text-white"
                }`}
            >
                <IconBold size={18} />
            </Button>
            <Button
                isIconOnly
                size="sm"
                variant="ghost"
                onPress={() => editor.chain().focus().toggleItalic().run()}
                className={`p-1 min-w-8 h-8 rounded-md ${
                    editor.isActive("italic")
                        ? "bg-white/20 text-white"
                        : "text-neutral-400 hover:text-white"
                }`}
            >
                <IconItalic size={18} />
            </Button>
            <Button
                isIconOnly
                size="sm"
                variant="ghost"
                onPress={() => editor.chain().focus().toggleUnderline().run()}
                className={`p-1 min-w-8 h-8 rounded-md ${
                    editor.isActive("underline")
                        ? "bg-white/20 text-white"
                        : "text-neutral-400 hover:text-white"
                }`}
            >
                <IconUnderline size={18} />
            </Button>
        </div>
    );
};
