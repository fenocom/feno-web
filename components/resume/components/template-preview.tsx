"use client";

import { JSONContent } from "@tiptap/core";
import { ResumeEditor } from "./resume-editor";

interface TemplatePreviewProps {
        content?: JSONContent;
        className?: string;
        scale?: number;
}

export const TemplatePreview = ({
        content,
        className = "",
        scale = 0.25,
}: TemplatePreviewProps) => {
        const A4_WIDTH = 794;
        const A4_HEIGHT = 1123;

        return (
                <div
                        className={`relative overflow-hidden bg-white shadow-sm border border-black/10 rounded-lg ${className}`}
                        style={{
                                width: A4_WIDTH * scale,
                                height: A4_HEIGHT * scale,
                        }}
                >
                        <div
                                className="absolute top-0 left-0 origin-top-left pointer-events-none"
                                style={{
                                        transform: `scale(${scale})`,
                                        width: A4_WIDTH,
                                        height: A4_HEIGHT,
                                }}
                        >
                                <ResumeEditor initialContent={content} readOnly />
                        </div>
                        <div className="absolute inset-0 z-10" />
                </div>
        );
};
