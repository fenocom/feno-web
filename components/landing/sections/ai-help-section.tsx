"use client";

import { motion } from "framer-motion";
import { Bot, FileCheck, Search, Sparkles } from "lucide-react";

export const AIHelpSection = () => {
    return (
        <section className="py-24 relative z-10 border-t border-white/5 bg-[#000510] overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    <div className="lg:w-1/2">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-[#a1ccff] font-mono text-sm mb-4 tracking-wider uppercase"
                        >
                            Intelligence
                        </motion.div>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-3xl md:text-5xl font-medium tracking-tight font-host text-white mb-6"
                        >
                            A Partner, <br />
                            <span className="text-[#a1ccff] font-serif italic">
                                Not Just a Tool.
                            </span>
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-[#A1A1AA] text-lg leading-loose mb-8"
                        >
                            Meet your AI career strategist. From drafting cover
                            letters to simulating interview questions, get
                            real-time guidance that feels personal and precise.
                        </motion.p>

                        <div className="space-y-6">
                            {[
                                {
                                    icon: FileCheck,
                                    title: "Context-aware writing assistance.",
                                    desc: "Craft content that resonates.",
                                },
                                {
                                    icon: Search,
                                    title: "Instant feedback on your portfolio.",
                                    desc: "Optimize for impact immediately.",
                                },
                                {
                                    icon: Bot,
                                    title: "Strategic advice tailored to your industry.",
                                    desc: "Navigate your career path with expert insights.",
                                },
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{
                                        duration: 0.6,
                                        delay: 0.3 + i * 0.1,
                                    }}
                                    className="flex gap-4"
                                >
                                    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center shrink-0 border border-white/10">
                                        <item.icon className="w-5 h-5 text-[#a1ccff]" />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-medium mb-1">
                                            {item.title}
                                        </h3>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <div className="lg:w-1/2 relative">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="relative rounded-2xl border border-white/10 bg-[#0A0F1C] overflow-hidden aspect-square md:aspect-video lg:aspect-square"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-[#0A0F1C] to-[#000d2e]" />

                            <div className="absolute inset-4 md:inset-8 bg-[#050505] rounded-xl border border-white/5 flex flex-col overflow-hidden">
                                <div className="h-12 border-b border-white/5 flex items-center px-4 gap-3 bg-white/[0.02]">
                                    <div className="w-2 h-2 rounded-full bg-red-500/50" />
                                    <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                                    <div className="w-2 h-2 rounded-full bg-green-500/50" />
                                    <div className="ml-auto text-xs text-slate-600 font-mono">
                                        Feno AI 2.0
                                    </div>
                                </div>

                                <div className="flex-1 p-6 space-y-4 overflow-hidden relative">
                                    <div className="flex gap-3">
                                        <div className="w-8 h-8 rounded-full bg-[#a1ccff]/10 flex items-center justify-center border border-[#a1ccff]/20">
                                            <Sparkles className="w-4 h-4 text-[#a1ccff]" />
                                        </div>
                                        <div className="flex-1 space-y-2">
                                            <div className="bg-white/5 rounded-lg rounded-tl-none p-3 text-sm text-slate-300 w-3/4">
                                                I noticed your experience
                                                section could be stronger. Want
                                                me to rewrite the "Project Lead"
                                                role to emphasize impact
                                                metrics?
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex gap-3 flex-row-reverse">
                                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                                            <div className="w-4 h-4 bg-slate-400 rounded-full opacity-50" />
                                        </div>
                                        <div className="flex-1 space-y-2 flex justify-end">
                                            <div className="bg-[#a1ccff]/10 border border-[#a1ccff]/20 rounded-lg rounded-tr-none p-3 text-sm text-[#a1ccff] w-2/3">
                                                Yes, focus on the 30% revenue
                                                increase and team scaling.
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex gap-3">
                                        <div className="w-8 h-8 rounded-full bg-[#a1ccff]/10 flex items-center justify-center border border-[#a1ccff]/20">
                                            <Sparkles className="w-4 h-4 text-[#a1ccff]" />
                                        </div>
                                        <div className="flex-1 space-y-2">
                                            <div className="flex gap-1 mb-1">
                                                <span className="w-1.5 h-1.5 bg-[#a1ccff] rounded-full animate-pulse" />
                                                <span className="w-1.5 h-1.5 bg-[#a1ccff] rounded-full animate-pulse delay-75" />
                                                <span className="w-1.5 h-1.5 bg-[#a1ccff] rounded-full animate-pulse delay-150" />
                                            </div>
                                            <div className="bg-white/5 rounded-lg rounded-tl-none p-3 text-sm text-slate-300 w-full animate-in fade-in slide-in-from-bottom-2 duration-700">
                                                <span className="text-emerald-400 font-mono text-xs mb-2 block">
                                                    // Suggestion
                                                </span>
                                                "Spearheaded a strategic
                                                overhaul that drove a{" "}
                                                <span className="bg-emerald-500/20 text-emerald-300 px-1 rounded">
                                                    30% revenue surge
                                                </span>{" "}
                                                year-over-year. Scaled the
                                                engineering team from{" "}
                                                <span className="bg-emerald-500/20 text-emerald-300 px-1 rounded">
                                                    5 to 20 members
                                                </span>
                                                , establishing core agile
                                                workflows."
                                            </div>
                                        </div>
                                    </div>

                                    <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none" />
                                </div>

                                <div className="h-14 border-t border-white/5 p-3 flex gap-2 items-center">
                                    <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center">
                                        <div className="w-3 h-3 text-slate-600">
                                            +
                                        </div>
                                    </div>
                                    <div className="h-2 w-32 bg-white/5 rounded-full" />
                                    <div className="ml-auto w-8 h-8 rounded-md bg-[#a1ccff]/20 flex items-center justify-center">
                                        <div className="w-0 h-0 border-l-[5px] border-l-transparent border-b-[8px] border-b-[#a1ccff] border-r-[5px] border-r-transparent transform rotate-90" />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};
