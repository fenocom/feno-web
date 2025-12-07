"use client";

import { useRef } from "react";
import { DottedBackground } from "./dotted-bg";
import Toolbar from "./menus/toolbar";
import { ResumeEditor, type ResumeEditorRef } from "./components/resume-editor";

export const ResumePage = () => {
    const editorRef = useRef<ResumeEditorRef>(null);
    return (
        <div className="relative w-full min-h-screen flex items-center justify-center px-10 py-20">
            <DottedBackground />
            <div className="p-1 border border-black/5 relative bg-black/5 rounded-xl z-10 backdrop-blur-sm transition-colors duration-300 focus-within:bg-blue-500/5 focus-within:border-blue-500/20">
                <div className="overflow-hidden rounded-lg border border-black/5">
                    <ResumeEditor ref={editorRef} />
                </div>
                <div className="top-0 left-0 absolute pointer-events-none w-full h-full bg-[url('/noise.png')] bg-repeat bg-size-[50px]" />
            </div>
            <div className="relative z-10">
                <Toolbar />
            </div>
        </div>
    );
};
