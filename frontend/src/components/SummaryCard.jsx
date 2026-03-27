import { cleanText } from "../utils/text";

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
      <h2 className="summary-title">Executive summary</h2>

      {n > 0 && (
        <div className="risk-bar-wrap">
          <div className="risk-bar" role="img" aria-label="Risk distribution across clauses">
            <div
              className="risk-bar-seg seg-high"
              style={{ width: `${highPct}%` }}
              title={`${riskCounts.high} high`}
            />
            <div
              className="risk-bar-seg seg-medium"
              style={{ width: `${medPct}%` }}
              title={`${riskCounts.medium} medium`}
            />
            <div
              className="risk-bar-seg seg-low"
              style={{ width: `${lowPct}%` }}
              title={`${riskCounts.low} low`}
            />
          </div>
          <div className="risk-bar-legend">
            <span>
              <em className="dot dot-high" /> {riskCounts?.high ?? 0} High
            </span>
            <span>
              <em className="dot dot-medium" /> {riskCounts?.medium ?? 0} Medium
            </span>
            <span>
              <em className="dot dot-low" /> {riskCounts?.low ?? 0} Low
            </span>
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
