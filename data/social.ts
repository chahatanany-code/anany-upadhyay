export interface SocialLink {
  name: string;
  url: string;
  handle: string;
  icon: string;
  primary?: boolean;
}

export const socialLinks: SocialLink[] = [
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/anany-upadhyay-undefined-74910429b/",
    handle: "anany-upadhyay",
    icon: "linkedin",
    primary: true,
  },
  {
    name: "GitHub",
    url: "https://github.com/chahatanany-code",
    handle: "@chahatanany-code",
    icon: "github",
    primary: true,
  },
  {
    name: "Email",
    url: "mailto:chahatanany@gmail.com",
    handle: "chahatanany@gmail.com",
    icon: "mail",
    primary: true,
  },
];

export const personalInfo = {
  name: "Anany Kumar Upadhyay",
  title: "CSE • AI/ML Developer & Builder",
  university: "SRM Institute of Science and Technology — Delhi NCR",
  program: "B.Tech Computer Science & Engineering (Artificial Intelligence & Machine Learning)",
  year: "2nd Year",
  age: 19,
  location: "Delhi NCR, India",
  status: "BUILDING",
  statusDetail: "Focusing on Deep Learning architectures & Next-Gen Web Systems",
  tagline: "I BUILD. I BREAK. I LEARN. I BUILD AGAIN.",
  summary:
    "Second-year CSE (AI/ML) student at SRMIST Delhi NCR, building my way from curiosity to real-world engineering. Combining algorithmic discipline, combat sports tenacity, and modern web craft.",
  avatarUrl: "/images/anany-portrait-real.jpg",
};
