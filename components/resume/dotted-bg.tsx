"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { useEffect, useRef } from "react";

export const DottedBackground = () => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!containerRef.current) return;
            const { left, top } = containerRef.current.getBoundingClientRect();
            mouseX.set(e.clientX - left);
            mouseY.set(e.clientY - top);
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    const maskImage = useMotionTemplate`radial-gradient(circle 200px at ${mouseX}px ${mouseY}px, black, transparent)`;

    return (
        <div
            ref={containerRef}
            className="absolute inset-0 overflow-hidden pointer-events-none"
        >
            <div className="absolute inset-0 pointer-events-none select-none">
                <svg
                    className="w-full h-full"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <defs>
                        <pattern
                            id="dot-pattern-grey"
                            x="0"
                            y="0"
                            width="15"
                            height="15"
                            patternUnits="userSpaceOnUse"
                        >
                            <circle
                                cx="1"
                                cy="1"
                                r="1"
                                fill="#000000"
                                fillOpacity="0.07"
                            />
                        </pattern>
                    </defs>
                    <rect
                        width="100%"
                        height="100%"
                        fill="url(#dot-pattern-grey)"
                    />
                </svg>
            </div>

            <motion.div
                className="absolute inset-0 pointer-events-none select-none"
                style={{
                    maskImage,
                    WebkitMaskImage: maskImage,
                }}
            >
                <svg
                    className="w-full h-full"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <defs>
                        <pattern
                            id="dot-pattern-blue"
                            x="0"
                            y="0"
                            width="15"
                            height="15"
                            patternUnits="userSpaceOnUse"
                        >
                            <circle
                                cx="1"
                                cy="1"
                                r="1"
                                fill="#1148b8"
                                fillOpacity="0.3"
                            />
                        </pattern>
                    </defs>
                    <rect
                        width="100%"
                        height="100%"
                        fill="url(#dot-pattern-blue)"
                    />
                </svg>
            </motion.div>
        </div>
    );
};
