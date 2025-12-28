"use client";

import { Button, Popover } from "@heroui/react";
import {
    IconAlignCenter,
    IconAlignLeft,
    IconAlignRight,
    IconBold,
    IconBoxPadding,
    IconChevronDown,
    IconItalic,
    IconTextSize,
    IconX,
} from "@tabler/icons-react";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useState } from "react";
import { ColorPicker } from "./color-picker";
import { SpacingControl } from "./spacing-control";

export interface ElementStyles {
    fontSize: string;
    fontFamily: string;
    fontWeight: string;
    fontStyle: string;
    color: string;
    backgroundColor: string;
    textAlign: string;
    paddingTop: string;
    paddingRight: string;
    paddingBottom: string;
    paddingLeft: string;
    marginTop: string;
    marginRight: string;
    marginBottom: string;
    marginLeft: string;
}

export interface SelectedElement {
    path: string;
    tagName: string;
    styles: ElementStyles;
    rect: { top: number; left: number; width: number; height: number };
}

interface BubbleMenuProps {
    element: SelectedElement | null;
    onStyleChange: (property: keyof ElementStyles, value: string) => void;
    onClose: () => void;
    containerRef: React.RefObject<HTMLDivElement | null>;
}

const FONT_FAMILIES = [
    { key: "inherit", label: "Default" },
    { key: "Inter, sans-serif", label: "Inter" },
    { key: "Georgia, serif", label: "Georgia" },
    { key: "ui-monospace, monospace", label: "Monospace" },
    { key: "'Playfair Display', serif", label: "Playfair" },
    { key: "system-ui, sans-serif", label: "System UI" },
];

const FONT_SIZES = [
    "12px",
    "14px",
    "16px",
    "18px",
    "20px",
    "24px",
    "28px",
    "32px",
    "36px",
    "48px",
    "64px",
];

type ActivePopover = "font" | "size" | "color" | "bg" | "spacing" | null;

export function BubbleMenu({
    element,
    onStyleChange,
    onClose,
    containerRef,
}: BubbleMenuProps) {
    const [activePopover, setActivePopover] = useState<ActivePopover>(null);

    const getMenuPosition = useCallback(() => {
        if (!element || !containerRef.current) return { top: 0, left: 0 };

        const containerRect = containerRef.current.getBoundingClientRect();
        const { rect } = element;

        // Position above the element
        let top = rect.top - 50;
        let left = rect.left + rect.width / 2;

        // Adjust if too close to top
        if (top < 10) {
            top = rect.top + rect.height + 10;
        }

        // Adjust horizontal position relative to container
        left = Math.max(200, Math.min(left, containerRect.width - 200));

        return { top, left };
    }, [element, containerRef]);

    if (!element) return null;

    const { top, left } = getMenuPosition();
    const styles = element.styles;

    const toggleBold = () => {
        const newWeight =
            styles.fontWeight === "700" || styles.fontWeight === "bold"
                ? "400"
                : "700";
        onStyleChange("fontWeight", newWeight);
    };

    const toggleItalic = () => {
        const newStyle = styles.fontStyle === "italic" ? "normal" : "italic";
        onStyleChange("fontStyle", newStyle);
    };

    const isBold = styles.fontWeight === "700" || styles.fontWeight === "bold";
    const isItalic = styles.fontStyle === "italic";

    const currentFontLabel =
        FONT_FAMILIES.find((f) =>
            styles.fontFamily?.includes(f.key.split(",")[0]),
        )?.label || "Font";
    const currentSizeLabel = styles.fontSize?.replace("px", "") || "16";

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="fixed z-[100] bg-white rounded-xl shadow-2xl border border-black/10 p-2 flex items-center gap-1"
                style={{ top, left, transform: "translateX(-50%)" }}
            >
                {/* Font Family */}
                <Popover
                    isOpen={activePopover === "font"}
                    onOpenChange={(open) =>
                        setActivePopover(open ? "font" : null)
                    }
                >
                    <Popover.Trigger>
                        <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 min-w-[80px] justify-between px-2 text-xs"
                        >
                            <span className="truncate">{currentFontLabel}</span>
                            <IconChevronDown size={12} />
                        </Button>
                    </Popover.Trigger>
                    <Popover.Content className="p-1 bg-white border border-black/10 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                        {FONT_FAMILIES.map((font) => (
                            <button
                                type="button"
                                key={font.key}
                                onClick={() => {
                                    onStyleChange("fontFamily", font.key);
                                    setActivePopover(null);
                                }}
                                className={clsx(
                                    "w-full text-left px-3 py-1.5 rounded text-sm transition-colors",
                                    styles.fontFamily?.includes(
                                        font.key.split(",")[0],
                                    )
                                        ? "bg-purple-500 text-white"
                                        : "hover:bg-black/5",
                                )}
                                style={{ fontFamily: font.key }}
                            >
                                {font.label}
                            </button>
                        ))}
                    </Popover.Content>
                </Popover>

                {/* Font Size */}
                <Popover
                    isOpen={activePopover === "size"}
                    onOpenChange={(open) =>
                        setActivePopover(open ? "size" : null)
                    }
                >
                    <Popover.Trigger>
                        <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 min-w-[50px] justify-between px-2 text-xs"
                        >
                            <span>{currentSizeLabel}</span>
                            <IconChevronDown size={12} />
                        </Button>
                    </Popover.Trigger>
                    <Popover.Content className="p-1 bg-white border border-black/10 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                        {FONT_SIZES.map((size) => (
                            <button
                                type="button"
                                key={size}
                                onClick={() => {
                                    onStyleChange("fontSize", size);
                                    setActivePopover(null);
                                }}
                                className={clsx(
                                    "w-full text-left px-3 py-1.5 rounded text-sm transition-colors",
                                    styles.fontSize === size
                                        ? "bg-purple-500 text-white"
                                        : "hover:bg-black/5",
                                )}
                            >
                                {size.replace("px", "")}
                            </button>
                        ))}
                    </Popover.Content>
                </Popover>

                <div className="w-px h-6 bg-black/10 mx-1" />

                {/* Bold */}
                <Button
                    isIconOnly
                    size="sm"
                    variant="ghost"
                    onPress={toggleBold}
                    className={clsx("min-w-8 w-8 h-8", isBold && "bg-black/10")}
                >
                    <IconBold size={16} />
                </Button>

                {/* Italic */}
                <Button
                    isIconOnly
                    size="sm"
                    variant="ghost"
                    onPress={toggleItalic}
                    className={clsx(
                        "min-w-8 w-8 h-8",
                        isItalic && "bg-black/10",
                    )}
                >
                    <IconItalic size={16} />
                </Button>

                <div className="w-px h-6 bg-black/10 mx-1" />

                {/* Text Alignment */}
                <Button
                    isIconOnly
                    size="sm"
                    variant="ghost"
                    onPress={() => onStyleChange("textAlign", "left")}
                    className={clsx(
                        "min-w-8 w-8 h-8",
                        styles.textAlign === "left" && "bg-black/10",
                    )}
                >
                    <IconAlignLeft size={16} />
                </Button>
                <Button
                    isIconOnly
                    size="sm"
                    variant="ghost"
                    onPress={() => onStyleChange("textAlign", "center")}
                    className={clsx(
                        "min-w-8 w-8 h-8",
                        styles.textAlign === "center" && "bg-black/10",
                    )}
                >
                    <IconAlignCenter size={16} />
                </Button>
                <Button
                    isIconOnly
                    size="sm"
                    variant="ghost"
                    onPress={() => onStyleChange("textAlign", "right")}
                    className={clsx(
                        "min-w-8 w-8 h-8",
                        styles.textAlign === "right" && "bg-black/10",
                    )}
                >
                    <IconAlignRight size={16} />
                </Button>

                <div className="w-px h-6 bg-black/10 mx-1" />

                {/* Text Color */}
                <Popover
                    isOpen={activePopover === "color"}
                    onOpenChange={(open) =>
                        setActivePopover(open ? "color" : null)
                    }
                >
                    <Popover.Trigger>
                        <Button
                            isIconOnly
                            size="sm"
                            variant="ghost"
                            className="min-w-8 w-8 h-8"
                        >
                            <div className="relative">
                                <IconTextSize size={16} />
                                <div
                                    className="absolute -bottom-0.5 left-0 right-0 h-1 rounded-full"
                                    style={{
                                        backgroundColor: styles.color || "#000",
                                    }}
                                />
                            </div>
                        </Button>
                    </Popover.Trigger>
                    <Popover.Content className="p-2 bg-white border border-black/10 rounded-lg shadow-lg">
                        <ColorPicker
                            color={styles.color || "#000000"}
                            onChange={(color) => onStyleChange("color", color)}
                        />
                    </Popover.Content>
                </Popover>

                {/* Background Color */}
                <Popover
                    isOpen={activePopover === "bg"}
                    onOpenChange={(open) =>
                        setActivePopover(open ? "bg" : null)
                    }
                >
                    <Popover.Trigger>
                        <Button
                            isIconOnly
                            size="sm"
                            variant="ghost"
                            className="min-w-8 w-8 h-8"
                        >
                            <div
                                className="w-4 h-4 rounded border border-black/20"
                                style={{
                                    backgroundColor:
                                        styles.backgroundColor || "transparent",
                                }}
                            />
                        </Button>
                    </Popover.Trigger>
                    <Popover.Content className="p-2 bg-white border border-black/10 rounded-lg shadow-lg">
                        <ColorPicker
                            color={styles.backgroundColor || "#ffffff"}
                            onChange={(color) =>
                                onStyleChange("backgroundColor", color)
                            }
                            showTransparent
                        />
                    </Popover.Content>
                </Popover>

                {/* Spacing */}
                <Popover
                    isOpen={activePopover === "spacing"}
                    onOpenChange={(open) =>
                        setActivePopover(open ? "spacing" : null)
                    }
                >
                    <Popover.Trigger>
                        <Button
                            isIconOnly
                            size="sm"
                            variant="ghost"
                            className="min-w-8 w-8 h-8"
                        >
                            <IconBoxPadding size={16} />
                        </Button>
                    </Popover.Trigger>
                    <Popover.Content className="p-3 bg-white border border-black/10 rounded-lg shadow-lg">
                        <SpacingControl
                            padding={{
                                top: styles.paddingTop,
                                right: styles.paddingRight,
                                bottom: styles.paddingBottom,
                                left: styles.paddingLeft,
                            }}
                            margin={{
                                top: styles.marginTop,
                                right: styles.marginRight,
                                bottom: styles.marginBottom,
                                left: styles.marginLeft,
                            }}
                            onPaddingChange={(side, value) => {
                                const prop =
                                    `padding${side.charAt(0).toUpperCase() + side.slice(1)}` as keyof ElementStyles;
                                onStyleChange(prop, value);
                            }}
                            onMarginChange={(side, value) => {
                                const prop =
                                    `margin${side.charAt(0).toUpperCase() + side.slice(1)}` as keyof ElementStyles;
                                onStyleChange(prop, value);
                            }}
                        />
                    </Popover.Content>
                </Popover>

                <div className="w-px h-6 bg-black/10 mx-1" />

                {/* Close */}
                <Button
                    isIconOnly
                    size="sm"
                    variant="ghost"
                    onPress={onClose}
                    className="min-w-8 w-8 h-8 text-black/50"
                >
                    <IconX size={16} />
                </Button>
            </motion.div>
        </AnimatePresence>
    );
}
