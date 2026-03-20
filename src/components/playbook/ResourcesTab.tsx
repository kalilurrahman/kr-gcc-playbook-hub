import { Download, FileText, ExternalLink, BookOpen } from 'lucide-react';
import type { MasterIndexPart } from './types';
import { PART_COLORS } from './types';

interface ResourcesTabProps {
  parts?: MasterIndexPart[];
}

export function ResourcesTab({ parts }: ResourcesTabProps) {
  if (!parts?.length) return null;

  const handleDownloadAll = () => {
    parts.forEach((part, i) => {
      setTimeout(() => {
        const a = document.createElement('a');
        a.href = part.pdfResource.fileUrl;
        a.download = part.pdfResource.filename;
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

      {/* Download All */}
      <div className="flex justify-center mb-8">
        <button
          onClick={handleDownloadAll}
          className="gradient-bg text-white px-6 py-3 rounded-xl font-medium text-sm flex items-center gap-2 transition-all hover:shadow-lg hover:shadow-primary/20 active:scale-[0.98]"
        >
          <Download className="w-4 h-4" />
          Download all {parts.length} parts
        </button>
      </div>

      {/* Cards */}
      <div className="grid gap-4">
        {parts.map(part => {
          const colors = PART_COLORS[part.partNumber] || PART_COLORS[1];
          return (
            <div
              key={part.partNumber}
              className={`bg-card rounded-xl border ${colors.border} p-6 transition-all duration-200 hover:shadow-lg`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                <div className={`w-14 h-14 rounded-xl bg-muted/30 flex items-center justify-center shrink-0 ${colors.text}`}>
                  <BookOpen className="w-7 h-7" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-foreground">{part.title}</h3>
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full border shrink-0 ${colors.badge}`}>
                      v{part.pdfResource.version || '1.0'}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">{part.subtitle}</p>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground mb-4">
                    <span className="flex items-center gap-1">
                      <FileText className="w-3.5 h-3.5" />
                      {part.pdfResource.pages} pages
                    </span>
                    <span>•</span>
                    <span>{part.pdfResource.fileSize}</span>
                    <span>•</span>
                    <span>Chapters {part.chapterRange.start}–{part.chapterRange.end}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <a
                      href={part.pdfResource.fileUrl}
                      download={part.pdfResource.filename}
                      className="inline-flex items-center gap-2 bg-primary/10 hover:bg-primary/20 text-primary px-4 py-2 rounded-lg text-sm font-medium transition border border-primary/20"
                    >
                      <Download className="w-4 h-4" />
                      Download PDF
                    </a>
                    <a
                      href={part.pdfResource.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground px-4 py-2 rounded-lg text-sm font-medium transition border border-border hover:border-foreground/20"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Open
                    </a>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 text-center">
        <p className="text-xs text-muted-foreground">
          All files are PDF format. Curated by Kalilur Rahman ·{' '}
          <a href="https://kalilurrahman.lovable.app" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
            Portfolio
          </a>
        </p>
      </div>
    </div>
  );
}
