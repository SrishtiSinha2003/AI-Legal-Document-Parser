# pipeline/classifier.py

def classify_clause(text: str):
    text = text.lower()

    if "confidential" in text:
        return "Confidentiality"

    elif "terminate" in text or "termination" in text:
        return "Termination"

    elif "liability" in text or "damages" in text or "penalty" in text or "breach" in text:
        return "Liability"

    elif "law" in text or "jurisdiction" in text:
        return "Jurisdiction"

    elif "indemnify" in text:
        return "Indemnity"

    else:
        return "Other"

def risk_score(clause_type: str, entities: dict):

    # High risk → money involved in liability
    if clause_type == "Liability" and entities.get("MONEY"):
        return "High"

    # Medium risk → jurisdiction clause
    if clause_type == "Jurisdiction" and entities.get("GPE"):
        return "Medium"

    # Low risk → confidentiality
    if clause_type == "Confidentiality":
        return "Low"

    return "Low"