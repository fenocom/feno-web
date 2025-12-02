"use client";

import { motion } from "framer-motion";

// --- Shared Styles ---
const strokeColor = "#a1ccff";
const strokeOpacity = 0.2;
const activeColor = "#a1ccff";

export const SchematicResume = () => {
    return (
        <div className="w-full h-full flex items-center justify-center bg-[#000510]">
            <svg width="100%" height="100%" viewBox="0 0 400 300" className="w-full h-full">
                <defs>
                    <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                        <path d="M 20 0 L 0 0 0 20" fill="none" stroke={strokeColor} strokeWidth="0.5" strokeOpacity="0.1" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />

                {/* Nodes */}
                <motion.g
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                >
                    {/* Central Node */}
                    <circle cx="200" cy="150" r="20" stroke={activeColor} strokeWidth="2" fill="none" />
                    <circle cx="200" cy="150" r="8" fill={activeColor} fillOpacity="0.5" />

                    {/* Connected Nodes */}
                    {[
                        { cx: 120, cy: 80 },
                        { cx: 280, cy: 80 },
                        { cx: 120, cy: 220 },
                        { cx: 280, cy: 220 },
                        { cx: 60, cy: 150 },
                        { cx: 340, cy: 150 },
                    ].map((node, i) => (
                        <g key={i}>
                            <motion.line
                                x1="200"
                                y1="150"
                                x2={node.cx}
                                y2={node.cy}
                                stroke={strokeColor}
                                strokeWidth="1"
                                strokeOpacity={strokeOpacity}
                                initial={{ pathLength: 0 }}
                                whileInView={{ pathLength: 1 }}
                                transition={{ duration: 1, delay: i * 0.1 }}
                            />
                            <motion.circle
                                cx={node.cx}
                                cy={node.cy}
                                r="12"
                                stroke={strokeColor}
                                strokeWidth="1.5"
                                fill="#000510"
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                            />
                        </g>
                    ))}
                </motion.g>
            </svg>
        </div>
    );
};

export const SchematicPrism = () => {
    return (
        <div className="w-full h-full flex items-center justify-center bg-[#000510]">
            <svg width="100%" height="100%" viewBox="0 0 400 300" className="w-full h-full">
                {/* Input Beam */}
                <motion.path
                    d="M 0 150 L 180 150"
                    stroke="white"
                    strokeWidth="2"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1 }}
                />

                {/* Prism Triangle */}
                <motion.path
                    d="M 200 50 L 280 250 L 120 250 Z"
                    stroke={activeColor}
                    strokeWidth="2"
                    fill="none"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                />

                {/* Refracted Beams */}
                {[
                    { color: "#a1ccff", d: "M 240 150 L 400 100" },
                    { color: "#c084fc", d: "M 240 150 L 400 150" },
                    { color: "#34d399", d: "M 240 150 L 400 200" },
                ].map((beam, i) => (
                    <motion.path
                        key={i}
                        d={beam.d}
                        stroke={beam.color}
                        strokeWidth="2"
                        initial={{ pathLength: 0, opacity: 0 }}
                        whileInView={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 1, delay: 1 + i * 0.2 }}
                    />
                ))}
            </svg>
        </div>
    );
};

export const SchematicBrowser = () => {
    return (
        <div className="w-full h-full flex items-center justify-center bg-[#000510]">
            <svg width="100%" height="100%" viewBox="0 0 400 300" className="w-full h-full">
                {/* Browser Window */}
                <rect x="50" y="50" width="300" height="200" rx="8" stroke={strokeColor} strokeWidth="1" fill="#000510" strokeOpacity="0.3" />
                <line x1="50" y1="80" x2="350" y2="80" stroke={strokeColor} strokeWidth="1" strokeOpacity="0.3" />

                {/* UI Elements */}
                <rect x="70" y="100" width="100" height="10" rx="2" fill={strokeColor} fillOpacity="0.1" />
                <rect x="70" y="120" width="200" height="6" rx="2" fill={strokeColor} fillOpacity="0.1" />
                <rect x="70" y="135" width="180" height="6" rx="2" fill={strokeColor} fillOpacity="0.1" />

                {/* Ghost Overlay */}
                <motion.g
                    initial={{ x: -20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 1, repeat: Infinity, repeatType: "reverse", repeatDelay: 2 }}
                >
                    <rect x="250" y="180" width="80" height="30" rx="4" stroke="#fbbf24" strokeWidth="1" fill="none" />
                    <text x="290" y="200" textAnchor="middle" fill="#fbbf24" fontSize="10" fontFamily="monospace">APPLY</text>

                    {/* Cursor */}
                    <path d="M 300 220 L 310 230 L 305 232 L 300 220" fill="#fbbf24" />
                </motion.g>
            </svg>
        </div>
    );
};

export const SchematicRadar = () => {
    return (
        <div className="w-full h-full flex items-center justify-center bg-[#000510]">
            <svg width="100%" height="100%" viewBox="0 0 400 300" className="w-full h-full">
                {/* Radar Circles */}
                {[1, 2, 3, 4].map((r) => (
                    <circle key={r} cx="200" cy="150" r={r * 30} stroke={strokeColor} strokeWidth="1" fill="none" strokeOpacity="0.1" />
                ))}

                {/* Scanning Line */}
                <motion.line
                    x1="200"
                    y1="150"
                    x2="200"
                    y2="30"
                    stroke="#10b981"
                    strokeWidth="2"
                    initial={{ rotate: 0 }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    style={{ originX: "200px", originY: "150px" }}
                />

                {/* Blips */}
                <motion.circle
                    cx="240" cy="110" r="4" fill="#10b981"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                />
                <motion.circle
                    cx="160" cy="180" r="4" fill="#10b981"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
                />
            </svg>
        </div>
    );
};
