"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import {
  bio,
  contactLinks,
  experience,
  headline,
  name,
  notes,
  projects,
  skills,
  stats,
} from "@/content";

type PageId = "intro" | "experience" | "projects" | "about" | "notes" | "contact";
type Theme = "light" | "dark";

const navItems: Array<{ id: PageId; label: string; command: string }> = [
  { id: "intro", label: "intro.md", command: "intro" },
  { id: "experience", label: "experience.md", command: "experience" },
  { id: "projects", label: "projects.md", command: "projects" },
  { id: "about", label: "about.md", command: "about" },
  { id: "notes", label: "notes.md", command: "notes" },
  { id: "contact", label: "contact.md", command: "contact" },
];

const pageAliases: Record<string, PageId> = {
  intro: "intro",
  "intro.md": "intro",
  experience: "experience",
  "experience.md": "experience",
  work: "experience",
  projects: "projects",
  "projects.md": "projects",
  about: "about",
  "about.md": "about",
  notes: "notes",
  "notes.md": "notes",
  writing: "notes",
  contact: "contact",
  "contact.md": "contact",
};

export default function Home() {
  const [currentPage, setCurrentPage] = useState<PageId>("intro");
  const [theme, setTheme] = useState<Theme>("light");
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [paletteQuery, setPaletteQuery] = useState("");
  const [dockOpen, setDockOpen] = useState(false);
  const [command, setCommand] = useState("");
  const [commandOutput, setCommandOutput] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("portfolio-theme") as Theme | null;
    const preferredTheme = savedTheme ?? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    window.setTimeout(() => setTheme(preferredTheme), 0);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setPaletteOpen((open) => !open);
      }

      if (event.key === "Escape") {
        setPaletteOpen(false);
        setDockOpen(false);
      }

      if (event.key === "/" || event.key === "?") {
        const target = event.target as HTMLElement;
        if (target.tagName !== "INPUT" && target.tagName !== "TEXTAREA") {
          event.preventDefault();
          setDockOpen(true);
        }
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const currentFile = navItems.find((item) => item.id === currentPage)?.label ?? "intro.md";
  const filteredCommands = useMemo(() => {
    const query = paletteQuery.trim().toLowerCase();
    const commands = [
      ...navItems.map((item) => ({ label: `Open ${item.label}`, action: () => setCurrentPage(item.id) })),
      { label: "Toggle theme", action: () => setTheme((value) => (value === "light" ? "dark" : "light")) },
      { label: "Open command prompt", action: () => setDockOpen(true) },
    ];

    return query ? commands.filter((item) => item.label.toLowerCase().includes(query)) : commands;
  }, [paletteQuery]);

  function goTo(page: PageId) {
    setCurrentPage(page);
    setPaletteOpen(false);
    setDockOpen(false);
  }

  function toggleTheme() {
    setTheme((value) => (value === "light" ? "dark" : "light"));
  }

  function submitCommand(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = command.trim().toLowerCase();
    if (!value) return;

    setCommand("");

    if (value === "theme") {
      toggleTheme();
      setCommandOutput(`Theme switched to ${theme === "light" ? "dark" : "light"}.`);
      return;
    }

    if (value === "help") {
      setCommandOutput("Try: about, projects, experience, notes, contact, theme, or clear.");
      return;
    }

    if (value === "clear") {
      setCommandOutput("");
      return;
    }

    const matchedPage = pageAliases[value.replace(/^open |^cat /, "")];
    if (matchedPage) {
      goTo(matchedPage);
      setCommandOutput(`Opened ${navItems.find((item) => item.id === matchedPage)?.label}.`);
      setDockOpen(true);
      return;
    }

    setCommandOutput(`Unknown command: "${value}". Type "help" to see available commands.`);
  }

  async function copyCommand() {
    try {
      await navigator.clipboard.writeText("npx create-next-app@latest my-portfolio");
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }

  return (
    <main className="desk">
      <div className="desk-bg" aria-hidden="true">
        <span className="bg-word bg-word-one">build</span>
        <span className="bg-word bg-word-two">iterate</span>
        <span className="bg-word bg-word-three">create</span>
        <span className="bg-word bg-word-four">ship</span>
      </div>

      <section className="terminal" aria-label="Portfolio terminal window">
        <header className="titlebar">
          <div className="traffic-lights" aria-hidden="true">
            <span className="traffic-light close" />
            <span className="traffic-light minimize" />
            <span className="traffic-light maximize" />
          </div>
          <span className="window-title">portfolio.local — {currentFile}</span>
          <div className="title-actions">
            <button type="button" className="chrome-button" onClick={() => setDockOpen((open) => !open)}>
              prompt
            </button>
            <button type="button" className="chrome-button" onClick={toggleTheme}>
              {theme === "light" ? "dark" : "light"}
            </button>
          </div>
        </header>

        <div className="terminal-split">
          <aside className="sidebar" aria-label="Portfolio navigation">
            <p className="sidebar-heading">~/portfolio</p>
            <nav>
              {navItems.map((item) => (
                <button
                  type="button"
                  className={`sidebar-link ${currentPage === item.id ? "active" : ""}`}
                  aria-current={currentPage === item.id ? "page" : undefined}
                  key={item.id}
                  onClick={() => goTo(item.id)}
                >
                  {item.label}
                </button>
              ))}
            </nav>
            <span className="sidebar-signature">YN</span>
          </aside>

          <div className="terminal-main">
            <div className="terminal-body">
              {currentPage === "intro" && <IntroPage onNavigate={goTo} />}
              {currentPage === "experience" && <ExperiencePage />}
              {currentPage === "projects" && <ProjectsPage />}
              {currentPage === "about" && <AboutPage />}
              {currentPage === "notes" && <NotesPage />}
              {currentPage === "contact" && <ContactPage />}
            </div>

            <div className={`command-dock ${dockOpen ? "open" : ""}`}>
              {commandOutput && <p className="command-output">{commandOutput}</p>}
              <form className="command-form" onSubmit={submitCommand}>
                <span className="prompt-mark" aria-hidden="true">❯</span>
                <label htmlFor="command-input">ask me:</label>
                <input
                  id="command-input"
                  value={command}
                  onChange={(event) => setCommand(event.target.value)}
                  placeholder="type a command..."
                  autoComplete="off"
                />
              </form>
            </div>

            <footer className="terminal-footer">
              <div className="footer-hints">
                <button type="button" onClick={() => { setPaletteOpen(true); setPaletteQuery(""); }}><kbd>⌘K</kbd> search</button>
                <button type="button" onClick={() => setDockOpen(true)}><kbd>?</kbd> ask me anything</button>
              </div>
              <button type="button" className="npx-command" onClick={copyCommand}>
                <span className="prompt-mark">❯</span> {copied ? "copied!" : "npx create-next-app@latest my-portfolio"}
              </button>
              <p className="footer-meta">© 2026 {name.toLowerCase()} — built with Next.js, TypeScript, and curiosity.</p>
            </footer>
          </div>
        </div>

        <footer className="statusbar">
          <span>● {currentFile}</span>
          <span className="status-spacer" />
          <button type="button" className="status-button" onClick={() => setPaletteOpen(true)} aria-label="Open command palette">⌘K</button>
          <button type="button" className="hello-button" onClick={() => goTo("contact")}>say hello →</button>
        </footer>
      </section>

      {paletteOpen && (
        <div className="palette-overlay" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setPaletteOpen(false)}>
          <section className="command-palette" role="dialog" aria-modal="true" aria-label="Command palette">
            <input
              autoFocus
              value={paletteQuery}
              onChange={(event) => setPaletteQuery(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && filteredCommands[0]) {
                  filteredCommands[0].action();
                  setPaletteOpen(false);
                }
              }}
              placeholder="Search commands..."
              aria-label="Search commands"
            />
            <div className="palette-list">
              {filteredCommands.map((item) => (
                <button type="button" key={item.label} onClick={() => { item.action(); setPaletteOpen(false); }}>
                  <span>›</span>{item.label}
                </button>
              ))}
              {!filteredCommands.length && <p className="empty-state">No matching commands.</p>}
            </div>
            <p className="palette-help"><kbd>esc</kbd> close · <kbd>↵</kbd> select</p>
          </section>
        </div>
      )}
    </main>
  );
}

function CommandLine({ children }: { children: string }) {
  return <p className="command-line"><span className="prompt-mark">❯</span><span>{children}</span><span className="caret" /></p>;
}

function IntroPage({ onNavigate }: { onNavigate: (page: PageId) => void }) {
  return (
    <article className="page">
      <section className="content-block hero-block">
        <CommandLine>{`echo "${headline}"`}</CommandLine>
        <p className="hero-eyebrow">I&apos;m {name}. I build thoughtful things.</p>
        <h1>{headline}</h1>
        <p className="lede">{bio}</p>
      </section>

      <section className="content-block">
        <CommandLine>portfolio --stats</CommandLine>
        <div className="section-output">
          <h2>The track record</h2>
          <p className="subtle">A small collection of work, ideas, and things worth building.</p>
          <div className="stats-grid">
            {stats.map((stat) => <div className="stat-card" key={stat.label}><strong>{stat.value}</strong><span>{stat.label}</span></div>)}
          </div>
        </div>
      </section>

      <section className="content-block">
        <CommandLine>portfolio --focus</CommandLine>
        <div className="section-output">
          <h2>What I care about</h2>
          <p className="subtle">Turning complex ideas into clear, useful experiences.</p>
          <ul className="focus-list">
            <li><b>Build with intent</b><span>Every detail should make the product easier to understand or use.</span></li>
            <li><b>Stay curious</b><span>Learn quickly, ask better questions, and keep moving toward the real problem.</span></li>
            <li><b>Make it human</b><span>Technology works best when it respects people, context, and attention.</span></li>
          </ul>
          <button type="button" className="text-link" onClick={() => onNavigate("projects")}>open projects.md →</button>
        </div>
      </section>

      <section className="content-block final-block">
        <CommandLine>exit</CommandLine>
        <p className="inline-links">
          <button type="button" onClick={() => onNavigate("experience")}>experience.md</button> · <button type="button" onClick={() => onNavigate("about")}>about.md</button> · <button type="button" onClick={() => onNavigate("contact")}>contact.md</button>
        </p>
      </section>
    </article>
  );
}

function ExperiencePage() {
  return (
    <article className="page">
      <PageHeading command="cat experience.md" title="Experience" description="A timeline of roles, lessons, and things built along the way." />
      <section className="content-block"><div className="timeline">{experience.map((item) => <div className="timeline-item" key={`${item.company}-${item.period}`}><span className="date-label">{item.period}</span><h2>{item.role}</h2><p className="accent-label">{item.company}</p><p className="subtle">{item.summary}</p></div>)}</div></section>
    </article>
  );
}

function ProjectsPage() {
  return (
    <article className="page">
      <PageHeading command="cat projects.md" title="Projects" description="Selected work and experiments. Replace these placeholders with your real projects." />
      <section className="content-block"><div className="project-grid">{projects.map((project) => <article className="project-card" key={project.name}><div className="project-card-top"><span className="status-dot" />featured</div><h2>{project.name}</h2><p className="subtle">{project.description}</p><div className="tag-list">{project.technologies.map((technology) => <span key={technology}>{technology}</span>)}</div><a href={project.link} target="_blank" rel="noreferrer">view project ↗</a></article>)}</div></section>
    </article>
  );
}

function AboutPage() {
  return (
    <article className="page">
      <PageHeading command="cat about.md" title="About" description="The person behind the work." />
      <section className="content-block"><CommandLine>portfolio --principles</CommandLine><div className="section-output"><h2>How I work</h2><p className="subtle">I believe the best work comes from combining clear thinking, honest feedback, and steady execution.</p><ul className="focus-list"><li><b>{skills[0]}</b><span>Use modern tools without losing sight of the people using the product.</span></li><li><b>Clarity over noise</b><span>Prefer a small, understandable system over a large collection of impressive features.</span></li><li><b>Progress over perfection</b><span>Ship, learn, improve, and keep the feedback loop short.</span></li></ul></div></section>
    </article>
  );
}

function NotesPage() {
  return (
    <article className="page">
      <PageHeading command="cat notes.md" title="Notes" description="Fragments of thinking, learning, and building in public." />
      <section className="content-block"><div className="notes-list">{notes.map((note, index) => <article className="note-entry" key={note}><span className="date-label">2026.0{index + 1}</span><h2>{note}</h2><p className="subtle">A short note will live here once your personal writing is added.</p></article>)}</div></section>
    </article>
  );
}

function ContactPage() {
  return (
    <article className="page">
      <PageHeading command="cat contact.md" title="Contact" description="Have an idea, a project, or a thoughtful question? Let&apos;s talk." />
      <section className="content-block"><div className="contact-card"><h2>Reach me</h2><p className="subtle">This first version uses direct links. A server-backed contact form can be added later with Resend.</p><div className="contact-links"><a href={contactLinks.email}>{"// email"}</a><a href={contactLinks.github} target="_blank" rel="noreferrer">{"// GitHub ↗"}</a><a href={contactLinks.linkedin} target="_blank" rel="noreferrer">{"// LinkedIn ↗"}</a></div></div></section>
    </article>
  );
}

function PageHeading({ command, title, description }: { command: string; title: string; description: string }) {
  return <section className="content-block heading-block"><CommandLine>{command}</CommandLine><p className="file-header">{"// portfolio — selected content"}</p><h1>{title}</h1><p className="lede">{description}</p></section>;
}
