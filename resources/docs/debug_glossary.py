"""Better glossary analysis - show pairs."""
from docx import Document

doc = Document(r'c:\Users\HP\OneDrive\Documents\GitHub\GCCLeadership\resources\docs\GCC_Playbook_Part_II_CLEAN.docx')

in_glossary = False
paras = []
for para in doc.paragraphs:
    text = para.text.strip()
    style = para.style.name if para.style else "Normal"
    if "Key Terms and Definitions" in text:
        in_glossary = True; continue
    if in_glossary:
        if "Subject Index" in text: break
        if style.startswith("Heading"): continue
        if text:  # skip empty
            paras.append(text)

print(f"Total non-empty paragraphs: {len(paras)}")
print("\nFirst 40 paras (lengths + first 80 chars):")
for i, t in enumerate(paras[:40]):
    print(f"  {i:2d}  len={len(t):4d}  {repr(t[:80])}")
