"use client";

import { motion } from "framer-motion";
import {
  Bell,
  ChevronDown,
  Moon,
} from "lucide-react";

import { ThreeBackground } from "./ThreeBackground";

export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-[#02040a] text-white font-sans selection:bg-blue-500/30 overflow-x-hidden">
      <Navbar />

      <main className="relative pt-20 pb-20 overflow-hidden">
        {/* 3D Background Animation */}
        <ThreeBackground />

        {/* Aurora Background Effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] pointer-events-none z-0">
          <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[120%] h-full bg-[conic-gradient(from_180deg_at_50%_50%,#00000000_0deg,#1e3a8a_160deg,#3b82f6_180deg,#1e3a8a_200deg,#00000000_360deg)] opacity-40 blur-[80px]" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[60%] bg-blue-900/20 blur-[100px] rounded-full mix-blend-screen" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <HeroSection />
          <DashboardPreview />
        </div>
      </main>
    </div>
  );
};

const Navbar = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-transparent backdrop-blur-sm border-b border-white/5">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white text-black rounded flex items-center justify-center">
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zm0 9l2.5-1.25L12 8.5l-2.5 1.25L12 11zm0 2.5l-5-2.5-5 2.5L12 22l10-8.5-5-2.5-5 2.5z" />
            </svg>
          </div>
        </div>

        {/* Menu Button */}
        <button className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded text-xs font-medium tracking-wide transition-colors">
          MENU <ChevronDown className="w-3 h-3" />
        </button>
      </div>
    </header>
  );
};

const HeroSection = () => {
  return (
    <div className="flex flex-col items-center text-center pt-16 pb-24">
      {/* Social Proof */}
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

      {/* Headline */}
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

      {/* Subtext */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-lg text-slate-400 max-w-xl mx-auto mb-12 leading-relaxed"
      >
        Become customer #10,001 and start winning with a dashboard that surfaces
        every growth opportunity in real time.
      </motion.p>

      {/* CTA */}
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

        {/* Decorative lines around button */}
        <div className="absolute top-1/2 -left-12 w-8 h-[1px] bg-gradient-to-r from-transparent to-white/20" />
        <div className="absolute top-1/2 -right-12 w-8 h-[1px] bg-gradient-to-l from-transparent to-white/20" />
      </motion.div>
    </div>
  );
};

const DashboardPreview = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="relative w-full max-w-6xl mx-auto"
    >
      {/* Glow behind dashboard */}
      <div className="absolute -inset-4 bg-blue-500/10 blur-2xl rounded-[2rem] -z-10" />

      <div className="bg-[#0A0C14] border border-white/10 rounded-t-3xl overflow-hidden shadow-2xl">
        {/* Dashboard Header */}
        <div className="h-14 border-b border-white/5 flex items-center justify-between px-6 bg-[#0A0C14]">
          <div className="flex items-center gap-4">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
              <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
            </div>
            <span className="text-sm text-slate-400 font-medium ml-2">
              Mira Growth Console
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-slate-400">
              <Moon className="w-4 h-4" />
            </div>
            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-slate-400">
              <Bell className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Chart Card */}
          <div className="md:col-span-2 bg-[#11131F] rounded-2xl p-6 border border-white/5">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-white font-medium mb-1">
                  Client Engagement Over Time
                </h3>
                <p className="text-xs text-slate-500">
                  Monitor weekly performance and spot inflection points instantly.
                </p>
              </div>
              <span className="px-2 py-1 bg-blue-500/10 text-blue-400 text-xs font-medium rounded border border-blue-500/20 flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" />
                Live
              </span>
            </div>

            {/* Chart Placeholder */}
            <div className="h-48 w-full relative">
              <svg className="w-full h-full overflow-visible" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  d="M0 150 C 100 140, 200 100, 300 80 C 400 60, 500 90, 600 40 L 600 200 L 0 200 Z"
                  fill="url(#chartGradient)"
                />
                <path
                  d="M0 150 C 100 140, 200 100, 300 80 C 400 60, 500 90, 600 40"
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="2"
                />
              </svg>
            </div>
          </div>

          {/* Secondary Card */}
          <div className="bg-[#11131F] rounded-2xl p-6 border border-white/5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-medium">Client Distribution</h3>
                <span className="text-xs text-green-400 font-medium">50% Growth</span>
              </div>
              <p className="text-xs text-slate-500 mb-6">By revenue segment</p>

              {/* Donut Chart Placeholder */}
              <div className="relative w-32 h-32 mx-auto">
                <svg className="w-full h-full -rotate-90">
                  <circle cx="64" cy="64" r="50" fill="none" stroke="#1e293b" strokeWidth="12" />
                  <circle cx="64" cy="64" r="50" fill="none" stroke="#3b82f6" strokeWidth="12" strokeDasharray="200" strokeDashoffset="100" strokeLinecap="round" />
                  <circle cx="64" cy="64" r="50" fill="none" stroke="#60a5fa" strokeWidth="12" strokeDasharray="100" strokeDashoffset="280" strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xl font-bold text-white">84%</span>
                </div>
              </div>
            </div>

            <button className="w-full py-2 mt-4 bg-white/5 hover:bg-white/10 rounded border border-white/10 text-xs text-slate-300 transition-colors">
              View Details
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
