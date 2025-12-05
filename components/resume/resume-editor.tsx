"use client";

import "./styles/resume-editor.css";

import { EditorContent, useEditor } from "@tiptap/react";
import { extensionsConfig } from "./extensions/config";
import BubbleMenuGlobal from "./menus/bubble-menu";
import { template as classicTemplate } from "./templates/classic/template";

export const ResumeEditor = () => {
    const editor = useEditor({
        content: classicTemplate,
        immediatelyRender: false,
        extensions: extensionsConfig as any, // Temporary fix for Tiptap extension type incompatibility
    });

    return (
        <>
            {editor && <BubbleMenuGlobal editor={editor} />}
            <div className="resume-page-export" id="resume-print-root">
                <EditorContent
                    id="resume-container"
                    className="w-[210mm] p-0 min-h-[297mm] outline-none box-border nodrag"
                    editor={editor}
                />
            </div>
        </>
    );
};
