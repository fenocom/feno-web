"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Slack, Trello } from "lucide-react";

const integrations = [
    { name: "LinkedIn", icon: Linkedin, color: "text-blue-500" },
    { name: "GitHub", icon: Github, color: "text-white" },
    { name: "Gmail", icon: Mail, color: "text-red-500" },
    { name: "Slack", icon: Slack, color: "text-purple-500" },
    { name: "ATS Systems", icon: Trello, color: "text-blue-400" }, // Using Trello as generic ATS placeholder
];

export const IntegrationsSection = () => {
    return (
        <section className="py-32 relative z-10 border-t border-white/5 overflow-hidden">
            <div className="container mx-auto px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-[#a1ccff] font-mono text-sm mb-4 tracking-wider uppercase"
                >
                    Ecosystem
                </motion.div>
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-3xl md:text-5xl font-medium mb-6 tracking-tight font-host text-white"
                >
                    Connect your <span className="text-[#a1ccff] font-serif italic">world</span>
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-slate-400 max-w-2xl mx-auto text-lg mb-20"
                >
                    Feno plays nice with the tools you already use. Sync your data, track applications, and automate your workflow.
                </motion.p>

                <div className="relative max-w-4xl mx-auto h-[400px] flex items-center justify-center">
                    {/* Central Hub */}
                    <div className="relative z-20 w-32 h-32 rounded-full bg-[#001a57] border border-[#a1ccff]/30 flex items-center justify-center shadow-[0_0_50px_-10px_rgba(161,204,255,0.3)]">
                        <span className="font-host text-3xl font-bold text-white">feno</span>
                    </div>

                    {/* Orbiting Icons */}
                    {integrations.map((item, index) => {
                        const angle = (index / integrations.length) * 2 * Math.PI;
                        const radius = 160; // Distance from center
                        const x = Math.cos(angle) * radius;
                        const y = Math.sin(angle) * radius;

                        return (
                            <motion.div
                                key={item.name}
                                initial={{ opacity: 0, scale: 0 }}
                                whileInView={{ opacity: 1, scale: 1, x, y }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: index * 0.1, type: "spring" }}
                                className="absolute w-16 h-16 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex items-center justify-center z-10 hover:bg-white/10 transition-colors cursor-pointer"
                            >
                                <item.icon className={`w-8 h-8 ${item.color}`} />
                            </motion.div>
                        );
                    })}

                    {/* Connecting Lines */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                        <circle cx="50%" cy="50%" r="160" stroke="white" strokeOpacity="0.05" fill="none" strokeDasharray="4 4" />
                    </svg>
                </div>
            </div>
        </section>
    );
};
