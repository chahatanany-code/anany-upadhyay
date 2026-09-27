export interface JourneyMilestone {
  stage: string;
  year: string;
  role: string;
  title: string;
  description: string;
  tags: string[];
  status: "Completed" | "In Progress" | "Future Milestone (Goal)";
}

export const journeyMilestones: JourneyMilestone[] = [
  {
    stage: "01",
    year: "2023",
    role: "THE STUDENT",
    title: "The First Syntax & Algorithmic Spark",
    description:
      "Wrote my first lines of code in C and Python. Dissected pointers, loops, logic gates, and computational thinking. Realized that code isn't just theory—it's raw leverage to construct anything conceivable.",
    tags: ["C Programming", "Python", "Data Structures", "Algorithmic Logic"],
    status: "Completed",
  },
  {
    stage: "02",
    year: "2024",
    role: "THE DEVELOPER",
    title: "Entering SRMIST Delhi NCR (B.Tech CSE - AI/ML)",
    description:
      "Stepped into SRM University Delhi NCR to pursue an intensive B.Tech in Computer Science with specialization in Artificial Intelligence & Machine Learning. Immersed in mathematics, statistics, data handling, and software principles.",
    tags: ["SRMIST Delhi NCR", "CSE Core", "Linear Algebra", "OOP Concepts"],
    status: "Completed",
  },
  {
    stage: "03",
    year: "2024 - 2025",
    role: "THE BUILDER",
    title: "Bridging Machine Intelligence & Modern Web",
    description:
      "Began shipping real projects rather than just reading textbooks. Built machine learning prototypes in Python with Scikit-Learn and Pandas, and mastered modern web architectures using React, Next.js, and TypeScript.",
    tags: ["React", "Next.js", "Scikit-Learn", "TypeScript", "Tailwind CSS"],
    status: "Completed",
  },
  {
    stage: "04",
    year: "2025 - 2026",
    role: "THE CRAFTSMAN",
    title: "Interactive WebGL, GSAP & Production Systems",
    description:
      "Elevated frontend architecture into high-performance creative computing with GSAP ScrollTrigger and Three.js WebGL. Tackling end-to-end full-stack architectures, hackathon challenges, and deep mathematical models.",
    tags: ["GSAP Motion", "Three.js", "Neural Networks", "Performance Profiling"],
    status: "In Progress",
  },
  {
    stage: "05",
    year: "2026+",
    role: "THE ENGINEER",
    title: "Autonomous Agents & High-Throughput ML Systems",
    description:
      "Ambitious target to engineer scalable autonomous machine learning pipelines, distributed deep learning architectures, and contribute to mission-critical open-source intelligence infrastructure.",
    tags: ["Distributed Systems", "LLM Fine-Tuning", "Low-Latency Inference", "Open Source"],
    status: "Future Milestone (Goal)",
  },
];
