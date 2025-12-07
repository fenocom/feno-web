"use client";

import "./styles/resume-editor.css";

import type { Editor, Extensions } from "@tiptap/core";
import { EditorContent, useEditor } from "@tiptap/react";
import { forwardRef, useImperativeHandle } from "react";
import { extensionsConfig } from "../extensions/config";
import BubbleMenuGlobal from "../menus/bubble-menu";
import { template as classicTemplate } from "../templates/classic/template";

export type ResumeEditorRef = {
    editor: Editor | null;
};

export const ResumeEditor = forwardRef<ResumeEditorRef, unknown>(
    (_props, ref) => {
        const editor = useEditor({
            content: classicTemplate,
            immediatelyRender: false,
            extensions: extensionsConfig as Extensions,
        });

        useImperativeHandle(ref, () => ({
            editor: editor,
        }));

        return (
            <>
                {editor && <BubbleMenuGlobal editor={editor} />}
                <div className="resume-page-export" id="resume-print-root">
                    <EditorContent
                        id="resume-container"
                        className="w-[210mm] p-0 min-h-[297mm] bg-white outline-none! border-0! box-border nodrag"
                        editor={editor}
                    />
                </div>
            </>
        );
    },
);
