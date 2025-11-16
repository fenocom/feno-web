"use client";

import { useState } from "react";
import { ResumeEditor } from "./resume-editor";
import { ResumeStyleSelector } from "./resume-style-selector";
import type { ResumeStyle } from "./resume-types";

export function ResumeBuilder() {
    const [selectedStyle, setSelectedStyle] = useState<ResumeStyle>("minimalist");

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Style Selector - Floating at the top */}
            <div className="fixed top-4 left-4 z-50 print:hidden">
                <ResumeStyleSelector
                    selectedStyle={selectedStyle}
                    onStyleChange={setSelectedStyle}
                />
            </div>

            {/* Resume Editor - Full screen WYSIWYG */}
            <ResumeEditor style={selectedStyle} />
        </div>
    );
}
