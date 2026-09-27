export interface LearningTopic {
  title: string;
  category: string;
  focus: string;
  progress: number;
  whyItMatters: string;
}

export const currentlyLearningData = {
  status: "BUILDING",
  statusSubtext: "Active daily focus areas & deep-work research topics",
  topics: [
    {
      title: "Advanced React Architecture & Next.js Internals",
      category: "Frontend Systems",
      focus: "Server Actions, RSC streaming boundaries, React 19 compiler patterns, hydration optimization",
      progress: 88,
      whyItMatters: "Building sub-100ms digital products that load instantaneously without layout jank.",
    },
    {
      title: "Deep Learning & Neural Network Fundamentals",
      category: "Machine Learning",
      focus: "Backpropagation from scratch, loss landscape geometry, transformer attention mechanics",
      progress: 78,
      whyItMatters: "Understanding the foundational mathematics rather than treating AI models as black boxes.",
    },
    {
      title: "Three.js, WebGL & Shader Programming",
      category: "Creative Engineering",
      focus: "GLSL vertex & fragment shaders, procedural particle physics, GPU instancing, render buffers",
      progress: 72,
      whyItMatters: "Breathing dimensional life and kinetic tactile realism into digital interfaces.",
    },
    {
      title: "System Design & Low-Level Concurrency",
      category: "Computer Science Core",
      focus: "Cache hierarchies, memory allocation, multi-threaded task queues, network socket protocols",
      progress: 68,
      whyItMatters: "Software scalability depends entirely on understanding the underlying operating system.",
    },
    {
      title: "GSAP Advanced Timeline Choreography",
      category: "Motion Design",
      focus: "ScrollTrigger pinning stacks, dynamic clip-path morphing, physics easing curves",
      progress: 90,
      whyItMatters: "Transforming static portfolios into memorable, tactile cinematic narratives.",
    },
    {
      title: "Modern Backend & Distributed Storage",
      category: "Backend Development",
      focus: "PostgreSQL indexing, Redis caching layers, vector embeddings search, secure REST/gRPC",
      progress: 70,
      whyItMatters: "Intelligent frontends require robust, fault-tolerant backend infrastructure.",
    },
  ],
};
