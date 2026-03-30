"""
Run this once to generate a test NDA PDF:
  python generate_test_pdf.py
"""
from fpdf import FPDF

pdf = FPDF()
pdf.add_page()
pdf.set_font("Helvetica", "B", 16)
pdf.cell(0, 10, "NON-DISCLOSURE AGREEMENT", ln=True, align="C")
pdf.ln(4)

pdf.set_font("Helvetica", "", 11)
pdf.multi_cell(0, 7,
    "This Non-Disclosure Agreement (\"Agreement\") is entered into as of January 1, 2025, "
    "by and between Acme Corp, a Delaware corporation (\"Disclosing Party\"), and Beta LLC, "
    "a California limited liability company (\"Receiving Party\")."
)
pdf.ln(4)

sections = [
    ("1. CONFIDENTIAL INFORMATION",
     "\"Confidential Information\" means any non-public information disclosed by the Disclosing Party "
     "to the Receiving Party, either directly or indirectly, in writing, orally, or by inspection of "
     "tangible objects, that is designated as confidential or that reasonably should be understood to "
     "be confidential given the nature of the information and circumstances of disclosure."),

    ("2. OBLIGATIONS OF RECEIVING PARTY",
     "The Receiving Party agrees to hold the Disclosing Party's Confidential Information in strict "
     "confidence and not to disclose it to any third party without prior written consent. The Receiving "
     "Party shall use the Confidential Information solely for evaluating a potential business relationship "
     "between the parties. This obligation shall survive termination for a period of two (2) years."),

    ("3. TERMINATION",
     "Either party may terminate this Agreement upon thirty (30) days written notice to the other party. "
     "Upon termination, the Receiving Party shall promptly return or destroy all Confidential Information "
     "and certify in writing that it has done so. Termination for cause may be effected immediately upon "
     "written notice if the other party materially breaches this Agreement and fails to cure within "
     "fifteen (15) days of receiving notice of such breach."),

    ("4. LIABILITY AND DAMAGES",
     "In no event shall either party's aggregate liability exceed the total fees paid in the six (6) months "
     "preceding the claim. A penalty of $50,000 shall be imposed for any unauthorized disclosure of "
     "Confidential Information. Neither party shall be liable for indirect, incidental, or consequential "
     "damages arising out of or related to this Agreement, even if advised of the possibility of such damages."),

    ("5. NON-COMPETE",
     "During the term of this Agreement and for a period of twelve (12) months thereafter, the Receiving "
     "Party shall not engage in any business that directly competes with the Disclosing Party in the "
     "geographic regions where the Disclosing Party currently operates, including the United States and "
     "the European Union."),

    ("6. INTELLECTUAL PROPERTY",
     "All work product, inventions, and deliverables created by the Receiving Party in the course of "
     "performing services under this Agreement shall be considered works made for hire and shall be the "
     "sole property of the Disclosing Party. The Receiving Party hereby assigns all rights, title, and "
     "interest in such work product to the Disclosing Party."),

    ("7. GOVERNING LAW",
     "This Agreement shall be governed by and construed in accordance with the laws of the State of "
     "Delaware, without regard to its conflict of law principles. Any disputes arising under this "
     "Agreement shall be resolved exclusively in the state or federal courts located in Wilmington, Delaware."),

    ("8. INDEMNIFICATION",
     "The Receiving Party shall indemnify, defend, and hold harmless the Disclosing Party and its "
     "officers, directors, employees, and agents from and against any claims, damages, losses, and "
     "expenses, including reasonable attorneys' fees, arising out of or resulting from the Receiving "
     "Party's breach of this Agreement or unauthorized use of Confidential Information."),
]

for title, body in sections:
    pdf.set_font("Helvetica", "B", 11)
    pdf.cell(0, 8, title, ln=True)
    pdf.set_font("Helvetica", "", 10)
    pdf.multi_cell(0, 6, body)
    pdf.ln(3)

pdf.set_font("Helvetica", "B", 11)
pdf.cell(0, 8, "9. ENTIRE AGREEMENT", ln=True)
pdf.set_font("Helvetica", "", 10)
pdf.multi_cell(0, 6,
    "This Agreement constitutes the entire agreement between the parties with respect to the subject "
    "matter hereof and supersedes all prior and contemporaneous agreements, understandings, negotiations, "
    "and discussions, whether oral or written, between the parties."
)

pdf.ln(10)
pdf.set_font("Helvetica", "", 10)
pdf.cell(0, 7, "IN WITNESS WHEREOF, the parties have executed this Agreement as of the date first written above.", ln=True)
pdf.ln(6)
pdf.cell(90, 7, "Acme Corp: ____________________", ln=False)
pdf.cell(0, 7, "Beta LLC: ____________________", ln=True)
pdf.cell(90, 7, "Date: January 1, 2025", ln=False)
pdf.cell(0, 7, "Date: January 1, 2025", ln=True)

pdf.output("test_docs/test_nda.pdf")
print("Generated: test_docs/test_nda.pdf")
