"use client";

import { Button } from "@heroui/react";
import { motion } from "framer-motion";
import { useState } from "react";

const templates = [
    { name: "Minimalist", category: "resume", color: "bg-slate-200" },
    { name: "Creative", category: "portfolio", color: "bg-purple-200" },
    { name: "Technical", category: "resume", color: "bg-blue-200" },
    { name: "Executive", category: "resume", color: "bg-emerald-200" },
    { name: "Designer", category: "portfolio", color: "bg-pink-200" },
    { name: "Startup", category: "portfolio", color: "bg-orange-200" },
];

export const TemplatesSection = () => {
    const [filter, setFilter] = useState("all");

    const filteredTemplates =
        filter === "all"
            ? templates
            : templates.filter((t) => t.category === filter);

    return (
        <section className="py-32 relative z-10 border-t border-white/5">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                    <div>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="text-3xl md:text-5xl font-medium tracking-tight font-host text-white mb-6"
                        >
                            Curated for <br />
                            <span className="text-[#a1ccff] font-serif italic">
                                Impact.
                            </span>
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-[#A1A1AA] text-lg max-w-lg leading-loose"
                        >
                            Select from designs that balance modern aesthetics
                            with professional standards. Stand out quietly.
                        </motion.p>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="flex gap-2 p-1 bg-white/5 rounded-full border border-white/10 backdrop-blur-sm mt-4 md:mt-0"
                    >
                        {["all", "resume", "portfolio"].map((category) => (
                            <Button
                                key={category}
                                onClick={() => setFilter(category)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                                    filter === category
                                        ? "bg-white text-black"
                                        : "text-slate-400 hover:text-white"
                                } capitalization`}
                            >
                                {category === "all"
                                    ? "All Templates"
                                    : category}
                            </Button>
                        ))}
                    </motion.div>
                </div>

                <div className="flex overflow-x-auto pb-8 gap-6 -mx-4 px-4 scrollbar-hide">
                    {filteredTemplates.map((template, index) => (
                        <motion.div
                            key={template.name}
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="flex-shrink-0 w-[300px] group relative aspect-[3/4] rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm cursor-pointer"
                        >
                            <div
                                className={`absolute inset-4 rounded-lg ${template.color} opacity-10 group-hover:opacity-20 transition-opacity`}
                            />

                            <div className="absolute inset-x-8 top-12 bottom-20 bg-white/5 border border-white/5 rounded-md" />
                            <div className="absolute inset-x-12 top-16 h-2 bg-white/10 rounded-sm" />
                            <div className="absolute inset-x-12 top-24 h-2 w-1/2 bg-white/10 rounded-sm" />

                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                                <Button className="bg-white text-black px-6 py-2 rounded-full font-medium text-sm">
                                    Use Template
                                </Button>
                            </div>
                            <div className="absolute bottom-4 left-0 right-0 text-center text-white font-medium">
                                {template.name}
                                <span className="block text-xs text-slate-500 font-normal uppercase tracking-wider mt-1">
                                    {template.category}
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
