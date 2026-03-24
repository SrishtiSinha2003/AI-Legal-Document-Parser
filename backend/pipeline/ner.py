# pipeline/ner.py

import spacy

# Load transformer model
nlp = spacy.load("en_core_web_sm")


def extract_entities(text: str):
    doc = nlp(text)

    entities = {
        "PARTY": [],
        "DATE": [],
        "MONEY": [],
        "GPE": [],  # jurisdiction (countries, cities)
    }

    for ent in doc.ents:
        if ent.label_ in entities:
            entities[ent.label_].append(ent.text)

    return entities