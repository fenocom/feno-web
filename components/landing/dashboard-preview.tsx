"use client";

import { motion } from "framer-motion";
import { Bell, Moon } from "lucide-react";

export const DashboardPreview = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative w-full max-w-6xl mx-auto"
        >
            <div className="absolute -inset-4 bg-blue-500/10 blur-2xl rounded-[2rem] -z-10" />

            <div className="bg-[#0A0C14] border border-white/10 rounded-t-3xl overflow-hidden shadow-2xl">
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

                <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
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

                    <div className="bg-[#11131F] rounded-2xl p-6 border border-white/5 flex flex-col justify-between">
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-white font-medium">Client Distribution</h3>
                                <span className="text-xs text-green-400 font-medium">50% Growth</span>
                            </div>
                            <p className="text-xs text-slate-500 mb-6">By revenue segment</p>

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
