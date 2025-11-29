"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
    {
        name: "Alex Chen",
        role: "Product Designer",
        content:
            "Feno completely changed how I present my work. The portfolio builder is intuitive and the results look professional instantly.",
        avatar: "AC",
    },
    {
        name: "Sarah Miller",
        role: "Software Engineer",
        content:
            "The resume editor is a game changer. Being able to break free from standard templates helped me land interviews at top tech companies.",
        avatar: "SM",
    },
    {
        name: "Jordan Taylor",
        role: "Marketing Lead",
        content:
            "I love the analytics feature. Knowing when recruiters are looking at my application gave me the confidence to follow up at the right time.",
        avatar: "JT",
    },
];

export const TestimonialsSection = () => {
    return (
        <section className="py-24 relative z-10">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-3xl md:text-5xl font-medium mb-6 tracking-tight font-host"
                    >
                        Loved by <span className="text-[#a1ccff] font-serif italic">builders</span>
                    </motion.h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm hover:bg-white/10 transition-colors"
                        >
                            <div className="flex gap-1 mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className="w-4 h-4 fill-[#a1ccff] text-[#a1ccff]"
                                    />
                                ))}
                            </div>
                            <p className="text-slate-300 mb-6 leading-relaxed">
                                "{testimonial.content}"
                            </p>
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-medium text-sm">
                                    {testimonial.avatar}
                                </div>
                                <div>
                                    <div className="text-white font-medium">
                                        {testimonial.name}
                                    </div>
                                    <div className="text-slate-500 text-sm">
                                        {testimonial.role}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
