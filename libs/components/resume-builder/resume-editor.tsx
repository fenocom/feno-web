"use client";

import { Button } from "@/libs/ui/button";
import { ResumeHeader } from "@/libs/ui/tiptap/extensions/resume-header";
import { ResumeSection } from "@/libs/ui/tiptap/extensions/resume-section";
import {
    IconDeviceFloppy,
    IconDownload,
    IconPrinter,
} from "@tabler/icons-react";
import { Link } from "@tiptap/extension-link";
import { Placeholder } from "@tiptap/extension-placeholder";
import { EditorContent, useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import { useEffect } from "react";
import { getResumeTemplate } from "./resume-templates";
import { ResumeBubbleMenu } from "./resume-bubble-menu";
import type { ResumeStyle } from "./resume-types";
import "./resume-styles.css";

interface ResumeEditorProps {
    style: ResumeStyle;
}

export function ResumeEditor({ style }: ResumeEditorProps) {
    const template = getResumeTemplate(style);
    const initialContent = template.initialContent;

    const editor = useEditor({
        immediatelyRender: false,
        extensions: [
            StarterKit.configure({
                heading: {
                    levels: [1, 2, 3],
                },
            }),
            Link.configure({
                openOnClick: false,
                autolink: true,
            }),
            Placeholder.configure({
                placeholder: "Start typing your resume...",
            }),
            ResumeSection.configure({
                editable: true,
            }),
            ResumeHeader,
        ],
        content: initialContent,
        editorProps: {
            attributes: {
                class: template.editorClass,
            },
            handleDOMEvents: {
                mousedown: (_view, event) => {
                    const target = event.target as HTMLElement;
                    // Prevent editing on non-editable elements
                    if (
                        target.hasAttribute("contenteditable") &&
                        target.getAttribute("contenteditable") === "false"
                    ) {
                        event.preventDefault();
                        return true;
                    }
                    // Prevent editing on section titles
                    if (
                        target.classList.contains("resume-section-title") ||
                        target.closest(".resume-section-title")
                    ) {
                        event.preventDefault();
                        return true;
                    }
                    return false;
                },
                keydown: (view, event) => {
                    const { selection } = view.state;
                    const { $from } = selection;
                    const dom = view.nodeDOM($from.pos - 1) as HTMLElement;
                    
                    // Prevent typing in section titles
                    if (
                        dom?.classList?.contains("resume-section-title") ||
                        dom?.closest?.(".resume-section-title")
                    ) {
                        if (
                            !event.ctrlKey &&
                            !event.metaKey &&
                            event.key !== "ArrowLeft" &&
                            event.key !== "ArrowRight" &&
                            event.key !== "ArrowUp" &&
                            event.key !== "ArrowDown" &&
                            event.key !== "Home" &&
                            event.key !== "End"
                        ) {
                            event.preventDefault();
                            return true;
                        }
                    }
                    return false;
                },
            },
        },
        onUpdate: () => {
            // Content updated
        },
    });

    useEffect(() => {
        if (editor && initialContent) {
            editor.commands.setContent(initialContent);
        }
    }, [editor, initialContent]);

    useEffect(() => {
        if (!editor) return;

        const handleProfilePictureClick = (e: Event) => {
            const target = e.target as HTMLElement;
            if (
                target.closest("#profile-picture-upload") ||
                target.id === "profile-picture-upload"
            ) {
                e.preventDefault();
                const input = document.createElement("input");
                input.type = "file";
                input.accept = "image/*";
                input.onchange = (event) => {
                    const file = (event.target as HTMLInputElement)
                        .files?.[0];
                    if (file) {
                        const reader = new FileReader();
                        reader.onload = (e) => {
                            const imageUrl = e.target?.result as string;
                            const profilePic = document.querySelector(
                                "#profile-picture-upload .resume-profile-placeholder",
                            );
                            if (profilePic) {
                                // Create image element safely without innerHTML
                                const img = document.createElement("img");
                                img.src = imageUrl;
                                img.alt = "Profile";
                                img.style.width = "100%";
                                img.style.height = "100%";
                                img.style.objectFit = "cover";
                                profilePic.innerHTML = ""; // Clear existing content
                                profilePic.appendChild(img);
                            }
                        };
                        reader.readAsDataURL(file);
                    }
                };
                input.click();
            }
        };

        const editorElement = editor.view.dom;
        editorElement.addEventListener("click", handleProfilePictureClick);

        return () => {
            editorElement.removeEventListener(
                "click",
                handleProfilePictureClick,
            );
        };
    }, [editor]);

    const handleSave = () => {
        if (!editor) return;
        const content = editor.getHTML();
        const blob = new Blob([content], { type: "text/html" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "resume.html";
        a.click();
        URL.revokeObjectURL(url);
    };

    const handlePrint = () => {
        window.print();
    };

    const handleDownloadPDF = () => {
        // This would require a PDF generation library
        // For now, we'll just print
        handlePrint();
    };

    if (!editor) {
        return <div>Loading editor...</div>;
    }

    return (
        <div className="relative w-full">
            {/* Floating Action Buttons */}
            <div className="fixed top-4 right-4 z-50 flex gap-2 print:hidden">
                <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleSave}
                    className="bg-white shadow-lg hover:shadow-xl"
                >
                    <IconDeviceFloppy size={16} className="mr-2" />
                    Save
                </Button>
                <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handlePrint}
                    className="bg-white shadow-lg hover:shadow-xl"
                >
                    <IconPrinter size={16} className="mr-2" />
                    Print
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={handleDownloadPDF}
                    className="bg-white shadow-lg hover:shadow-xl"
                >
                    <IconDownload size={16} className="mr-2" />
                    PDF
                </Button>
            </div>

            {/* Resume Paper - looks like the actual resume */}
            <div className="resume-paper-container">
                <div className={template.wrapperClass}>
                    <ResumeBubbleMenu editor={editor} />
                    <EditorContent editor={editor} />
                </div>
            </div>
        </div>
    );
}
