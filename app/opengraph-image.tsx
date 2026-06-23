import { ImageResponse } from "next/og";

export const alt =
  "Muhammad Jawad Ayub Gondal — I build LLM systems that take actions, not just answers.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const NAME = "Muhammad Jawad Ayub Gondal";
const TAGLINE = "I build LLM systems that take actions, not just answers.";

// Fetch only the glyphs we render. Node's fetch does not advertise woff2
// support, so Google returns a TTF that Satori (next/og) can use.
async function loadGoogleFont(family: string, text: string) {
  const url = `https://fonts.googleapis.com/css2?family=${family}&text=${encodeURIComponent(
    text,
  )}`;
  const css = await (await fetch(url)).text();
  const src = css.match(
    /src: url\((.+?)\) format\('(?:opentype|truetype)'\)/,
  );
  if (!src) throw new Error(`Failed to load font: ${family}`);
  return (await fetch(src[1])).arrayBuffer();
}

export default async function Image() {
  const [playfair, outfit] = await Promise.all([
    loadGoogleFont("Playfair+Display:wght@900", NAME),
    loadGoogleFont("Outfit:wght@400", TAGLINE),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          background: "#07070f",
          backgroundImage:
            "radial-gradient(ellipse 60% 50% at 75% 15%, rgba(196,181,253,0.16) 0%, transparent 60%), radial-gradient(ellipse 45% 45% at 10% 85%, rgba(0,229,204,0.12) 0%, transparent 60%)",
          padding: "80px",
        }}
      >
        <div
          style={{
            fontFamily: "Playfair Display",
            fontSize: 92,
            fontWeight: 900,
            lineHeight: 1.0,
            letterSpacing: "-0.02em",
            color: "#e8e8f2",
            maxWidth: 960,
          }}
        >
          {NAME}
        </div>
        <div
          style={{
            fontFamily: "Outfit",
            fontSize: 34,
            lineHeight: 1.4,
            color: "#7070a0",
            marginTop: 28,
            maxWidth: 820,
          }}
        >
          {TAGLINE}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Playfair Display", data: playfair, weight: 900 as const },
        { name: "Outfit", data: outfit, weight: 400 as const },
      ],
    },
  );
}
