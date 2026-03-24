# 📄 AI Legal Analyzer  
## 📅 Day 2 – Document Ingestion & Skeleton Pipeline

---

## 🎯 Objective

The objective of Day 2 is to build a **working document ingestion pipeline** that:

- Extracts text from NDA PDFs  
- Segments the document into logical sections  
- Uses a hybrid approach (**Regex + LLM fallback**) for robust parsing  

---

## ⚙️ System Pipeline

```
PDF Upload → PyMuPDF Extraction → Regex Segmentation → LLM Fallback → Structured Output
```

---

## 🧠 Approach

### 🔹 1. PDF Text Extraction
- Library: **PyMuPDF (fitz)**
- Extracts raw text from all pages of the PDF

---

### 🔹 2. Regex-Based Segmentation
- Uses pattern matching to identify section headings:
  - Numbered headings (e.g., `1. Definitions`)
  - Section/Article formats
  - ALL CAPS headings  

- Filters out noisy headings like:
  - SIGNATURE  
  - DATE  
  - PAGE  

---

### 🔹 3. LLM-Based Fallback

- Triggered when regex segmentation is weak (less than expected sections)
- Uses **OpenAI API** to:
  - Identify section boundaries  
  - Return structured JSON output  

---

## 🛠️ Technologies Used

- Python  
- PyMuPDF  
- Regex (`re` module)  
- OPENAI API (LLM) 
- FastAPI (optional)  

---

## 📂 Project Structure (Day 2 Snapshot)

```
day2/
│── backend_snapshot/
│     ├── pipeline/
│     │     ├── ingestion.py
│     ├── main.py
│     ├── test_docs/
│     │     ├── sample_nda.pdf
│     ├── requirements.txt
│── README.md
```

---

## ▶️ How to Run

### 1. Navigate to backend

```bash
cd backend_snapshot
```

### 2. Create virtual environment (optional)

```bash
python -m venv venv
venv\Scripts\activate
```

### 3. Install dependencies

```bash
pip install -r requirements.txt
```

### 4. Add API Key

Create a `.env` file:

```
API_KEY=your_api_key_here
```

---

### 5. Run the script

```bash
python main.py
```

---

## 📊 Sample Output

```
[ingestion] Regex weak → using LLM segmentation...



## ✅ Key Achievements

- Successfully extracted text from real NDA PDF  
- Implemented regex-based segmentation  
- Added intelligent LLM fallback mechanism  
- Generated structured clause-wise output  
- Built a working end-to-end ingestion pipeline  

---

## ⚠️ Challenges Faced

- Handling noisy headings (e.g., SIGNATURE, PAGE numbers)  
- Regex limitations on unstructured documents  
- Ensuring valid JSON output from LLM responses  

---

## 🧠 Learnings

- Hybrid systems (rule-based + AI) are more robust  
- Legal documents vary in structure  
- LLMs help handle ambiguity in parsing  

---

## 🚀 Next Step

➡️ Day 3: Implement **Named Entity Recognition (NER)** using spaCy to extract:
- Parties  
- Dates  
- Jurisdiction  

---

## 💡 Demo Explanation

> “We implemented a hybrid segmentation pipeline where regex handles structured documents efficiently, and an LLM fallback ensures accurate segmentation for unstructured contracts.”