"use client";

import { motion } from "framer-motion";
import { BuilderIllustration } from "../ui/illustrations/builder";
import { SonarIllustration } from "../ui/illustrations/sonar";
import { TransformIllustration } from "../ui/illustrations/transformer";

export const FeaturesSection = () => {
    return (
        <section className="py-32 relative z-10">
            <div className="container mx-auto px-4">
                <div className="mb-24">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-5xl md:text-7xl font-medium tracking-tight font-host text-white mb-6"
                    >
                        Suits to help you at <span className="text-[#a1ccff]">every step.</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-slate-400 max-w-2xl text-xl leading-relaxed"
                    >
                        A complete ecosystem designed to architect your career narrative from every angle, without a single line of code.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">

                    {/* Row 1: Resume Builder (Full Width) */}
                    <div className="lg:col-span-3">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="relative overflow-hidden h-[600px] group rounded-[2rem]"
                        >
                            {/* Background blending - darker gradient for better illustration pop */}
                            <div className="absolute inset-0 bg-[#050505]/50 group-hover:bg-[#050505]/30 transition-colors duration-700" />

                            <div className="absolute inset-0 z-0 flex items-center justify-center">
                                <div className="w-full h-full opacity-60 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 ease-in-out">
                                    <TransformIllustration />
                                </div>
                            </div>

                            <div className="absolute bottom-12 left-12 z-10 pointer-events-none">
                                <h3 className="text-3xl font-medium text-white mb-3">Resume Builder</h3>
                                <p className="text-slate-400 max-w-md text-lg leading-relaxed group-hover:text-white transition-colors duration-500">
                                    A new way to build resumes. No more forms and endless fields—focus on composition.
                                </p>
                            </div>
                        </motion.div>
                    </div>

                    {/* Row 2: Portfolio (Tall Left) and Others (Stacked Right) */}

                    {/* Portfolio Generation (Tall Left - 2 Cols) */}
                    <div className="lg:col-span-2">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="relative overflow-hidden h-[700px] group rounded-[2rem]"
                        >
                            <div className="absolute inset-0 bg-[#050505]/50 group-hover:bg-[#050505]/30 transition-colors duration-700" />

                            <div className="absolute inset-0 z-0">
                                <div className="w-full h-full opacity-60 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 ease-in-out">
                                    <BuilderIllustration />
                                </div>
                            </div>
                            <div className="absolute bottom-12 left-12 z-10 pointer-events-none">
                                <h3 className="text-3xl font-medium text-white mb-3">Portfolio Generation</h3>
                                <p className="text-slate-400 max-w-md text-lg leading-relaxed group-hover:text-white transition-colors duration-500">
                                    One click transformations. Turn your resume into an interactive, convincing digital presence.
                                </p>
                            </div>
                        </motion.div>
                    </div>

                    {/* Stacked Column (1 Col) */}
                    <div className="lg:col-span-1 space-y-8 flex flex-col">

                        {/* Chrome Extension */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="relative overflow-hidden h-[330px] flex-1 group rounded-[2rem]"
                        >
                            <div className="absolute inset-0 bg-[#050505]/50 group-hover:bg-[#050505]/30 transition-colors duration-700" />

                            <div className="absolute inset-0 z-0 flex items-center justify-center">
                                <div className="relative w-full h-full grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out opacity-40 group-hover:opacity-80">
                                    <div className="absolute inset-8 rounded-xl border border-white/5 bg-[#0A0F1C]/50 flex flex-col p-6 gap-3 backdrop-blur-sm">
                                        <div className="h-3 w-1/3 bg-white/10 rounded-full" />
                                        <div className="h-full w-full bg-white/5 rounded-lg border border-white/5 mt-2 relative overflow-hidden">
                                            <div className="absolute top-4 right-4 w-24 h-8 bg-[#a1ccff] rounded shadow-lg shadow-[#a1ccff]/20 animate-pulse" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="absolute bottom-10 left-10 z-10 pointer-events-none">
                                <h3 className="text-2xl font-medium text-white mb-2">Chrome Extension</h3>
                                <p className="text-slate-400 text-sm leading-relaxed group-hover:text-white transition-colors duration-500 pr-4">
                                    Seamlessly apply jobs by using our auto filling features.
                                </p>
                            </div>
                        </motion.div>

                        {/* Analytics */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="relative overflow-hidden h-[330px] flex-1 group rounded-[2rem]"
                        >
                            <div className="absolute inset-0 bg-[#050505]/50 group-hover:bg-[#050505]/30 transition-colors duration-700" />

                            <div className="absolute inset-0 z-0">
                                <div className="w-full h-full opacity-60 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 ease-in-out scale-110">
                                    <SonarIllustration />
                                </div>
                            </div>
                            <div className="absolute bottom-10 left-10 z-10 pointer-events-none">
                                <h3 className="text-2xl font-medium text-white mb-2">Real-time Analytics</h3>
                                <p className="text-slate-400 text-sm leading-relaxed group-hover:text-white transition-colors duration-500 pr-4">
                                    Observe and track interactions on your resume and portfolio in real-time.
                                </p>
                            </div>
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
};


