# 📄 AI Legal Analyzer  
## 📅 Day 3 – Legal NER & Clause Classification

---

## 🎯 Objective

The objective of Day 3 is to implement the **core analytical pipeline** of the system:

- Extract legal entities from contract clauses  
- Classify clauses into legal categories  
- Assign a preliminary risk score  

---

## ⚙️ System Pipeline

```
Clause → spaCy NER → Clause Classification → Risk Scoring
```

---

## 🧠 Approach

### 🔹 1. Named Entity Recognition (NER)

- Library: **spaCy (en_core_web_sm)**
- Extracts:
  - PARTY (custom mapping)
  - DATE
  - MONEY
  - GPE (Jurisdiction)

---

### 🔹 2. Clause Classification

- Rule-based classification aligned with **CUAD categories**
- Detects:
  - Confidentiality  
  - Termination  
  - Liability  
  - Jurisdiction  
  - Indemnity  

---

### 🔹 3. Risk Scoring

- Based on clause type and extracted entities:

| Clause Type | Condition | Risk |
|------------|----------|------|
| Liability | MONEY present | High |
| Jurisdiction | GPE present | Medium |
| Confidentiality | Default | Low |

---

## 🛠️ Technologies Used

- Python  
- spaCy  
- Rule-based NLP  
- CUAD-inspired classification  

---

## 📂 Project Structure (Day 3 Snapshot)

```
day3/
│── backend_snapshot/
│     ├── pipeline/
│     │     ├── ingestion.py
│     │     ├── ner.py
│     │     ├── classifier.py
│     ├── main.py
│     ├── test_docs/
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

### 🔹 NDA Analysis

```
🔹 Obligations of Receiving Party
Type: Confidentiality
Risk: Low
Entities: {'DATE': [], 'MONEY': [], 'GPE': []}
```

---

### 🧪 Test Case Output

```
Clause: This agreement shall be governed by the laws of California.
Type: Jurisdiction
Risk: Medium
Entities: {'GPE': ['California']}

Clause: A penalty of $10,000 shall be imposed for breach of contract.
Type: Liability
Risk: High
Entities: {'MONEY': ['10,000']}

Clause: The agreement will remain valid until 31 December 2025.
Entities: {'DATE': ['31 December 2025']}
```

---

## ✅ Key Achievements

- Implemented spaCy-based entity extraction  
- Classified clauses using CUAD-inspired logic  
- Built risk scoring system  
- Successfully detected:
  - Jurisdiction (California)  
  - Monetary penalties ($10,000)  
  - Dates  

---

## ⚠️ Challenges Faced

- NDAs often lack explicit entities  
- spaCy base model limitations  
- Mapping legal semantics using rule-based logic  

---

## 🧠 Learnings

- Legal NLP requires domain-specific heuristics  
- Hybrid systems (rules + AI) improve accuracy  
- Real-world contracts are highly unstructured  

---

## 🚀 Next Step

➡️ Day 4: Build **API + Frontend integration (React dashboard + chatbot)**

---

## 💡 Demo Explanation

> “We implemented a legal NER pipeline using spaCy to extract critical entities such as jurisdiction and monetary penalties, and combined it with CUAD-inspired classification to assign risk scores to clauses.”