import { useState, useRef, useEffect } from "react";
import { API_BASE } from "../config";
import { cleanText } from "../utils/text";

const SUGGESTED = [
  "What is the liability cap in this document?",
  "Are there any non-compete restrictions?",
  "What is the governing law?",
  "Summarize the termination conditions.",
  "Which clauses are most risky for me as a founder?",
];

export default function ChatPanel({ context }) {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "I've reviewed your contract context. Ask about clauses, risks, or what language means in practice.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const send = async (question) => {
    const q = question || input.trim();
    if (!q) return;
    setInput("");
    setMessages((m) => [...m, { role: "user", text: q }]);
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: q, context }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        const d = data.detail;
        const err =
          typeof d === "string" ? d : Array.isArray(d) ? d.map((x) => x?.msg).join("; ") : res.statusText;
        throw new Error(err || "Request failed");
      }
      const answer = data.answer ?? "No response.";
      setMessages((m) => [...m, { role: "assistant", text: answer }]);
    } catch (e) {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          text:
            e?.message ||
            "Could not reach the API. Is the backend running on port 8000?",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-panel">
      <div className="chat-messages">
        {messages.map((msg, i) => (
          <div key={i} className={`msg msg-${msg.role}`}>
            <span className="msg-avatar" aria-hidden="true">
              {msg.role === "assistant" ? "◆" : "●"}
            </span>
            <div className="msg-bubble">{cleanText(msg.text)}</div>
          </div>
        ))}
        {loading && (
          <div className="msg msg-assistant">
            <span className="msg-avatar" aria-hidden="true">
              ◆
            </span>
            <div className="msg-bubble msg-typing" aria-label="Typing">
              <span />
              <span />
              <span />
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div className="chat-suggestions">
        {SUGGESTED.map((s, i) => (
          <button key={i} type="button" className="suggestion-chip" onClick={() => send(s)}>
            {s}
          </button>
        ))}
      </div>

      <div className="chat-input-row">
        <input
          className="chat-input"
          type="text"
          placeholder="Ask about a clause, risk, or wording…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && send()}
          disabled={loading}
          aria-label="Message"
        />
        <button
          type="button"
          className="chat-send"
          onClick={() => send()}
          disabled={loading || !input.trim()}
        >
          Send
        </button>
      </div>
    </div>
  );
}
