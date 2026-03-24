from pipeline.ingestion import ingest_pdf

if __name__ == "__main__":
    path = "test_docs/sample_nda.pdf"

    segments = ingest_pdf(path)

    print("\n📂 SEGMENTED OUTPUT:\n")

    for i, seg in enumerate(segments):
        print(f"\n🔹 {i+1}. {seg['title']}")
        print(seg['text'][:200], "...\n")