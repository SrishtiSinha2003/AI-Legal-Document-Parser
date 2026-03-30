import { useRef, useState } from "react";

export default function UploadZone({ onUpload, loading, error }) {
  const inputRef = useRef();
  const [dragging, setDragging] = useState(false);
  const [fileName, setFileName] = useState(null);

  const handle = (file) => {
    if (file && file.type === "application/pdf") {
      setFileName(file.name);
      onUpload(file);
    }
  };

  const formatSize = (bytes) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="upload-wrapper">
      <div
        className={`upload-zone ${dragging ? "dragging" : ""} ${loading ? "uploading" : ""}`}
        onClick={() => !loading && inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => { e.preventDefault(); setDragging(false); handle(e.dataTransfer.files[0]); }}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => { if ((e.key === "Enter" || e.key === " ") && !loading) { e.preventDefault(); inputRef.current?.click(); } }}
        aria-busy={loading}
        aria-label="Upload PDF contract"
      >
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,application/pdf"
          className="upload-input-hidden"
          onChange={(e) => handle(e.target.files?.[0])}
        />
        {loading ? (
          <div className="upload-loading">
            <div className="upload-progress-ring">
              <svg viewBox="0 0 44 44" fill="none">
                <circle cx="22" cy="22" r="18" stroke="var(--border)" strokeWidth="3" />
                <circle cx="22" cy="22" r="18" stroke="var(--accent)" strokeWidth="3"
                  strokeLinecap="round" strokeDasharray="113" strokeDashoffset="28"
                  className="progress-arc" />
              </svg>
            </div>
            <p className="upload-label">Analyzing document…</p>
            {fileName && <p className="upload-filename">{fileName}</p>}
            <p className="upload-sub">Extracting text, entities, and risk scores</p>
          </div>
        ) : (
          <div className="upload-idle">
            <div className="upload-icon-wrap" aria-hidden="true">
              <svg className="upload-svg" viewBox="0 0 48 48" fill="none">
                <path d="M24 8v24M16 20l8-8 8 8M14 36h20"
                  stroke="currentColor" strokeWidth="2.2"
                  strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            {fileName ? (
              <>
                <p className="upload-label upload-ready">✓ Ready to re-analyze</p>
                <p className="upload-filename">{fileName}</p>
              </>
            ) : (
              <p className="upload-label">
                Drop a PDF here or <span className="upload-browse">browse</span>
              </p>
            )}
            <p className="upload-sub">NDAs, MSAs, employment agreements, and similar contracts</p>
          </div>
        )}
      </div>
      {error && <div className="error-bar" role="alert">⚠ {error}</div>}
    </div>
  );
}
