# 📄 AI Legal Analyzer  
## 📅 Day 4 – Template Comparison & Agent Orchestration

---

## 🎯 Objective

The objective of Day 4 is to integrate all components into a unified pipeline and enhance the system with:

- Semantic clause comparison  
- Deviation detection  
- AI-generated redline suggestions  
- Conversational analysis  

---

## ⚙️ System Pipeline

```
PDF → Ingestion → Segmentation → NER → Classification → Vector DB → Comparison → LLM → Output
```

---

## 🧠 Approach

### 🔹 1. Vector Database (ChromaDB)

- Stored gold-standard legal clauses (templates)
- Used **sentence embeddings** (MiniLM model)
- Enabled **semantic similarity search**

---

### 🔹 2. Semantic Clause Comparison

- Each clause is converted into embeddings  
- Compared against stored templates  
- Most similar clause is retrieved  

- Deviation detection:
  - Similarity ≥ 0.80 → Safe  
  - Similarity < 0.80 → Deviation detected  

---

### 🔹 3. LangChain Agent

The system uses a modular agent that orchestrates:

- Clause comparison  
- Risk summarization  
- Redline suggestion generation  

---

### 🔹 4. LLM-based Redline Suggestions

- Uses Groq LLM  
- Generates:
  - Safer clause wording  
  - Plain-English explanations  
  - Justification for changes  

---

### 🔹 5. Optimization for Stability

- LLM calls are made **only for high-risk or deviating clauses**
- Prevents API rate limits  
- Ensures smooth execution  

---

## 🛠️ Technologies Used

- Python  
- ChromaDB  
- Sentence Transformers  
- LangChain  
- Groq API (LLM)  

---

## 📂 Project Structure (Day 4 Snapshot)

```
day4/
│── backend_snapshot/
│     ├── agent/
│     │     ├── legal_agent.py
│     ├── pipeline/
│     │     ├── ingestion.py
│     │     ├── ner.py
│     │     ├── classifier.py
│     ├── chroma_db/
│     ├── main.py
│     ├── requirements.txt
│── README.md
```

---

## ▶️ How to Run

```bash
cd backend_snapshot
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python main.py
```

---

## 📊 Sample Output

### 🔹 Clause Analysis

```
Clause: A penalty of $10,000 shall be imposed for breach of contract.

Type: Liability  
Risk: High  

Comparison:
Deviation detected from standard liability clause

Suggestion:
Limit liability to a reasonable amount such as fees paid in the last 6 months.

Explanation:
This reduces financial exposure and aligns with industry standards.
```

---

## ✅ Key Achievements

- Integrated full NLP pipeline with agent-based orchestration  
- Implemented semantic similarity using vector database  
- Detected clause deviations automatically  
- Generated AI-powered redline suggestions  
- Optimized system to avoid API rate limits  

---

## ⚠️ Challenges Faced

- API rate limits due to multiple LLM calls  
- Handling semantic similarity thresholds  
- Ensuring clean and readable output  

---

## 🧠 Learnings

- Vector databases enable better comparison than keyword matching  
- LLMs enhance usability through explanations and suggestions  
- Optimization is crucial for real-world systems  

---

## 🚀 Conclusion

The system successfully integrates NLP, vector search, and LLM capabilities to create a complete AI-powered legal analysis pipeline capable of detecting risks and suggesting improvements.

---

## 🔜 Next Step

➡️ Day 5: Build frontend (React UI + risk heatmap + chatbot)