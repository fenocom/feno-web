"use client";

interface SpacingControlProps {
    padding: { top: string; right: string; bottom: string; left: string };
    margin: { top: string; right: string; bottom: string; left: string };
    onPaddingChange: (
        side: "top" | "right" | "bottom" | "left",
        value: string,
    ) => void;
    onMarginChange: (
        side: "top" | "right" | "bottom" | "left",
        value: string,
    ) => void;
}

function parsePixelValue(value: string): string {
    const num = Number.parseInt(value, 10);
    return Number.isNaN(num) ? "0" : String(num);
}

function SpacingInput({
    value,
    onChange,
    label,
}: {
    value: string;
    onChange: (value: string) => void;
    label: string;
}) {
    const numValue = parsePixelValue(value);

    return (
        <div className="flex flex-col items-center gap-0.5">
            <span className="text-[10px] text-black/40 uppercase">{label}</span>
            <input
                type="text"
                value={numValue}
                onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, "");
                    onChange(`${val}px`);
                }}
                className="w-10 px-1 py-0.5 text-center text-xs border border-black/10 rounded focus:outline-none focus:ring-1 focus:ring-purple-500"
            />
        </div>
    );
}

export function SpacingControl({
    padding,
    margin,
    onPaddingChange,
    onMarginChange,
}: SpacingControlProps) {
    return (
        <div className="space-y-4">
            {/* Margin */}
            <div>
                <div className="text-xs font-medium text-black/60 mb-2">
                    Margin
                </div>
                <div className="relative bg-orange-50 border border-orange-200 rounded-lg p-2">
                    <div className="flex justify-center mb-1">
                        <SpacingInput
                            value={margin.top}
                            onChange={(v) => onMarginChange("top", v)}
                            label="T"
                        />
                    </div>
                    <div className="flex justify-between items-center">
                        <SpacingInput
                            value={margin.left}
                            onChange={(v) => onMarginChange("left", v)}
                            label="L"
                        />
                        <div className="w-16 h-8 bg-blue-50 border border-blue-200 rounded flex items-center justify-center text-[10px] text-blue-400">
                            padding
                        </div>
                        <SpacingInput
                            value={margin.right}
                            onChange={(v) => onMarginChange("right", v)}
                            label="R"
                        />
                    </div>
                    <div className="flex justify-center mt-1">
                        <SpacingInput
                            value={margin.bottom}
                            onChange={(v) => onMarginChange("bottom", v)}
                            label="B"
                        />
                    </div>
                </div>
            </div>

            {/* Padding */}
            <div>
                <div className="text-xs font-medium text-black/60 mb-2">
                    Padding
                </div>
                <div className="relative bg-blue-50 border border-blue-200 rounded-lg p-2">
                    <div className="flex justify-center mb-1">
                        <SpacingInput
                            value={padding.top}
                            onChange={(v) => onPaddingChange("top", v)}
                            label="T"
                        />
                    </div>
                    <div className="flex justify-between items-center">
                        <SpacingInput
                            value={padding.left}
                            onChange={(v) => onPaddingChange("left", v)}
                            label="L"
                        />
                        <div className="w-12 h-6 bg-white border border-black/10 rounded flex items-center justify-center text-[10px] text-black/30">
                            content
                        </div>
                        <SpacingInput
                            value={padding.right}
                            onChange={(v) => onPaddingChange("right", v)}
                            label="R"
                        />
                    </div>
                    <div className="flex justify-center mt-1">
                        <SpacingInput
                            value={padding.bottom}
                            onChange={(v) => onPaddingChange("bottom", v)}
                            label="B"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
