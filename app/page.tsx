// Single-page portfolio. Sections are added in order: hero, work, about, contact.
// All content lives here for now; we split into data files later.

const LINKEDIN_URL =
  "https://www.linkedin.com/in/m-jawad-ayub-gondal-profile";
const GITHUB_URL = "https://github.com/JawadGondal";
const EMAIL = "jawadayubgondal@gmail.com";

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-2xl px-6 sm:px-8">
      <section
        id="top"
        aria-label="Introduction"
        className="flex min-h-[88vh] flex-col justify-center py-24"
      >
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-muted">
          Agentic AI Engineer
        </p>

        <h1 className="mt-5 text-4xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-5xl">
          Muhammad Jawad Ayub Gondal
        </h1>

        <p className="mt-6 max-w-xl text-lg leading-relaxed text-foreground sm:text-xl">
          I build LLM systems that take actions, not just answers.
        </p>

        <p className="mt-5 max-w-xl text-base leading-relaxed text-muted">
          Based in Islamabad. I design and ship agentic systems: retrieval
          pipelines, tool-using agents, and the glue that makes them reliable in
          production. I work with teams hiring for remote AI and forward-deployed
          roles, and with clients who need a working system, not a demo.
        </p>

        <nav
          aria-label="Primary links"
          className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-base"
        >
          <a
            href={`mailto:${EMAIL}`}
            className="text-foreground underline decoration-border underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
          >
            Email
          </a>
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground underline decoration-border underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
          >
            LinkedIn
          </a>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground underline decoration-border underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
          >
            GitHub
          </a>
        </nav>
      </section>
    </main>
  );
}
