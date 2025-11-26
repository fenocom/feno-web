"use client";

import { DashboardPreview } from "./dashboard-preview";
import { HeroSection } from "./hero-section";
import { Navbar } from "./navbar";
import { ThreeBackground } from "./three-background";

export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-[#02040a] text-white font-sans selection:bg-blue-500/30 overflow-x-hidden">
      <Navbar />

      <main className="relative pt-20 pb-20 overflow-hidden">
        <div className="absolute max-h-screen top-0 left-0 w-full h-full pointer-events-none z-0">
          <div
            className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('/hero-bg.png'), linear-gradient(to bottom, #000000 0%, #001a57 50%, #d9e1e8 100%)",
              backgroundBlendMode: "normal"
            }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <HeroSection />
          <DashboardPreview />
        </div>
      </main>
    </div>
  );
};
