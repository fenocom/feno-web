"use client";

import { Footer } from "./layout/footer";
import { Navbar } from "./layout/navbar";
import { AIHelpSection } from "./sections/ai-help-section";
import { CTASection } from "./sections/cta-section";
import { FeaturesSection } from "./sections/features-section";
import { HeroSection } from "./sections/hero-section";
import { RoadmapSection } from "./sections/roadmap-section";
import { TemplatesSection } from "./sections/templates-section";
import { ProductPreview } from "./ui/product-preview";

export const LandingPage = () => {
    return (
        <div className="min-h-screen text-white font-sans overflow-x-hidden">
            <Navbar />
            <main className="relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
                    <div
                        className="h-screen inset-0 w-full bg-cover bg-center bg-no-repeat"
                        style={{
                            backgroundImage:
                                "url('/hero-bg.png'), linear-gradient(to bottom, #000000 0%, #001a57 50%, #d9e1e8 100%)",
                            backgroundBlendMode: "normal",
                        }}
                    />
                    <div
                        className="h-screen transform rotate-x-180 inset-0 w-full bg-cover bg-center bg-no-repeat"
                        style={{
                            backgroundImage:
                                "url('/hero-bg.png'), linear-gradient(to bottom, #000000 0%, #001a57 50%, #d9e1e8 100%)",
                            backgroundBlendMode: "normal",
                        }}
                    />

                    <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay" />
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <HeroSection />
                    <ProductPreview />
                </div>

                <FeaturesSection />
                <AIHelpSection />
                <TemplatesSection />
                <RoadmapSection />
                <CTASection />
                <Footer />
            </main>
        </div>
    );
};
