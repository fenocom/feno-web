"use client";

import { Logo } from "../../common";

export const Footer = () => {
    return (
        <footer className="relative z-10 border-t border-white/10 bg-black/20 backdrop-blur-lg">
            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-16">
                    <div className="col-span-2 md:col-span-1">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-black">
                                <Logo />
                            </div>
                            <span className="font-bold font-host text-xl">
                                FENO
                            </span>
                        </div>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            The all-in-one platform for your professional
                            identity. Build, share, and grow your career with
                            Feno.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-medium mb-6">Product</h4>
                        <ul className="space-y-4 text-sm text-slate-400">
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-white transition-colors"
                                >
                                    Resume Builder
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-white transition-colors"
                                >
                                    Portfolio
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-white transition-colors"
                                >
                                    Analytics
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-white transition-colors"
                                >
                                    Pricing
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-medium mb-6">Resources</h4>
                        <ul className="space-y-4 text-sm text-slate-400">
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-white transition-colors"
                                >
                                    Blog
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-white transition-colors"
                                >
                                    Community
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-white transition-colors"
                                >
                                    Help Center
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-white transition-colors"
                                >
                                    Templates
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-medium mb-6">Legal</h4>
                        <ul className="space-y-4 text-sm text-slate-400">
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-white transition-colors"
                                >
                                    Privacy Policy
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-white transition-colors"
                                >
                                    Terms of Service
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-white transition-colors"
                                >
                                    Cookie Policy
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-slate-500 text-sm">
                        © {new Date().getFullYear()} Feno. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6">
                        <a
                            href="#"
                            className="text-slate-500 hover:text-white transition-colors"
                        >
                            Twitter
                        </a>
                        <a
                            href="#"
                            className="text-slate-500 hover:text-white transition-colors"
                        >
                            GitHub
                        </a>
                        <a
                            href="#"
                            className="text-slate-500 hover:text-white transition-colors"
                        >
                            LinkedIn
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};
