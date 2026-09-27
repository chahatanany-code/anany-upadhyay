"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/utils";
import { personalInfo } from "@/data/social";
import { Code2, Flame, BrainCircuit, Activity } from "lucide-react";

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const wordsRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const staccatoWords = ["CODE.", "DISCIPLINE.", "COMBAT.", "CREATION.", "PROGRESS."];

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      // Animate staccato words sequentially as user enters
      if (wordsRef.current) {
        gsap.fromTo(
          wordsRef.current.children,
          { opacity: 0.3, y: 20 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.08,
            duration: 0.6,
            ease: "power2.out",
            clearProps: "opacity,transform",
            scrollTrigger: {
              trigger: wordsRef.current,
              start: "top 88%",
              toggleActions: "play none none none",
              once: true,
            },
          }
        );
      }

      // Content fade up
      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current,
          { opacity: 0.3, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
            clearProps: "opacity,transform",
            scrollTrigger: {
              trigger: contentRef.current,
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
      id="about"
      className="relative py-28 px-6 sm:px-12 max-w-7xl mx-auto z-10"
    >
      {/* Editorial Section Label */}
      <div className="flex items-center gap-3 text-xs font-mono text-zinc-500 uppercase tracking-widest mb-6">
        <span className="text-[#00f0ff]">01 //</span>
        <span>WHO I AM</span>
      </div>

      <h2 className="text-3xl sm:text-5xl md:text-7xl font-black tracking-tight text-white uppercase mb-12">
        MORE THAN A DEVELOPER.
      </h2>

      {/* Staccato Kinetic Words */}
      <div
        ref={wordsRef}
        className="flex flex-wrap gap-x-6 sm:gap-x-10 gap-y-3 text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black font-mono tracking-tight text-zinc-600 mb-16 select-none"
      >
        {staccatoWords.map((word, i) => (
          <span
            key={word}
            className={`transition-colors duration-300 ${
              i === 0
                ? "hover:text-[#00f0ff]"
                : i === 1
                ? "hover:text-amber-400"
                : i === 2
                ? "hover:text-red-400"
                : i === 3
                ? "hover:text-indigo-400"
                : "hover:text-emerald-400"
            }`}
          >
            {word}
          </span>
        ))}
      </div>

      {/* Narrative & Philosophy Grid */}
      <div ref={contentRef} className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Authentic Bio */}
        <div className="lg:col-span-7 space-y-6 text-base sm:text-lg text-zinc-300 font-light leading-relaxed">
          <p>
            I am a 19-year-old developer and second-year Computer Science & Engineering student
            specializing in <span className="text-white font-medium">Artificial Intelligence & Machine Learning</span> at{" "}
            <span className="text-[#00f0ff] font-medium">SRM Institute of Science and Technology, Delhi NCR</span>.
          </p>

          <p>
            I don&apos;t believe in memorizing syntax for exams or copy-pasting solutions without understanding
            the mechanics underneath. When I write code in Python, C++, or TypeScript, my instinct is to break it down to its
            mathematical and architectural first principles: how memory is partitioned, how tensors flow through layers, and how interfaces respond under load.
          </p>

          <p>
            Outside the IDE, I spend hours sparring on the mat and lifting in the gym. Competitive Taekwondo
            taught me speed, distance management, and precision under duress. Boxing taught me how to stay
            collected when incoming pressure is intense. These aren&apos;t side hobbies—they are the physical engine
            that drives my engineering work ethic.
          </p>

          <div className="pt-4 flex items-center gap-6 text-xs font-mono text-zinc-400">
            <div>
              <span className="text-zinc-600 block">AGE</span>
              <span className="text-white font-bold text-base">19</span>
            </div>
            <div className="w-[1px] h-8 bg-white/10" />
            <div>
              <span className="text-zinc-600 block">UNIVERSITY</span>
              <span className="text-white font-bold text-base">SRMIST Delhi NCR</span>
            </div>
            <div className="w-[1px] h-8 bg-white/10" />
            <div>
              <span className="text-zinc-600 block">SPECIALIZATION</span>
              <span className="text-[#00f0ff] font-bold text-base">CSE (AI & ML)</span>
            </div>
          </div>
        </div>

        {/* Right Column: Identity Pillars */}
        <div className="lg:col-span-5 grid grid-cols-1 gap-4">
          <div className="p-6 rounded-2xl bg-[#0d0f14]/80 border border-white/10 backdrop-blur-md hover:border-[#00f0ff]/40 transition-all group">
            <div className="w-10 h-10 rounded-xl bg-[#00f0ff]/10 border border-[#00f0ff]/30 flex items-center justify-center text-[#00f0ff] mb-4 group-hover:scale-110 transition-transform">
              <BrainCircuit className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-1">Machine Learning Specialization</h3>
            <p className="text-xs text-zinc-400 leading-normal">
              Exploring neural models, mathematical optimizations, and computer vision with Python, Scikit-Learn, and PyTorch.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#0d0f14]/80 border border-white/10 backdrop-blur-md hover:border-[#38bdf8]/40 transition-all group">
            <div className="w-10 h-10 rounded-xl bg-[#38bdf8]/10 border border-[#38bdf8]/30 flex items-center justify-center text-[#38bdf8] mb-4 group-hover:scale-110 transition-transform">
              <Code2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-1">Full-Stack Craft & Modern Web</h3>
            <p className="text-xs text-zinc-400 leading-normal">
              Architecting fast reactive frontends and dynamic APIs with Next.js, TypeScript, Tailwind, and interactive WebGL canvas.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#0d0f14]/80 border border-white/10 backdrop-blur-md hover:border-amber-400/40 transition-all group">
            <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 mb-4 group-hover:scale-110 transition-transform">
              <Flame className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-1">Martial Arts & Athletic Stamina</h3>
            <p className="text-xs text-zinc-400 leading-normal">
              Medals in competitive Taekwondo, boxing conditioning, and disciplined daily gym training that directly reinforces mental stamina.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
