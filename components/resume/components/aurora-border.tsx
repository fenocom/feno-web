"use client";

import { motion } from "framer-motion";
import { AiGradient } from "./ai-gradient";

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
                    className="absolute inset-0 rounded-xl z-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <AiGradient />
                </motion.div>
            )}
            <div className="relative z-10">{children}</div>
        </div>
    );
}
