"use client";

import { motion } from "framer-motion";
import { FileText, Globe, BarChart3, Layout, Zap, Share2, Radio } from "lucide-react";
import Image from "next/image";

const ResumeVisual = () => (
    <div className="w-full h-full relative overflow-hidden bg-[#050505] group">
        <Image
            src="/features/resume-synthesis.png"
            alt="Resume Synthesis - A chaotic bundle of threads focused into a single indigo beam"
            fill
            className="object-cover object-center opacity-80 group-hover:opacity-100 transition-opacity duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-60" />
    </div>
);

const PortfolioVisual = () => (
    <div className="w-full h-full relative overflow-hidden bg-[#050505] group">
        <Image
            src="/features/portfolio-refraction.png"
            alt="Portfolio Refraction - Indigo beam splitting into colored blocks"
            fill
            className="object-cover object-center opacity-80 group-hover:opacity-100 transition-opacity duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-60" />
    </div>
);

const AnalyticsVisual = () => (
    <div className="w-full h-full relative overflow-hidden bg-[#050505] group">
        <Image
            src="/features/analytics-reflection.png"
            alt="Analytics Reflection - Sonar ring gathering data particles"
            fill
            className="object-cover object-center opacity-80 group-hover:opacity-100 transition-opacity duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-60" />
    </div>
);

const ChromeVisual = () => (
    <div className="w-full h-full relative overflow-hidden bg-[#050505] group">
        <Image
            src="/features/chrome-distribution.png"
            alt="Chrome Distribution - Beam splitting into multiple application slots"
            fill
            className="object-cover object-center opacity-80 group-hover:opacity-100 transition-opacity duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-60" />
    </div>
);

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
                        The Optical <span className="text-[#a1ccff] font-serif italic">Engine</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-slate-400 max-w-2xl mx-auto text-lg"
                    >
                        A visual story of Light Physics: Focus → Refraction → Transmission → Reflection.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">

                    {/* Resume Builder: The Synthesis */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="md:col-span-2 relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm h-[500px] group"
                    >
                        <div className="absolute inset-0 z-0">
                            <ResumeVisual />
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 p-8 z-10">
                            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center border border-[#a1ccff]/20 backdrop-blur-sm mb-4">
                                <FileText className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-2xl font-medium text-white mb-2">The Synthesis</h3>
                            <p className="text-slate-300 max-w-md">Feno takes the noise of your history and focuses it into a single, powerful signal.</p>
                        </div>
                    </motion.div>

                    {/* Portfolio Builder: The Refraction */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="md:col-span-1 relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm h-[500px] group"
                    >
                        <div className="absolute inset-0 z-0">
                            <PortfolioVisual />
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 p-8 z-10">
                            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center border border-pink-500/20 backdrop-blur-sm mb-4">
                                <Globe className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-2xl font-medium text-white mb-2">The Refraction</h3>
                            <p className="text-slate-300">Your single resume file is refracted to create a rich, multi-colored web presence.</p>
                        </div>
                    </motion.div>

                    {/* Chrome Extension: The Distribution */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="md:col-span-1 relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm h-[500px] group"
                    >
                        <div className="absolute inset-0 z-0">
                            <ChromeVisual />
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 p-8 z-10">
                            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center border border-amber-500/20 backdrop-blur-sm mb-4">
                                <Share2 className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-2xl font-medium text-white mb-2">The Distribution</h3>
                            <p className="text-slate-300">One click, many destinations. Map your truth to disconnected fields.</p>
                        </div>
                    </motion.div>

                    {/* Analytics: The Reflection */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="md:col-span-2 relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm h-[500px] group"
                    >
                        <div className="absolute inset-0 z-0">
                            <AnalyticsVisual />
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 p-8 z-10">
                            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center border border-emerald-500/20 backdrop-blur-sm mb-4">
                                <Radio className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-2xl font-medium text-white mb-2">The Reflection</h3>
                            <p className="text-slate-300 max-w-md">You aren't just shouting into the void. Feno acts as a radar, tracking where your profile travels.</p>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

