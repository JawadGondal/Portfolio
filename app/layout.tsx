import type { Metadata } from "next";
import { Playfair_Display, Outfit, Geist_Mono } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  // TODO: set this to the real production domain so the OG image and other
  // metadata resolve to absolute URLs.
  metadataBase: new URL("https://jawadgondal.vercel.app"),
  title: "Muhammad Jawad Ayub Gondal — Agentic Full-Cycle Engineer",
  description:
    "Agentic Full-Cycle Engineer in Islamabad. I take AI products from idea to deployment — agentic systems built and shipped end to end.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${outfit.variable} ${playfair.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        {/* Mark JS as available before paint so scroll-reveal can hide
            content; without JS everything stays visible. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add("js")`,
          }}
        />
      </head>
      {/* suppressHydrationWarning: browser extensions (e.g. Grammarly) inject
          attributes on <body> before React hydrates. */}
      <body className="min-h-full" suppressHydrationWarning>
        {/* Ambient background: soft lavender + teal radial glows, fixed
            behind all content. */}
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 -z-10"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 70% 10%, rgba(196,181,253,0.06) 0%, transparent 60%), radial-gradient(ellipse 40% 40% at 10% 80%, rgba(0,229,204,0.05) 0%, transparent 60%)",
          }}
        />
        {children}
      </body>
    </html>
  );
}
