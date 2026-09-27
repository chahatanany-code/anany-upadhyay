"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowDown, Sparkles, Terminal, Shield, Cpu, Activity } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/utils";
import { personalInfo } from "@/data/social";

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const bioRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const portraitWrapperRef = useRef<HTMLDivElement>(null);
  const tiltCardRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  // 3D Mouse Tilt state for portrait
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!tiltCardRef.current) return;
    const rect = tiltCardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;
    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      // 1. Initial entrance timeline with clearProps to prevent scroll reverts
      const tl = gsap.timeline({ delay: 0.15 });

      tl.fromTo(
        eyebrowRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", clearProps: "opacity,transform" }
      )
        .fromTo(
          headlineRef.current?.querySelectorAll(".hero-line") || [],
          { opacity: 0, y: 60, rotateX: 20 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.9,
            stagger: 0.12,
            ease: "power4.out",
            clearProps: "opacity,transform",
          },
          "-=0.4"
        )
        .fromTo(
          portraitWrapperRef.current,
          { opacity: 0, scale: 0.92, y: 30 },
          { opacity: 1, scale: 1, y: 0, duration: 0.9, ease: "power4.out", clearProps: "all" },
          "-=0.6"
        )
        .fromTo(
          taglineRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power3.out", clearProps: "opacity,transform" },
          "-=0.5"
        )
        .fromTo(
          bioRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power3.out", clearProps: "opacity,transform" },
          "-=0.4"
        )
        .fromTo(
          ctaRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power3.out", clearProps: "opacity,transform" },
          "-=0.3"
        )
        .fromTo(
          scrollIndicatorRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.8, ease: "power2.out", clearProps: "opacity" },
          "-=0.2"
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToWork = (e: React.MouseEvent) => {
    e.preventDefault();
    document.querySelector("#work")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-screen flex flex-col justify-between pt-32 pb-12 px-6 sm:px-12 max-w-7xl mx-auto z-10 select-none"
    >
      {/* Top Eyebrow Tag */}
      <div
        ref={eyebrowRef}
        className="flex items-center gap-3 text-xs md:text-sm font-mono tracking-widest text-[#00f0ff] uppercase mb-4"
      >
        <span className="w-2 h-2 rounded-full bg-[#00f0ff] shadow-[0_0_10px_#00f0ff] animate-ping" />
        <span>CSE • AI/ML • BUILDER</span>
        <span className="text-zinc-600 hidden sm:inline">•</span>
        <span className="text-zinc-400 font-mono hidden sm:inline">SRMIST DELHI NCR</span>
        <span className="text-zinc-600 hidden md:inline">•</span>
        <span className="text-emerald-400 font-mono text-[11px] hidden md:inline">SYSTEM ONLINE</span>
      </div>

      {/* Main Grid: Left Typography + Right Cyber Portrait */}
      <div className="my-auto py-6 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Left Column: Kinetic Typography & CTAs (7 cols) */}
        <div ref={headlineRef} className="lg:col-span-7">
          <div className="overflow-hidden">
            <h1 className="hero-line text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter text-white leading-[0.9] uppercase">
              ANANY
            </h1>
          </div>
          <div className="overflow-hidden">
            <h1 className="hero-line text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter text-zinc-400 leading-[0.9] uppercase">
              KUMAR
            </h1>
          </div>
          <div className="overflow-hidden">
            <h1 className="hero-line text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-[#00f0ff] to-cyan-300 leading-[0.9] uppercase">
              UPADHYAY
            </h1>
          </div>

          {/* Dynamic Ethos Tagline */}
          <p
            ref={taglineRef}
            className="mt-6 text-base sm:text-xl font-mono text-zinc-300 font-medium tracking-wide flex items-center gap-2.5 flex-wrap"
          >
            <span className="text-[#00f0ff]">›</span>
            <span>I BUILD.</span>
            <span className="text-zinc-600">|</span>
            <span>I BREAK.</span>
            <span className="text-zinc-600">|</span>
            <span>I LEARN.</span>
            <span className="text-zinc-600">|</span>
            <span className="text-white font-bold underline decoration-[#00f0ff] underline-offset-4">
              I BUILD AGAIN.
            </span>
          </p>

          {/* Supporting Copy */}
          <p
            ref={bioRef}
            className="mt-5 max-w-xl text-sm sm:text-base text-zinc-400 font-light leading-relaxed"
          >
            Second-year CSE (AI/ML) student at SRMIST Delhi NCR, building my way from curiosity to
            real-world engineering. Combining algorithmic discipline, combat sports tenacity, and
            next-generation web architectures.
          </p>

          {/* CTA Buttons */}
          <div ref={ctaRef} className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#work"
              onClick={scrollToWork}
              className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#00f0ff] text-[#07080a] font-bold text-xs md:text-sm tracking-wider uppercase transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,240,255,0.6)] hover:scale-105 active:scale-95"
              data-cursor="explore"
            >
              <span>EXPLORE MY WORK</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>

            <a
              href="#contact"
              onClick={scrollToContact}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white/[0.05] hover:bg-white/[0.1] text-white font-medium text-xs md:text-sm tracking-wider uppercase border border-white/10 hover:border-[#00f0ff]/40 transition-all duration-300"
              data-cursor="view"
            >
              <span>CONNECT WITH ME</span>
              <Sparkles className="w-4 h-4 text-[#00f0ff]" />
            </a>
          </div>
        </div>

        {/* Right Column: Holographic Cyber Portrait (5 cols) */}
        <div
          ref={portraitWrapperRef}
          className="lg:col-span-5 flex justify-center lg:justify-end w-full"
        >
          <div
            ref={tiltCardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
              transition: "transform 0.15s ease-out",
            }}
            className="relative w-full max-w-[340px] sm:max-w-[380px] rounded-3xl bg-[#0c0f16]/90 border border-white/15 p-4 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.9),0_0_40px_rgba(0,240,255,0.15)] group"
          >
            {/* High-Tech Corner HUD Brackets */}
            <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#00f0ff] pointer-events-none z-20" />
            <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[#00f0ff] pointer-events-none z-20" />
            <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-[#00f0ff] pointer-events-none z-20" />
            <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#00f0ff] pointer-events-none z-20" />

            {/* Top Telemetry Bar */}
            <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400 pb-2.5 px-2 border-b border-white/10 mb-3">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00f0ff] animate-pulse" />
                <span className="text-white font-bold">OPERATIVE: ANANY</span>
              </div>
              <span className="text-[#00f0ff]">ID // AIML-SRM-2026</span>
            </div>

            {/* Image Container with Scanline effect */}
            <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-black/60 border border-white/10">
              <Image
                src="/images/anany-portrait-real.jpg"
                alt="Anany Kumar Upadhyay - Developer & Athlete"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 380px"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />

              {/* Cyan gradient vignette & scanline */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#07080a] via-transparent to-transparent opacity-80 pointer-events-none" />
              <div className="absolute inset-0 bg-[linear-gradient(rgba(0,240,255,0.03)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none" />

              {/* Floating Tech Badges over portrait */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2 z-10">
                <div className="px-3 py-1.5 rounded-xl bg-[#07080a]/80 backdrop-blur-md border border-white/10 text-[10px] font-mono text-zinc-300 flex items-center gap-1.5">
                  <Cpu className="w-3 h-3 text-[#00f0ff]" />
                  <span>AI/ML ARCHITECT</span>
                </div>
                <div className="px-3 py-1.5 rounded-xl bg-[#07080a]/80 backdrop-blur-md border border-white/10 text-[10px] font-mono text-zinc-300 flex items-center gap-1.5">
                  <Shield className="w-3 h-3 text-cyan-300" />
                  <span>ATHLETE</span>
                </div>
              </div>
            </div>

            {/* Bottom HUD Coordinates */}
            <div className="mt-3 flex items-center justify-between text-[9px] font-mono text-zinc-500 px-2 pt-1 border-t border-white/5">
              <span>LAT: 28.6139° N, 77.2090° E</span>
              <span className="text-[#00f0ff]">SRMIST DELHI NCR</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Scroll Indicator & Status */}
      <div
        ref={scrollIndicatorRef}
        className="flex items-end justify-between text-xs font-mono text-zinc-500 pt-6 border-t border-white/5"
      >
        <div className="flex items-center gap-3">
          <Terminal className="w-4 h-4 text-[#00f0ff]" />
          <span>SRMIST_AIML // SEM_04 // YEAR_02</span>
        </div>

        <a
          href="#about"
          className="flex items-center gap-2 text-zinc-400 hover:text-[#00f0ff] transition-colors group"
        >
          <span className="tracking-widest uppercase text-[11px]">SCROLL TO EXPLORE</span>
          <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform animate-bounce text-[#00f0ff]" />
        </a>
      </div>
    </section>
  );
}
