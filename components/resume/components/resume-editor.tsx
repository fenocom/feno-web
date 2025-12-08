"use client";

import "../styles/resume-editor.css";

import type { Editor, Extensions } from "@tiptap/core";
import { EditorContent, useEditor } from "@tiptap/react";
import { forwardRef, useImperativeHandle } from "react";
import { extensionsConfig } from "../extensions/config";
import BubbleMenuGlobal from "../components/menus/bubble-menu";
import { template as classicTemplate } from "../templates/classic/template";

export type ResumeEditorRef = {
    editor: Editor | null;
    exportPdf: () => void;
    addPage: () => void;
};

export const ResumeEditor = forwardRef<ResumeEditorRef, unknown>(
    (_props, ref) => {
        const editor = useEditor({
            content: classicTemplate,
            immediatelyRender: false,
            extensions: extensionsConfig as Extensions,
            editorProps: {
                attributes: {
                    class: "outline-none p-0",
                },
            },
        });

        useImperativeHandle(ref, () => ({
            editor: editor,
            exportPdf: () => {
                window.print();
            },
            addPage: () => {
                if (!editor) return;
                const endPos = editor.state.doc.content.size;
                editor
                    .chain()
                    .insertContentAt(endPos, {
                        type: "page",
                        attrs: { format: "a4", backgroundColor: "#ffffff" },
                        content: [{ type: "paragraph" }],
                    })
                    .run();
            },
        }));

        return (
            <>
                {editor && <BubbleMenuGlobal editor={editor} />}
                <div className="resume-page-export" id="resume-print-root">
                    <EditorContent
                        id="resume-container"
                        className="outline-none"
                        editor={editor}
                    />
                </div>
            </>
        );
    },
);
