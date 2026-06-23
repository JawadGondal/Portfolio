// Single-page portfolio — dark editorial layout.
// Sections: hero, about, projects, experience, skills, contact.
// Content lives here for now; we split into data files later.

import Nav from "./nav";
import Reveal from "./reveal";
import {
  ArrowUpRightIcon,
  ChevronDownIcon,
  ExternalLinkIcon,
  GitHubIcon,
  LinkedInIcon,
  MailIcon,
} from "./icons";

const EMAIL = "jawadayubgondal@gmail.com";
const LINKEDIN_URL =
  "https://www.linkedin.com/in/m-jawad-ayub-gondal-91103617a";
const GITHUB_URL = "https://github.com/JawadGondal";

// TODO: replace Slide Worlds' live link with the real Play Store URL.
const PLAY_STORE_URL = "#";

const projects = [
  {
    id: "01",
    name: "Reelcraft",
    tagline: "AI video generation studio",
    description:
      "Text or image to vertical reel, powered by fal.ai across multiple models. Built end to end with a streaming generation UI and model routing.",
    tags: ["Next.js 14", "TypeScript", "Tailwind", "fal.ai"],
    stat: "AI Video",
    live: "https://reel-craft-rho.vercel.app",
    source: "https://github.com/JawadGondal/ReelCraft",
  },
  {
    id: "02",
    name: "Agentic RAG System",
    tagline: "Production retrieval pipeline",
    description:
      "Agent-driven retrieval with query rewriting and grounded generation. Designed for reliable answers over enterprise knowledge bases.",
    tags: ["LangGraph", "Pinecone", "OpenAI", "Python"],
    stat: "RAG",
    source: "https://github.com/JawadGondal/Agentic-RAG-System",
  },
  {
    id: "03",
    name: "Transcription Service",
    tagline: "Speech-to-text, served as an API",
    description:
      "Audio transcription pipeline that streams uploads through faster-whisper for fast, accurate speech-to-text behind a FastAPI service.",
    tags: ["FastAPI", "faster-whisper", "Python"],
    stat: "Speech-to-Text",
    source: "https://github.com/JawadGondal/transcription-service",
  },
  {
    id: "04",
    name: "AI News Generator",
    tagline: "Multi-LLM editorial workflow",
    description:
      "Gathers, edits, and analyzes news across multiple language models, then turns the result into curated, structured insights.",
    tags: ["Python", "OpenAI", "LLMs"],
    stat: "Multi-LLM",
    source: "https://github.com/JawadGondal/AI-Powered-News-Generator",
  },
  {
    id: "05",
    name: "Slide Worlds",
    tagline: "Puzzle game shipped on Google Play",
    description:
      "A sliding puzzle game built solo end to end, from gameplay and level design to store submission and release.",
    tags: ["Unity", "C#"],
    stat: "Game · Live",
    live: PLAY_STORE_URL,
  },
];

const experience = [
  {
    company: "MindHYVE.ai",
    role: "Agentic Full-Cycle Engineer",
    period: "Nov 2025 — Present",
    location: "Islamabad",
    description:
      "One-product, one-developer ownership — designing, building, integrating, and deploying complete AI products end to end with AI-assisted development.",
  },
  {
    company: "AI Mark Labs",
    role: "AI/ML Data Engineer",
    period: "Jul 2025 — Sep 2025",
    location: "Islamabad",
    description:
      "Built AI workflows, RAG systems, agents, and chatbots for Evolo AI, plus data engineering and RESTful APIs.",
  },
  {
    company: "Metrico Dev",
    role: "Software Engineer (AI & Analytics)",
    period: "Nov 2024 — Jun 2025",
    location: "Islamabad",
    description:
      "Research on quantum neural networks for network intrusion detection, alongside applied AI and analytics engineering.",
  },
  {
    company: "ITSOLERA",
    role: "Generative AI Engineer",
    period: "Jul 2024 — Oct 2024",
    location: "Islamabad",
    description:
      "Built an AI news generator, a ChEMBL-based drug-discovery system, and a multi-agent parenting assistant using LangChain, Gradio, and Cohere.",
  },
  {
    company: "Freelance",
    role: "AI Engineer",
    period: "Feb 2023 — Jun 2025",
    location: "Islamabad",
    description:
      "LangChain and LLM model development, ML and deep learning, agent-based systems, and Python ETL pipelines for clients.",
  },
];

const skillGroups = [
  {
    category: "Agentic & LLM",
    skills: [
      "LangChain",
      "LlamaIndex",
      "CrewAI",
      "LangGraph",
      "RAG",
      "Tool Use",
    ],
  },
  {
    category: "Models & APIs",
    skills: [
      "Anthropic API",
      "OpenAI API",
      "Fine-tuning",
      "Prompt Engineering",
      "Embeddings",
    ],
  },
  {
    category: "Backend & Data",
    skills: ["Python", "FastAPI", "Pinecone", "Weaviate", "PostgreSQL", "REST"],
  },
  {
    category: "Frontend & Tools",
    skills: ["Next.js", "TypeScript", "React", "Tailwind", "Docker", "Git"],
  },
];

const stats = [
  { val: "5+", label: "Projects shipped" },
  { val: "16", label: "GitHub repos" },
  { val: "MS", label: "Systems Engineering" },
];

const socials = [
  { Icon: GitHubIcon, href: GITHUB_URL, label: "GitHub" },
  { Icon: LinkedInIcon, href: LINKEDIN_URL, label: "LinkedIn" },
  { Icon: MailIcon, href: `mailto:${EMAIL}`, label: "Email" },
];

const contacts = [
  { Icon: MailIcon, label: EMAIL, sub: "Email", href: `mailto:${EMAIL}` },
  { Icon: GitHubIcon, label: "github.com/JawadGondal", sub: "GitHub", href: GITHUB_URL },
  {
    Icon: LinkedInIcon,
    label: "linkedin.com/in/m-jawad-ayub-gondal",
    sub: "LinkedIn",
    href: LINKEDIN_URL,
  },
];

function SectionNumber({ n }: { n: string }) {
  return (
    <span className="mb-3 block font-mono text-xs tracking-widest text-accent/70">
      {n}
    </span>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-12 font-serif text-4xl font-bold leading-tight text-foreground md:text-5xl">
      {children}
    </h2>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />

      {/* Hero */}
      <section
        id="top"
        className="relative mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 pb-16 pt-24 md:px-12"
      >
        {/* Grid decoration */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(196,181,253,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(196,181,253,0.8) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        <Reveal className="relative">
          <div className="mb-6 flex items-center gap-2 font-mono text-xs text-accent/60">
            <span className="inline-block h-px w-4 bg-accent/50" />
            Agentic Full-Cycle Engineer · Islamabad
          </div>

          <h1 className="mb-8 font-serif text-6xl font-black leading-[0.95] tracking-tight text-foreground sm:text-7xl md:text-8xl">
            Muhammad Jawad
            <br />
            <span className="italic text-primary/90">Ayub Gondal</span>
          </h1>

          <div className="flex flex-col gap-8 md:flex-row md:items-end md:gap-16">
            <div className="max-w-lg">
              <p className="mb-6 text-lg leading-relaxed text-foreground/70">
                I take AI products from idea to deployment — designing,
                building, and shipping agentic systems end to end. Retrieval
                pipelines, tool-using agents, and the glue that keeps them
                reliable in production. Currently at{" "}
                <span className="text-primary">MindHYVE.ai</span>.
              </p>
              <span className="flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
                <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
                Available for work
              </span>
            </div>

            <div className="flex items-center gap-5">
              {socials.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target={href.startsWith("mailto:") ? undefined : "_blank"}
                  rel={href.startsWith("mailto:") ? undefined : "noreferrer"}
                  className="rounded-sm border border-border p-2.5 text-muted-foreground transition-all hover:border-primary/40 hover:text-foreground"
                >
                  <Icon className="h-[18px] w-[18px]" />
                </a>
              ))}
            </div>
          </div>
        </Reveal>

        <a
          href="#about"
          aria-label="Scroll to about"
          className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-muted-foreground/40"
        >
          <ChevronDownIcon className="h-4 w-4" />
        </a>
      </section>

      {/* About */}
      <section id="about" className="mx-auto max-w-6xl px-6 py-28 md:px-12">
        <Reveal>
          <SectionNumber n="01 / About" />
          <div className="grid items-start gap-12 md:grid-cols-2 md:gap-20">
            <SectionTitle>
              Building agents,
              <br />
              <span className="italic text-primary/80">that ship.</span>
            </SectionTitle>
            <div className="flex flex-col gap-5 text-base leading-relaxed text-foreground/70">
              <p>
                I&apos;m an Agentic AI Engineer based in Islamabad. Currently at
                MindHYVE.ai working on adaptive learning systems with cognitive
                profiling and personalization engines. Before that I built
                across AI Mark Labs, Metrico Dev, ITSOLERA, and freelance.
              </p>
              <p>
                My stack is Python, FastAPI, LangChain, LlamaIndex, CrewAI,
                Anthropic and OpenAI APIs, Pinecone, Weaviate, and Next.js. I
                hold an MS in Systems Engineering from PIEAS and a BS in
                Electrical Engineering from GIK Institute.
              </p>
              <p>
                I work best when I get to own a system end to end, from
                architecture to deployment — and I care about making models
                reason reliably in production, not just in demos.
              </p>
              <div className="mt-4 grid grid-cols-3 gap-6 border-t border-border pt-6">
                {stats.map(({ val, label }) => (
                  <div key={label}>
                    <div className="font-serif text-2xl font-bold text-primary">
                      {val}
                    </div>
                    <div className="mt-0.5 font-mono text-xs text-muted-foreground">
                      {label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Projects */}
      <section
        id="projects"
        className="mx-auto max-w-6xl border-t border-border px-6 py-28 md:px-12"
      >
        <Reveal>
          <SectionNumber n="02 / Projects" />
          <SectionTitle>Selected work</SectionTitle>
        </Reveal>
        <div className="grid gap-5 md:grid-cols-2">
          {projects.map((project, i) => (
            <Reveal key={project.id} delay={i * 70}>
              <article className="group flex h-full flex-col gap-5 rounded-sm border border-border bg-card p-8 transition-all duration-300 hover:border-primary/30 hover:bg-primary/[0.03]">
                <div className="flex items-start justify-between gap-4">
                  <span className="font-mono text-xs text-muted-foreground">
                    {project.id}
                  </span>
                  <div className="rounded-full border border-accent/30 px-2 py-0.5 font-mono text-xs text-accent">
                    {project.stat}
                  </div>
                </div>

                <div>
                  <h3 className="mb-1 font-serif text-xl font-bold text-foreground transition-colors group-hover:text-primary">
                    {project.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {project.tagline}
                  </p>
                </div>

                <p className="flex-1 text-sm leading-relaxed text-foreground/70">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-sm border border-border px-2 py-0.5 font-mono text-xs text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-1 flex items-center gap-5 text-xs">
                  {project.live && (
                    <a
                      href={project.live}
                      target={
                        project.live.startsWith("http") ? "_blank" : undefined
                      }
                      rel={
                        project.live.startsWith("http")
                          ? "noreferrer"
                          : undefined
                      }
                      className="flex items-center gap-1 text-primary/70 transition-colors hover:text-primary"
                    >
                      <ExternalLinkIcon className="h-3 w-3" />
                      <span className="font-mono">Live</span>
                    </a>
                  )}
                  {project.source && (
                    <a
                      href={project.source}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1 text-primary/70 transition-colors hover:text-primary"
                    >
                      <GitHubIcon className="h-3 w-3" />
                      <span className="font-mono">Source</span>
                    </a>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Experience */}
      <section
        id="experience"
        className="mx-auto max-w-6xl border-t border-border px-6 py-28 md:px-12"
      >
        <Reveal>
          <SectionNumber n="03 / Experience" />
          <SectionTitle>Where I&apos;ve worked</SectionTitle>
        </Reveal>
        <div>
          {experience.map((item, i) => (
            <Reveal key={item.company}>
              <div className="grid gap-4 border-b border-border py-10 last:border-0 md:grid-cols-[200px_1fr] md:gap-12">
                <div className="flex flex-col gap-1">
                  <span className="font-mono text-xs text-muted-foreground">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-xs text-muted-foreground">{item.period}</p>
                  <p className="text-xs text-muted-foreground/60">
                    {item.location}
                  </p>
                </div>
                <div>
                  <div className="mb-2 flex items-baseline gap-3">
                    <h3 className="font-serif text-xl font-bold text-foreground">
                      {item.company}
                    </h3>
                    <span className="text-sm text-primary/80">{item.role}</span>
                  </div>
                  <p className="text-sm leading-relaxed text-foreground/70">
                    {item.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section
        id="skills"
        className="mx-auto max-w-6xl border-t border-border px-6 py-28 md:px-12"
      >
        <Reveal>
          <SectionNumber n="04 / Skills" />
          <SectionTitle>Technical fluency</SectionTitle>
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {skillGroups.map((group) => (
              <div key={group.category}>
                <h3 className="mb-4 font-mono text-xs tracking-widest text-accent/80">
                  {group.category.toUpperCase()}
                </h3>
                <ul className="flex flex-col gap-2.5">
                  {group.skills.map((skill) => (
                    <li
                      key={skill}
                      className="flex items-center gap-2 text-sm text-foreground/75"
                    >
                      <span className="h-1 w-1 flex-shrink-0 rounded-full bg-primary/50" />
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Contact */}
      <section
        id="contact"
        className="mx-auto max-w-6xl border-t border-border px-6 py-28 md:px-12"
      >
        <Reveal>
          <SectionNumber n="05 / Contact" />
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div>
              <SectionTitle>
                Let&apos;s build
                <br />
                <span className="italic text-primary/80">something real.</span>
              </SectionTitle>
              <p className="max-w-sm text-base leading-relaxed text-foreground/60">
                If you&apos;re hiring for a remote AI or Forward Deployed
                Engineer role, or you need an agentic system built right,
                I&apos;d like to hear from you.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              {contacts.map(({ Icon, label, sub, href }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("mailto:") ? undefined : "_blank"}
                  rel={href.startsWith("mailto:") ? undefined : "noreferrer"}
                  className="group flex items-center gap-5 rounded-sm border border-border p-5 transition-all hover:border-primary/30 hover:bg-primary/5"
                >
                  <div className="rounded-sm border border-border p-2.5 transition-colors group-hover:border-primary/30">
                    <Icon className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-primary" />
                  </div>
                  <div>
                    <div className="text-sm text-foreground transition-colors group-hover:text-primary">
                      {label}
                    </div>
                    <div className="font-mono text-xs text-muted-foreground">
                      {sub}
                    </div>
                  </div>
                  <ArrowUpRightIcon className="ml-auto h-3.5 w-3.5 text-muted-foreground/40 transition-colors group-hover:text-primary/60" />
                </a>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* Footer */}
      <footer className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 border-t border-border px-6 py-10 md:px-12 sm:flex-row">
        <span className="font-mono text-xs text-muted-foreground/50">
          © 2026 Muhammad Jawad Ayub Gondal
        </span>
        <span className="font-mono text-xs text-muted-foreground/50">
          Agentic AI Engineer · Islamabad
        </span>
      </footer>
    </div>
  );
}
