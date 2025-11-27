"use client";


import { HeroSection } from "./hero-section";
import { Navbar } from "./navbar";
import { ProductPreview } from "./product-preview";

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
          {/* Spatial Grid Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

          {/* Dither Noise Overlay */}
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <HeroSection />
          <ProductPreview />
        </div>
      </main>
    </div>
  );
};
