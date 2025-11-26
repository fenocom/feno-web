"use client";

import { motion } from "framer-motion";

export const HeroSection = () => {
    return (
        <div className="flex flex-col items-center text-center pt-16 pb-24 max-h-screen">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex items-center gap-3 mb-10"
            >
                <div className="flex -space-x-3">
                    {[1, 2, 3, 4].map((i) => (
                        <div
                            key={i}
                            className="w-8 h-8 rounded-full border-2 border-black bg-gradient-to-br from-slate-700 to-slate-600"
                        />
                    ))}
                    <div className="w-8 h-8 rounded-full border-2 border-black bg-slate-800 flex items-center justify-center text-[10px] font-medium">
                        +9k
                    </div>
                </div>
                <span className="text-xs font-medium tracking-widest text-slate-400 uppercase">
                    Trusted by #10,000 delighted customers
                </span>
            </motion.div>

            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight mb-8 max-w-5xl mx-auto leading-[1.1]"
            >
                Designed to elevate your{" "}
                <span className="font-serif italic font-normal bg-gradient-to-r from-blue-200 via-white to-blue-200 bg-clip-text text-transparent">
                    growth-ready
                </span>{" "}
                momentum
            </motion.h1>

            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg text-slate-400 max-w-xl mx-auto mb-12 leading-relaxed"
            >
                Become customer #10,001 and start winning with a dashboard that surfaces
                every growth opportunity in real time.
            </motion.p>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="relative group"
            >
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded opacity-20 blur group-hover:opacity-40 transition duration-200" />
                <button className="relative px-8 py-4 bg-black border border-white/20 text-white text-sm font-medium tracking-widest uppercase hover:bg-white/5 transition-colors">
                    Book Your Call
                </button>

                <div className="absolute top-1/2 -left-12 w-8 h-[1px] bg-gradient-to-r from-transparent to-white/20" />
                <div className="absolute top-1/2 -right-12 w-8 h-[1px] bg-gradient-to-l from-transparent to-white/20" />
            </motion.div>
        </div>
    );
};
