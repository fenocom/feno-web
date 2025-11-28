"use client";

import { motion } from "framer-motion";
import { FileText, Globe, Rocket, TrendingUp } from "lucide-react";

const steps = [
    {
        id: 1,
        title: "Craft Your Story",
        description:
            "Use our block-based editor to build a resume that truly represents you. No rigid templates, just flexible design.",
        icon: FileText,
    },
    {
        id: 2,
        title: "Showcase Your Work",
        description:
            "Turn your experience into a stunning web portfolio instantly. Let your work speak for itself with AI-generated layouts.",
        icon: Globe,
    },
    {
        id: 3,
        title: "Optimize & Apply",
        description:
            "Beat the ATS with our visual optimizer. Tailor your applications to specific roles and ensure you get noticed.",
        icon: Rocket,
    },
    {
        id: 4,
        title: "Track & Grow",
        description:
            "Monitor your application performance. See who's viewing your profile and make data-driven career moves.",
        icon: TrendingUp,
    },
];

export const RoadmapSection = () => {
    return (
        <section className="py-24 relative z-10 overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="text-center mb-20">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-3xl md:text-5xl font-medium mb-6 tracking-tight font-host"
                    >
                        Level up your <span className="text-[#a1ccff] font-serif italic">career game</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-slate-400 max-w-2xl mx-auto text-lg"
                    >
                        A simple, powerful workflow designed to take you from applicant to hired.
                    </motion.p>
                </div>

                <div className="relative max-w-4xl mx-auto">
                    {/* Connecting Line */}
                    <div className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#a1ccff]/30 to-transparent transform md:-translate-x-1/2" />

                    <div className="space-y-12 md:space-y-24">
                        {steps.map((step, index) => (
                            <motion.div
                                key={step.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className={`relative flex flex-col md:flex-row gap-8 md:gap-0 items-start md:items-center ${index % 2 === 0 ? "md:flex-row-reverse" : ""
                                    }`}
                            >
                                {/* Content Side */}
                                <div className="flex-1 w-full md:w-1/2 pl-16 md:pl-0 md:px-12">
                                    <div
                                        className={`flex flex-col gap-3 ${index % 2 === 0 ? "md:text-left" : "md:text-right"
                                            }`}
                                    >
                                        <h3 className="text-2xl font-medium text-white">
                                            {step.title}
                                        </h3>
                                        <p className="text-slate-400 leading-relaxed">
                                            {step.description}
                                        </p>
                                    </div>
                                </div>

                                {/* Center Icon */}
                                <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 flex items-center justify-center w-14 h-14 rounded-full bg-[#001a57] border border-[#a1ccff]/30 shadow-[0_0_15px_rgba(161,204,255,0.2)] z-10">
                                    <step.icon className="w-6 h-6 text-[#a1ccff]" />
                                </div>

                                {/* Empty Side for Balance */}
                                <div className="flex-1 hidden md:block" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
