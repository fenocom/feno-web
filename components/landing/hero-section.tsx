"use client";

import { motion } from "framer-motion";

export const HeroSection = () => {
    return (
        <div className="flex flex-col items-center text-center pt-[23vh] pb-24 max-h-screen">
            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight mb-8 max-w-5xl mx-auto leading-[1]"
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
                className="relative group flex gap-1"
            >
                <div className="relative isolate overflow-hidden rounded-l-2xl rounded-r-sm min-w-[150px] h-14 flex items-center justify-center cursor-pointer group/btn">
                    <div className="absolute inset-0 bg-black backdrop-blur-lg transition-colors duration-300 group-hover/btn:bg-white/10" />
                    <div className="absolute inset-0 bg-[url('/noise.png')] bg-repeat bg-size-[60px] pointer-events-none" />
                    <span className="relative z-10 font-host text-white font-medium">
                        Resume
                    </span>
                </div>
                <div className="relative isolate overflow-hidden backdrop-blur-lg  rounded-l-sm rounded-r-2xl min-w-[150px] h-14 flex items-center justify-center cursor-pointer group/btn backdrop-blur-lg">
                    <div className="absolute inset-0 bg-black transition-colors duration-300 group-hover/btn:bg-white/10" />
                    <div className="absolute inset-0 bg-[url('/noise.png')] bg-repeat bg-size-[60px] pointer-events-none" />
                    <span className="relative z-10 font-host text-white font-medium">
                        Portfolio
                    </span>
                </div>
            </motion.div>
        </div>
    );
};
