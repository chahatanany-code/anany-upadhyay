"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import LoadingScreen from "@/components/ui/LoadingScreen";
import CustomCursor from "@/components/ui/CustomCursor";
import Navbar from "@/components/navigation/Navbar";
import HeroSection from "@/components/hero/HeroSection";
import AboutSection from "@/components/about/AboutSection";
import AthleticsSection from "@/components/athletics/AthleticsSection";
import SkillsSection from "@/components/skills/SkillsSection";
import ProjectsSection from "@/components/projects/ProjectsSection";
import JourneySection from "@/components/journey/JourneySection";
import CurrentlyLearningSection from "@/components/learning/CurrentlyLearningSection";
import VisionSection from "@/components/vision/VisionSection";
import ContactSection from "@/components/contact/ContactSection";
import Footer from "@/components/footer/Footer";

// Dynamically import Ravine ray-marched canyon background from React Bits Pro
const Ravine = dynamic(
  () => import("@/components/ui/ravine"),
  { ssr: false }
);

import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    if (typeof window !== "undefined") {
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 600);
    }
  };

  return (
    <>
      {isLoading && (
        <LoadingScreen onComplete={handleLoadingComplete} />
      )}

      <CustomCursor />

      {/* React Bits Pro: Endless Monochrome Ray-Marched Canyon Flight */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        <Ravine
          speed={1}
          steps={128}
          stepScale={0.5}
          scale={0.25}
          height={1}
          spread={34}
          wallCurve={2.5}
          fade={35}
          cameraHeight={6}
          tilt={0.05}
          roll={0.075}
          fov={1}
          nearColor="#000000"
          farColor="#ffffff"
          brightness={0.8}
          contrast={1}
          grain={0.005}
          className="w-full h-full"
        />
        {/* Soft edge vignette to preserve typography hierarchy while showing the canyon in full glory */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#07080a]/50 via-transparent to-[#07080a]/70 pointer-events-none" />
      </div>

      <div className="relative min-h-screen bg-transparent text-white selection:bg-[#00f0ff] selection:text-[#07080a] z-10">
        <Navbar />
        <main>
          <HeroSection />
          <AboutSection />
          <AthleticsSection />
          <SkillsSection />
          <ProjectsSection />
          <JourneySection />
          <CurrentlyLearningSection />
          <VisionSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </>
  );
}
