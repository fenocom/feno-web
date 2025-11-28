"use client";

import { motion } from "framer-motion";
import { FileText, Globe, BarChart3, Zap, Layout, Share2 } from "lucide-react";

const features = [
    {
        title: "Build without boundaries",
        description:
            "A powerful block-based editor that gives you complete control. No rigid templates, just pure creativity. Start building instantly—no sign-up required.",
        icon: Layout,
        image: "/feature-resume.png", // Placeholder
        align: "left",
    },
    {
        title: "Your work, reimagined",
        description:
            "Transform your experience into a stunning portfolio with AI. From inspiration to deployment in minutes, with visual QA to ensure perfection.",
        icon: Globe,
        image: "/feature-portfolio.png", // Placeholder
        align: "right",
    },
    {
        title: "Data-driven career growth",
        description:
            "Track every view, click, and interaction. Understand what employers are looking for and optimize your applications with real-time analytics.",
        icon: BarChart3,
        image: "/feature-analytics.png", // Placeholder
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
                        className="text-3xl md:text-5xl font-medium mb-6 tracking-tight"
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
                                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center border border-white/10 backdrop-blur-sm">
                                    <feature.icon className="w-6 h-6 text-[#a1ccff]" />
                                </div>
                                <h3 className="text-3xl md:text-4xl font-medium leading-tight">
                                    {feature.title}
                                </h3>
                                <p className="text-slate-400 text-lg leading-relaxed">
                                    {feature.description}
                                </p>
                                <ul className="space-y-3 pt-4">
                                    {[1, 2, 3].map((item) => (
                                        <li key={item} className="flex items-center gap-3 text-slate-300">
                                            <div className="w-1.5 h-1.5 rounded-full bg-[#a1ccff]" />
                                            <span>Feature point highlight {item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Visual Content */}
                            <div className="flex-1 w-full">
                                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm group">
                                    <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 pointer-events-none" />
                                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                    {/* Placeholder for feature visual */}
                                    <div className="absolute inset-0 flex items-center justify-center text-slate-500 font-mono text-sm">
                                        [ {feature.title} Visual ]
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
