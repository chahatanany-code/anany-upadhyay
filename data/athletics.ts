export interface DisciplinePillar {
  id: string;
  discipline: string;
  tagline: string;
  metric: string;
  metricLabel: string;
  narrative: string;
  engineeringTransfer: string;
  attributes: string[];
  imageUrl: string;
}

export const disciplinePillars: DisciplinePillar[] = [
  {
    id: "taekwondo",
    discipline: "Taekwondo",
    tagline: "Precision under pressure. High-velocity kinetic control.",
    metric: "MEDALIST",
    metricLabel: "Competitive Arena",
    narrative:
      "Years on the mat taught me that power without precision is wasted kinetic energy. Every kick, stance, and counter-strike demands micro-adjustments in fractions of a second.",
    engineeringTransfer:
      "How it translates to code: Clean architecture, strict algorithmic constraints, and eliminating runtime latency. You don't guess your strike; you execute with disciplined intent.",
    attributes: ["Spatial Awareness", "Microsecond Reflexes", "Mechanical Rigor", "Medal Discipline"],
    imageUrl: "/images/discipline-taekwondo-real.jpg",
  },
  {
    id: "boxing",
    discipline: "Boxing",
    tagline: "Calm inside the pocket. Strategic rhythm and composure.",
    metric: "TACTICAL",
    metricLabel: "Combat Conditioning",
    narrative:
      "When someone is stepping inside your guard, panic guarantees defeat. Boxing forged my ability to breathe steadily through high-intensity stress and counter-punch with composure.",
    engineeringTransfer:
      "How it translates to code: Debugging broken production builds and resolving compiler roadblocks. When systems fail under pressure, panic solves nothing—methodical diagnosis wins.",
    attributes: ["Poise Under Pressure", "Defense-First Strategy", "Rhythm & Timing", "Mental Toughness"],
    imageUrl: "/images/discipline-boxing-real.jpg",
  },
  {
    id: "gym-training",
    discipline: "Gym & Strength",
    tagline: "Progressive overload. Relentless incremental adaptation.",
    metric: "365 DAYS",
    metricLabel: "Relentless Routine",
    narrative:
      "Physical strength isn't gifted; it is compounded repetition by repetition, session after session, even on the coldest mornings when motivation is zero.",
    engineeringTransfer:
      "How it translates to code: The compound effect of deliberate practice. Spending 3 hours dissecting backpropagation or memory models every single day builds true engineering mastery.",
    attributes: ["Progressive Overload", "Zero Excuses Routine", "Physical Stamina", "Long-term Compounding"],
    imageUrl: "/images/discipline-gym-real.jpg",
  },
];

export const athleticPhilosophy = {
  quote: "Discipline is not an emotion you wait for. It is an operating system you execute.",
  principles: [
    { title: "Physical Tenacity fuels Cognitive Stamina", desc: "Long engineering deep-work blocks require a body and mind capable of holding razor-sharp focus without fatigue." },
    { title: "Feedback Loops are Brutally Honest", desc: "In combat sports, mistakes have immediate consequences. In software, bugs expose faulty assumptions immediately. Respect both." },
    { title: "Incremental Progress Over Hype", desc: "One more rep, one more commit, one more concept mastered. Consistency beats raw talent when talent rests." },
  ]
};
