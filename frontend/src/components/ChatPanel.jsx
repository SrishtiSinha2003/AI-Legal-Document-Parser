import { useState, useRef, useEffect } from "react";
import { API_BASE } from "../config";
import { cleanText } from "../utils/text";

const SUGGESTED = [
  "What is the liability cap?",
  "Any non-compete restrictions?",
  "What is the governing law?",
  "Summarize termination conditions.",
  "Riskiest clauses for a founder?",
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
        const err = typeof d === "string" ? d : Array.isArray(d) ? d.map((x) => x?.msg).join("; ") : res.statusText;
        throw new Error(err || "Request failed");
      }
      setMessages((m) => [...m, { role: "assistant", text: data.answer ?? "No response." }]);
    } catch (e) {
      setMessages((m) => [...m, { role: "assistant", text: e?.message || "Could not reach the API. Is the backend running on port 8000?" }]);
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => setMessages([{
    role: "assistant",
    text: "Chat cleared. Ask me anything about the document.",
  }]);

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
            <span className="msg-avatar" aria-hidden="true">◆</span>
            <div className="msg-bubble msg-typing" aria-label="Typing">
              <span /><span /><span />
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div className="chat-suggestions">
        {SUGGESTED.map((s, i) => (
          <button key={i} type="button" className="suggestion-chip" onClick={() => send(s)} disabled={loading}>
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
          maxLength={500}
        />
        {input.length > 0 && (
          <span className="chat-char-count" aria-hidden="true">{input.length}/500</span>
        )}
        <button
          type="button"
          className="chat-send"
          onClick={() => send()}
          disabled={loading || !input.trim()}
          aria-label="Send message"
        >
          <svg viewBox="0 0 20 20" fill="none" width="18" height="18">
            <path d="M2 10l16-8-6 8 6 8-16-8z" fill="currentColor" />
          </svg>
        </button>
        <button
          type="button"
          className="chat-clear"
          onClick={clearChat}
          disabled={loading}
          aria-label="Clear chat"
          title="Clear chat"
        >
          <svg viewBox="0 0 20 20" fill="none" width="16" height="16">
            <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
}
