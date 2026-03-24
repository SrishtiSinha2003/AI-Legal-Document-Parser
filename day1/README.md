*** 📅 Day 1 – Project Planning & Architecture ***

Problem Statement

Startups, freelancers, and small businesses frequently sign legal contracts—especially Non-Disclosure Agreements (NDAs)—without fully understanding the risks.

- 💸 Manual legal review costs $5,000–$15,000 per contract
- ⚠️ This leads to:
    - High financial burden
    - Delays in business decisions
    - Risk of signing harmful clauses

🎯 Goal

Build an AI-powered document intelligence system that:

- Automatically analyzes NDAs
- Extracts key entities and clauses
- Highlights risks visually
- Provides conversational explanations

📦 Project Scope (MVP)

To ensure feasibility and accuracy:

- 📄 Only Non-Disclosure Agreements (NDAs)
- 🌐 Only English-language PDFs
- 🔍 Clause detection limited to:
    - Confidentiality
    - Termination
    - Liability
    - Jurisdiction

✨ Features
🔍 Core Features
- Upload NDA (PDF)
- Extract text using PyMuPDF
- Identify entities (Parties, Dates, Jurisdiction) using spaCy
- Classify clauses using CUAD dataset + ML
- Risk scoring system (Low / Medium / High)

🤖 AI Assistant
- Conversational chatbot (LangChain-based)
- Example queries:
    - “What are my risks?”
    - “Summarize this NDA”
    - “What happens if I terminate?”

📊 Frontend Visualization
- Risk heatmap of clauses
- Clause-wise breakdown
- Highlighted document view

🏗️ System Architecture
Document Upload → PyMuPDF → spaCy NER → Clause Classification → Risk Engine → LangChain → React UI

🧩 Component Breakdown
📄 1. Ingestion Layer
Tool: PyMuPDF
Converts PDF → raw structured text

🧠 2. NLP Layer
Tool: spaCy
Extracts:
Parties
Dates
Locations
Legal terms

⚖️ 3. Clause Classification Layer
Dataset: CUAD (Contract Understanding Atticus Dataset)
Identifies clause types

🚨 4. Risk Engine
Hybrid approach (Rule-based + ML):
Missing clause → High risk
One-sided clause → Medium/High risk

🤖 5. Conversational AI Layer
Tool: LangChain
Enables:
Context-aware Q&A
Clause explanations

🌐 6. Frontend Layer
Framework: React
Displays:
Risk heatmap
Clause insights
Chatbot interface

✅ Summary

Day 1 focused on defining a clear problem, feasible scope, and scalable architecture for building an AI-powered legal document analyzer.

🚀 Next Step

➡️ Day 2: Implement document ingestion pipeline using PyMuPDF + Regex + LLM fallback