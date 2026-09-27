"use client";

import React, { useState, useEffect, useRef } from "react";
import { skillCategories, SkillItem } from "@/data/skills";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/utils";
import { Terminal, Cpu, Layers, Wrench, Sparkles } from "lucide-react";

export default function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [selectedSkill, setSelectedSkill] = useState<SkillItem>(
    skillCategories[0].skills[2] // Python by default
  );
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
          { opacity: 0.3, y: 20 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.03,
            duration: 0.5,
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

  const allSkills = skillCategories.flatMap((c) => c.skills);
  const displayedSkills =
    activeCategory === "All"
      ? allSkills
      : skillCategories.find((c) => c.title === activeCategory)?.skills || [];

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case "Languages":
        return <Terminal className="w-4 h-4 text-[#00f0ff]" />;
      case "Web":
        return <Layers className="w-4 h-4 text-sky-400" />;
      case "AI / ML":
        return <Cpu className="w-4 h-4 text-indigo-400" />;
      case "Tools":
        return <Wrench className="w-4 h-4 text-emerald-400" />;
      default:
        return <Sparkles className="w-4 h-4 text-zinc-400" />;
    }
  };

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative py-28 px-6 sm:px-12 max-w-7xl mx-auto z-10"
    >
      {/* Eyebrow Label */}
      <div className="flex items-center gap-3 text-xs font-mono text-zinc-500 uppercase tracking-widest mb-6">
        <span className="text-[#00f0ff]">03 //</span>
        <span>TECHNICAL CAPABILITIES</span>
      </div>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white uppercase">
            TECH STACK.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-zinc-400 max-w-2xl font-light">
            Technologies actively engineered, tested, and utilized in real projects. No superficial
            libraries; only tools with genuine hands-on experience.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-2">
          {["All", "Languages", "Web", "AI / ML", "Tools"].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-mono tracking-wider transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-[#00f0ff] text-[#07080a] font-bold shadow-[0_0_15px_rgba(0,240,255,0.4)]"
                  : "bg-white/[0.04] text-zinc-400 hover:text-white border border-white/5 hover:border-white/15"
              }`}
              data-cursor="view"
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Interactive Skills Grid + Live Telemetry Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Skill Cards Grid */}
        <div
          ref={gridRef}
          className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-3.5"
        >
          {displayedSkills.map((skill) => {
            const isSelected = selectedSkill.name === skill.name;
            return (
              <div
                key={skill.name}
                onClick={() => setSelectedSkill(skill)}
                onMouseEnter={() => setSelectedSkill(skill)}
                className={`p-4 rounded-xl cursor-pointer transition-all duration-200 border flex flex-col justify-between ${
                  isSelected
                    ? "bg-[#141a24] border-[#00f0ff] shadow-[0_0_20px_rgba(0,240,255,0.2)] scale-[1.02]"
                    : "bg-[#0d0f14]/80 border-white/5 hover:border-white/20 hover:bg-[#11141c]"
                }`}
                data-cursor="view"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1.5">
                    {getCategoryIcon(skill.category)}
                    <span className="text-[10px] font-mono text-zinc-500 uppercase">
                      {skill.category}
                    </span>
                  </div>
                  {skill.highlight && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00f0ff] shadow-[0_0_6px_#00f0ff]" />
                  )}
                </div>

                <div className="text-lg font-bold text-white group-hover:text-[#00f0ff] transition-colors">
                  {skill.name}
                </div>

                <div className="mt-3 flex items-center justify-between text-[10px] font-mono text-zinc-500 border-t border-white/5 pt-2">
                  <span>LEVEL</span>
                  <span
                    className={
                      skill.level === "Advanced"
                        ? "text-[#00f0ff] font-semibold"
                        : skill.level === "Intermediate"
                        ? "text-sky-300"
                        : "text-zinc-400"
                    }
                  >
                    {skill.level}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Live Inspector / Telemetry Terminal */}
        <div className="lg:col-span-4 sticky top-28 p-6 rounded-2xl bg-[#0a0d13] border border-white/10 backdrop-blur-md shadow-2xl">
          <div className="flex items-center justify-between text-xs font-mono text-zinc-500 border-b border-white/10 pb-4 mb-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00f0ff] animate-pulse" />
              <span className="text-zinc-300">INSPECTOR // ACTIVE NODE</span>
            </div>
            <span>[STK-2026]</span>
          </div>

          <div className="space-y-4">
            <div>
              <div className="text-[11px] font-mono text-zinc-500 uppercase tracking-widest">
                SKILL IDENTIFIER
              </div>
              <div className="text-3xl font-black text-white mt-1">{selectedSkill.name}</div>
            </div>

            <div className="grid grid-cols-2 gap-4 border-y border-white/5 py-3">
              <div>
                <span className="text-[10px] font-mono text-zinc-500 uppercase block">CATEGORY</span>
                <span className="text-xs font-mono text-[#00f0ff] font-bold">
                  {selectedSkill.category}
                </span>
              </div>
              <div>
                <span className="text-[10px] font-mono text-zinc-500 uppercase block">PROFICIENCY</span>
                <span className="text-xs font-mono text-white font-semibold">
                  {selectedSkill.level}
                </span>
              </div>
            </div>

            <div>
              <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-1.5">
                APPLICATION & USAGE
              </div>
              <p className="text-xs text-zinc-300 font-mono leading-relaxed bg-white/[0.02] p-3 rounded-lg border border-white/5">
                {selectedSkill.description}
              </p>
            </div>

            <div className="pt-2 text-[10px] font-mono text-zinc-500 flex items-center justify-between">
              <span>CONFIRMED DATA NODE</span>
              <span className="text-[#00f0ff]">CENTRALIZED AT /data/skills.ts</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
