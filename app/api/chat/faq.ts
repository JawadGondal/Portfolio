// Offline fallback for the portfolio assistant.
//
// When the Anthropic API is unavailable — no key configured, or the account is
// out of credit / rate-limited — we still answer from a hand-written FAQ
// (faq.json: question -> markdown answer) using lightweight keyword matching.
// No model call, no network. Edit faq.json to change the canned answers.

import faq from "./faq.json";

const STOPWORDS = new Set([
  "a", "an", "the", "is", "are", "was", "were", "be", "been", "being", "do",
  "does", "did", "doing", "has", "have", "had", "i", "you", "he", "she", "it",
  "we", "they", "me", "him", "her", "them", "his", "their", "your", "my", "to",
  "of", "in", "on", "for", "and", "or", "but", "with", "about", "what", "who",
  "how", "when", "where", "why", "which", "can", "could", "would", "should",
  "tell", "know", "want", "any", "some", "this", "that", "these", "those",
  "from", "as", "at", "by", "him", "more", "much",
]);

function tokenize(text: string): Set<string> {
  const words = text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 1 && !STOPWORDS.has(w));
  return new Set(words);
}

// Extra search terms per question, so free-text phrasings that don't share
// words with the question/answer still match (e.g. "where did he study" ->
// education). Keyed by the exact question text in faq.json. Optional — entries
// without keywords just match on their question/answer text.
const KEYWORDS: Record<string, string> = {
  "What does Jawad do?": "role profession job work occupation title",
  "Tell me about his experience":
    "career roles companies worked history background jobs employment",
  "What has he built?":
    "projects portfolio apps made created demos products work building",
  "What are his skills?":
    "tech stack technologies tools languages frameworks expertise abilities",
  "What is his educational background?":
    "education study studied university college degree school academic qualification graduated",
  "How can I contact Jawad?":
    "contact reach email connect message touch hire reach-out",
  "Is he available for work?":
    "available hiring job open freelance opportunity remote employment hire looking",
  "Where is he based?":
    "location based live city country islamabad pakistan timezone relocate",
  "What does agentic AI mean to him?":
    "agentic agents philosophy approach meaning definition believe",
};

const ENTRIES: { question: string; answer: string; tokens: Set<string> }[] =
  Object.entries(faq as Record<string, string>).map(([question, answer]) => ({
    question,
    answer,
    // Index on the question text, the answer body, and any extra keywords so a
    // query matches even when it shares words with none of the question heading.
    tokens: tokenize(`${question} ${answer} ${KEYWORDS[question] ?? ""}`),
  }));

const DEFAULT_ANSWER = `I can tell you about **Jawad** — his experience, the projects he's built, his skills, and how to reach him. Try asking one of those.

You can also email him directly at [jawadayubgondal@gmail.com](mailto:jawadayubgondal@gmail.com).`;

const normalize = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();

// Best-effort: return the closest canned answer to a free-text question.
export function faqAnswer(question: string): string {
  // Exact (normalized) match first — guarantees the suggestion chips map to
  // their intended answer regardless of keyword-overlap ties.
  const normalized = normalize(question);
  const exact = ENTRIES.find((e) => normalize(e.question) === normalized);
  if (exact) return exact.answer;

  const q = tokenize(question);
  if (q.size === 0) return DEFAULT_ANSWER;

  let best = { score: 0, answer: DEFAULT_ANSWER };
  for (const entry of ENTRIES) {
    let overlap = 0;
    for (const t of q) if (entry.tokens.has(t)) overlap += 1;
    // Normalize by the query length so short, focused questions can still win.
    const score = overlap / q.size;
    if (score > best.score) best = { score, answer: entry.answer };
  }

  // Require a minimum signal before trusting a match; otherwise stay generic.
  return best.score >= 0.3 ? best.answer : DEFAULT_ANSWER;
}

// Pull the most recent user turn out of a messages array.
export function lastUserMessage(
  messages: { role: string; content: string }[],
): string {
  for (let i = messages.length - 1; i >= 0; i--) {
    if (messages[i].role === "user") return messages[i].content;
  }
  return "";
}
