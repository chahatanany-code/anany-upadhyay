"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { projects, ProjectItem } from "@/data/projects";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/utils";
import { ArrowUpRight, ExternalLink, Cpu, CheckCircle2, X, Terminal, Monitor } from "lucide-react";
import { GitHubIcon } from "@/components/ui/Icons";

export default function ProjectsSection() {
  const containerRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [activeModalProject, setActiveModalProject] = useState<ProjectItem | null>(null);

  // Active view tab per project: "preview" | "telemetry"
  const [projectTabs, setProjectTabs] = useState<Record<string, "preview" | "telemetry">>({
    "neural-vision": "preview",
    "kinetic-core": "preview",
    "synapse-archive": "preview",
    "nexus-engine": "preview",
  });

  const toggleTab = (id: string, tab: "preview" | "telemetry") => {
    setProjectTabs((prev) => ({ ...prev, [id]: tab }));
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    if (prefersReducedMotion()) return;

    const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
    if (cards.length === 0) return;

    const ctx = gsap.context(() => {
      // Subtle scale effect on larger screens; no blurring or extreme dimming to ensure content stays visible
      if (window.innerWidth >= 1024) {
        cards.forEach((card, i) => {
          if (i < cards.length - 1) {
            gsap.to(card, {
              scrollTrigger: {
                trigger: cards[i + 1],
                start: "top 75%",
                end: "top 30%",
                scrub: true,
              },
              scale: 0.97 - i * 0.01,
              opacity: 0.88,
              y: -10,
              ease: "none",
            });
          }
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="work"
      className="relative py-28 px-4 sm:px-8 md:px-12 max-w-7xl mx-auto z-10"
    >
      {/* Eyebrow Label */}
      <div className="flex items-center gap-3 text-xs font-mono text-zinc-500 uppercase tracking-widest mb-6">
        <span className="text-[#00f0ff]">04 //</span>
        <span>ENGINEERED ARTIFACTS</span>
      </div>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white uppercase">
            SELECTED WORK.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-zinc-400 max-w-2xl font-light">
            Real software systems addressing real bottlenecks. Built with algorithmic discipline,
            quantized intelligence, and relentless optimization.
          </p>
        </div>

        <div className="text-xs font-mono text-zinc-500 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#00f0ff] animate-ping" />
          <span>STACKED VIEWPORT ARCHITECTURE</span>
        </div>
      </div>

      {/* Stacked Cards Container */}
      <div className="flex flex-col gap-12 sm:gap-16">
        {projects.map((project, index) => {
          const currentTab = projectTabs[project.id] || "preview";

          return (
            <div
              key={project.id}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              style={{
                zIndex: 10 + index,
              }}
              className="project-card w-full rounded-3xl bg-[#0c0f16]/95 border border-white/10 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.85),0_0_30px_rgba(0,240,255,0.08)] p-6 sm:p-10 transition-colors duration-300 hover:border-[#00f0ff]/50 group relative lg:sticky lg:top-[90px]"
              data-cursor="project"
            >
              {/* Top Bar with Number & Category */}
              <div className="flex items-center justify-between border-b border-white/10 pb-5 mb-8">
                <div className="flex items-center gap-4">
                  <span className="text-2xl sm:text-3xl font-black font-mono text-[#00f0ff]">
                    {project.number}
                  </span>
                  <span className="text-zinc-600">/</span>
                  <span className="text-xs font-mono tracking-widest uppercase text-zinc-400">
                    {project.category}
                  </span>
                </div>

                {/* Status / Link buttons */}
                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#00f0ff] hover:bg-[#38bdf8] text-[#07080a] text-xs font-mono font-bold transition-all shadow-[0_0_15px_rgba(0,240,255,0.4)] hover:shadow-[0_0_25px_rgba(0,240,255,0.7)] group/btn"
                      aria-label={`Live website for ${project.title}`}
                      data-cursor="link"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#07080a] animate-ping" />
                      <span>LIVE DEMO</span>
                      <ExternalLink className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                    </a>
                  )}

                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-white/[0.05] hover:bg-white/[0.15] border border-white/10 text-white transition-all hover:text-[#00f0ff]"
                    aria-label={`GitHub repo for ${project.title}`}
                    data-cursor="link"
                  >
                    <GitHubIcon className="w-4 h-4" />
                  </a>

                  <Link
                    href={`/work/${project.slug}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.05] hover:bg-white/[0.12] text-zinc-300 hover:text-white border border-white/10 text-xs font-mono font-medium transition-all"
                    data-cursor="view"
                  >
                    <span>CASE STUDY</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Main Content Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                {/* Left Column: Project Narrative */}
                <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
                  <div>
                    <h3 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white group-hover:text-[#00f0ff] transition-colors">
                      {project.title}
                    </h3>
                    <p className="mt-1 text-xs sm:text-sm font-mono text-[#00f0ff] tracking-wide">
                      {project.subtitle}
                    </p>

                    <p className="mt-4 text-sm sm:text-base text-zinc-300 font-light leading-relaxed">
                      {project.summary}
                    </p>

                    {/* Problem & Solution Callout */}
                    <div className="mt-6 p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
                      <div className="text-[11px] font-mono text-zinc-500 uppercase tracking-widest">
                        CORE BOTTLENECK SOLVED
                      </div>
                      <p className="text-xs text-zinc-300 leading-relaxed font-light">
                        {project.problem}
                      </p>
                    </div>
                  </div>

                  {/* Tech Pills */}
                  <div>
                    <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-2">
                      TECH STACK & RUNTIMES
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="text-xs font-mono px-3 py-1 rounded-full bg-white/[0.04] text-zinc-300 border border-white/10"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column: Visual Preview & Live Telemetry Inspector */}
                <div className="lg:col-span-6 flex flex-col justify-between rounded-2xl bg-[#080a0f] border border-white/10 p-5 overflow-hidden relative shadow-inner">
                  {/* Top Mode Toggle Tabs */}
                  <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                    <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white/[0.04] border border-white/10">
                      <button
                        onClick={() => toggleTab(project.id, "preview")}
                        className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-[11px] font-mono transition-all ${
                          currentTab === "preview"
                            ? "bg-[#00f0ff] text-[#07080a] font-bold shadow-[0_0_10px_rgba(0,240,255,0.4)]"
                            : "text-zinc-400 hover:text-white"
                        }`}
                      >
                        <Monitor className="w-3.5 h-3.5" />
                        <span>MOCKUP</span>
                      </button>

                      <button
                        onClick={() => toggleTab(project.id, "telemetry")}
                        className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-[11px] font-mono transition-all ${
                          currentTab === "telemetry"
                            ? "bg-[#00f0ff] text-[#07080a] font-bold shadow-[0_0_10px_rgba(0,240,255,0.4)]"
                            : "text-zinc-400 hover:text-white"
                        }`}
                      >
                        <Terminal className="w-3.5 h-3.5" />
                        <span>TELEMETRY</span>
                      </button>
                    </div>

                    {project.liveUrl ? (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] font-mono text-[#00f0ff] font-bold flex items-center gap-1.5 hover:underline"
                        title="Open live web deployment"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00f0ff] animate-ping" />
                        <span>LIVE DEPLOYMENT</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    ) : (
                      <span className="text-[10px] font-mono text-[#00f0ff] font-bold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00f0ff] animate-ping" />
                        LIVE ARTIFACT
                      </span>
                    )}
                  </div>

                  {/* Main Display Pane */}
                  {currentTab === "preview" ? (
                    <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-black/50 border border-white/10 group-hover:border-[#00f0ff]/40 transition-all">
                      <Image
                        src={project.imageUrl}
                        alt={`${project.title} software interface preview`}
                        fill
                        sizes="(max-width: 1024px) 100vw, 600px"
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                      />
                      {/* Gradient vignette */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#080a0f] via-transparent to-transparent opacity-40 pointer-events-none" />

                      {/* HUD overlay tag */}
                      <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-auto">
                        <div className="px-2.5 py-1 rounded bg-[#080a0f]/85 backdrop-blur-md border border-white/10 text-[9px] font-mono text-zinc-300">
                          HD INTERFACE // {project.slug}.ui
                        </div>
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-2.5 py-1 rounded bg-[#00f0ff] hover:bg-white text-[#07080a] font-mono text-[9px] font-bold tracking-wider flex items-center gap-1 shadow-[0_0_12px_rgba(0,240,255,0.4)] transition-all"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <span>LAUNCH APP</span>
                            <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2.5 font-mono text-xs text-zinc-400 py-3 bg-black/40 p-4 rounded-xl border border-white/5 min-h-[220px]">
                      {project.visualMockup.details.map((detail, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <span className="text-[#00f0ff] select-none font-bold">›</span>
                          <span className="text-zinc-200">{detail}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Bottom Key Stats */}
                  <div className="grid grid-cols-3 gap-2 border-t border-white/10 pt-4 mt-4">
                    {project.stats.map((st, i) => (
                      <div key={i} className="text-center">
                        <div className="text-sm sm:text-base font-bold text-white font-mono">
                          {st.value}
                        </div>
                        <div className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider">
                          {st.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Quick Inspect Button */}
                  <button
                    onClick={() => setActiveModalProject(project)}
                    className="mt-4 w-full py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-mono text-zinc-300 hover:text-white transition-all flex items-center justify-center gap-2"
                    data-cursor="view"
                  >
                    <Cpu className="w-3.5 h-3.5 text-[#00f0ff]" />
                    <span>INSPECT ARCHITECTURE BREAKDOWN</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Quick-View Modal */}
      {activeModalProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-3xl bg-[#0c0f16] border border-[#00f0ff]/40 p-6 sm:p-10 shadow-[0_0_60px_rgba(0,240,255,0.2)]">
            <button
              onClick={() => setActiveModalProject(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-all"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-xs font-mono text-[#00f0ff] uppercase tracking-widest mb-1">
              PROJECT ARCHITECTURE // {activeModalProject.number}
            </div>
            <h3 className="text-3xl font-black text-white">{activeModalProject.title}</h3>
            <p className="text-xs font-mono text-zinc-400 mb-6">{activeModalProject.subtitle}</p>

            {/* Modal Image Preview */}
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden mb-6 border border-white/10">
              <Image
                src={activeModalProject.imageUrl}
                alt={activeModalProject.title}
                fill
                className="object-cover"
              />
            </div>

            <div className="space-y-6 text-sm text-zinc-300">
              <div>
                <h4 className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-1">
                  SYSTEM ARCHITECTURE & DATA FLOW
                </h4>
                <p className="bg-white/[0.03] p-4 rounded-xl border border-white/5 font-mono text-xs text-zinc-300 leading-relaxed">
                  {activeModalProject.architecture}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-2">
                  KEY FEATURES & CAPABILITIES
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeModalProject.features.map((feat, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2 text-xs font-mono bg-white/[0.02] p-2.5 rounded-lg border border-white/5"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#00f0ff] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-1">
                  KEY ENGINEERING CHALLENGE
                </h4>
                <p className="text-xs text-zinc-300 leading-relaxed font-light">
                  {activeModalProject.challenges}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-1">
                  WHAT I LEARNED
                </h4>
                <p className="text-xs text-zinc-300 leading-relaxed font-light">
                  {activeModalProject.learnings}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-white/10">
                {activeModalProject.liveUrl && (
                  <a
                    href={activeModalProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-2.5 rounded-full bg-[#00f0ff] text-[#07080a] font-bold text-xs font-mono uppercase tracking-wider hover:shadow-[0_0_20px_#00f0ff] transition-all flex items-center gap-2"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>LAUNCH LIVE APP</span>
                  </a>
                )}
                <Link
                  href={`/work/${activeModalProject.slug}`}
                  className={`px-6 py-2.5 rounded-full font-mono text-xs uppercase tracking-wider transition-all ${
                    activeModalProject.liveUrl
                      ? "bg-white/5 hover:bg-white/10 text-white border border-white/10"
                      : "bg-[#00f0ff] text-[#07080a] font-bold hover:shadow-[0_0_20px_#00f0ff]"
                  }`}
                >
                  FULL CASE STUDY PAGE →
                </Link>
                <a
                  href={activeModalProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2.5 rounded-full bg-white/5 hover:bg-white/10 text-white font-mono text-xs border border-white/10 transition-all flex items-center gap-2"
                >
                  <GitHubIcon className="w-4 h-4" />
                  <span>VIEW REPOSITORY</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
