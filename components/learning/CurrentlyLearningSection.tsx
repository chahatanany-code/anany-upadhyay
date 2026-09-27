"use client";

import React, { useEffect, useRef } from "react";
import { currentlyLearningData } from "@/data/learning";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/utils";
import { Hammer, Sparkles, TrendingUp } from "lucide-react";

export default function CurrentlyLearningSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      if (gridRef.current) {
        gsap.fromTo(
          gridRef.current.children,
          { opacity: 0.35, y: 20 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.08,
            duration: 0.6,
            ease: "power2.out",
            clearProps: "opacity,transform",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 88%",
              toggleActions: "play none none none",
              once: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="learning"
      className="relative py-28 px-6 sm:px-12 max-w-7xl mx-auto z-10"
    >
      {/* Eyebrow Label */}
      <div className="flex items-center gap-3 text-xs font-mono text-zinc-500 uppercase tracking-widest mb-6">
        <span className="text-[#00f0ff]">06 //</span>
        <span>ACTIVE R&D TOPICS</span>
      </div>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white uppercase">
            CURRENTLY LEARNING.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-zinc-400 max-w-2xl font-light">
            A developer in continuous motion. These are the technical frontiers where I am actively
            investing deliberate deep-work blocks right now.
          </p>
        </div>

        {/* Live Status Badge */}
        <div className="flex items-center gap-3 px-5 py-2.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs shadow-[0_0_20px_rgba(16,185,129,0.15)]">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-bold tracking-wider">STATUS: BUILDING</span>
        </div>
      </div>

      {/* Grid of Learning Focus Areas */}
      <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentlyLearningData.topics.map((topic, idx) => (
          <div
            key={idx}
            className="flex flex-col justify-between p-6 sm:p-8 rounded-2xl bg-[#0d0f14]/80 border border-white/10 backdrop-blur-md hover:border-[#00f0ff]/40 transition-all duration-300 group hover:-translate-y-1"
          >
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-zinc-500 mb-4">
                <span className="text-[#00f0ff] uppercase">{topic.category}</span>
                <span>DEEP DIVE #{idx + 1}</span>
              </div>

              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#00f0ff] transition-colors">
                {topic.title}
              </h3>

              <p className="text-xs text-zinc-400 font-mono leading-relaxed mb-4 bg-white/[0.02] p-3 rounded-lg border border-white/5">
                <span className="text-zinc-500 block mb-1">FOCUS:</span>
                {topic.focus}
              </p>

              <div className="text-xs text-zinc-300 font-light leading-relaxed mb-6">
                <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-widest block mb-1">
                  WHY IT MATTERS:
                </span>
                {topic.whyItMatters}
              </div>
            </div>

            {/* Progress bar */}
            <div>
              <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500 mb-1.5">
                <span>INTENSITY</span>
                <span className="text-[#00f0ff] font-bold">{topic.progress}%</span>
              </div>
              <div className="w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden border border-white/5">
                <div
                  className="h-full bg-gradient-to-r from-cyan-500 to-[#00f0ff] rounded-full transition-all duration-500"
                  style={{ width: `${topic.progress}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
