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
  const [instrumentSerif, inter] = await Promise.all([
    loadGoogleFont("Instrument+Serif", NAME),
    loadGoogleFont("Inter:wght@400", TAGLINE),
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
          background: "#fafafa",
          padding: "80px",
        }}
      >
        <div
          style={{
            fontFamily: "Instrument Serif",
            fontSize: 96,
            lineHeight: 1.0,
            letterSpacing: "-0.02em",
            color: "#141414",
            maxWidth: 900,
          }}
        >
          {NAME}
        </div>
        <div
          style={{
            fontFamily: "Inter",
            fontSize: 36,
            lineHeight: 1.4,
            color: "#565656",
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
        { name: "Instrument Serif", data: instrumentSerif, weight: 400 as const },
        { name: "Inter", data: inter, weight: 400 as const },
      ],
    },
  );
}
