"use client";

import { motion } from "framer-motion";

const BLOBS = [
    {
        color: "radial-gradient(circle, rgba(160,124,254,0.9) 0%, rgba(160,124,254,0.7) 50%, transparent 70%)",
        position: { top: "-20%", left: "-20%" },
    },
    {
        color: "radial-gradient(circle, rgba(254,143,181,0.9) 0%, rgba(254,143,181,0.7) 50%, transparent 70%)",
        position: { top: "-20%", right: "-20%" },
    },
    {
        color: "radial-gradient(circle, rgba(255,190,123,0.9) 0%, rgba(255,190,123,0.7) 50%, transparent 70%)",
        position: { bottom: "-20%", right: "-20%" },
    },
    {
        color: "radial-gradient(circle, rgba(160,124,254,0.9) 0%, rgba(254,143,181,0.7) 50%, transparent 70%)",
        position: { bottom: "-20%", left: "-20%" },
    },
];

export function AiGradient() {
    return (
        <div className="absolute inset-0 overflow-hidden rounded-xl">
            <motion.div
                className="absolute inset-0 scale-[2]"
                animate={{ rotate: 360 }}
                transition={{
                    duration: 12,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                }}
            >
            {BLOBS.map((blob, index) => (
                <motion.div
                    key={index}
                    className="absolute w-[70%] h-[70%] rounded-full blur-3xl"
                    style={{
                        background: blob.color,
                        ...blob.position,
                    }}
                    animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.7, 1, 0.7],
                    }}
                    transition={{
                        duration: 4,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                        delay: index * 0.5,
                    }}
                />
            ))}
            </motion.div>
        </div>
    );
}
