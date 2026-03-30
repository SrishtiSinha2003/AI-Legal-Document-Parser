from dotenv import load_dotenv
load_dotenv()

import os
import tempfile
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from pipeline.ingestion import ingest_pdf
from pipeline.ner import extract_entities
from pipeline.classifier import classify_clause, risk_score
from agent.legal_agent import LegalAgent

app = FastAPI(title="Legal Document Analyzer API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

agent = LegalAgent()


@app.post("/api/analyze")
async def analyze(file: UploadFile = File(...)):
    if file.content_type != "application/pdf":
        raise HTTPException(status_code=400, detail="Only PDF files are supported.")

    with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as tmp:
        tmp.write(await file.read())
        tmp_path = tmp.name

    try:
        segments = ingest_pdf(tmp_path)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        try:
            os.unlink(tmp_path)
        except Exception:
            pass

    if segments and segments[0].get("title") == "Error":
        raise HTTPException(status_code=422, detail=segments[0]["text"])

    classified = []
    risk_counts = {"high": 0, "medium": 0, "low": 0}

    for seg in segments:
        text = seg["text"]
        entities_raw = extract_entities(text)
        category = classify_clause(text)
        risk = risk_score(category, entities_raw).lower()

        risk_counts[risk] = risk_counts.get(risk, 0) + 1

        # Build risk_flags from entity signals
        flags = []
        if entities_raw.get("MONEY"):
            flags.append(f"Monetary amount: {', '.join(entities_raw['MONEY'][:2])}")
        if entities_raw.get("DATE"):
            flags.append(f"Date reference: {', '.join(entities_raw['DATE'][:2])}")
        if risk == "high":
            flags.append("High-risk clause — review carefully")

        # Build entity list for display
        entities_list = []
        for label, values in entities_raw.items():
            for val in values:
                entities_list.append({"label": label, "text": val})

        classified.append({
            "title": seg.get("title", "Section"),
            "text": text,
            "category": category,
            "risk": risk,
            "risk_flags": flags,
            "entities": entities_list,
        })

    summary = agent.summarize(classified)

    return {
        "filename": file.filename,
        "total_clauses": len(classified),
        "risk_counts": risk_counts,
        "summary": summary,
        "segments": classified,
    }


class ChatRequest(BaseModel):
    question: str
    context: str = ""


@app.post("/api/chat")
async def chat(req: ChatRequest):
    if not req.question.strip():
        raise HTTPException(status_code=400, detail="Question cannot be empty.")
    answer = agent.chat(req.question, req.context)
    return {"answer": answer}


@app.get("/api/health")
def health():
    return {"status": "ok"}
