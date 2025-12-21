import { Button, Input, Popover } from "@heroui/react";
import { IconLink, IconLinkOff } from "@tabler/icons-react";
import type { Editor } from "@tiptap/react";
import { useEffect, useState } from "react";

interface LinkSelectorProps {
        editor: Editor;
}

export const LinkSelector = ({ editor }: LinkSelectorProps) => {
        const [url, setUrl] = useState("");
        const [isOpen, setIsOpen] = useState(false);

        useEffect(() => {
                if (editor.state.selection.empty) {
                        setIsOpen(false);
                }
        }, [editor.state.selection]);

        const setLink = () => {
                if (url === "") {
                        editor.chain().focus().extendMarkRange("link").unsetLink().run();
                        setIsOpen(false);
                        return;
                }
                editor
                        .chain()
                        .focus()
                        .extendMarkRange("link")
                        .setLink({ href: url })
                        .run();
                setIsOpen(false);
        };

        const removeLink = () => {
                editor.chain().focus().unsetLink().run();
                setIsOpen(false);
        };

        const openPopover = () => {
                const previousUrl = editor.getAttributes("link").href;
                setUrl(previousUrl || "");
                setIsOpen(true);
        };

        return (
                <Popover isOpen={isOpen} onOpenChange={setIsOpen}>
                        <Popover.Trigger>
                                <Button
                                        isIconOnly
                                        size="sm"
                                        variant="ghost"
                                        onPress={openPopover}
                                        className={`p-1 min-w-8 h-8 rounded-md hover:bg-black/10 ${editor.isActive("link")
                                                ? "text-blue"
                                                : "text-fg-resting hover:text-fg-hovering"
                                                }`}
                                >
                                        <IconLink size={18} />
                                </Button>
                        </Popover.Trigger>
                        <Popover.Content
                                className="p-2 border border-black/10 shadow-lg rounded-xl"
                                placement="top"
                        >
                                <div className="flex gap-2 items-center">
                                        <Input
                                                placeholder="https://example.com"
                                                value={url}
                                                onChange={(e) => setUrl(e.target.value)}
                                                onKeyDown={(e) => {
                                                        if (e.key === "Enter") setLink();
                                                }}
                                                className="w-48"
                                        />
                                        <Button
                                                size="sm"
                                                variant="secondary"
                                                onPress={setLink}
                                        >
                                                <IconLink size={16} />
                                        </Button>
                                        {editor.isActive("link") && (
                                                <Button
                                                        size="sm"
                                                        isIconOnly
                                                        variant="secondary"
                                                        onPress={removeLink}
                                                        className="text-danger"
                                                >
                                                        <IconLinkOff size={16} />
                                                </Button>
                                        )}
                                </div>
                        </Popover.Content>
                </Popover>
        );
};
