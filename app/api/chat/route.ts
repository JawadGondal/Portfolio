import Anthropic from "@anthropic-ai/sdk";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { SYSTEM_PROMPT } from "./profile";

// Public, billed-to-your-key endpoint — keep it cheap and abuse-resistant:
// Haiku 4.5, a tight output cap, bounded input, and a light per-IP rate limit.
const MODEL = "claude-haiku-4-5";
const MAX_TOKENS = 800;
const MAX_MESSAGES = 20;
const MAX_CHARS_PER_MESSAGE = 2000;

const RATE_LIMIT = 20; // requests
const RATE_WINDOW_MS = 5 * 60_000; // per 5 minutes

// Prefer a global Upstash limiter when configured (works across serverless
// instances). Falls back to a best-effort in-memory limiter for local dev or
// when Upstash env vars are absent.
const upstash =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? new Ratelimit({
        redis: Redis.fromEnv(),
        limiter: Ratelimit.slidingWindow(RATE_LIMIT, "5 m"),
        prefix: "portfolio-chat",
      })
    : null;

const hits = new Map<string, { count: number; resetAt: number }>();

function inMemoryLimited(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || now > entry.resetAt) {
    hits.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > RATE_LIMIT;
}

async function rateLimited(ip: string): Promise<boolean> {
  if (upstash) {
    const { success } = await upstash.limit(ip);
    return !success;
  }
  return inMemoryLimited(ip);
}

type ChatMessage = { role: "user" | "assistant"; content: string };

function isValidMessages(value: unknown): value is ChatMessage[] {
  return (
    Array.isArray(value) &&
    value.length > 0 &&
    value.length <= MAX_MESSAGES &&
    value.every(
      (m): m is ChatMessage =>
        !!m &&
        typeof m === "object" &&
        ((m as ChatMessage).role === "user" ||
          (m as ChatMessage).role === "assistant") &&
        typeof (m as ChatMessage).content === "string" &&
        (m as ChatMessage).content.length <= MAX_CHARS_PER_MESSAGE,
    )
  );
}

export async function POST(request: Request) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return Response.json(
      { error: "Chat is not configured." },
      { status: 503 },
    );
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown";
  if (await rateLimited(ip)) {
    return Response.json(
      { error: "Too many requests. Please try again in a few minutes." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON." }, { status: 400 });
  }

  const messages = (body as { messages?: unknown })?.messages;
  if (!isValidMessages(messages)) {
    return Response.json({ error: "Invalid messages." }, { status: 400 });
  }

  const client = new Anthropic();

  // Stream the model's reply back as plain text chunks.
  const encoder = new TextEncoder();
  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        const llm = client.messages.stream({
          model: MODEL,
          max_tokens: MAX_TOKENS,
          system: SYSTEM_PROMPT,
          messages,
        });

        llm.on("text", (delta) => {
          controller.enqueue(encoder.encode(delta));
        });

        await llm.finalMessage();
        controller.close();
      } catch (err) {
        console.error("Chat stream error:", err);
        // If nothing has been sent yet, surface a short message to the client.
        try {
          controller.enqueue(
            encoder.encode("Sorry — something went wrong. Please try again."),
          );
        } catch {
          // stream already closed
        }
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
