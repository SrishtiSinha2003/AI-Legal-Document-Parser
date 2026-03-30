import { useState } from "react";

const RISK_COLOR = {
  high: { bg: "rgba(185, 28, 28, 0.08)", border: "#b91c1c", dot: "#b91c1c", label: "High" },
  medium: { bg: "rgba(180, 83, 9, 0.1)", border: "#b45309", dot: "#d97706", label: "Medium" },
  low: { bg: "rgba(5, 122, 85, 0.1)", border: "#047857", dot: "#059669", label: "Low" },
};

function ClauseCard({ segment, index }) {
  const [expanded, setExpanded] = useState(false);
  const r = RISK_COLOR[segment.risk] || RISK_COLOR.low;

  return (
    <article
      className={`clause-card ${expanded ? "clause-card-expanded" : ""}`}
      style={{ borderLeftColor: r.border, background: r.bg }}
    >
      <button
        type="button"
        className="clause-card-trigger"
        onClick={() => setExpanded((x) => !x)}
        aria-expanded={expanded}
      >
        <div className="clause-header">
          <div className="clause-meta">
            <span className="clause-num">{String(index + 1).padStart(2, "0")}</span>
            <span className="clause-title">{segment.title || "Section"}</span>
            <span className="clause-category">{segment.category}</span>
          </div>
          <div className="clause-right">
            {segment.risk_flags?.length > 0 && (
              <span className="flag-count" title={segment.risk_flags.join(", ")}>
                ⚑ {segment.risk_flags.length}
              </span>
            )}
            <span className="risk-badge" style={{ background: r.dot }}>
              {r.label}
            </span>
            <span className="expand-icon" aria-hidden="true">
              {expanded ? "−" : "+"}
            </span>
          </div>
        </div>
      </button>

      <div className={`clause-body-wrap ${expanded ? "clause-body-open" : ""}`}>
        <div className="clause-body">
          <p className="clause-text">{segment.text}</p>

          {segment.risk_flags?.length > 0 && (
            <div className="flags-section">
              <p className="flags-label">Risk flags</p>
              <ul>
                {segment.risk_flags.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            </div>
          )}

          {segment.entities?.length > 0 && (
            <div className="entities-section">
              <p className="flags-label">Detected entities</p>
              <div className="entity-chips">
                {segment.entities.map((e, i) => (
                  <span key={i} className="entity-chip">
                    <em>{e.label}</em> {e.text}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

export default function RiskHeatmap({ segments }) {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = segments
    .filter((s) => filter === "all" || s.risk === filter)
    .filter((s) => !search || (s.title + " " + s.text + " " + s.category)
      .toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="heatmap">
      <div className="heatmap-controls">
        {["all", "high", "medium", "low"].map((f) => (
          <button
            key={f}
            type="button"
            className={`filter-btn ${filter === f ? "filter-active" : ""}`}
            onClick={() => setFilter(f)}
          >
            {f === "all" ? "All" : f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
        <div className="heatmap-search-wrap">
          <svg className="heatmap-search-icon" viewBox="0 0 16 16" fill="none">
            <circle cx="6.5" cy="6.5" r="4.5" stroke="currentColor" strokeWidth="1.4"/>
            <path d="M10 10l3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
          </svg>
          <input
            className="heatmap-search"
            type="text"
            placeholder="Search clauses…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search clauses"
          />
          {search && (
            <button className="heatmap-search-clear" onClick={() => setSearch("")} aria-label="Clear search">×</button>
          )}
        </div>
        <span className="heatmap-count">{filtered.length} shown</span>
      </div>

      <div className="clause-list">
        {filtered.length === 0 ? (
          <p className="heatmap-empty">No clauses match this filter.</p>
        ) : (
          filtered.map((seg, i) => <ClauseCard key={i} segment={seg} index={i} />)
        )}
      </div>
    </div>
  );
}
