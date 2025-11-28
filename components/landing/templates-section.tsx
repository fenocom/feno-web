"use client";

import { motion } from "framer-motion";

const templates = [
    { name: "Minimalist", color: "bg-slate-200" },
    { name: "Creative", color: "bg-purple-200" },
    { name: "Technical", color: "bg-blue-200" },
    { name: "Executive", color: "bg-emerald-200" },
];

export const TemplatesSection = () => {
    return (
        <section className="py-32 relative z-10 border-t border-white/5">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16">
                    <div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-[#a1ccff] font-mono text-sm mb-4 tracking-wider uppercase"
                        >
                            Themes
                        </motion.div>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-3xl md:text-5xl font-medium tracking-tight font-host text-white"
                        >
                            Designed to <span className="text-[#a1ccff] font-serif italic">impress</span>
                        </motion.h2>
                    </div>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-slate-400 max-w-sm text-lg leading-relaxed text-right md:text-left mt-4 md:mt-0"
                    >
                        Choose from our gallery of award-winning templates or build your own from scratch.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {templates.map((template, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="group relative aspect-[3/4] rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm cursor-pointer"
                        >
                            {/* Mockup Content */}
                            <div className={`absolute inset-4 rounded-lg ${template.color} opacity-10 group-hover:opacity-20 transition-opacity`} />
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <button className="bg-white text-black px-6 py-2 rounded-full font-medium text-sm">
                                    Preview
                                </button>
                            </div>
                            <div className="absolute bottom-4 left-4 text-white font-medium">
                                {template.name}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
