"use client";

import { motion } from "framer-motion";
import { FileText, Globe, Rocket, TrendingUp, CheckCircle2 } from "lucide-react";

const steps = [
    {
        id: "01",
        title: "Craft",
        description: "Build your resume with our composition-focused editor. Intelligent suggestions guide your writing.",
        icon: FileText,
    },
    {
        id: "02",
        title: "Publish",
        description: "Generate a stunning, SEO-friendly portfolio from your resume in a single click.",
        icon: Globe,
    },
    {
        id: "03",
        title: "Automate",
        description: "Use our Chrome extension to auto-fill applications on any job board effortlessly.",
        icon: Rocket,
    },
    {
        id: "04",
        title: "Track",
        description: "Get real-time analytics on who views your profile and how your applications are performing.",
        icon: TrendingUp,
    },
    {
        id: "05",
        title: "Succeed",
        description: "Land your dream job with data-backed confidence and a professional digital presence.",
        icon: CheckCircle2,
    },
];

export const RoadmapSection = () => {
    return (
        <section className="py-32 relative z-10 border-t border-white/5 bg-gradient-to-b from-[#000510] to-black">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row gap-20">

                    <div className="lg:w-1/3">
                        <div className="sticky top-32">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="text-[#a1ccff] font-mono text-sm mb-4 tracking-wider uppercase"
                            >
                                Journey
                            </motion.div>
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                                className="text-4xl md:text-6xl font-medium tracking-tight font-host text-white mb-6"
                            >
                                Your Path to <br />
                                <span className="text-[#a1ccff] font-serif italic">Clarity</span>
                            </motion.h2>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="text-[#A1A1AA] text-lg leading-loose max-w-sm"
                            >
                                From your first draft to your signed offer letter, Feno powers every step of your career growth.
                            </motion.p>
                        </div>
                    </div>


                    <div className="lg:w-2/3">
                        <div className="space-y-12">
                            {[
                                {
                                    id: "01",
                                    title: "Initialize",
                                    description: "Securely access your private workspace.",
                                },
                                {
                                    id: "02",
                                    title: "Centralize",
                                    description: "Import your history and skills into one source of truth.",
                                },
                                {
                                    id: "03",
                                    title: "Refine",
                                    description: "Let the system optimize your data for impact.",
                                },
                                {
                                    id: "04",
                                    title: "Create",
                                    description: "Generate tailored resumes and portfolios instantly.",
                                },
                                {
                                    id: "05",
                                    title: "Deploy",
                                    description: "Share your profile and track your success.",
                                },
                            ].map((step, index) => (
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
                                        <p className="text-[#A1A1AA] text-lg leading-loose max-w-md">
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
