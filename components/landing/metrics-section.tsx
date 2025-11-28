"use client";

import { motion } from "framer-motion";

export const MetricsSection = () => {
    return (
        <section className="py-32 relative z-10 border-t border-white/5 bg-[#000510] overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row items-center gap-16">

                    {/* Left: Text */}
                    <div className="lg:w-1/3">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-[#a1ccff] font-mono text-sm mb-4 tracking-wider uppercase"
                        >
                            Impact
                        </motion.div>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-4xl md:text-5xl font-medium tracking-tight font-host text-white mb-6"
                        >
                            Data that <br />
                            <span className="text-[#a1ccff] font-serif italic">delivers</span>
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-slate-400 text-lg leading-relaxed mb-8"
                        >
                            Feno users see a 3x increase in interview callbacks and save an average of 15 hours per week on applications.
                        </motion.p>

                        <div className="space-y-4">
                            {[
                                { label: "Interview Rate", value: "+300%", color: "text-[#a1ccff]" },
                                { label: "Time Saved", value: "15hrs", color: "text-emerald-400" },
                                { label: "Profile Views", value: "12k+", color: "text-purple-400" },
                            ].map((stat, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
                                    className="flex items-center justify-between border-b border-white/10 pb-2"
                                >
                                    <span className="text-slate-400">{stat.label}</span>
                                    <span className={`font-mono text-xl ${stat.color}`}>{stat.value}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Circular Chart Visualization */}
                    <div className="lg:w-2/3 flex justify-center relative">
                        <div className="relative w-[400px] h-[400px] md:w-[500px] md:h-[500px]">
                            {/* Center Circle */}
                            <div className="absolute inset-0 m-auto w-48 h-48 rounded-full bg-[#001a57] flex items-center justify-center border border-[#a1ccff]/20 z-20 backdrop-blur-md">
                                <div className="text-center">
                                    <div className="text-slate-400 text-sm uppercase tracking-widest mb-1">Success</div>
                                    <div className="text-5xl font-bold text-white font-host">98%</div>
                                </div>
                            </div>

                            {/* Outer Rings (SVG) */}
                            <svg className="w-full h-full animate-spin-slow" viewBox="0 0 500 500">
                                <defs>
                                    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="#a1ccff" stopOpacity="1" />
                                        <stop offset="100%" stopColor="#001a57" stopOpacity="0" />
                                    </linearGradient>
                                </defs>

                                {/* Ring 1 */}
                                <circle cx="250" cy="250" r="180" fill="none" stroke="#a1ccff" strokeWidth="2" strokeOpacity="0.1" strokeDasharray="10 10" />

                                {/* Ring 2 (Progress) */}
                                <motion.circle
                                    cx="250" cy="250" r="220" fill="none" stroke="url(#grad1)" strokeWidth="4"
                                    strokeDasharray="1000" strokeDashoffset="1000"
                                    initial={{ strokeDashoffset: 1000 }}
                                    whileInView={{ strokeDashoffset: 400 }}
                                    transition={{ duration: 2, ease: "easeOut" }}
                                    transform="rotate(-90 250 250)"
                                />

                                {/* Ring 3 (Segments) */}
                                {[0, 60, 120, 180, 240, 300].map((deg, i) => (
                                    <line
                                        key={i}
                                        x1="250" y1="50" x2="250" y2="70"
                                        stroke="#a1ccff" strokeWidth="2"
                                        transform={`rotate(${deg} 250 250)`}
                                    />
                                ))}
                            </svg>

                            {/* Floating Labels */}
                            <motion.div
                                className="absolute top-10 right-10 bg-white/5 border border-white/10 px-3 py-1 rounded-full text-xs text-[#a1ccff] backdrop-blur-md"
                                initial={{ opacity: 0, scale: 0 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.5 }}
                            >
                                Application Sent
                            </motion.div>
                            <motion.div
                                className="absolute bottom-20 left-0 bg-white/5 border border-white/10 px-3 py-1 rounded-full text-xs text-emerald-400 backdrop-blur-md"
                                initial={{ opacity: 0, scale: 0 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.7 }}
                            >
                                Interview Offer
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
