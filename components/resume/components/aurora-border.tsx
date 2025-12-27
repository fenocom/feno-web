"use client";

import { motion } from "framer-motion";

interface AuroraBorderProps {
    isActive: boolean;
    children: React.ReactNode;
    className?: string;
}

export function AuroraBorder({
    isActive,
    children,
    className = "",
}: AuroraBorderProps) {
    return (
        <div className={`relative ${className}`}>
            {isActive && (
                <motion.div
                    className="absolute -inset-[2px] rounded-xl z-0 overflow-hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        className="absolute inset-0"
                        style={{
                            background: `conic-gradient(
                                from 0deg,
                                #3b82f6,
                                #8b5cf6,
                                #ec4899,
                                #f43f5e,
                                #f97316,
                                #eab308,
                                #22c55e,
                                #14b8a6,
                                #06b6d4,
                                #3b82f6
                            )`,
                        }}
                        animate={{ rotate: 360 }}
                        transition={{
                            duration: 3,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "linear",
                        }}
                    />
                    <div className="absolute inset-[2px] rounded-[10px] bg-white" />
                </motion.div>
            )}
            <div className="relative z-10">{children}</div>
        </div>
    );
}
