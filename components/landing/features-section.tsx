"use client";

import { motion } from "framer-motion";
import { FileText, Globe, BarChart3, Layout } from "lucide-react";

// --- Visual Components ---

const ResumeVisual = () => (
    <div className="w-full h-full relative flex flex-col p-6 overflow-hidden">
        {/* Editor Toolbar */}
        <div className="h-10 w-full bg-white/5 border border-white/10 rounded-lg mb-4 flex items-center px-3 gap-2 backdrop-blur-md">
            <div className="w-3 h-3 rounded-full bg-red-400/20" />
            <div className="w-3 h-3 rounded-full bg-yellow-400/20" />
            <div className="w-3 h-3 rounded-full bg-green-400/20" />
            <div className="h-4 w-[1px] bg-white/10 mx-2" />
            <div className="w-16 h-2 rounded-full bg-white/10" />
            <div className="w-8 h-2 rounded-full bg-white/10" />
        </div>

        {/* Editor Canvas */}
        <div className="flex-1 relative bg-white/5 border border-white/5 rounded-xl overflow-hidden backdrop-blur-sm p-6 flex justify-center">
            {/* Paper */}
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="w-[80%] h-full bg-white shadow-2xl shadow-black/50 rounded-lg p-6 flex flex-col gap-4"
            >
                {/* Header */}
                <div className="flex gap-4 items-center border-b border-slate-100 pb-4">
                    <div className="w-12 h-12 rounded-full bg-slate-100" />
                    <div className="flex-1 space-y-2">
                        <div className="w-3/4 h-4 bg-slate-800 rounded" />
                        <div className="w-1/2 h-3 bg-slate-200 rounded" />
                    </div>
                </div>
                {/* Body Blocks */}
                <div className="space-y-3">
                    <div className="w-full h-2 bg-slate-100 rounded" />
                    <div className="w-full h-2 bg-slate-100 rounded" />
                    <div className="w-2/3 h-2 bg-slate-100 rounded" />
                </div>
                <div className="grid grid-cols-2 gap-4 mt-2">
                    <div className="h-20 bg-slate-50 rounded border border-slate-100" />
                    <div className="h-20 bg-slate-50 rounded border border-slate-100" />
                </div>
            </motion.div>

            {/* Floating Block Menu (Simulated) */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9, x: 20 }}
                whileInView={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                className="absolute right-8 top-1/3 w-32 bg-[#1a1a1a] border border-white/10 rounded-lg p-2 shadow-xl flex flex-col gap-1"
            >
                <div className="h-6 w-full rounded bg-white/10 flex items-center px-2 text-[10px] text-white/50">Heading 1</div>
                <div className="h-6 w-full rounded hover:bg-white/5 flex items-center px-2 text-[10px] text-white/50">Text</div>
                <div className="h-6 w-full rounded hover:bg-white/5 flex items-center px-2 text-[10px] text-white/50">Image</div>
            </motion.div>
        </div>
    </div>
);

const PortfolioVisual = () => (
    <div className="w-full h-full relative p-6 overflow-hidden">
        <div className="grid grid-cols-3 gap-3 h-full">
            {/* Column 1 */}
            <div className="flex flex-col gap-3 pt-8">
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="aspect-[3/4] rounded-lg bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-white/10 backdrop-blur-md"
                />
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="aspect-square rounded-lg bg-white/5 border border-white/10 backdrop-blur-md"
                />
            </div>
            {/* Column 2 (Center - Highlight) */}
            <div className="flex flex-col gap-3">
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="aspect-[3/4] rounded-xl bg-gradient-to-b from-[#a1ccff]/20 to-transparent border border-[#a1ccff]/30 backdrop-blur-xl shadow-[0_0_30px_-10px_rgba(161,204,255,0.2)] relative overflow-hidden group"
                >
                    <div className="absolute inset-x-2 bottom-2 h-1/3 bg-black/40 backdrop-blur-md rounded-lg p-2 border border-white/5">
                        <div className="w-1/2 h-2 bg-white/50 rounded mb-1" />
                        <div className="w-full h-1.5 bg-white/20 rounded" />
                    </div>
                </motion.div>
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="aspect-square rounded-lg bg-white/5 border border-white/10 backdrop-blur-md"
                />
            </div>
            {/* Column 3 */}
            <div className="flex flex-col gap-3 pt-12">
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="aspect-square rounded-lg bg-white/5 border border-white/10 backdrop-blur-md"
                />
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="aspect-[3/4] rounded-lg bg-gradient-to-tl from-pink-500/20 to-orange-500/20 border border-white/10 backdrop-blur-md"
                />
            </div>
        </div>

        {/* AI Generation Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none" />
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 rounded-full bg-black/80 border border-white/10 backdrop-blur-xl shadow-xl">
            <div className="w-2 h-2 rounded-full bg-[#a1ccff] animate-pulse" />
            <span className="text-xs font-mono text-[#a1ccff]">Generating...</span>
        </div>
    </div>
);

const AnalyticsVisual = () => (
    <div className="w-full h-full relative p-6 flex flex-col gap-4">
        {/* Top Stats Row */}
        <div className="flex gap-4">
            <div className="flex-1 bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-md">
                <div className="text-xs text-slate-400 mb-1">Total Views</div>
                <div className="text-2xl font-mono font-bold text-white">12.4k</div>
                <div className="text-[10px] text-green-400 mt-1">+12% this week</div>
            </div>
            <div className="flex-1 bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-md">
                <div className="text-xs text-slate-400 mb-1">Interactions</div>
                <div className="text-2xl font-mono font-bold text-white">843</div>
                <div className="text-[10px] text-green-400 mt-1">+5% this week</div>
            </div>
        </div>

        {/* Chart Area */}
        <div className="flex-1 bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-md relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10" />
            <div className="flex items-end justify-between h-full gap-2 px-2 pb-2">
                {[40, 65, 45, 80, 55, 90, 70, 85, 60, 75].map((h, i) => (
                    <motion.div
                        key={i}
                        initial={{ height: 0 }}
                        whileInView={{ height: `${h}%` }}
                        transition={{ duration: 0.8, delay: i * 0.05 }}
                        className="w-full bg-gradient-to-t from-[#a1ccff]/50 to-[#a1ccff]/10 rounded-t-sm relative group"
                    >
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-[10px] px-2 py-1 rounded border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
                            {h}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    </div>
);

// --- Main Component ---

const features = [
    {
        title: "Build without boundaries",
        description:
            "A powerful block-based editor that gives you complete control. No rigid templates, just pure creativity. Start building instantly—no sign-up required.",
        icon: Layout,
        visual: ResumeVisual,
        align: "left",
    },
    {
        title: "Your work, reimagined",
        description:
            "Transform your experience into a stunning portfolio with AI. From inspiration to deployment in minutes, with visual QA to ensure perfection.",
        icon: Globe,
        visual: PortfolioVisual,
        align: "right",
    },
    {
        title: "Data-driven career growth",
        description:
            "Track every view, click, and interaction. Understand what employers are looking for and optimize your applications with real-time analytics.",
        icon: BarChart3,
        visual: AnalyticsVisual,
        align: "left",
    },
];

export const FeaturesSection = () => {
    return (
        <section className="py-24 relative z-10">
            <div className="container mx-auto px-4">
                <div className="mb-20 text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-3xl md:text-5xl font-medium mb-6 tracking-tight font-host"
                    >
                        Everything you need to <span className="text-[#a1ccff] font-serif italic">succeed</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-slate-400 max-w-2xl mx-auto text-lg"
                    >
                        Feno provides a complete suite of tools to help you craft your professional identity and land your dream job.
                    </motion.p>
                </div>

                <div className="space-y-32">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8 }}
                            className={`flex flex-col ${feature.align === "right" ? "lg:flex-row-reverse" : "lg:flex-row"
                                } items-center gap-12 lg:gap-20`}
                        >
                            {/* Text Content */}
                            <div className="flex-1 space-y-6">
                                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center border border-white/10 backdrop-blur-sm shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                                    <feature.icon className="w-6 h-6 text-[#a1ccff]" />
                                </div>
                                <h3 className="text-3xl md:text-4xl font-medium leading-tight font-host">
                                    {feature.title}
                                </h3>
                                <p className="text-slate-400 text-lg leading-relaxed">
                                    {feature.description}
                                </p>
                                <ul className="space-y-3 pt-4">
                                    {[1, 2, 3].map((item) => (
                                        <li key={item} className="flex items-center gap-3 text-slate-300">
                                            <div className="w-1.5 h-1.5 rounded-full bg-[#a1ccff] shadow-[0_0_8px_#a1ccff]" />
                                            <span>Feature point highlight {item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Visual Content */}
                            <div className="flex-1 w-full">
                                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm group shadow-2xl shadow-black/20">
                                    <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 pointer-events-none" />
                                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-50" />

                                    {/* Render Specific Visual */}
                                    <feature.visual />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
