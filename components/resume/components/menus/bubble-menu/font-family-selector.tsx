import { Button, Input, Popover, Spinner } from "@heroui/react";
import { IconChevronDown } from "@tabler/icons-react";
import type { Editor } from "@tiptap/react";
import { useEffect, useMemo, useState } from "react";

interface FontFamilySelectorProps {
    editor: Editor;
}

interface WebFont {
    family: string;
    category: string;
    variants: string[];
}

const POPULAR_FONTS = [
    "Inter",
    "Arial",
    "Helvetica",
    "Times New Roman",
    "Georgia",
    "Garamond",
    "Courier New",
    "Verdana",
];

export const FontFamilySelector = ({ editor }: FontFamilySelectorProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [fonts, setFonts] = useState<WebFont[]>([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);

    const currentFont =
        editor.getAttributes("textStyle")?.fontFamily || "Inter";
    // Strip quotes and fallback fonts for display
    const displayFont = currentFont.split(",")[0].replace(/['"]/g, "");

    useEffect(() => {
        if (editor.state.selection.empty) {
            setIsOpen(false);
        }
    }, [editor.state.selection]);

    useEffect(() => {
        const fetchFonts = async () => {
            if (fonts.length > 0) return;
            setLoading(true);
            try {
                const res = await fetch("/api/fonts");
                const data = await res.json();
                if (data.items) {
                    setFonts(data.items);
                }
            } catch (error) {
                console.error("Failed to fetch fonts", error);
            } finally {
                setLoading(false);
            }
        };

        if (isOpen) {
            fetchFonts();
        }
    }, [isOpen, fonts.length]);

    const filteredFonts = useMemo(() => {
        if (!search) return fonts;
        return fonts.filter((font) =>
            font.family.toLowerCase().includes(search.toLowerCase()),
        );
    }, [fonts, search]);

    const paginatedFonts = useMemo(() => {
        const ITEMS_PER_PAGE = 20;
        return filteredFonts.slice(0, page * ITEMS_PER_PAGE);
    }, [filteredFonts, page]);

    useEffect(() => {
        // Dynamically load the current font if it's not a standard web font
        const isStandard = POPULAR_FONTS.includes(displayFont);
        if (!isStandard && displayFont) {
            const fontId = `font-${displayFont.replace(/\s+/g, "-").toLowerCase()}`;
            if (!document.getElementById(fontId)) {
                const link = document.createElement("link");
                link.id = fontId;
                link.href = `https://fonts.googleapis.com/css2?family=${displayFont.replace(/ /g, "+")}&display=swap`;
                link.rel = "stylesheet";
                document.head.appendChild(link);
            }
        }
    }, [displayFont]);

    const handleFontSelect = (fontFamily: string) => {
        editor.chain().focus().setMark("textStyle", { fontFamily }).run();
        setIsOpen(false);
    };

    return (
        <Popover isOpen={isOpen} onOpenChange={setIsOpen}>
            <Popover.Trigger>
                <Button
                    size="sm"
                    variant="ghost"
                    className="h-8 min-w-[120px] justify-between text-neutral-400 hover:text-white px-2 font-normal"
                >
                    <span className="truncate max-w-[100px]">
                        {displayFont}
                    </span>
                    <IconChevronDown size={14} className="text-neutral-500" />
                </Button>
            </Popover.Trigger>
            <Popover.Content
                className="p-0 bg-neutral-900 border border-neutral-800 w-[240px] overflow-hidden"
                placement="bottom"
            >
                <div className="p-2 border-b border-neutral-800">
                    <Input
                        placeholder="Search fonts..."
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setPage(1);
                        }}
                    />
                </div>
                <div
                    className="h-[280px] w-full p-1 overflow-y-auto"
                    onScroll={(e) => {
                        const { scrollTop, scrollHeight, clientHeight } =
                            e.currentTarget;
                        if (
                            scrollHeight - scrollTop <= clientHeight + 50 &&
                            !loading
                        ) {
                            setPage((prev) => prev + 1);
                        }
                    }}
                >
                    {/* Standard/Popular Fonts Section */}
                    {!search && (
                        <div className="mb-2">
                            <div className="px-2 py-1 text-[10px] uppercase text-neutral-500 font-semibold tracking-wider">
                                Popular
                            </div>
                            {POPULAR_FONTS.map((font) => (
                                <button
                                    type="button"
                                    key={font}
                                    onClick={() => handleFontSelect(font)}
                                    className={`w-full text-left px-2 py-1.5 rounded-md text-sm transition-colors flex items-center justify-between group ${currentFont.includes(font)
                                        ? "bg-white/10 text-white"
                                        : "text-neutral-400 hover:bg-white/5 hover:text-white"
                                        }`}
                                    style={{ fontFamily: font }}
                                >
                                    {font}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Google Fonts Section */}
                    {fonts.length > 0 && (
                        <div>
                            {!search && (
                                <div className="px-2 py-1 text-[10px] uppercase text-neutral-500 font-semibold tracking-wider">
                                    Google Fonts
                                </div>
                            )}
                            {paginatedFonts.map((font) => (
                                <button
                                    type="button"
                                    key={font.family}
                                    onClick={() =>
                                        handleFontSelect(font.family)
                                    }
                                    className={`w-full text-left px-2 py-1.5 rounded-md text-sm transition-colors flex items-center justify-between group ${currentFont.includes(font.family)
                                        ? "bg-white/10 text-white"
                                        : "text-neutral-400 hover:bg-white/5 hover:text-white"
                                        }`}
                                >
                                    {font.family}
                                </button>
                            ))}
                            <div className="h-4 w-full flex justify-center items-center">
                                {loading && (
                                    <Spinner size="sm" color="current" />
                                )}
                            </div>
                        </div>
                    )}

                    {!loading && fonts.length === 0 && (
                        <div className="p-4 text-center text-neutral-500 text-xs">
                            Loading fonts...
                        </div>
                    )}
                </div>
            </Popover.Content>
        </Popover>
    );
};
