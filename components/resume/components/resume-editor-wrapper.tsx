"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AuroraBorder } from "./aurora-border";

interface ResumeEditorWrapperProps {
    children: React.ReactNode;
    isAiGenerating?: boolean;
}

export function ResumeEditorWrapper({
    children,
    isAiGenerating = false,
}: ResumeEditorWrapperProps) {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [showLeftShadow, setShowLeftShadow] = useState(false);
    const [showRightShadow, setShowRightShadow] = useState(false);

    const checkScroll = useCallback(() => {
        if (!scrollContainerRef.current) return;
        const { scrollLeft, scrollWidth, clientWidth } =
            scrollContainerRef.current;
        setShowLeftShadow(scrollLeft > 0);
        setShowRightShadow(scrollLeft < scrollWidth - clientWidth - 1);
    }, []);

    useEffect(() => {
        checkScroll();
        window.addEventListener("resize", checkScroll);
        return () => window.removeEventListener("resize", checkScroll);
    }, [checkScroll]);

    return (
        <AuroraBorder
            isActive={isAiGenerating}
            className="h-fit max-w-full z-10"
        >
            <div className="resume-inner-container p-1 border border-black/5 relative bg-black/5 rounded-xl backdrop-blur-sm transition-colors duration-300 focus-within:bg-blue-500/5 focus-within:border-blue-500/20 h-fit max-w-full">
                <div className="resume-scroll-container relative rounded-lg border border-black/5 overflow-hidden">
                    <div
                        ref={scrollContainerRef}
                        className="overflow-x-auto"
                        onScroll={checkScroll}
                    >
                        <div className="min-w-fit">{children}</div>
                    </div>
                    <div
                        className={`no-print pointer-events-none absolute top-0 left-0 bottom-0 w-8 bg-linear-to-r from-black/5 to-transparent z-10 transition-opacity duration-300 ${showLeftShadow ? "opacity-100" : "opacity-0"}`}
                    />
                    <div
                        className={`no-print pointer-events-none absolute top-0 right-0 bottom-0 w-8 bg-linear-to-l from-black/5 to-transparent z-10 transition-opacity duration-300 ${showRightShadow ? "opacity-100" : "opacity-0"}`}
                    />
                </div>
                <div className="no-print top-0 left-0 absolute pointer-events-none w-full h-full bg-[url('/noise.png')] bg-repeat bg-size-[50px] rounded-xl z-[-1]" />
            </div>
        </AuroraBorder>
    );
}
