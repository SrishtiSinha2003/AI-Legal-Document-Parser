from pipeline.ingestion import ingest_pdf
from pipeline.ner import extract_entities
from pipeline.classifier import classify_clause, risk_score


if __name__ == "__main__":
    path = "test_docs/sample_nda.pdf"

    segments = ingest_pdf(path)

    print("\n📂 ANALYSIS OUTPUT:\n")

    # 🔹 Main NDA analysis
    for i, seg in enumerate(segments):
        text = seg["text"]

        entities = extract_entities(text)
        clause_type = classify_clause(text)
        risk = risk_score(clause_type, entities)

        print(f"\n🔹 {i+1}. {seg['title']}")
        print(f"Type: {clause_type}")
        print(f"Risk: {risk}")
        print(f"Entities: {entities}")
        print("-" * 50)

    # ✅ ADD TEST CASES HERE (outside loop)
    print("\n🧪 TEST CASES:\n")

    test_clauses = [
        "This agreement shall be governed by the laws of California.",
        "A penalty of $10,000 shall be imposed for breach of contract.",
        "The agreement will remain valid until 31 December 2025."
    ]

    for clause in test_clauses:
        entities = extract_entities(clause)
        clause_type = classify_clause(clause)
        risk = risk_score(clause_type, entities)

        print(f"\nClause: {clause}")
        print(f"Type: {clause_type}")
        print(f"Risk: {risk}")
        print(f"Entities: {entities}")
        print("-" * 50)