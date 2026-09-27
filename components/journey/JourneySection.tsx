"use client";

import React, { useEffect, useRef } from "react";
import { journeyMilestones } from "@/data/journey";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/utils";
import { Flag, Compass, Clock, CheckCircle } from "lucide-react";

export default function JourneySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const items = timelineRef.current?.querySelectorAll(".timeline-card");
      if (items) {
        items.forEach((item, idx) => {
          gsap.fromTo(
            item,
            { opacity: 0.35, x: -20 },
            {
              opacity: 1,
              x: 0,
              duration: 0.7,
              ease: "power2.out",
              clearProps: "opacity,transform",
              scrollTrigger: {
                trigger: item,
                start: "top 90%",
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
      id="journey"
      className="relative py-28 px-6 sm:px-12 max-w-7xl mx-auto z-10"
    >
      {/* Eyebrow Label */}
      <div className="flex items-center gap-3 text-xs font-mono text-zinc-500 uppercase tracking-widest mb-6">
        <span className="text-[#00f0ff]">05 //</span>
        <span>TRAJECTORY & MILESTONES</span>
      </div>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white uppercase">
            THE JOURNEY.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-zinc-400 max-w-2xl font-light">
            Evolution from curiosity to engineering rigor:{" "}
            <span className="text-[#00f0ff] font-mono">Student → Developer → Builder → Engineer</span>.
            Every milestone reflects genuine hours logged, with future ambitions clearly declared.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 p-3 rounded-xl bg-white/[0.03] border border-white/10">
          <Compass className="w-4 h-4 text-[#00f0ff]" />
          <span>SRMIST DELHI NCR (2024–2028)</span>
        </div>
      </div>

      {/* Vertical Timeline */}
      <div ref={timelineRef} className="relative border-l border-white/10 pl-6 sm:pl-10 space-y-12 ml-4">
        {journeyMilestones.map((milestone, idx) => {
          const isFuture = milestone.status.includes("Goal");
          const isInProgress = milestone.status === "In Progress";

          return (
            <div
              key={milestone.stage}
              className="timeline-card relative group"
            >
              {/* Timeline Node Dot */}
              <div
                className={`absolute -left-[31px] sm:-left-[47px] top-1.5 w-4 h-4 rounded-full border-2 transition-all duration-300 ${
                  isFuture
                    ? "border-dashed border-amber-400/80 bg-[#07080a]"
                    : isInProgress
                    ? "border-[#00f0ff] bg-[#00f0ff] shadow-[0_0_12px_#00f0ff]"
                    : "border-[#00f0ff] bg-[#07080a] group-hover:bg-[#00f0ff]"
                }`}
              />

              {/* Milestone Card */}
              <div
                className={`p-6 sm:p-8 rounded-2xl border transition-all duration-300 ${
                  isFuture
                    ? "bg-[#0b0d13]/70 border-amber-500/20 hover:border-amber-400/40"
                    : isInProgress
                    ? "bg-[#0d121c]/90 border-[#00f0ff]/40 shadow-[0_0_30px_rgba(0,240,255,0.1)]"
                    : "bg-[#0c0f16]/80 border-white/10 hover:border-white/20"
                }`}
              >
                {/* Stage & Status Header */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono px-2.5 py-1 rounded bg-white/5 border border-white/10 text-[#00f0ff] font-bold">
                      PHASE {milestone.stage}
                    </span>
                    <span className="text-xs font-mono text-zinc-500">{milestone.year}</span>
                    <span className="text-zinc-600">•</span>
                    <span className="text-xs font-mono text-white font-semibold">
                      {milestone.role}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 text-[11px] font-mono">
                    {isFuture ? (
                      <span className="text-amber-400 flex items-center gap-1">
                        <Flag className="w-3 h-3" />
                        <span>FUTURE GOAL</span>
                      </span>
                    ) : isInProgress ? (
                      <span className="text-[#00f0ff] flex items-center gap-1">
                        <Clock className="w-3 h-3 animate-spin" />
                        <span>IN PROGRESS</span>
                      </span>
                    ) : (
                      <span className="text-emerald-400 flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        <span>COMPLETED</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Milestone Title */}
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
                  {milestone.title}
                </h3>

                <p className="text-sm text-zinc-300 font-light leading-relaxed mb-6">
                  {milestone.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {milestone.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-mono px-3 py-1 rounded-full bg-white/[0.04] text-zinc-400 border border-white/5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
