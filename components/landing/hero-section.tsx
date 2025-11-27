"use client";

import { motion } from "framer-motion";

export const HeroSection = () => {
    return (
        <div className="flex flex-col items-center text-center pt-[23vh] pb-24 max-h-screen">
            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight mb-8 max-w-5xl mx-auto leading-[1.1]"
            >
                Designed to elevate your{" "}
                <span className="font-serif pr-2.5 italic font-normal bg-linear-to-r from-blue-200 via-white to-blue-200 bg-clip-text text-transparent">
                    career
                </span>{" "}
                momentum
            </motion.h1>

            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg text-slate-400 max-w-xl mx-auto mb-12 leading-relaxed"
            >
                You are one click away from building a professional resume, a stunning
                portfolio, and tracking your career growth with real-time analytics.
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
