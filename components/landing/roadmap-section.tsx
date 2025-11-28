"use client";

import { motion } from "framer-motion";
import { FileText, Globe, Rocket, TrendingUp } from "lucide-react";

const steps = [
    {
        id: "01",
        title: "Craft",
        description: "Build your story with our spatial editor. No templates, just pure creativity.",
        icon: FileText,
    },
    {
        id: "02",
        title: "Publish",
        description: "Deploy a stunning portfolio in one click. Optimized for speed and SEO.",
        icon: Globe,
    },
    {
        id: "03",
        title: "Automate",
        description: "Let AI apply to jobs while you sleep. The Ghost in the Machine works 24/7.",
        icon: Rocket,
    },
    {
        id: "04",
        title: "Track",
        description: "Get radar visibility on your applications. Know exactly when to follow up.",
        icon: TrendingUp,
    },
    {
        id: "05",
        title: "Succeed",
        description: "Land your dream job with data-backed confidence.",
        icon: TrendingUp, // Reusing icon for now
    },
];

export const RoadmapSection = () => {
    return (
        <section className="py-32 relative z-10 border-t border-white/5 bg-gradient-to-b from-[#000510] to-black">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row gap-20">
                    {/* Left Side: Sticky Header */}
                    <div className="lg:w-1/3">
                        <div className="sticky top-32">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="text-[#a1ccff] font-mono text-sm mb-4 tracking-wider uppercase"
                            >
                                Workflow
                            </motion.div>
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                                className="text-4xl md:text-6xl font-medium tracking-tight font-host text-white mb-6"
                            >
                                The future of <br />
                                <span className="text-[#a1ccff] font-serif italic">career building</span>
                            </motion.h2>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="text-slate-400 text-lg leading-relaxed max-w-sm"
                            >
                                A seamless flow from your first draft to your final offer letter.
                            </motion.p>
                        </div>
                    </div>

                    {/* Right Side: Vertical List */}
                    <div className="lg:w-2/3">
                        <div className="space-y-12">
                            {steps.map((step, index) => (
                                <motion.div
                                    key={step.id}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    className="group flex gap-8 items-start border-b border-white/5 pb-12 last:border-0"
                                >
                                    <div className="text-5xl md:text-7xl font-mono font-light text-white/10 group-hover:text-[#a1ccff]/20 transition-colors">
                                        {step.id}
                                    </div>
                                    <div className="pt-2">
                                        <h3 className="text-2xl md:text-3xl font-medium text-white mb-3 group-hover:text-[#a1ccff] transition-colors">
                                            {step.title}
                                        </h3>
                                        <p className="text-slate-400 text-lg leading-relaxed max-w-md">
                                            {step.description}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
