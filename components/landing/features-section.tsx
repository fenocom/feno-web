"use client";

import { motion } from "framer-motion";
import { FileText, Globe, BarChart3, Layout, Zap } from "lucide-react";

// --- Visual Components ---

const ResumeVisual = () => (
    <div className="w-full h-full relative flex flex-col items-center justify-center p-6 overflow-hidden bg-black/20 group">
        <img
            src="/feature_unbound_nodes_1764369859983.png"
            alt="Unbound Workspace"
            className="w-full h-full object-cover rounded-xl opacity-90 group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
    </div>
);

const PortfolioVisual = () => (
    <div className="w-full h-full relative flex flex-col items-center justify-center p-6 overflow-hidden bg-black/20 group">
        <img
            src="/feature_prism_portfolio_1764369877820.png"
            alt="Prism Portfolio Generation"
            className="w-full h-full object-cover rounded-xl opacity-90 group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
    </div>
);

const AnalyticsVisual = () => (
    <div className="w-full h-full relative flex flex-col items-center justify-center p-6 overflow-hidden bg-black/20 group">
        <img
            src="/feature_radar_analytics_1764369894067.png"
            alt="Radar Analytics"
            className="w-full h-full object-cover rounded-xl opacity-90 group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
    </div>
);

const AutoApplyVisual = () => (
    <div className="w-full h-full relative flex flex-col items-center justify-center p-6 overflow-hidden bg-black/20 group">
        <img
            src="/feature_auto_apply_1764369909694.png"
            alt="Auto Apply Ghost"
            className="w-full h-full object-cover rounded-xl opacity-90 group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
    </div>
);

// --- Main Component ---

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

                {/* Bento Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">

                    {/* Item 1: Resume (Large, Span 2) */}
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
                                <Layout className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-2xl font-medium text-white mb-2">Build without boundaries</h3>
                            <p className="text-slate-300 max-w-md">Break free from the A4 page. Our spatial editor lets you visualize your career as a network of skills.</p>
                        </div>
                    </motion.div>

                    {/* Item 2: Auto-Apply (Small, Span 1) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="md:col-span-1 relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm h-[500px] group"
                    >
                        <div className="absolute inset-0 z-0">
                            <AutoApplyVisual />
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 p-8 z-10">
                            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center border border-amber-500/20 backdrop-blur-sm mb-4">
                                <Zap className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-2xl font-medium text-white mb-2">Ghost in the Machine</h3>
                            <p className="text-slate-300">Autonomous execution. Let AI apply for you while you sleep.</p>
                        </div>
                    </motion.div>

                    {/* Item 3: Portfolio (Small, Span 1) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="md:col-span-1 relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm h-[500px] group"
                    >
                        <div className="absolute inset-0 z-0">
                            <PortfolioVisual />
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 p-8 z-10">
                            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center border border-pink-500/20 backdrop-blur-sm mb-4">
                                <Globe className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-2xl font-medium text-white mb-2">Your work, reimagined</h3>
                            <p className="text-slate-300">One-click transformation into a stunning portfolio.</p>
                        </div>
                    </motion.div>

                    {/* Item 4: Analytics (Large, Span 2) */}
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
                                <BarChart3 className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-2xl font-medium text-white mb-2">Data-driven career growth</h3>
                            <p className="text-slate-300 max-w-md">Hunt with precision. Get radar visibility on your applications.</p>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};
