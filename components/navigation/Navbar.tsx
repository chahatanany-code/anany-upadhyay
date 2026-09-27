"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { siteConfig } from "@/data/site";
import { socialLinks } from "@/data/social";
import { Menu, X, ArrowUpRight, Terminal, Volume2, VolumeX } from "lucide-react";
import gsap from "gsap";
import { toggleAudio, isAudioEnabled, playTechClick } from "@/lib/audio";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [audioActive, setAudioActive] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const menuLinksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      setIsScrolled(currentScroll > 40);

      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((currentScroll / totalHeight) * 100);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // GSAP animation for mobile menu reveal
  useEffect(() => {
    if (!mobileMenuRef.current) return;

    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
      const ctx = gsap.context(() => {
        gsap.to(mobileMenuRef.current, {
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
          duration: 0.6,
          ease: "power4.inOut",
        });

        if (menuLinksRef.current) {
          gsap.fromTo(
            menuLinksRef.current.children,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              stagger: 0.08,
              ease: "power3.out",
              delay: 0.2,
            }
          );
        }
      });
      return () => ctx.revert();
    } else {
      document.body.style.overflow = "";
      gsap.to(mobileMenuRef.current, {
        clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
        duration: 0.5,
        ease: "power4.inOut",
      });
    }
  }, [mobileMenuOpen]);

  const handleAudioToggle = () => {
    const newState = toggleAudio();
    setAudioActive(newState);
    if (newState) {
      playTechClick(800, 0.08);
    }
  };

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    playTechClick(650, 0.05);
    if (href.startsWith("#")) {
      e.preventDefault();
      setMobileMenuOpen(false);
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <>
      {/* Floating Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 px-4 sm:px-8 py-4 sm:py-5 flex justify-center`}
      >
        <div
          className={`w-full max-w-6xl flex items-center justify-between px-5 py-3 rounded-full transition-all duration-300 ${
            isScrolled
              ? "bg-[#0d0f14]/80 backdrop-blur-xl border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.6)]"
              : "bg-transparent border border-transparent"
          }`}
        >
          {/* Brand Mark */}
          <Link
            href="/"
            className="flex items-center gap-3 group focus:outline-none"
            aria-label="Home"
          >
            <div className="w-8 h-8 rounded-full border border-[#00f0ff]/50 bg-[#00f0ff]/10 flex items-center justify-center text-[#00f0ff] font-black text-sm tracking-tighter group-hover:scale-105 group-hover:border-[#00f0ff] transition-all">
              A
            </div>
            <div className="flex flex-col">
              <span className="font-bold tracking-widest text-sm text-white group-hover:text-[#00f0ff] transition-colors">
                ANANY
              </span>
              <span className="text-[10px] tracking-widest text-zinc-500 font-mono hidden sm:inline">
                SRMIST • CSE (AIML)
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 sm:gap-2" aria-label="Main Navigation">
            {siteConfig.navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="px-3.5 py-1.5 text-xs font-mono tracking-wider text-zinc-400 hover:text-white rounded-full transition-all hover:bg-white/[0.05]"
                data-cursor="view"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Action: Audio Toggle + Status Pill + Connect Button + Mobile Menu Toggle */}
          <div className="flex items-center gap-2.5">
            {/* Audio Synth Toggle */}
            <button
              onClick={handleAudioToggle}
              className={`p-2 rounded-full border transition-all text-xs flex items-center justify-center ${
                audioActive
                  ? "bg-[#00f0ff]/15 border-[#00f0ff] text-[#00f0ff] shadow-[0_0_10px_rgba(0,240,255,0.3)]"
                  : "bg-white/[0.03] border-white/10 text-zinc-500 hover:text-zinc-300"
              }`}
              title={audioActive ? "Mute audio effects" : "Enable tactile audio effects"}
              aria-label="Toggle audio effects"
            >
              {audioActive ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
            </button>

            <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 text-[11px] font-mono text-zinc-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>STATUS: BUILDING</span>
            </div>

            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, "#contact")}
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-mono px-4 py-2 rounded-full bg-white/[0.08] hover:bg-[#00f0ff] hover:text-[#07080a] border border-white/15 hover:border-[#00f0ff] text-white transition-all font-semibold"
              data-cursor="view"
            >
              <span>CONNECT</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-zinc-300 hover:text-white rounded-full bg-white/5 border border-white/10 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Integrated Scroll Progress Line */}
        <div
          className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-transparent via-[#00f0ff] to-cyan-400 pointer-events-none transition-all duration-75"
          style={{ width: `${scrollProgress}%` }}
        />
      </header>

      {/* Cinematic Mobile Fullscreen Menu */}
      <div
        ref={mobileMenuRef}
        className="fixed inset-0 z-50 bg-[#07080a] flex flex-col justify-between p-8 md:hidden pointer-events-auto"
        style={{ clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" }}
        aria-modal="true"
        role="dialog"
      >
        {/* Top Bar inside Menu */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#00f0ff]">
            <Terminal className="w-4 h-4" />
            <span>NAVIGATION_INDEX</span>
          </div>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="p-2 text-zinc-400 hover:text-white rounded-full bg-white/5 border border-white/10"
            aria-label="Close menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Large Typography Navigation Links */}
        <div ref={menuLinksRef} className="flex flex-col gap-6 my-auto">
          {siteConfig.navLinks.map((link, idx) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => scrollToSection(e, link.href)}
              className="group flex items-baseline justify-between py-2 border-b border-white/5"
            >
              <span className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-300 group-hover:text-[#00f0ff] transition-colors">
                {link.name}
              </span>
              <span className="text-xs font-mono text-zinc-600 group-hover:text-zinc-400">
                0{idx + 1}
              </span>
            </a>
          ))}
        </div>

        {/* Bottom Menu Info */}
        <div className="flex flex-col gap-4 text-xs font-mono text-zinc-500 border-t border-white/10 pt-4">
          <div className="flex items-center justify-between">
            <span>SRMIST DELHI NCR</span>
            <span className="text-[#00f0ff]">AIML 2ND YEAR</span>
          </div>
          <div className="flex items-center gap-4">
            {socialLinks.map((soc) => (
              <a
                key={soc.name}
                href={soc.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-[#00f0ff] transition-colors"
              >
                {soc.name} ↗
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
