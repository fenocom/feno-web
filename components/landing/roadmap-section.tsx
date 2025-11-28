"use client";

import { motion } from "framer-motion";
import { FileText, Globe, Rocket, TrendingUp } from "lucide-react";

const steps = [
    {
        id: 1,
        title: "Craft",
        description: "Build your story with our spatial editor.",
        icon: FileText,
        color: "text-blue-400",
        bg: "bg-blue-400/10",
        border: "border-blue-400/20",
    },
    {
        id: 2,
        title: "Publish",
        description: "Deploy a stunning portfolio in one click.",
        icon: Globe,
        color: "text-purple-400",
        bg: "bg-purple-400/10",
        border: "border-purple-400/20",
    },
    {
        id: 3,
        title: "Automate",
        description: "Let AI apply to jobs while you sleep.",
        icon: Rocket,
        color: "text-amber-400",
        bg: "bg-amber-400/10",
        border: "border-amber-400/20",
    },
    {
        id: 4,
        title: "Track",
        description: "Get radar visibility on your applications.",
        icon: TrendingUp,
        color: "text-emerald-400",
        bg: "bg-emerald-400/10",
        border: "border-emerald-400/20",
    },
];

export const RoadmapSection = () => {
    return (
        <section className="py-32 relative z-10 overflow-hidden border-t border-white/5">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-6">
                    <div className="max-w-2xl">
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
                            className="text-4xl md:text-5xl font-medium tracking-tight font-host text-white"
                        >
                            Level up your career game
                        </motion.h2>
                    </div>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-slate-400 max-w-sm text-lg leading-relaxed text-right md:text-left"
                    >
                        A simple, powerful workflow designed to take you from applicant to hired.
                    </motion.p>
                </div>

                <div className="relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden lg:block absolute top-[45px] left-0 right-0 h-[2px] bg-white/10 z-0">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#a1ccff]/50 to-transparent w-1/2 mx-auto" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative">
                        {steps.map((step, index) => (
                            <motion.div
                                key={step.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="relative z-10 flex flex-col items-start group"
                            >
                                <div className={`w-24 h-24 rounded-2xl ${step.bg} ${step.border} border flex items-center justify-center mb-8 backdrop-blur-sm shadow-[0_0_30px_-10px_rgba(0,0,0,0.5)] group-hover:scale-105 transition-transform duration-300 relative`}>
                                    <step.icon className={`w-10 h-10 ${step.color}`} />
                                    {/* Dot on line */}
                                    <div className="hidden lg:block absolute -top-[52px] left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#001a57] border-2 border-[#a1ccff] z-20" />
                                    {/* Vertical Line to Dot */}
                                    <div className="hidden lg:block absolute -top-[40px] left-1/2 -translate-x-1/2 w-[2px] h-[40px] bg-gradient-to-b from-[#a1ccff]/50 to-transparent z-0" />
                                </div>

                                <div className="flex items-center gap-3 mb-3">
                                    <span className="font-mono text-[#a1ccff]/50 text-sm">0{step.id}</span>
                                    <h3 className="text-xl font-medium text-white">
                                        {step.title}
                                    </h3>
                                </div>
                                <p className="text-slate-400 text-base leading-relaxed">
                                    {step.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
