import json
with open(r'c:\Users\HP\OneDrive\Documents\GitHub\GCCLeadership\pwa\public\data\content.json', encoding='utf-8') as f:
    d = json.load(f)
print('Stats:', json.dumps(d['stats'], indent=2))
print('Parts:')
for k, v in d['parts'].items():
    if v and 'chapters' in v:
        n = len(v['chapters'])
        title = v['title']
        print(f'  {k}: {n} chapters - {title}')
print('Glossary terms:', len(d.get('glossary', [])))
for t in d.get('glossary', [])[:5]:
    print(f"  {t['term']}: {t['definition'][:60]}")
p1_chs = d['parts']['part1']['chapters']
if p1_chs:
    ch = p1_chs[0]
    print(f"First Part I chapter: {ch['title']}")
    print(f"  Sections: {len(ch.get('sections', []))}")
    print(f"  Direct content: {len(ch.get('content', []))} paras")
    if ch.get('content'):
        print(f"  First para: {ch['content'][0][:120]}")
