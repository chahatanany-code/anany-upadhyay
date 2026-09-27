import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import { ArrowLeft, ExternalLink, Terminal, CheckCircle, Cpu, Layers } from "lucide-react";
import { GitHubIcon } from "@/components/ui/Icons";
import type { Metadata } from "next";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return { title: "Project Not Found" };

  return {
    title: `${project.title} — Anany Kumar Upadhyay`,
    description: project.summary,
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#07080a] text-white pt-28 pb-20 px-6 sm:px-12 max-w-5xl mx-auto selection:bg-[#00f0ff] selection:text-black">
      {/* Back button */}
      <Link
        href="/#work"
        className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-[#00f0ff] transition-colors mb-12 group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span>BACK TO PORTFOLIO</span>
      </Link>

      {/* Header */}
      <div className="border-b border-white/10 pb-10 mb-12">
        <div className="flex items-center gap-3 text-xs font-mono text-[#00f0ff] uppercase tracking-widest mb-3">
          <span>PROJECT {project.number}</span>
          <span>•</span>
          <span className="text-zinc-400">{project.category}</span>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white mb-4">
          {project.title}
        </h1>

        <p className="text-lg sm:text-xl font-mono text-zinc-400 mb-8 max-w-3xl">
          {project.subtitle}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-4">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#00f0ff] text-[#07080a] font-bold text-xs font-mono uppercase tracking-wider hover:shadow-[0_0_20px_#00f0ff] transition-all"
          >
            <GitHubIcon className="w-4 h-4" />
            <span>VIEW SOURCE CODE</span>
          </a>

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 text-white font-mono text-xs border border-white/10 transition-all"
            >
              <span>DEMO REPO</span>
              <ExternalLink className="w-4 h-4 text-zinc-400" />
            </a>
          )}
        </div>
      </div>

      {/* High-Resolution Project Interface Screenshot */}
      <div className="relative aspect-video w-full rounded-3xl overflow-hidden mb-12 border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(0,240,255,0.1)]">
        <Image
          src={project.imageUrl}
          alt={`${project.title} Interface Screenshot`}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07080a] via-transparent to-transparent opacity-30" />
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-16">
        {project.stats.map((st, i) => (
          <div key={i} className="p-6 rounded-2xl bg-[#0c0f16] border border-white/10">
            <div className="text-3xl font-black font-mono text-[#00f0ff] mb-1">{st.value}</div>
            <div className="text-xs font-mono text-zinc-500 uppercase tracking-widest">{st.label}</div>
          </div>
        ))}
      </div>

      {/* Deep-Dive Editorial Body */}
      <div className="space-y-16">
        {/* Section 1: Overview */}
        <section>
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 uppercase tracking-widest mb-3">
            <Terminal className="w-4 h-4 text-[#00f0ff]" />
            <span>01 // SYSTEM OVERVIEW</span>
          </div>
          <p className="text-base sm:text-lg text-zinc-300 leading-relaxed font-light">
            {project.summary}
          </p>
        </section>

        {/* Section 2: The Problem */}
        <section>
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 uppercase tracking-widest mb-3">
            <Terminal className="w-4 h-4 text-amber-400" />
            <span>02 // THE BOTTLENECK & PROBLEM</span>
          </div>
          <div className="p-6 rounded-2xl bg-amber-500/[0.03] border border-amber-500/20 text-zinc-300 text-base leading-relaxed">
            {project.problem}
          </div>
        </section>

        {/* Section 3: Technical Solution */}
        <section>
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 uppercase tracking-widest mb-3">
            <Terminal className="w-4 h-4 text-[#00f0ff]" />
            <span>03 // THE ENGINEERING SOLUTION</span>
          </div>
          <p className="text-base sm:text-lg text-zinc-300 leading-relaxed font-light mb-6">
            {project.solution}
          </p>

          <div className="p-6 rounded-2xl bg-[#0d0f14] border border-white/10 space-y-3">
            <div className="text-xs font-mono text-zinc-500 uppercase tracking-widest">
              END-TO-END PIPELINE ARCHITECTURE
            </div>
            <p className="font-mono text-xs sm:text-sm text-zinc-300 leading-relaxed bg-black/40 p-4 rounded-xl border border-white/5">
              {project.architecture}
            </p>
          </div>
        </section>

        {/* Section 4: Features */}
        <section>
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 uppercase tracking-widest mb-4">
            <Layers className="w-4 h-4 text-[#00f0ff]" />
            <span>04 // CAPABILITIES & DELIVERABLES</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {project.features.map((feat, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/5 text-sm font-mono text-zinc-300"
              >
                <CheckCircle className="w-4 h-4 text-[#00f0ff] shrink-0 mt-0.5" />
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Section 5: Tech Stack */}
        <section>
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 uppercase tracking-widest mb-4">
            <Cpu className="w-4 h-4 text-[#00f0ff]" />
            <span>05 // STACK COMPONENTS</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="text-xs font-mono px-4 py-2 rounded-full bg-white/[0.04] text-zinc-300 border border-white/10"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>

        {/* Section 6: Challenges & Learnings */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-[#0c0f16] border border-white/10 space-y-3">
            <h3 className="text-xs font-mono text-zinc-500 uppercase tracking-widest">
              CHALLENGES OVERCOME
            </h3>
            <p className="text-sm text-zinc-300 leading-relaxed font-light">{project.challenges}</p>
          </div>

          <div className="p-6 rounded-2xl bg-[#0c0f16] border border-white/10 space-y-3">
            <h3 className="text-xs font-mono text-zinc-500 uppercase tracking-widest">
              ENGINEERING TAKEAWAYS
            </h3>
            <p className="text-sm text-zinc-300 leading-relaxed font-light">{project.learnings}</p>
          </div>
        </section>
      </div>

      {/* Footer Navigation */}
      <div className="mt-20 pt-8 border-t border-white/10 flex items-center justify-between">
        <Link
          href="/#work"
          className="text-xs font-mono text-zinc-400 hover:text-white transition-colors"
        >
          ← BACK TO ALL PROJECTS
        </Link>
        <a
          href="https://www.linkedin.com/in/anany-upadhyay-undefined-74910429b/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-mono text-[#00f0ff] hover:underline"
        >
          DISCUSS THIS BUILD ON LINKEDIN ↗
        </a>
      </div>
    </main>
  );
}
