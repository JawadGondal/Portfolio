"use client";

import { useEffect, useState } from "react";

const sections = [
  { label: "work", href: "#work" },
  { label: "about", href: "#about" },
  { label: "contact", href: "#contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b transition-colors duration-200 ${
        scrolled
          ? "border-border bg-background/95 backdrop-blur-sm"
          : "border-transparent bg-background/0"
      }`}
    >
      <nav className="mx-auto flex h-14 max-w-[720px] items-center justify-between px-6">
        <a
          href="#top"
          className="text-sm font-medium lowercase tracking-tight text-foreground transition-colors hover:text-accent"
        >
          jawad
        </a>
        <div className="flex gap-6 text-sm lowercase text-muted">
          {sections.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className="transition-colors hover:text-accent"
            >
              {label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}
