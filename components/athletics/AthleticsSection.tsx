"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { disciplinePillars, athleticPhilosophy } from "@/data/athletics";
import { prefersReducedMotion } from "@/lib/utils";
import { Award, ShieldAlert, Dumbbell, Zap, Target } from "lucide-react";

export default function AthleticsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      // Headline reveal
      gsap.fromTo(
        headlineRef.current,
        { opacity: 0.3, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
          clearProps: "opacity,transform",
          scrollTrigger: {
            trigger: headlineRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
            once: true,
          },
        }
      );

      // Staggered cards reveal with combat impact feeling
      if (cardsRef.current) {
        gsap.fromTo(
          cardsRef.current.children,
          { opacity: 0.3, y: 40, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: 0.12,
            duration: 0.7,
            ease: "power3.out",
            clearProps: "opacity,transform",
            scrollTrigger: {
              trigger: cardsRef.current,
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

  const getPillarIcon = (id: string) => {
    switch (id) {
      case "taekwondo":
        return <Award className="w-5 h-5 text-[#00f0ff]" />;
      case "boxing":
        return <ShieldAlert className="w-5 h-5 text-sky-400" />;
      case "gym-training":
        return <Dumbbell className="w-5 h-5 text-cyan-300" />;
      default:
        return <Zap className="w-5 h-5 text-[#00f0ff]" />;
    }
  };

  return (
    <section
      ref={sectionRef}
      id="discipline"
      className="relative py-28 px-6 sm:px-12 max-w-7xl mx-auto z-10"
    >
      {/* Eyebrow Label */}
      <div className="flex items-center gap-3 text-xs font-mono text-zinc-500 uppercase tracking-widest mb-6">
        <span className="text-[#00f0ff]">02 //</span>
        <span>THE ATHLETIC FOUNDATION</span>
      </div>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div>
          <h2
            ref={headlineRef}
            className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white uppercase"
          >
            DISCIPLINE IS A SKILL.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-zinc-400 max-w-2xl font-light">
            Combat sports and physical conditioning are not side hobbies. They are the cognitive crucible
            that trains mental stamina, reflex precision, and resilience under fire.
          </p>
        </div>

        {/* Philosophy quote badge */}
        <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 max-w-sm">
          <p className="text-xs font-mono text-zinc-300 italic">
            &ldquo;{athleticPhilosophy.quote}&rdquo;
          </p>
        </div>
      </div>

      {/* 3 Pillars of Discipline with Action Imagery */}
      <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {disciplinePillars.map((pillar) => (
          <div
            key={pillar.id}
            className="relative flex flex-col justify-between rounded-3xl bg-[#0c0f16]/90 border border-white/10 backdrop-blur-xl hover:border-[#00f0ff]/50 transition-all duration-300 group hover:-translate-y-1.5 shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden"
          >
            {/* Top Action Image */}
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/60 border-b border-white/10">
              <Image
                src={pillar.imageUrl}
                alt={`${pillar.discipline} action visual`}
                fill
                sizes="(max-width: 768px) 100vw, 400px"
                className="object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
              />
              {/* Dark vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c0f16] via-[#0c0f16]/40 to-transparent" />

              {/* Top Floating Badge */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                <div className="p-2 rounded-xl bg-[#07080a]/80 backdrop-blur-md border border-white/15">
                  {getPillarIcon(pillar.id)}
                </div>
                <div className="px-3 py-1 rounded-full bg-[#07080a]/80 backdrop-blur-md border border-white/15 text-right">
                  <span className="text-xs font-black font-mono text-[#00f0ff] block">
                    {pillar.metric}
                  </span>
                  <span className="text-[8px] font-mono tracking-widest text-zinc-400 uppercase">
                    {pillar.metricLabel}
                  </span>
                </div>
              </div>
            </div>

            {/* Pillar Narrative & Insights */}
            <div className="p-6 sm:p-7 flex flex-col justify-between flex-1">
              <div>
                <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-[#00f0ff] transition-colors">
                  {pillar.discipline}
                </h3>
                <p className="text-xs font-mono text-[#00f0ff] mb-4">{pillar.tagline}</p>

                <p className="text-sm text-zinc-300 leading-relaxed font-light mb-6">
                  {pillar.narrative}
                </p>
              </div>

              {/* Engineering Transfer Box */}
              <div className="pt-5 border-t border-white/10 mt-auto">
                <div className="flex items-center gap-2 text-[11px] font-mono text-zinc-400 mb-2">
                  <Target className="w-3.5 h-3.5 text-[#00f0ff]" />
                  <span className="text-zinc-500 uppercase tracking-wider">ENGINEERING TRANSFER</span>
                </div>
                <p className="text-xs text-zinc-400 font-mono leading-relaxed mb-4">
                  {pillar.engineeringTransfer}
                </p>

                {/* Attributes badges */}
                <div className="flex flex-wrap gap-1.5">
                  {pillar.attributes.map((attr) => (
                    <span
                      key={attr}
                      className="text-[10px] font-mono px-2 py-1 rounded bg-white/[0.04] text-zinc-400 border border-white/5"
                    >
                      {attr}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Physical & Cognitive Transfer Principles */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-white/[0.02] via-[#00f0ff]/[0.04] to-transparent border border-white/10">
        <h4 className="text-xs font-mono tracking-widest text-[#00f0ff] uppercase mb-4">
          TRANSFERRABLE MOTOR & MENTAL PATTERNS
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {athleticPhilosophy.principles.map((principle, idx) => (
            <div key={idx} className="space-y-1.5">
              <span className="text-xs font-mono text-zinc-500">0{idx + 1} //</span>
              <h5 className="text-sm font-bold text-white">{principle.title}</h5>
              <p className="text-xs text-zinc-400 font-light leading-relaxed">{principle.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
