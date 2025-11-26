"use client";

import { motion } from "framer-motion";
import React from "react";

// --- Visual Components ---

// Card 1: The "Infinite Canvas" (Visualizing Innovation)
// "The Constellation" - 3D Node Network
const InfiniteCanvasVisual = () => {
    return (
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none select-none">
            <div className="relative w-full h-full perspective-[1000px]">
                <div className="absolute inset-0 flex items-center justify-center transform-style-3d rotate-x-12 rotate-y-12 scale-90">
                    
                    {/* Connecting Lines (Fiber Optic Bezier Curves) */}
                    <svg className="absolute inset-0 w-full h-full overflow-visible z-0">
                        <defs>
                            <linearGradient id="fiber-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="rgba(139,92,246,0)" />
                                <stop offset="50%" stopColor="rgba(139,92,246,0.8)" />
                                <stop offset="100%" stopColor="rgba(139,92,246,0)" />
                            </linearGradient>
                        </defs>
                        
                        {/* Connection 1: Top Left to Center */}
                        <motion.path
                            d="M 120 150 C 150 150, 200 240, 240 240"
                            fill="none"
                            stroke="url(#fiber-gradient)"
                            strokeWidth="2"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 1 }}
                            transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
                        />
                        {/* Connection 2: Top Right to Center */}
                        <motion.path
                            d="M 360 160 C 330 160, 280 240, 240 240"
                            fill="none"
                            stroke="url(#fiber-gradient)"
                            strokeWidth="2"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 1 }}
                            transition={{ duration: 1.5, delay: 0.7, ease: "easeInOut" }}
                        />
                        {/* Connection 3: Bottom to Center */}
                        <motion.path
                            d="M 240 340 C 240 310, 240 280, 240 240"
                            fill="none"
                            stroke="url(#fiber-gradient)"
                            strokeWidth="2"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 1 }}
                            transition={{ duration: 1.5, delay: 0.9, ease: "easeInOut" }}
                        />
                    </svg>

                    {/* Floating Glass Tiles (Satellite Nodes) */}
                    
                    {/* Node 1: Exp */}
                    <motion.div 
                        className="absolute top-[30%] left-[20%] w-16 h-12 rounded-lg bg-white/5 border border-white/10 border-t-white/40 backdrop-blur-[10px] flex items-center justify-center shadow-lg z-10"
                        animate={{ y: [-5, 5, -5] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <div className="text-[10px] text-white/60 font-mono">EXP</div>
                    </motion.div>

                     {/* Node 2: Edu */}
                     <motion.div 
                        className="absolute top-[32%] right-[20%] w-16 h-12 rounded-lg bg-white/5 border border-white/10 border-t-white/40 backdrop-blur-[10px] flex items-center justify-center shadow-lg z-10"
                        animate={{ y: [5, -5, 5] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                    >
                        <div className="text-[10px] text-white/60 font-mono">EDU</div>
                    </motion.div>

                    {/* Node 3: Projects */}
                    <motion.div 
                        className="absolute bottom-[25%] left-[45%] -translate-x-1/2 w-20 h-12 rounded-lg bg-white/5 border border-white/10 border-t-white/40 backdrop-blur-[10px] flex items-center justify-center shadow-lg z-10"
                        animate={{ y: [-3, 3, -3] }}
                        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                    >
                        <div className="text-[10px] text-white/60 font-mono">PROJ</div>
                    </motion.div>

                    {/* Core Node (User) */}
                    <motion.div
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-linear-to-br from-blue-500/30 to-purple-500/30 border border-white/20 backdrop-blur-xl shadow-[0_0_40px_-10px_rgba(139,92,246,0.5)] z-20 flex items-center justify-center"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
                    >
                         <div className="w-8 h-8 rounded-full bg-white/90 shadow-[0_0_15px_white]" />
                    </motion.div>

                    {/* Floating Cursor */}
                    <motion.div
                        className="absolute z-30"
                        initial={{ x: 140, y: 180, opacity: 0 }}
                        animate={{ 
                            x: [140, 230, 230, 140], 
                            y: [180, 230, 230, 180],
                            opacity: [0, 1, 1, 0]
                        }}
                        transition={{ duration: 4, repeat: Infinity, repeatDelay: 2 }}
                    >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 3L10.07 19.97L12.58 12.58L19.97 10.07L3 3Z" fill="#EC4899" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
                        </svg>
                        <div className="absolute left-4 top-0 bg-[#EC4899] text-white text-[8px] px-1 rounded whitespace-nowrap">
                            AI Agent
                        </div>
                    </motion.div>

                </div>
            </div>
        </div>
    );
};

// Card 2: The "Speed Engine" (Visualizing Velocity)
// "The Particle Accelerator" - Kinetic Data Stream
const SpeedEngineVisual = () => {
    return (
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none select-none">
            
            {/* Left Side: Chaos Particles */}
            <div className="absolute left-0 top-0 bottom-0 w-[45%] overflow-hidden">
                {[...Array(12)].map((_, i) => (
                    <motion.div
                        key={`chaos-${i}`}
                        className="absolute w-1.5 h-1.5 bg-white/40 rounded-sm"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 80}%`,
                        }}
                        animate={{ 
                            x: [0, 100], 
                            opacity: [0, 1, 0],
                            scaleX: [1, 3] // Simulate motion blur stretching
                        }}
                        transition={{
                            duration: 0.8 + Math.random() * 0.5,
                            repeat: Infinity,
                            ease: "linear",
                            delay: Math.random() * 2
                        }}
                    />
                ))}
                {[...Array(5)].map((_, i) => (
                    <motion.div
                        key={`block-${i}`}
                        className="absolute h-4 bg-white/20 rounded-sm"
                        style={{
                            width: `${20 + Math.random() * 30}px`,
                            top: `${20 + Math.random() * 60}%`,
                            left: `${Math.random() * 60}%`,
                        }}
                        animate={{ 
                            x: [0, 150], 
                            opacity: [0, 1, 0] 
                        }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "linear",
                            delay: Math.random() * 2
                        }}
                    />
                ))}
            </div>

            {/* Middle: The Event (Lens/Aperture) */}
            <div className="absolute left-[45%] top-1/2 -translate-y-1/2 h-32 w-1 bg-white/80 shadow-[0_0_20px_2px_rgba(255,255,255,0.6)] z-20 rounded-full" />
            
            {/* Right Side: Order (Lines) */}
            <div className="absolute left-[45%] right-0 top-0 bottom-0 overflow-hidden">
                {[...Array(4)].map((_, i) => (
                    <motion.div
                        key={`line-${i}`}
                        className="absolute h-[2px] bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]"
                        style={{
                            top: `${35 + i * 10}%`,
                            left: '2px', // Start right after the lens
                            right: '-20%', // Extend past edge
                        }}
                        initial={{ scaleX: 0, originX: 0, opacity: 0 }}
                        animate={{ scaleX: 1, opacity: [0, 1, 1, 0] }}
                        transition={{
                            duration: 0.4,
                            repeat: Infinity,
                            repeatDelay: 0.1 + i * 0.1,
                            ease: "circOut"
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

// Card 3: The "Optimization" (Visualizing Precision)
// "The Holographic Scan" - HUD Scanner
const OptimizationVisual = () => {
    return (
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none select-none">
            <div className="relative w-48 h-60 perspective-[800px]">
                 {/* Wireframe Document Container */}
                <motion.div 
                    className="w-full h-full border border-emerald-500/20 bg-emerald-900/5 relative preserve-3d"
                    style={{ rotateX: 20 }}
                >
                    {/* Grid Background */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.1)_1px,transparent_1px)] bg-size-[20px_20px]" />
                    
                    {/* Content Lines (Unverified State - Dim) */}
                    <div className="absolute inset-0 p-6 flex flex-col gap-4 opacity-30">
                         <div className="w-1/2 h-4 bg-emerald-500/20 rounded-sm" />
                         <div className="w-full h-2 bg-emerald-500/20 rounded-sm" />
                         <div className="w-full h-2 bg-emerald-500/20 rounded-sm" />
                         <div className="w-3/4 h-2 bg-emerald-500/20 rounded-sm" />
                         <div className="mt-4 w-1/3 h-4 bg-emerald-500/20 rounded-sm" />
                         <div className="w-full h-2 bg-emerald-500/20 rounded-sm" />
                         <div className="w-full h-2 bg-emerald-500/20 rounded-sm" />
                    </div>

                    {/* Mask for Verified State (Bright) */}
                    <motion.div 
                        className="absolute inset-0 overflow-hidden bg-emerald-900/10 p-6 flex flex-col gap-4 z-10"
                        animate={{ height: ["0%", "100%", "0%"] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    >
                        <div className="w-1/2 h-4 bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.5)] rounded-sm" />
                        <div className="w-full h-2 bg-emerald-400/80 rounded-sm" />
                        <div className="w-full h-2 bg-emerald-400/80 rounded-sm" />
                        <div className="w-3/4 h-2 bg-emerald-400/80 rounded-sm" />
                        <div className="mt-4 w-1/3 h-4 bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.5)] rounded-sm" />
                        <div className="w-full h-2 bg-emerald-400/80 rounded-sm" />
                        <div className="w-full h-2 bg-emerald-400/80 rounded-sm" />
                        
                        {/* Scan Line */}
                        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-emerald-400 shadow-[0_0_20px_2px_rgba(52,211,153,0.8)]">
                             {/* Floating Stats on Scan Line */}
                            <div className="absolute right-[-60px] -top-2 flex flex-col items-start">
                                <span className="text-[10px] font-mono text-emerald-400 bg-black/80 px-1 py-0.5 rounded border border-emerald-500/30">98% MATCH</span>
                                <span className="text-[8px] font-mono text-emerald-500/70 mt-0.5">PARSING...</span>
                            </div>
                        </div>
                    </motion.div>

                </motion.div>
            </div>
        </div>
    );
};

const cards = [
    {
        title: "Think outside the",
        titleAccent: "A4 page",
        description: "Break free from rigid, linear document editors. Map your skills, experience, and projects on an infinite spatial canvas designed for the way you actually think—not just how you print.",
        visual: InfiniteCanvasVisual,
    },
    {
        title: "Designed to move at",
        titleAccent: "AI speed",
        description: "Stop fighting with formatting. Instantly transform your structured resume data into a fully deployed portfolio website or auto-fill complex applications in milliseconds.",
        visual: SpeedEngineVisual,
    },
    {
        title: "Optimized for",
        titleAccent: "human and machine",
        description: "Crafted to captivate recruiters and conquer the ATS. Get real-time compatibility scoring against job descriptions and track exactly when and how your profile is viewed.",
        visual: OptimizationVisual,
    },
];

export const InfographicSection = () => {
    return (
        <section className="py-32 relative z-10 bg-[#0B0C0E]">
            {/* Noise Texture Overlay */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('/noise.png')] bg-repeat mix-blend-overlay" />

            <div className="container mx-auto px-6 max-w-7xl relative z-10">
                <div className="mb-20 max-w-4xl">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-5xl md:text-7xl font-bold mb-8 tracking-tight text-[#EDEDED]"
                    >
                        Engineered for the
                        <br />
                        modern career path
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-xl md:text-2xl text-[#8A8F98] max-w-3xl leading-relaxed"
                    >
                        Feno is shaped by the reality that your professional journey is non-linear.
                        Replace static documents with a spatial workspace, generative design,
                        and autonomous agents that handle the logistics of your job hunt.
                    </motion.p>
                     <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="mt-8"
                    >
                        <span className="text-white cursor-pointer hover:underline inline-flex items-center gap-1 text-lg font-medium">
                            Start building free &gt;
                        </span>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {cards.map((card, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 + 0.2 }}
                            className="group relative h-[520px] rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 overflow-hidden hover:border-white/30 transition-all duration-300 shadow-[inset_0_0_20px_rgba(255,255,255,0.02)]"
                        >
                            
                            {/* Visual Area - Top 65% */}
                            <div className="absolute inset-x-0 top-0 h-[65%] overflow-hidden">
                                {/* Radial Glow Background */}
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_0%,transparent_70%)] opacity-50 group-hover:opacity-80 transition-opacity duration-500" />
                                
                                <div className="relative w-full h-full transition-transform duration-500 group-hover:scale-105 origin-center">
                                     <card.visual />
                                </div>
                            </div>

                            {/* Content - Bottom 35% */}
                            <div className="absolute inset-x-0 bottom-0 p-8 flex flex-col justify-end z-20 bg-linear-to-t from-[#0B0C0E] via-[#0B0C0E]/80 to-transparent pt-20">
                                <h3 className="text-2xl font-medium mb-4 text-[#EDEDED] tracking-tight">
                                    {card.title}{" "}
                                    <span className="font-serif italic font-normal text-white">
                                        {card.titleAccent}
                                    </span>
                                </h3>
                                <p className="text-[#8A8F98] text-sm leading-relaxed">
                                    {card.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
