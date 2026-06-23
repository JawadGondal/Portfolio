import type { Metadata } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-instrument-serif",
  display: "swap",
});

export const metadata: Metadata = {
  // TODO: set this to the real production domain so the OG image and other
  // metadata resolve to absolute URLs.
  metadataBase: new URL("https://jawadgondal.vercel.app"),
  title: "Muhammad Jawad Ayub Gondal — Agentic AI Engineer",
  description:
    "Agentic AI engineer in Islamabad. I build LLM systems that take actions, not just answers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
