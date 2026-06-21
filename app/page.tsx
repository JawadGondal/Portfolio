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

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="mx-auto w-full max-w-[720px] flex-1 px-6">
        <section
          id="top"
          aria-label="Introduction"
          className="flex flex-col pt-28 pb-24 sm:pt-36"
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
      </main>

      <footer className="mx-auto w-full max-w-[720px] px-6 pb-10">
        <p className="text-center text-sm text-muted">
          © 2026 Muhammad Jawad Ayub Gondal
        </p>
      </footer>
    </div>
  );
}
