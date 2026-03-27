import { useState, useMemo, useCallback } from "react";
import UploadZone from "./components/UploadZone";
import SummaryCard from "./components/SummaryCard";
import RiskHeatmap from "./components/RiskHeatmap";
import ChatPanel from "./components/ChatPanel";
import ExportButton from "./components/ExportButton";
import { API_BASE } from "./config";

function buildChatContext(data) {
  if (!data) return "";
  const head = data.summary || "";
  const clips = (data.segments || [])
    .slice(0, 8)
    .map((s) => `[${s.category}] ${(s.text || "").slice(0, 500)}`);
  return [head, ...clips].filter(Boolean).join("\n\n");
}

export default function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const chatContext = useMemo(() => buildChatContext(data), [data]);

  const onUpload = useCallback(async (file) => {
    setError(null);
    setLoading(true);
    setData(null);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch(`${API_BASE}/api/analyze`, {
        method: "POST",
        body: formData,
      });
      const payload = await res.json().catch(() => ({}));
      if (!res.ok) {
        const d = payload.detail;
        const msg =
          typeof d === "string"
            ? d
            : Array.isArray(d)
              ? d.map((x) => x?.msg || JSON.stringify(x)).join("; ")
              : res.statusText || "Analysis failed";
        throw new Error(msg);
      }
      setData(payload);
    } catch (e) {
      setError(e.message || "Could not analyze the document.");
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <div className="app">
      <div className="app-bg" aria-hidden="true" />

      <header className="app-header">
        <div className="app-header-inner">
          <div className="brand">
            <span className="brand-mark" aria-hidden="true" />
            <div>
              <p className="brand-kicker">Contract intelligence</p>
              <h1 className="brand-title">Legal Document Analyzer</h1>
            </div>
          </div>
          <p className="brand-tagline">
            Upload a PDF to extract clauses, score risk, and ask questions in plain English.
          </p>
        </div>
      </header>

      <main className="app-main">
        <section className="panel panel-upload" aria-labelledby="upload-heading">
          <h2 id="upload-heading" className="sr-only">
            Upload document
          </h2>
          <UploadZone onUpload={onUpload} loading={loading} error={error} />
        </section>

        {data && (
          <>
            <div className="report-toolbar">
              <p className="report-filename">{data.filename}</p>
              <ExportButton />
            </div>

            <div id="report" className="report">
              <SummaryCard
                summary={data.summary}
                riskCounts={data.risk_counts}
                totalClauses={data.total_clauses}
              />

              <section className="clauses-wrap" aria-labelledby="clauses-heading">
                <div className="section-head">
                  <h2 id="clauses-heading">Clause review</h2>
                  <p className="section-sub">
                    {data.total_clauses} segments — filter by risk and expand for full text.
                  </p>
                </div>
                <RiskHeatmap segments={data.segments || []} />
              </section>
            </div>

            <section className="panel panel-chat" aria-labelledby="chat-heading">
              <div className="section-head">
                <h2 id="chat-heading">Ask the assistant</h2>
                <p className="section-sub">
                  Questions use your summary and top clauses as context.
                </p>
              </div>
              <ChatPanel context={chatContext} />
            </section>
          </>
        )}
      </main>

      <footer className="app-footer">
        <p>
          AI-assisted first pass only — not legal advice. Consult qualified counsel before you
          sign.
        </p>
      </footer>
    </div>
  );
}
