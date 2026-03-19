import { Download, FileText, ExternalLink, BookOpen } from 'lucide-react';
import type { ResourceDoc } from './types';

const DEFAULT_RESOURCES: ResourceDoc[] = [
  {
    id: 'part1-pdf',
    title: 'GCC Playbook Part I',
    filename: 'GCC_Playbook_Part_I_v1_5.pdf',
    description: 'India\'s GCC landscape, maturity models, operating models, challenges, KPIs, community & ecosystem. 62 chapters covering the complete foundation.',
    pages: '200+',
    fileSize: '4.8 MB',
    fileUrl: '/resources/GCC_Playbook_Part_I_v1_5.pdf',
    version: '1.5',
    lastUpdated: 'March 2026',
    partColor: 'blue',
  },
  {
    id: 'part2-pdf',
    title: 'GCC Playbook Part II',
    filename: 'GCC_Playbook_Part_II_v1_0.pdf',
    description: 'AI & automation, deep tech, M&A playbooks, finance & accounting, ESG frameworks, and advanced operating models. 66 chapters on the strategic frontier.',
    pages: '180+',
    fileSize: '1.1 MB',
    fileUrl: '/resources/GCC_Playbook_Part_II_v1_0.pdf',
    version: '1.0',
    lastUpdated: 'March 2026',
    partColor: 'purple',
  },
  {
    id: 'part3-pdf',
    title: 'GCC Playbook Part III',
    filename: 'GCC_Playbook_Part_III_v1_0.pdf',
    description: 'The 2030 frontier — future scenarios, emerging technology impact, regulatory evolution, and the next decade of GCC strategy. 15 chapters.',
    pages: '80+',
    fileSize: '842 KB',
    fileUrl: '/resources/GCC_Playbook_Part_III_v1_0.pdf',
    version: '1.0',
    lastUpdated: 'March 2026',
    partColor: 'emerald',
  },
];

const COLOR_MAP: Record<string, { badge: string; border: string; icon: string }> = {
  blue: { badge: 'bg-blue-500/10 text-blue-400 border-blue-500/20', border: 'border-blue-500/30 hover:border-blue-500/60', icon: 'text-blue-400' },
  purple: { badge: 'bg-purple-500/10 text-purple-400 border-purple-500/20', border: 'border-purple-500/30 hover:border-purple-500/60', icon: 'text-purple-400' },
  emerald: { badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20', border: 'border-emerald-500/30 hover:border-emerald-500/60', icon: 'text-emerald-400' },
};

interface ResourcesTabProps {
  resources?: ResourceDoc[];
}

export function ResourcesTab({ resources }: ResourcesTabProps) {
  const docs = resources && resources.length > 0 ? resources : DEFAULT_RESOURCES;

  const handleDownloadAll = () => {
    docs.forEach((doc, i) => {
      setTimeout(() => {
        const a = document.createElement('a');
        a.href = doc.fileUrl;
        a.download = doc.filename;
        a.click();
      }, i * 500);
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-medium px-4 py-1.5 rounded-full mb-4 border border-primary/20">
          <Download className="w-3.5 h-3.5" />
          PDF Downloads
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
          Download the complete playbook
        </h1>
        <p className="text-muted-foreground max-w-xl mx-auto text-sm">
          All three parts available as PDF for offline reading, printing, and sharing.
          The complete India GCC reference for 2026–2030.
        </p>
      </div>

      {/* Download All button */}
      <div className="flex justify-center mb-8">
        <button
          onClick={handleDownloadAll}
          className="gradient-bg text-white px-6 py-3 rounded-xl font-medium text-sm flex items-center gap-2 transition-all hover:shadow-lg hover:shadow-primary/20 active:scale-[0.98]"
        >
          <Download className="w-4 h-4" />
          Download all {docs.length} parts
        </button>
      </div>

      {/* Resource cards */}
      <div className="grid gap-4">
        {docs.map(doc => {
          const colors = COLOR_MAP[doc.partColor] || COLOR_MAP.blue;
          return (
            <div
              key={doc.id}
              className={`bg-card rounded-xl border ${colors.border} p-6 transition-all duration-200 hover:shadow-lg`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                {/* Icon */}
                <div className={`w-14 h-14 rounded-xl bg-muted/30 flex items-center justify-center shrink-0 ${colors.icon}`}>
                  <BookOpen className="w-7 h-7" />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-foreground">{doc.title}</h3>
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full border shrink-0 ${colors.badge}`}>
                      v{doc.version}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">{doc.description}</p>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground mb-4">
                    <span className="flex items-center gap-1">
                      <FileText className="w-3.5 h-3.5" />
                      {doc.pages} pages
                    </span>
                    <span>•</span>
                    <span>{doc.fileSize}</span>
                    <span>•</span>
                    <span>Updated {doc.lastUpdated}</span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3">
                    <a
                      href={doc.fileUrl}
                      download={doc.filename}
                      className="inline-flex items-center gap-2 bg-primary/10 hover:bg-primary/20 text-primary px-4 py-2 rounded-lg text-sm font-medium transition border border-primary/20"
                    >
                      <Download className="w-4 h-4" />
                      Download PDF
                    </a>
                    <a
                      href={doc.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground px-4 py-2 rounded-lg text-sm font-medium transition border border-border hover:border-foreground/20"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Open in browser
                    </a>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Metadata footer */}
      <div className="mt-8 text-center">
        <p className="text-xs text-muted-foreground">
          All files are PDF format. Total download size ~6.7 MB.
          <br />
          Curated by Kalilur Rahman · <a href="https://kalilurrahman.lovable.app" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Portfolio</a>
        </p>
      </div>
    </div>
  );
}
