"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/utils";

export default function VisionSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);

  const visionLines = [
    "BUILD BETTER.",
    "LEARN DEEPER.",
    "SHIP MORE.",
    "BECOME DANGEROUSLY GOOD AT THE CRAFT.",
  ];

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      if (textContainerRef.current) {
        const lines = textContainerRef.current.querySelectorAll(".vision-line");
        lines.forEach((line, idx) => {
          gsap.fromTo(
            line,
            { opacity: 0.35, y: 25 },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              delay: idx * 0.08,
              ease: "power2.out",
              clearProps: "opacity,transform",
              scrollTrigger: {
                trigger: line,
                start: "top 92%",
                toggleActions: "play none none none",
                once: true,
              },
            }
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="vision"
      className="relative py-32 px-6 sm:px-12 max-w-7xl mx-auto z-10 select-none overflow-hidden"
    >
      {/* Eyebrow Label */}
      <div className="flex items-center gap-3 text-xs font-mono text-zinc-500 uppercase tracking-widest mb-10">
        <span className="text-[#00f0ff]">07 //</span>
        <span>ETHOS & HORIZON</span>
      </div>

      <div className="mb-12">
        <h2 className="text-xs sm:text-sm font-mono tracking-widest text-[#00f0ff] uppercase">
          WHAT&apos;S NEXT?
        </h2>
      </div>

      {/* Massive Kinetic Typography */}
      <div ref={textContainerRef} className="space-y-4 sm:space-y-6">
        {visionLines.map((line, idx) => (
          <div key={idx} className="overflow-hidden">
            <h3
              className={`vision-line text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter uppercase leading-[0.92] transition-colors duration-300 ${
                idx === 3
                  ? "text-transparent bg-clip-text bg-gradient-to-r from-white via-[#00f0ff] to-cyan-300"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              {line}
            </h3>
          </div>
        ))}
      </div>

      {/* Narrative Subtext */}
      <div className="mt-16 max-w-2xl text-base sm:text-lg text-zinc-400 font-light leading-relaxed border-t border-white/10 pt-8">
        <p>
          I am not presenting myself as a finished product. I am presenting the trajectory of
          uncompromising discipline, deliberate daily practice, and the obsession to turn complex
          computational mathematics into tangible real-world software.
        </p>
      </div>
    </section>
  );
}
