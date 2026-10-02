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
  instagram: string;
};

export const name = "Rupesh Rajesh Singh";
export const initials = "RRS";
export const role = "Full-Stack Developer";
export const location = "India";

export const headline = "Building full-stack products with clean code and good energy.";

export const bio =
  "I am a Full-Stack Developer focused on UI/UX, backend systems, DevOps, app development, and n8n automation. I enjoy taking ideas from the first question through design, implementation, deployment, and improvement—with a clean, efficient, and vibe-driven coding approach.";

export const stats: Stat[] = [
  { label: "Public repositories", value: "10" },
  { label: "Core focus", value: "Full-stack" },
  { label: "Automation tool", value: "n8n" },
];

export const skills: string[] = [
  "Full-stack development",
  "UI/UX design",
  "DevOps",
  "n8n automation",
  "Prompt engineering",
  "App development",
  "Git & GitHub",
  "Business & management",
];

export const projects: Project[] = [
  {
    name: "FocusFlow",
    description:
      "An offline-capable study planner PWA that generates balanced weekly schedules from subject priorities, available time, and student needs.",
    technologies: ["JavaScript", "PWA", "IndexedDB", "Service Workers"],
    link: "https://focusflow-weld-eta.vercel.app",
  },
  {
    name: "FixMyCode AI",
    description:
      "An AI-assisted code editor that validates and fixes code across multiple languages, with built-in correction rules and personal fix history.",
    technologies: ["React", "Vite", "Gemini AI", "Prism.js"],
    link: "https://fix-my-code-ai.vercel.app",
  },
  {
    name: "Athiya",
    description:
      "A real-estate property showcase with a public website and protected admin dashboard for projects, sales, and enquiries.",
    technologies: ["React", "Node.js", "MongoDB", "Docker"],
    link: "https://athiya.vercel.app",
  },
  {
    name: "Prosperventure",
    description:
      "A MERN platform that brings logistics, insurance, real estate, taxation, and content services into one role-based dashboard.",
    technologies: ["React", "Express", "MongoDB", "JWT"],
    link: "https://prosperventure-demo.vercel.app",
  },
  {
    name: "AI World Model for Network Attack Forecasting",
    description:
      "A research prototype that uses LSTM dynamics, temporal attention, and autoregressive simulation to forecast network attacks and kill-chain progression.",
    technologies: ["Python", "PyTorch", "Streamlit", "MITRE ATT&CK"],
    link: "https://github.com/RupeshMaster/AI-Model-PS-153",
  },
  {
    name: "Daily Tech Digest",
    description:
      "An n8n automation that delivers a daily summary of important developments across the technology industry and market.",
    technologies: ["n8n", "Python", "Automation"],
    link: "https://github.com/RupeshMaster/daily-tech-digest",
  },
];

export const experience: Experience[] = [
  {
    role: "Head of Management · Full-Stack Developer",
    company: "Genius AI Software Tech Pvt. Ltd.",
    period: "19 Mar 2026 — Present",
    summary:
      "Currently contributing as a Full-Stack Developer and UI/UX Designer, supporting DevOps, app development, and team management while handling day-to-day coordination across the team. This internship has led to a fixed role as Head of the company.",
  },
];

export const notes: string[] = [
  "Understand the why before choosing the how.",
  "Look at design, logic, performance, and deployment before writing the first line of code.",
  "Break complex problems into clear steps, automate the boring parts, and stay in the flow.",
];

export const contactLinks: ContactLinks = {
  email: "mailto:rupesh457809@gmail.com",
  github: "https://github.com/RupeshMaster",
  linkedin: "https://www.linkedin.com/in/rupesh-singh-cs/",
  instagram: "https://www.instagram.com/_rupeshh9/",
};
