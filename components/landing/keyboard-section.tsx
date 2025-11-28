"use client";

import { motion } from "framer-motion";
import { Command } from "lucide-react";

export const KeyboardSection = () => {
    return (
        <section className="py-32 relative z-10 border-t border-white/5 bg-gradient-to-b from-transparent to-black/40">
            <div className="container mx-auto px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8"
                >
                    <Command className="w-4 h-4 text-[#a1ccff]" />
                    <span className="text-slate-400 text-sm font-mono">Command + K</span>
                </motion.div>

                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-3xl md:text-5xl font-medium mb-6 tracking-tight font-host text-white"
                >
                    Built for <span className="text-[#a1ccff] font-serif italic">speed</span>
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-slate-400 max-w-2xl mx-auto text-lg mb-12"
                >
                    Navigate your entire career without lifting your hands from the keyboard. The Feno Command Palette gives you instant access to everything.
                </motion.p>

                {/* Command Palette Mockup */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="max-w-2xl mx-auto bg-[#1a1a1a] border border-white/10 rounded-xl shadow-2xl overflow-hidden"
                >
                    <div className="flex items-center px-4 py-3 border-b border-white/5">
                        <Command className="w-4 h-4 text-slate-500 mr-3" />
                        <span className="text-slate-400 text-sm">Type a command or search...</span>
                    </div>
                    <div className="p-2">
                        <div className="flex items-center justify-between px-3 py-2 rounded hover:bg-white/5 cursor-pointer group">
                            <div className="flex items-center gap-3">
                                <div className="w-4 h-4 rounded border border-slate-600" />
                                <span className="text-slate-300 text-sm group-hover:text-white">Create new resume</span>
                            </div>
                            <span className="text-slate-600 text-xs font-mono">C</span>
                        </div>
                        <div className="flex items-center justify-between px-3 py-2 rounded hover:bg-white/5 cursor-pointer group bg-white/5">
                            <div className="flex items-center gap-3">
                                <div className="w-4 h-4 rounded border border-[#a1ccff]" />
                                <span className="text-white text-sm">Auto-apply to matching jobs</span>
                            </div>
                            <span className="text-slate-500 text-xs font-mono">↵</span>
                        </div>
                        <div className="flex items-center justify-between px-3 py-2 rounded hover:bg-white/5 cursor-pointer group">
                            <div className="flex items-center gap-3">
                                <div className="w-4 h-4 rounded border border-slate-600" />
                                <span className="text-slate-300 text-sm group-hover:text-white">Export portfolio to PDF</span>
                            </div>
                            <span className="text-slate-600 text-xs font-mono">⌘E</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
