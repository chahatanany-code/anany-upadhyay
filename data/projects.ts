export interface ProjectItem {
  id: string;
  slug: string;
  number: string;
  title: string;
  subtitle: string;
  tagline: string;
  category: "AI & Computer Vision" | "Athletic Tech" | "Information Retrieval" | "Creative Engineering";
  summary: string;
  problem: string;
  solution: string;
  architecture: string;
  technologies: string[];
  features: string[];
  challenges: string;
  learnings: string;
  githubUrl: string;
  liveUrl?: string;
  imageUrl: string;
  accentColor: string;
  stats: { label: string; value: string }[];
  visualMockup: {
    type: "terminal" | "telemetry" | "vector" | "canvas";
    accentGradient: string;
    details: string[];
  };
}

export const projects: ProjectItem[] = [
  {
    id: "neural-vision",
    slug: "neural-vision",
    number: "01",
    title: "NEURALVISION",
    subtitle: "Real-Time Edge Computer Vision & Multi-Class Inference",
    tagline: "High-frame-rate edge classification with quantized neural feature extraction.",
    category: "AI & Computer Vision",
    summary:
      "A lightweight computer vision pipeline designed for real-time edge defect detection and object classification, combining optimized Python image processing with a reactive telemetry dashboard.",
    problem:
      "Traditional deep neural networks struggle with high latency and heavy memory footprints on standard edge hardware, causing severe frame drops during live camera feeds.",
    solution:
      "Constructed a quantized lightweight convolutional feature extractor paired with optimized OpenCV preprocessing pipelines to stream continuous inference metrics at >30 FPS with negligible memory overhead.",
    architecture:
      "Python / OpenCV video capture frame buffer → Tensor normalization pipeline → Quantized model inference worker → WebSocket JSON stream → Next.js / TypeScript telemetry UI with zero layout shifts.",
    technologies: ["Python", "OpenCV", "Scikit-Learn", "FastAPI", "React", "TypeScript", "Tailwind CSS"],
    features: [
      "Sub-25ms inference latency per frame on CPU edge devices",
      "Dynamic confidence thresholding with real-time bounding box renders",
      "WebSocket streaming bridge to browser telemetry console",
      "Statistical confusion matrix and precision-recall metric logger",
    ],
    challenges:
      "Overcoming CPU thermal throttling during sustained live video streams required optimizing frame buffering and downsampling without sacrificing classification accuracy.",
    learnings:
      "Deepened practical understanding of memory layout in NumPy/OpenCV, tensor batching, and decoupling inference loops from UI presentation layers.",
    githubUrl: "https://github.com/chahatanany-code/neuralvision",
    liveUrl: "https://neuralvision-nine.vercel.app/",
    imageUrl: "/images/project-neural-vision.jpg",
    accentColor: "#00f0ff",
    stats: [
      { label: "Inference Latency", value: "< 24ms" },
      { label: "Throughput", value: "32 FPS" },
      { label: "Validation Acc", value: "96.4%" },
    ],
    visualMockup: {
      type: "telemetry",
      accentGradient: "from-cyan-500/20 via-blue-500/10 to-transparent",
      details: [
        "STATUS: STREAMING [WEBSOCKET: 24.2ms]",
        "LAYER: QuantizedConv2D(32, 3x3, stride=1)",
        "TENSOR SHAPE: [1, 224, 224, 3] -> [1, 8]",
        "DETECTED: Class_03 (Confidence: 0.968)",
      ],
    },
  },
  {
    id: "kinetic-core",
    slug: "kinetic-core",
    number: "02",
    title: "KINETIC CORE",
    subtitle: "Combat Training & Strength Performance Operating System",
    tagline: "High-performance combat round timer, progressive overload engine, and tactile training console.",
    category: "Athletic Tech",
    summary:
      "An authoritative combat training console, drift-free interval timer, and strength analytics operating system designed for zero-friction athletic performance in combat sports and progressive overload training.",
    problem:
      "Conventional fitness apps suffer from bloated subscriptions, complex touch trees inaccessible with boxing wraps or gloves, and erratic timer drift caused by JavaScript main thread and background tab throttling.",
    solution:
      "Architected a keyboard-first, high-contrast tactical training rig featuring drift-free Web Worker clocks, Web Audio API bell synthesis, 4 scientific 1RM formulas (Brzycki, Epley, Lander, Lombardi), strike combo telemetry, and offline IndexedDB persistence.",
    architecture:
      "Web Worker hardware-synced clock → Web Audio API bell synthesizer → Offline IndexedDB local state store → Next.js App Router / TypeScript reactive telemetry UI.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Web Audio API", "Web Workers", "IndexedDB", "Lucide React"],
    features: [
      "Authoritative drift-free combat round timer for Boxing, MMA, and Muay Thai",
      "Synthesized bronze bell chimes, ten-second warnings, and wooden clapper acoustics",
      "Strength OS with 4 scientific 1RM formulas (Brzycki, Epley, Lander, Lombardi)",
      "Combat Lab for boxing combos (1-2-3-2) & bilateral kicking drill tracking",
      "100% offline-ready with zero-latency local IndexedDB session serialization",
    ],
    challenges:
      "Standard JavaScript `setInterval` drifts severely under background tab throttling. Engineered a dedicated Web Worker timer synchronized with the hardware Web Audio clock to guarantee 0.00ms drift across rounds.",
    learnings:
      "Deepened mastery of low-latency Web Audio buffer scheduling, hardware clock synchronization, IndexedDB transaction lifecycles, and ergonomics for extreme physical training contexts.",
    githubUrl: "https://github.com/chahatanany-code/kinetic-core-athletics",
    liveUrl: "https://kinetic-core-amber.vercel.app/",
    imageUrl: "/images/project-kinetic-core.jpg",
    accentColor: "#00ff87",
    stats: [
      { label: "Clock Drift", value: "0.00ms" },
      { label: "Offline Ready", value: "100%" },
      { label: "Audio Latency", value: "< 5ms" },
    ],
    visualMockup: {
      type: "terminal",
      accentGradient: "from-emerald-500/20 via-green-500/10 to-transparent",
      details: [
        "ATHLETE COMMAND RIG // STATUS: READY",
        "PROTOCOL: BOXING — PRO 3:00 / 0:30 (HIGH INTENSITY)",
        "AUDIO SYNTH: Dual-tone Bronze Bell (880Hz / 440Hz)",
        "CLOCK ENGINE: Web Worker synced [Hardware Time, 0 Drift]",
      ],
    },
  },
  {
    id: "synapse-archive",
    slug: "synapse-archive",
    number: "03",
    title: "SYNAPSE ARCHIVE",
    subtitle: "Semantic Vector Search & Academic Document Retrieval",
    tagline: "Cosine similarity neural retrieval engine for deep scientific queries.",
    category: "Information Retrieval",
    summary:
      "A semantic search indexing engine that translates academic research papers, lecture notes, and machine learning textbooks into high-dimensional vector spaces for instant conceptual retrieval.",
    problem:
      "Traditional keyword searching fails when querying conceptual abstractions (e.g., 'how does attention mitigate vanishing gradients?') because the exact query words rarely match the author's prose verbatim.",
    solution:
      "Implemented a vector indexing pipeline using dense text embeddings, calculating dynamic cosine similarity scores to surface context-rich paragraphs and mathematical formulas in milliseconds.",
    architecture:
      "Document ingestion chunker → Python embedding transformer → Vector distance matrix indexing → Fast REST API endpoints → Next.js reactive citation viewer with syntax highlighting.",
    technologies: ["Python", "NumPy", "Sentence-Transformers", "Next.js", "TypeScript", "Tailwind CSS"],
    features: [
      "Dense vector semantic indexing across multi-page research documents",
      "Real-time cosine similarity threshold adjustment slider",
      "Interactive formula and citation viewer with contextual excerpts",
      "Dynamic document summary synthesis and keyword cluster extraction",
    ],
    challenges:
      "Chunk overlap sizing was critical: too small and context was lost; too large and noise diluted semantic similarity scores. Conducted empirical grid searches to identify optimal 256-token spans.",
    learnings:
      "Gained deep intuition for vector space topology, dimensionality reduction, and bridging raw Python machine learning scripts with interactive web frontends.",
    githubUrl: "https://github.com/chahatanany-code/synapse-vector-archive",
    imageUrl: "/images/project-synapse-archive.jpg",
    accentColor: "#818cf8",
    stats: [
      { label: "Search Latency", value: "48ms" },
      { label: "Dimension Size", value: "384-D" },
      { label: "Recall Rate", value: "94.8%" },
    ],
    visualMockup: {
      type: "vector",
      accentGradient: "from-indigo-500/20 via-purple-500/10 to-transparent",
      details: [
        "QUERY: 'Backpropagation through time in recurrent topologies'",
        "COSINE SIMILARITY: 0.912 [MATCH FOUND]",
        "CHUNK #48: 'Gradients vanish exponentially over long sequences...'",
        "INDEX: 384-dim normalized Euclidean embedding",
      ],
    },
  },
  {
    id: "nexus-engine",
    slug: "nexus-engine",
    number: "04",
    title: "NEXUS ENGINE",
    subtitle: "Spatial WebGL Physics Sandbox & Particle Field Dynamics",
    tagline: "Interactive 3D simulation of gravitational vector fields and particle kinetics.",
    category: "Creative Engineering",
    summary:
      "A GPU-accelerated spatial sandbox rendering over 15,000 interactive particles in real-time WebGL, simulating N-body gravitational fields, magnetic repulsion, and kinetic fluid damping.",
    problem:
      "Visualizing mathematical concepts like rotational curl, gravitational vector fields, and collision geometry in standard 2D textbook diagrams is unintuitive and flat.",
    solution:
      "Built a custom Three.js WebGL simulation using custom shader materials and buffer geometries, allowing users to manipulate gravity wells, drag mass centers, and observe particle kinetics at 60 FPS.",
    architecture:
      "Custom Float32BufferAttribute particle positions → GPU vertex shader displacement → Mouse raycaster unprojection → GSAP timeline camera choreography → React Three Fiber overlay.",
    technologies: ["Three.js", "React", "TypeScript", "GLSL Shaders", "GSAP", "Tailwind CSS"],
    features: [
      "15,000+ simultaneous particles animated with GPU vertex shaders",
      "Real-time inverse-square law gravitational attractor controls",
      "Cinematic camera orbits orchestrated via GSAP ScrollTrigger",
      "Graceful degradation on mobile with adaptive point-density downsampling",
    ],
    challenges:
      "Preventing garbage collection spikes from object instantiation in the render loop. Re-architected all calculations to reuse static vector buffers and typed arrays.",
    learnings:
      "Mastered 3D projective geometry, WebGL buffer allocation, and coordinating GSAP timelines with Three.js requestAnimationFrame loops.",
    githubUrl: "https://github.com/chahatanany-code/nexus-spatial-engine",
    imageUrl: "/images/project-nexus-engine.jpg",
    accentColor: "#22d3ee",
    stats: [
      { label: "Particle Count", value: "15,000+" },
      { label: "Target FPS", value: "60 FPS" },
      { label: "Memory Footprint", value: "< 35MB" },
    ],
    visualMockup: {
      type: "canvas",
      accentGradient: "from-cyan-500/20 via-teal-500/10 to-transparent",
      details: [
        "PARTICLE BUFFERS: Float32Array[45000] bound",
        "GRAVITY WELL: Pos(0.0, 1.2, -3.4) Mass=850kg",
        "SOLVER: Euler integration with velocity damping (0.98)",
        "RENDER: WebGL2Renderer (VSync 60 FPS Locked)",
      ],
    },
  },
];
