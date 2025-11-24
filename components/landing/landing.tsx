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
        <ThreeBackground />

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
