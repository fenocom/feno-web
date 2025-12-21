"use client";

import { Button, Tooltip } from "@heroui/react";
import {
    IconArrowsMaximize,
    IconArrowsMinimize,
    IconX,
} from "@tabler/icons-react";

interface HeaderProps {
    onClose: () => void;
    isExpanded: boolean;
    onToggleExpand: () => void;
}

export const Header = ({ onClose, isExpanded, onToggleExpand }: HeaderProps) => (
    <div className="flex items-center justify-between gap-4 px-4 py-2 border-b border-black/5 shrink-0 h-[52px]">
        <div className="flex items-center gap-4 flex-1">
            <h3 className="text-lg font-semibold whitespace-nowrap">Templates</h3>
        </div>
        <div className="flex items-center gap-2">
            <Tooltip>
                <Tooltip.Trigger>
                    <Button
                        variant="ghost"
                        isIconOnly
                        size="sm"
                        onPress={onToggleExpand}
                    >
                        {isExpanded ? (
                            <IconArrowsMinimize size={20} />
                        ) : (
                            <IconArrowsMaximize size={20} />
                        )}
                    </Button>
                </Tooltip.Trigger>
                <Tooltip.Content>
                    <p>{isExpanded ? "Collapse" : "Expand view"}</p>
                </Tooltip.Content>
            </Tooltip>
            <Button isIconOnly variant="ghost" size="sm" onPress={onClose}>
                <IconX size={20} />
            </Button>
        </div>
    </div>
);
