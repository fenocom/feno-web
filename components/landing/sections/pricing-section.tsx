"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@radix-ui/themes";

const plans = [
    {
        name: "Starter",
        price: "Free",
        description: "Perfect for building your first resume and portfolio.",
        features: [
            "Unlimited Resumes",
            "Basic Portfolio",
            "Export to PDF",
            "Standard Themes",
            "Community Support",
        ],
        highlight: false,
    },
    {
        name: "Pro",
        price: "$12",
        period: "/month",
        description: "For serious professionals who want to stand out.",
        features: [
            "Everything in Starter",
            "Visual ATS Optimization",
            "Custom Domain",
            "Advanced Analytics",
            "Priority Support",
            "AI Writing Assistant",
        ],
        highlight: true,
    },
];

export const PricingSection = () => {
    return (
        <section className="py-32 relative z-10">
            <div className="container mx-auto px-4">
                <div className="text-center mb-20">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-3xl md:text-5xl font-medium mb-6 tracking-tight"
                    >
                        Simple, transparent <span className="text-[#a1ccff] font-serif italic">pricing</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-slate-400 max-w-xl mx-auto text-lg"
                    >
                        Start for free, upgrade when you're ready to take your career to the next level.
                    </motion.p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {plans.map((plan, index) => (
                        <motion.div
                            key={plan.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className={`relative p-8 rounded-3xl border ${plan.highlight
                                ? "bg-white/10 border-[#a1ccff]/50 shadow-[0_0_50px_-12px_rgba(161,204,255,0.3)]"
                                : "bg-white/5 border-white/10"
                                } backdrop-blur-md flex flex-col`}
                        >
                            {plan.highlight && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#a1ccff] text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                    Most Popular
                                </div>
                            )}

                            <div className="mb-8">
                                <h3 className="text-xl font-medium mb-2">{plan.name}</h3>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-4xl font-bold">{plan.price}</span>
                                    {plan.period && (
                                        <span className="text-slate-400">{plan.period}</span>
                                    )}
                                </div>
                                <p className="text-slate-400 mt-4 leading-relaxed">
                                    {plan.description}
                                </p>
                            </div>

                            <ul className="space-y-4 mb-8 flex-1">
                                {plan.features.map((feature) => (
                                    <li key={feature} className="flex items-center gap-3">
                                        <div className={`w-5 h-5 rounded-full flex items-center justify-center ${plan.highlight ? "bg-[#a1ccff] text-black" : "bg-white/10 text-white"}`}>
                                            <Check className="w-3 h-3" />
                                        </div>
                                        <span className="text-slate-300">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <Button
                                className={`w-full py-6! text-base! font-medium! cursor-pointer! ${plan.highlight
                                    ? "bg-[#a1ccff]! text-black! hover:bg-[#8bb8ef]!"
                                    : "bg-white/10! text-white! hover:bg-white/20!"
                                    }`}
                                variant="solid"
                            >
                                {plan.highlight ? "Get Started Pro" : "Start for Free"}
                            </Button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
