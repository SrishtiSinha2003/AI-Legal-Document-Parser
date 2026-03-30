import { cleanText } from "../utils/text";

function RiskScore({ riskCounts, total }) {
  if (!total) return null;
  const score = Math.round(
    100 - ((riskCounts?.high || 0) * 3 + (riskCounts?.medium || 0)) / total * 15
  );
  const clamped = Math.max(0, Math.min(100, score));
  const color = clamped >= 70 ? "#059669" : clamped >= 45 ? "#d97706" : "#dc2626";
  const label = clamped >= 70 ? "Low Risk" : clamped >= 45 ? "Moderate" : "High Risk";
  const r = 20, circ = 2 * Math.PI * r;
  const dash = circ * (1 - clamped / 100);
  return (
    <div className="risk-score-wrap" title={`Overall risk score: ${clamped}/100`}>
      <svg width="64" height="64" viewBox="0 0 48 48">
        <circle cx="24" cy="24" r={r} fill="none" stroke="rgba(28,25,23,0.1)" strokeWidth="4" />
        <circle cx="24" cy="24" r={r} fill="none" stroke={color} strokeWidth="4"
          strokeLinecap="round" strokeDasharray={circ}
          strokeDashoffset={dash} transform="rotate(-90 24 24)"
          style={{ transition: "stroke-dashoffset 0.8s ease" }} />
        <text x="24" y="27" textAnchor="middle" fontSize="10" fontWeight="700" fill={color}>{clamped}</text>
      </svg>
      <span className="risk-score-label" style={{ color }}>{label}</span>
    </div>
  );
}

export default function SummaryCard({ summary, riskCounts, totalClauses }) {
  const n = totalClauses || 0;
  const highPct = n ? Math.round(((riskCounts?.high || 0) / n) * 100) : 0;
  const medPct = n ? Math.round(((riskCounts?.medium || 0) / n) * 100) : 0;
  const lowPct = n ? Math.max(0, 100 - highPct - medPct) : 0;

  const paras = cleanText(summary || "")
    .split("\n")
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <div className="summary-card">
      <div className="summary-card-header">
        <h2 className="summary-title">Executive summary</h2>
        <RiskScore riskCounts={riskCounts} total={n} />
      </div>

      {n > 0 && (
        <div className="risk-bar-wrap">
          <div className="risk-stats">
            <div className="risk-stat risk-stat-high">
              <span className="risk-stat-num">{riskCounts?.high ?? 0}</span>
              <span className="risk-stat-lbl">High</span>
            </div>
            <div className="risk-stat risk-stat-medium">
              <span className="risk-stat-num">{riskCounts?.medium ?? 0}</span>
              <span className="risk-stat-lbl">Medium</span>
            </div>
            <div className="risk-stat risk-stat-low">
              <span className="risk-stat-num">{riskCounts?.low ?? 0}</span>
              <span className="risk-stat-lbl">Low</span>
            </div>
            <div className="risk-stat">
              <span className="risk-stat-num">{n}</span>
              <span className="risk-stat-lbl">Total</span>
            </div>
          </div>
          <div className="risk-bar" role="img" aria-label="Risk distribution across clauses">
            <div className="risk-bar-seg seg-high" style={{ width: `${highPct}%` }} title={`${riskCounts?.high} high`} />
            <div className="risk-bar-seg seg-medium" style={{ width: `${medPct}%` }} title={`${riskCounts?.medium} medium`} />
            <div className="risk-bar-seg seg-low" style={{ width: `${lowPct}%` }} title={`${riskCounts?.low} low`} />
          </div>
        </div>
      )}

      <div className="summary-body">
        {paras.length > 0 ? (
          paras.map((para, i) => <p key={i}>{para}</p>)
        ) : (
          <p className="summary-empty">No summary returned.</p>
        )}
      </div>

      <div className="summary-footer">
        <span>
          This is an AI-assisted first-pass review. Always consult qualified legal counsel before
          signing.
        </span>
      </div>
    </div>
  );
}
