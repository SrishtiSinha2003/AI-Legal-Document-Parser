# ⚖️ AI Legal Document Analyzer

An AI-powered system that analyzes legal contracts (focused on NDAs) to extract key clauses, identify risks, and provide intelligent explanations using NLP and LLMs.

---

## Problem Statement

Startups, freelancers, and small businesses often sign legal contracts without fully understanding the risks.

- 💸 Legal review costs **$5,000–$15,000 per contract**
- ⚠️ Leads to:
  - High financial burden  
  - Delays in decision-making  
  - Risk of signing unfavorable clauses  

---

## 🎯 Solution

This project builds an **AI-driven document intelligence system** that:

- 📄 Parses NDA documents (PDF)
- 🧠 Extracts entities and clauses
- ⚖️ Identifies potential risks
- 🤖 Provides conversational explanations
- 📊 Visualizes insights via frontend

---

## 🧱 System Architecture

```
PDF Upload → PyMuPDF → Text Segmentation → NER (spaCy) → Clause Classification (CUAD) → Risk Engine → LLM (LangChain) → React UI
```

---

## ✨ Features

### 🔍 Document Processing
- Upload NDA (PDF)
- Extract text using **PyMuPDF**
- Segment into logical clauses (Regex + LLM fallback)

### 🧠 NLP & AI
- Named Entity Recognition using **spaCy**
- Clause classification using **CUAD dataset**
- Risk scoring engine (Low / Medium / High)

### 🤖 AI Assistant
- Ask questions like:
  - “What are my risks?”
  - “Summarize this contract”
  - “What happens if I terminate?”

### 📊 Frontend Visualization
- Clause-wise breakdown
- Risk heatmap
- Interactive chatbot interface

---

## 📂 Project Structure

```
AI-Legal-Document-Parser/
│── backend/              # Main backend (FastAPI + ML pipeline)
│── frontend/             # React frontend
│
│── day1/                 # Project planning & architecture
│── day2/                 # Document ingestion pipeline
│── day3/                 # (Upcoming) NER extraction
│
│── README.md
```

---

## ⚙️ Tech Stack

### 🧠 Backend
- Python  
- FastAPI  
- PyMuPDF  
- spaCy  
- Groq API (LLM)  
- LangChain  

### 🎨 Frontend
- React  
- JavaScript  
- Tailwind / CSS  

---

## ▶️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/SrishtiSinha2003/AI-Legal-Document-Parser.git
cd AI-Legal-Document-Parser
```

---

### 2. Setup Backend

```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
```

---

### 3. Add Environment Variables

Create a `.env` file:

```
API_KEY=your_api_key_here
```

---

### 4. Run Backend

```bash
uvicorn main:app --reload
```

---

### 5. Run Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 🧠 Key Learnings

- Hybrid systems (rule-based + LLM) improve robustness  
- Legal documents are highly unstructured  
- LLMs help in handling ambiguity in parsing  

---

## 🚀 Future Enhancements

- Support for multiple contract types  
- Fine-tuned legal LLM  
- Clause rewriting suggestions  
- Integration with e-sign platforms  

---


## ⭐ If you like this project

Give it a ⭐ on GitHub!
