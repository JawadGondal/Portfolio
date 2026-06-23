"use client";

import { useEffect, useRef, useState } from "react";
import { ChatIcon, CloseIcon, SendIcon } from "./icons";

type Message = { role: "user" | "assistant"; content: string };

const SUGGESTIONS = [
  "What does Jawad do?",
  "Tell me about his experience",
  "What has he built?",
];

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages, open]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const next: Message[] = [...messages, { role: "user", content: trimmed }];
    setMessages([...next, { role: "assistant", content: "" }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });

      if (!res.ok || !res.body) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error ?? "Request failed");
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setMessages([...next, { role: "assistant", content: acc }]);
      }
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : "Something went wrong.";
      setMessages([...next, { role: "assistant", content: `⚠️ ${msg}` }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Launcher button */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close chat" : "Ask about Jawad"}
        className="fixed bottom-5 right-5 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-primary/40 bg-card/90 text-primary shadow-lg backdrop-blur-md transition-all hover:bg-primary/10 sm:bottom-6 sm:right-6"
      >
        {open ? (
          <CloseIcon className="h-5 w-5" />
        ) : (
          <ChatIcon className="h-5 w-5" />
        )}
      </button>

      {/* Panel */}
      {open && (
        <div className="fixed bottom-20 right-5 z-50 flex h-[min(70vh,520px)] w-[min(92vw,380px)] flex-col overflow-hidden rounded-xl border border-border bg-card/95 shadow-2xl backdrop-blur-md sm:right-6">
          <header className="border-b border-border px-4 py-3">
            <p className="font-serif text-base text-foreground">
              Ask about Jawad
            </p>
            <p className="font-mono text-[11px] text-muted-foreground">
              AI assistant · answers from his profile
            </p>
          </header>

          <div
            ref={scrollRef}
            className="flex-1 space-y-3 overflow-y-auto px-4 py-4"
          >
            {messages.length === 0 && (
              <div className="flex flex-col gap-3">
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Hi! I can tell you about Jawad&apos;s experience, projects,
                  and skills. Ask me anything.
                </p>
                <div className="flex flex-col gap-2">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => send(s)}
                      className="rounded-md border border-border px-3 py-2 text-left text-sm text-foreground/80 transition-colors hover:border-primary/40 hover:text-primary"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((m, i) => (
              <div
                key={i}
                className={
                  m.role === "user" ? "flex justify-end" : "flex justify-start"
                }
              >
                <div
                  className={`max-w-[85%] whitespace-pre-wrap rounded-lg px-3 py-2 text-sm leading-relaxed ${
                    m.role === "user"
                      ? "bg-primary/15 text-foreground"
                      : "border border-border bg-foreground/[0.03] text-foreground/90"
                  }`}
                >
                  {m.content ||
                    (loading && i === messages.length - 1 ? "…" : "")}
                </div>
              </div>
            ))}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex items-center gap-2 border-t border-border p-3"
          >
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question…"
              maxLength={2000}
              className="min-w-0 flex-1 rounded-md border border-border bg-background/60 px-3 py-2 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary/40"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              aria-label="Send"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-primary/40 text-primary transition-all hover:bg-primary/10 disabled:opacity-40"
            >
              <SendIcon className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
