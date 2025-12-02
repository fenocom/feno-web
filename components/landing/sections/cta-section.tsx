"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export const CTASection = () => {
    return (
        <section className="py-32 relative z-10 overflow-hidden">

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#a1ccff]/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="container mx-auto px-4 relative">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl md:text-6xl font-medium mb-8 tracking-tight font-host"
                    >
                        Ready to build your <br />
                        <span className="text-[#a1ccff] font-serif italic">future?</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-slate-400 text-xl mb-10 max-w-2xl mx-auto"
                    >
                        Join thousands of professionals who are taking control of their career narrative with Feno.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <button className="bg-white text-black px-8 py-4 rounded-full font-medium text-lg hover:bg-blue-50 transition-colors inline-flex items-center gap-2 group">
                            Get Started for Free
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
