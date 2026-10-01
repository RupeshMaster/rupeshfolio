export type Stat = {
  label: string;
  value: string;
};

export type Project = {
  name: string;
  description: string;
  technologies: string[];
  link: string;
};

export type Experience = {
  role: string;
  company: string;
  period: string;
  summary: string;
};

export type ContactLinks = {
  email: string;
  github: string;
  linkedin: string;
};

export const name = "Your Name";

export const headline = "A thoughtful builder creating useful digital experiences.";

export const bio =
  "I am a curious professional who enjoys turning ideas into clear, accessible, and dependable products. This placeholder bio can be replaced with your story, focus, and goals.";

export const stats: Stat[] = [
  { label: "Years of experience", value: "0+" },
  { label: "Projects shipped", value: "0" },
  { label: "Coffee consumed", value: "∞" },
];

export const skills: string[] = [
  "TypeScript",
  "User experience",
  "Problem solving",
  "Writing",
  "Collaboration",
];

export const projects: Project[] = [
  {
    name: "Project One",
    description: "A placeholder description for a featured project and its impact.",
    technologies: ["TypeScript", "Web platform"],
    link: "https://example.com/project-one",
  },
  {
    name: "Project Two",
    description: "A second placeholder project that demonstrates your craft and curiosity.",
    technologies: ["Research", "Prototyping"],
    link: "https://example.com/project-two",
  },
];

export const experience: Experience[] = [
  {
    role: "Your Role",
    company: "Example Company",
    period: "2024 — Present",
    summary: "A placeholder summary of your responsibilities, contribution, and outcomes.",
  },
];

export const notes: string[] = [
  "Available for thoughtful collaborations and first-version ideas.",
  "Replace these notes with updates, principles, or a short personal message.",
];

export const contactLinks: ContactLinks = {
  email: "mailto:hello@example.com",
  github: "https://github.com/your-handle",
  linkedin: "https://www.linkedin.com/in/your-handle",
};
