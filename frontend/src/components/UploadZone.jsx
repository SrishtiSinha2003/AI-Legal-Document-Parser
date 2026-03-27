import { useRef, useState } from "react";

export default function UploadZone({ onUpload, loading, error }) {
  const inputRef = useRef();
  const [dragging, setDragging] = useState(false);

  const handle = (file) => {
    if (file && file.type === "application/pdf") onUpload(file);
  };

  return (
    <div className="upload-wrapper">
      <div
        className={`upload-zone ${dragging ? "dragging" : ""} ${loading ? "uploading" : ""}`}
        onClick={() => !loading && inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          handle(e.dataTransfer.files[0]);
        }}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if ((e.key === "Enter" || e.key === " ") && !loading) {
            e.preventDefault();
            inputRef.current?.click();
          }
        }}
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
            <div className="spinner" />
            <p className="upload-label">Analyzing document…</p>
            <p className="upload-sub">Extracting text, entities, and risk scores</p>
          </div>
        ) : (
          <div className="upload-idle">
            <div className="upload-icon-wrap" aria-hidden="true">
              <svg className="upload-svg" viewBox="0 0 48 48" fill="none">
                <path
                  d="M24 8v24M16 20l8-8 8 8M14 36h20"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <p className="upload-label">
              Drop a PDF here or <span className="upload-browse">browse</span>
            </p>
            <p className="upload-sub">NDAs, MSAs, employment agreements, and similar contracts</p>
          </div>
        )}
      </div>
      {error && (
        <div className="error-bar" role="alert">
          {error}
        </div>
      )}
    </div>
  );
}
