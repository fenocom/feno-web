"use client";

import { motion } from "framer-motion";
import { clsx } from "clsx";
import Image from "next/image";
import { Sparkles, FileText, Zap, Chrome, BarChart3, Layout } from "lucide-react";

const FeatureBlock = ({
    title,
    description,
    imageSrc,
    imageAlt,
    align,
    children,
    subFeatures,
    miniHeading,
    miniIcon,
    withSeparator = false,
}: {
    title: string;
    description: string;
    imageSrc: string;
    imageAlt: string;
    align: "left" | "right";
    children?: React.ReactNode;
    subFeatures?: { title: string; description: string; icon: React.ReactNode }[];
    miniHeading?: string;
    miniIcon?: React.ReactNode;
    withSeparator?: boolean;
}) => {
    return (
        <div className="relative">
            {withSeparator && (
                <div className="absolute top-0 left-4 right-4 lg:left-0 lg:right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            )}
            <div className={clsx(
                "flex flex-col gap-12 items-center py-20 lg:py-24",
                align === "left" ? "lg:flex-row" : "lg:flex-row-reverse"
            )}>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="flex-1 w-full"
                >
                    <div className="relative rounded-2xl overflow-hidden h-[400px] lg:h-[500px] group">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-20 group-hover:opacity-40 transition-opacity" />

                        <div className="absolute inset-0 flex items-center justify-center">
                            {imageSrc ? (
                                <img src={imageSrc} alt={imageAlt} className="w-full h-full object-contain" />
                            ) : (
                                <span className="text-slate-500">{imageAlt}</span>
                            )}
                        </div>
                    </div>
                </motion.div>


                <motion.div
                    initial={{ opacity: 0, x: align === "left" ? 20 : -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="flex-1 space-y-8 px-4 lg:px-0"
                >
                    <div className="space-y-4">
                        {miniHeading && (
                            <div className="flex items-center gap-2 text-[#A1A1AA] text-sm font-medium mb-2 tracking-wider uppercase">
                                {miniIcon}
                                <span>{miniHeading}</span>
                            </div>
                        )}
                        <h3 className="text-3xl lg:text-4xl font-semibold text-white tracking-tight">
                            {title}
                        </h3>
                        <p className="text-[#A1A1AA] text-lg leading-loose max-w-lg">
                            {description}
                        </p>
                    </div>

                    {subFeatures && (
                        <div className="space-y-6">
                            {subFeatures.map((feature, idx) => (
                                <div key={idx} className="flex gap-4">
                                    <div className="mt-1 flex-shrink-0 w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#a1ccff]">
                                        {feature.icon}
                                    </div>
                                    <div>
                                        <h4 className="text-white font-medium text-lg">{feature.title}</h4>
                                        <p className="text-[#A1A1AA] text-sm leading-relaxed">{feature.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {children}
                </motion.div>
            </div >
        </div >
    );
};

export const FeaturesSection = () => {
    return (
        <section className="py-24 relative z-10 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent opacity-40 pointer-events-none" />

            <div className="container mx-auto px-4 pt-20 max-w-6xl">
                <div className="text-center mb-32">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-medium tracking-tight text-white mb-6 font-host"
                    >
                        Built for the <span className="text-[#a1ccff]">modern professional</span>
                    </motion.h2>
                    <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                        Everything you need to manage your career, from building your resume to tracking your success, all in one place.
                    </p>
                </div>


                <FeatureBlock
                    align="left"
                    title="Precision-Crafted Documents"
                    description="Move beyond standard templates. Create resumes and portfolios that adapt to your evolving skills, ensuring you always present your best self with minimal effort."
                    imageSrc="/_next/static/media/feature_table_ui.png"
                    imageAlt="Resume Builder interface showing block editor"
                    miniHeading="CREATE WITHOUT LIMITS"
                    miniIcon={<FileText size={16} />}
                    subFeatures={[
                        {
                            title: "Composition Focus",
                            description: "Feno handles the formatting so you can focus purely on composing your narrative.",
                            icon: <FileText size={20} />
                        },
                        {
                            title: "Notion-like Experience",
                            description: "A familiar slash-command interface makes writing your experience intuitive and fast.",
                            icon: <Layout size={20} />
                        },
                        {
                            title: "One-Click Build",
                            description: "Instantly compile your blocks into a perfectly formatted, ATS-friendly PDF.",
                            icon: <Zap size={20} />
                        }
                    ]}
                />


                <FeatureBlock
                    align="right"
                    title="Intelligent Automation"
                    description="Let our system handle the repetitive formatting and data entry. Reclaim your time and focus on what matters: preparing for your next big opportunity."
                    imageSrc="/feature_portfolio.png"
                    imageAlt="Automation Interface"
                    miniHeading="INTELLIGENT AUTOMATION"
                    miniIcon={<Sparkles size={16} />}
                    withSeparator
                    subFeatures={[
                        {
                            title: "Instant Transformation",
                            description: "Turn your text-based resume into an interactive website with a single click.",
                            icon: <Sparkles size={20} />
                        },
                        {
                            title: "AI Customization",
                            description: "Let AI generate layouts and copy that perfectly match your personal brand.",
                            icon: <StarsIcon size={20} />
                        }
                    ]}
                />


                <FeatureBlock
                    align="left"
                    title="Connection, Simplified"
                    description="Manage your applications and networking outreach from a single dashboard. Keep track of conversations without the mental load of remembering follow-ups."
                    imageSrc="/feature_extension.png"
                    imageAlt="Networking Dashboard"
                    miniHeading="APPLY SMARTER"
                    miniIcon={<Chrome size={16} />}
                    withSeparator
                    subFeatures={[
                        {
                            title: "Auto-Fill Applications",
                            description: "Automatically populate job applications with data from your Feno profile.",
                            icon: <AppWindowIcon size={20} />
                        },
                        {
                            title: "Job Tracking",
                            description: "Save jobs to your dashboard with one click to track your application status.",
                            icon: <Chrome size={20} />
                        }
                    ]}
                />


                <div className="relative">
                    <div className="absolute top-0 left-4 right-4 lg:left-0 lg:right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                    <div className="flex flex-col lg:flex-row-reverse gap-12 items-center py-20 lg:py-24">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="flex-1 w-full"
                        >
                            <div className="relative rounded-2xl overflow-hidden h-[400px] lg:h-[500px] group">
                                <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10 opacity-20 group-hover:opacity-40 transition-opacity" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-xl font-mono text-emerald-400">Analytics Dashboard</span>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="flex-1 space-y-8 px-4 lg:px-0"
                        >
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 text-[#A1A1AA] text-sm font-medium mb-2 tracking-wider">
                                    <BarChart3 size={16} />
                                    <span className="uppercase">Insight-Driven Growth</span>
                                </div>
                                <h3 className="text-3xl lg:text-4xl font-semibold text-white tracking-tight">
                                    Insight-Driven Growth
                                </h3>
                                <p className="text-[#A1A1AA] text-lg leading-loose max-w-lg">
                                    Description clarity on your performance. Understand which applications resonate and gain data-backed confidence in your job search strategy.
                                </p>
                            </div>
                            <div className="flex flex-col gap-4">
                                <div className="flex gap-4 items-center p-4 rounded-xl bg-white/5 border border-white/10">
                                    <BarChart3 className="text-emerald-400" size={24} />
                                    <div>
                                        <h4 className="text-white font-medium">Link Tracking</h4>
                                        <p className="text-[#A1A1AA] text-sm">See who clicks your resume link and when.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4 items-center p-4 rounded-xl bg-white/5 border border-white/10">
                                    <img src="https://flagcdn.com/w20/us.png" alt="US" className="w-6 h-4 object-cover rounded shadow-sm" />
                                    <div>
                                        <h4 className="text-white font-medium">Geo-Location Data</h4>
                                        <p className="text-[#A1A1AA] text-sm">Track where your profile is being viewed from.</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>

            </div>
        </section>
    );
};

// Simple icons for the unique ones
const StarsIcon = ({ size, className }: { size?: number, className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size || 24}
        height={size || 24}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27f6.91 1 3.09-6.26L12 2z" />
    </svg>
);

const AppWindowIcon = ({ size, className }: { size?: number, className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size || 24}
        height={size || 24}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M10 4v4" />
        <path d="M2 8h20" />
        <path d="M6 4v4" />
    </svg>
);
