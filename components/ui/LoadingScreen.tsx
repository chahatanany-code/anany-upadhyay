"use client";

import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { prefersReducedMotion } from "@/lib/utils";

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const text1Ref = useRef<HTMLHeadingElement>(null);
  const text2Ref = useRef<HTMLHeadingElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const percentRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const isDismissedRef = useRef(false);

  const dismissScreen = () => {
    if (isDismissedRef.current) return;
    isDismissedRef.current = true;
    if (containerRef.current) {
      gsap.to(containerRef.current, {
        yPercent: -100,
        duration: 0.6,
        ease: "power4.inOut",
        onComplete,
      });
    } else {
      onComplete();
    }
  };

  useEffect(() => {
    const reducedMotion = prefersReducedMotion();

    if (reducedMotion) {
      onComplete();
      return;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter" || e.key === " ") {
        dismissScreen();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: dismissScreen,
      });

      // 1. Reveal First Name
      tl.fromTo(
        text1Ref.current,
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.45, ease: "power3.out" }
      );

      // 2. Reveal Last Name
      tl.fromTo(
        text2Ref.current,
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.45, ease: "power3.out" },
        "-=0.25"
      );

      // 3. Status and counter
      tl.fromTo(
        [statusRef.current, percentRef.current, barRef.current],
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power2.out" },
        "-=0.2"
      );

      // Numeric counter animation
      const counter = { val: 0 };
      tl.to(
        counter,
        {
          val: 100,
          duration: 0.95,
          ease: "power2.inOut",
          onUpdate: () => {
            setProgress(Math.floor(counter.val));
          },
        },
        "-=0.2"
      );

      // Slight scale-up & glow burst right before exit
      tl.to(
        [text1Ref.current, text2Ref.current],
        {
          letterSpacing: "0.06em",
          opacity: 0.9,
          duration: 0.3,
          ease: "power2.in",
        },
        "+=0.05"
      );
    }, containerRef);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      ctx.revert();
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      onClick={dismissScreen}
      className="fixed inset-0 z-50 flex flex-col justify-between bg-[#07080a] text-white px-8 py-10 select-none overflow-hidden cursor-pointer"
      aria-label="Loading Screen - Click to skip"
    >
      {/* Top Telemetry */}
      <div className="flex items-center justify-between text-xs tracking-widest text-zinc-500 font-mono">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-[#00f0ff] animate-ping" />
          <span>INITIALIZING CORE</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-zinc-600 hidden sm:inline">CLICK ANYWHERE TO SKIP</span>
          <div>SRMIST DELHI NCR • 2026</div>
        </div>
      </div>

      {/* Center Cinematic Typography */}
      <div className="flex flex-col items-center justify-center text-center my-auto">
        <div className="overflow-hidden">
          <h1
            ref={text1Ref}
            className="text-6xl sm:text-8xl md:text-9xl font-black tracking-tight text-white/95"
          >
            ANANY
          </h1>
        </div>
        <div className="overflow-hidden">
          <h2
            ref={text2Ref}
            className="text-3xl sm:text-5xl md:text-6xl font-extralight tracking-widest text-[#00f0ff] uppercase mt-1"
          >
            KUMAR UPADHYAY
          </h2>
        </div>

        <div
          ref={statusRef}
          className="mt-8 flex items-center gap-3 text-xs md:text-sm font-mono tracking-widest text-zinc-400"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#00f0ff]" />
          <span>INITIALIZING PORTFOLIO...</span>
          <span className="text-zinc-500 font-mono">[{progress}%]</span>
        </div>
      </div>

      {/* Bottom Progress Bar & Counter */}
      <div className="w-full max-w-md mx-auto">
        <div className="flex justify-between items-center text-xs font-mono text-zinc-500 mb-2">
          <span>COMPILED KINETICS & SHADERS</span>
          <span ref={percentRef} className="text-[#00f0ff] font-bold">
            {progress.toString().padStart(3, "0")}%
          </span>
        </div>
        <div
          ref={barRef}
          className="w-full h-1 bg-zinc-900 rounded-full overflow-hidden border border-white/5"
        >
          <div
            className="h-full bg-gradient-to-r from-cyan-500 to-[#00f0ff] transition-all duration-75 ease-out rounded-full shadow-[0_0_12px_rgba(0,240,255,0.7)]"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
