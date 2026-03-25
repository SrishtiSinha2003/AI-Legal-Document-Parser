from pipeline.ingestion import ingest_pdf
from pipeline.ner import extract_entities
from pipeline.classifier import classify_clause, risk_score
from agent.legal_agent import LegalAgent

if __name__ == "__main__":
    path = "test_docs/sample_nda.pdf"

    segments = ingest_pdf(path)

    # ✅ Initialize agent
    agent = LegalAgent()

    if segments and segments[0]["title"] == "Error":
        print("❌", segments[0]["text"])
        exit()
    
    print("\n📂 ANALYSIS OUTPUT:\n")

    # 🔹 Main NDA analysis (Day 3 + Day 4 combined)
    for i, seg in enumerate(segments):
        text = seg["text"]

        # Day 3 pipeline
        entities = extract_entities(text)
        clause_type = classify_clause(text)
        risk = risk_score(clause_type, entities)

        # 🔥 Day 4 additions
        comparison = agent._tool_compare_clause(text)
        if risk == "High" or "Deviation" in comparison:
            suggestion = agent._tool_suggest_redline(text)
        else:
            suggestion = "Clause appears safe"
        print(f"\n🔹 {i+1}. {seg['title']}")
        print(f"Type: {clause_type}")
        print(f"Risk: {risk}")
        print(f"Entities: {entities}")

        print("\n📊 Comparison:")
        print(comparison)

        print("\n✏️ Suggestion:")
        print(suggestion)

        print("-" * 60)

    # 🧪 Test cases (KEEP THIS — very important for marks)
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

        # Day 4 agent
        comparison = agent._tool_compare_clause(clause)
        suggestion = agent._tool_suggest_redline(clause)

        print(f"\nClause: {clause}")
        print(f"Type: {clause_type}")
        print(f"Risk: {risk}")
        print(f"Entities: {entities}")

        print("\n📊 Comparison:")
        print(comparison)

        print("\n✏️ Suggestion:")
        print(suggestion)

        print("-" * 60)