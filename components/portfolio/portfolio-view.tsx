"use client";

import type { DeviceType } from "./portfolio-page";
import { motion } from "framer-motion";

interface PortfolioViewProps {
    html: string;
    device: DeviceType;
}

const deviceWidths: Record<DeviceType, string> = {
    desktop: "100%",
    tablet: "768px",
    mobile: "375px",
};

export function PortfolioView({ html, device }: PortfolioViewProps) {
    const width = deviceWidths[device];
    const isFullWidth = device === "desktop";

    return (
        <div className="flex-1 w-full flex items-start justify-center py-6 pb-24 overflow-auto">
            <motion.div
                className="bg-white shadow-2xl overflow-hidden"
                initial={false}
                animate={{
                    width,
                    borderRadius: isFullWidth ? 0 : 16,
                }}
                transition={{ type: "spring", bounce: 0.15, duration: 0.4 }}
                style={{
                    height: isFullWidth ? "100vh" : "auto",
                    minHeight: isFullWidth ? "100vh" : "80vh",
                }}
            >
                <iframe
                    srcDoc={html}
                    className="w-full h-full border-none"
                    style={{ minHeight: isFullWidth ? "100vh" : "80vh" }}
                    title="Portfolio Preview"
                />
            </motion.div>
        </div>
    );
}
