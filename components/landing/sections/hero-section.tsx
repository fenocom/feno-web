"use client";

import { Button } from "@heroui/react";
import { motion } from "framer-motion";

export const HeroSection = () => {
  return (
    <div className="flex flex-col items-center text-center pt-[min(25vh,300px)] pb-24 max-h-screen">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight mb-8 max-w-5xl mx-auto leading"
      >
        Designed to elevate your{" "}
        <span className="font-serif pr-2.5 italic font-normal text-[#a1ccff]">
          career
        </span>{" "}
        <span className="font-mono bg-white/10 px-2 py-1 rounded text-6xl md:text-7xl lg:text-8xl leading-[0.8] inline-block mt-2 lg:mt-0">
          momentum
        </span>
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
        className="relative group flex items-center justify-center"
      >
        <div className="relative isolate overflow-hidden rounded-full p-1 flex items-center bg-white/5 backdrop-blur-lg border border-white/10">
          <div className="absolute inset-0 bg-[url('/noise.png')] bg-repeat bg-size-[100px] opacity-20 pointer-events-none" />
          <div className="flex items-center pl-4 pr-1">
            <span className="text-slate-400 font-mono text-sm mr-1">
              feno.app/
            </span>
            <input
              type="text"
              placeholder="yourname"
              className="bg-transparent border-none outline-none text-white font-mono text-sm w-24 placeholder:text-slate-600"
            />
          </div>
          <Button className="bg-white px-6 py-2 text-black transition-colors">
            Claim Your Space
          </Button>
        </div>
      </motion.div>
    </div>
  );
};
