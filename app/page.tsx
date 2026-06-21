// Single-page portfolio. Sections are added in order: hero, work, about, contact.
// All content lives here for now; we split into data files later.

const EMAIL = "jawadayubgondal@gmail.com";

const links = [
  { label: "Email", href: `mailto:${EMAIL}` },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/m-jawad-ayub-gondal-profile",
  },
  { label: "GitHub", href: "https://github.com/JawadGondal" },
];

// TODO: replace Slide Worlds' live link with the real Play Store URL.
const PLAY_STORE_URL = "#";

const projects = [
  {
    name: "Reelcraft",
    description:
      "AI video generation studio. Text or image to vertical reel, powered by fal.ai across multiple models.",
    stack: ["Next.js 14", "TypeScript", "Tailwind", "fal.ai"],
    live: "https://reel-craft-rho.vercel.app",
    source: "https://github.com/JawadGondal/ReelCraft",
  },
  {
    name: "Agentic RAG System",
    description:
      "Production RAG pipeline with agent-driven retrieval, query rewriting, and grounded generation.",
    stack: ["LangGraph", "Pinecone", "OpenAI", "Python"],
    source: "https://github.com/JawadGondal/Agentic-RAG-System",
  },
  {
    name: "Slide Worlds",
    description:
      "Sliding puzzle game shipped on Google Play. Built solo end to end, from gameplay to store submission.",
    stack: ["Unity", "C#"],
    live: PLAY_STORE_URL,
  },
];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="mx-auto w-full max-w-[720px] flex-1 px-6">
        <section
          id="top"
          aria-label="Introduction"
          className="flex flex-col pt-24 pb-16 sm:pt-28"
        >
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-muted">
            Agentic AI Engineer
          </p>

          <h1 className="mt-5 font-serif text-5xl leading-[1.02] tracking-tight text-foreground sm:text-6xl">
            Muhammad Jawad Ayub Gondal
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-foreground sm:text-xl">
            I build LLM systems that take actions, not just answers.
          </p>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted">
            Based in Islamabad. I design and ship agentic systems: retrieval
            pipelines, tool-using agents, and the glue that makes them reliable
            in production. I work with teams hiring for remote AI and
            forward-deployed roles, and with clients who need a working system,
            not a demo.
          </p>

          <nav
            aria-label="Primary links"
            className="mt-9 flex flex-wrap gap-3"
          >
            {links.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("mailto:") ? undefined : "_blank"}
                rel={
                  href.startsWith("mailto:") ? undefined : "noopener noreferrer"
                }
                className="inline-flex items-center rounded-md border border-border bg-foreground/[0.015] px-3.5 py-2 text-sm font-medium text-foreground transition-colors hover:border-accent/40 hover:bg-accent/[0.06] hover:text-accent"
              >
                {label}
              </a>
            ))}
          </nav>
        </section>

        <section
          id="work"
          aria-label="Selected work"
          className="border-t border-border pt-16 pb-20 sm:pt-20"
        >
          <h2 className="font-serif text-3xl tracking-tight text-foreground">
            Selected Work
          </h2>

          <div className="mt-8 flex flex-col gap-4">
            {projects.map((project) => (
              <article
                key={project.name}
                className="rounded-lg border border-border bg-foreground/[0.01] p-6 transition-colors hover:border-foreground/25 hover:bg-foreground/[0.02] sm:p-8"
              >
                <h3 className="text-xl font-semibold tracking-tight text-foreground">
                  {project.name}
                </h3>

                <p className="mt-2 max-w-xl text-base leading-relaxed text-muted">
                  {project.description}
                </p>

                <ul className="mt-4 flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <li
                      key={tech}
                      className="rounded-full border border-border px-2.5 py-0.5 text-xs text-muted"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>

                <div className="mt-5 flex gap-5 text-sm font-medium">
                  {project.live && (
                    <a
                      href={project.live}
                      target={
                        project.live.startsWith("http") ? "_blank" : undefined
                      }
                      rel={
                        project.live.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className="text-foreground underline decoration-border underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
                    >
                      Live demo
                    </a>
                  )}
                  {project.source && (
                    <a
                      href={project.source}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground underline decoration-border underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
                    >
                      Source
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer className="mx-auto w-full max-w-[720px] px-6 pb-10">
        <p className="text-center text-sm text-muted">
          © 2026 Muhammad Jawad Ayub Gondal
        </p>
      </footer>
    </div>
  );
}
