"use client";

import "../styles/resume-editor.css";

import type { Editor, Extensions, JSONContent } from "@tiptap/core";
import { EditorContent, useEditor } from "@tiptap/react";
import { forwardRef, useEffect, useImperativeHandle } from "react";
import { extensionsConfig } from "../extensions/config";
import { template as classicTemplate } from "../templates/classic/template";
import { BubbleMenuGlobal } from "./menus/bubble-menu";

export type ResumeEditorRef = {
	editor: Editor | null;
	exportPdf: () => void;
	addPage: () => void;
};

interface ResumeEditorProps {
	initialContent?: JSONContent;
	readOnly?: boolean;
}

export const ResumeEditor = forwardRef<ResumeEditorRef, ResumeEditorProps>(
	({ initialContent, readOnly = false }, ref) => {
		const editor = useEditor({
			content: initialContent || classicTemplate,
			immediatelyRender: false,
			editable: !readOnly,
			extensions: extensionsConfig as Extensions,
			editorProps: {
				attributes: {
					class: "outline-none p-0",
				},
			},
		});

		// Update editable state if readOnly prop changes
		useEffect(() => {
			if (editor) {
				editor.setEditable(!readOnly);
			}
		}, [editor, readOnly]);

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
				{editor && !readOnly && <BubbleMenuGlobal editor={editor} />}
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
