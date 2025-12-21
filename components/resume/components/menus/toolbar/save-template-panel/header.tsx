"use client";

import { Button } from "@heroui/react";
import { IconX } from "@tabler/icons-react";

interface HeaderProps {
    onClose: () => void;
}

export const Header = ({ onClose }: HeaderProps) => (
    <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-black">Save as Template</h3>
        <Button isIconOnly variant="ghost" size="sm" onPress={onClose}>
            <IconX size={18} />
        </Button>
    </div>
);
