export interface SkillItem {
  name: string;
  category: "Languages" | "Web" | "AI / ML" | "Tools";
  level: "Advanced" | "Intermediate" | "Exploring";
  description: string;
  highlight?: boolean;
}

export interface SkillCategory {
  title: "Languages" | "Web" | "AI / ML" | "Tools";
  description: string;
  badge: string;
  skills: SkillItem[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: "Languages",
    description: "Core programming paradigms from low-level systems to modern asynchronous scripting.",
    badge: "FOUNDATIONS",
    skills: [
      {
        name: "C",
        category: "Languages",
        level: "Intermediate",
        description: "Memory models, pointer arithmetic, system concepts, and data structures.",
      },
      {
        name: "C++",
        category: "Languages",
        level: "Intermediate",
        description: "Object-oriented design, STL containers, and algorithmic problem solving.",
        highlight: true,
      },
      {
        name: "Python",
        category: "Languages",
        level: "Advanced",
        description: "Primary language for data science, ML experimentation, automation, and scripting.",
        highlight: true,
      },
      {
        name: "JavaScript",
        category: "Languages",
        level: "Intermediate",
        description: "ES6+, asynchronous event loop, DOM manipulation, and modern web engines.",
      },
      {
        name: "TypeScript",
        category: "Languages",
        level: "Intermediate",
        description: "Type safety, interfaces, generics, and robust scalable application architecture.",
        highlight: true,
      },
    ],
  },
  {
    title: "Web",
    description: "Building responsive, accessible, and high-performance digital interfaces.",
    badge: "FRONTEND & FULLSTACK",
    skills: [
      {
        name: "HTML",
        category: "Web",
        level: "Advanced",
        description: "Semantic markup, accessibility standards, and SEO structural optimization.",
      },
      {
        name: "CSS",
        category: "Web",
        level: "Advanced",
        description: "Modern layout systems (Grid/Flexbox), custom properties, keyframe animations.",
      },
      {
        name: "React",
        category: "Web",
        level: "Intermediate",
        description: "Component lifecycle, state management, hooks, and reactive architectures.",
        highlight: true,
      },
      {
        name: "Next.js",
        category: "Web",
        level: "Intermediate",
        description: "App Router, SSR, Server Components, dynamic routing, and fast asset pipelines.",
        highlight: true,
      },
      {
        name: "Tailwind CSS",
        category: "Web",
        level: "Advanced",
        description: "Utility-first rapid prototyping, design systems, and responsive layouts.",
      },
    ],
  },
  {
    title: "AI / ML",
    description: "Theoretical understanding and practical application of intelligent systems.",
    badge: "CORE SPECIALIZATION",
    skills: [
      {
        name: "Python ecosystem",
        category: "AI / ML",
        level: "Intermediate",
        description: "NumPy, Pandas, Matplotlib, Scikit-Learn for scientific numerical computing.",
        highlight: true,
      },
      {
        name: "Machine Learning",
        category: "AI / ML",
        level: "Intermediate",
        description: "Supervised and unsupervised learning, classification, regression, clustering models.",
        highlight: true,
      },
      {
        name: "Data handling",
        category: "AI / ML",
        level: "Intermediate",
        description: "Data cleaning, feature engineering, dataset preprocessing, and exploratory analysis.",
      },
      {
        name: "AI experimentation",
        category: "AI / ML",
        level: "Intermediate",
        description: "Model evaluation, loss convergence tracking, prompt engineering, and mini-experiments.",
      },
    ],
  },
  {
    title: "Tools",
    description: "Engineering workflow, version control, motion design, and developer tooling.",
    badge: "TOOLING & WORKFLOW",
    skills: [
      {
        name: "Git",
        category: "Tools",
        level: "Intermediate",
        description: "Branching strategies, commit hygiene, rebase workflows, and version control.",
      },
      {
        name: "GitHub",
        category: "Tools",
        level: "Intermediate",
        description: "Collaborative development, pull requests, issue tracking, and repository management.",
      },
      {
        name: "VS Code",
        category: "Tools",
        level: "Advanced",
        description: "Optimized developer workflow, debugging configurations, and extensions.",
      },
      {
        name: "Figma",
        category: "Tools",
        level: "Intermediate",
        description: "Wireframing, UI prototyping, visual hierarchy, and component spacing systems.",
      },
      {
        name: "GSAP",
        category: "Tools",
        level: "Intermediate",
        description: "High-performance timeline animations, ScrollTrigger pins, and choreography.",
        highlight: true,
      },
      {
        name: "Three.js",
        category: "Tools",
        level: "Exploring",
        description: "WebGL canvas rendering, 3D meshes, procedural particle geometry, and cameras.",
      },
    ],
  },
];
