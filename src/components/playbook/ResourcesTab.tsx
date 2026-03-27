import { Download, FileText, ExternalLink, BookOpen, BarChart3, FileSpreadsheet } from 'lucide-react';
import type { MasterIndexPart } from './types';
import { PART_COLORS } from './types';

interface ResourcesTabProps {
  parts?: MasterIndexPart[];
}

const extraResources = [
  {
    title: 'GCC Metrics Handbook (Interactive HTML)',
    description: 'Complete metrics reference with Zinnov waves, KPMG 8-dimension scoring, 35+ strategic indices, and case studies. Opens in browser.',
    fileUrl: '/resources/GCC_Metrics_Handbook.html',
    filename: 'GCC_Metrics_Handbook.html',
    fileSize: '~2 MB',
    icon: BarChart3,
    color: 'text-amber-400',
    borderColor: 'border-amber-500/30',
  },
  {
    title: 'KR GCC Metrics — 35+ Strategic Indices',
    description: 'KPMG 8-dimension maturity metrics with Wave 4 benchmarks and Novartis case study data.',
    fileUrl: '/resources/KR_GCC_Metrics.xlsx',
    filename: 'KR_GCC_Metrics.xlsx',
    fileSize: 'Excel',
    icon: FileSpreadsheet,
    color: 'text-emerald-400',
    borderColor: 'border-emerald-500/30',
  },
  {
    title: 'GCC 37 Metrics Benchmarks (Comprehensive)',
    description: '37 metric groups across talent, hiring, delivery, quality, value & stability — with BofA, JPMC, Optum, Novartis, AstraZeneca, Novo Nordisk columns.',
    fileUrl: '/resources/gcc_37_metrics_benchmarks_comprehensive.xlsx',
    filename: 'gcc_37_metrics_benchmarks_comprehensive.xlsx',
    fileSize: 'Excel',
    icon: FileSpreadsheet,
    color: 'text-emerald-400',
    borderColor: 'border-emerald-500/30',
  },
  {
    title: 'GCC Metrics Benchmarks (Summary)',
    description: 'Key operational benchmarks with ecosystem ranges and best-in-class targets for quick reference.',
    fileUrl: '/resources/gcc_metrics_benchmarks_1.xlsx',
    filename: 'gcc_metrics_benchmarks_1.xlsx',
    fileSize: 'Excel',
    icon: FileSpreadsheet,
    color: 'text-emerald-400',
    borderColor: 'border-emerald-500/30',
  },
];

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
          PDF &amp; Resource Downloads
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
          Download the complete playbook &amp; metrics
        </h1>
        <p className="text-muted-foreground max-w-xl mx-auto text-sm">
          All playbook parts, metrics handbooks, and Excel workbooks for offline reading, self-assessment, and sharing.
        </p>
      </div>

      {/* Download All PDFs */}
      <div className="flex justify-center mb-8">
        <button
          onClick={handleDownloadAll}
          className="gradient-bg text-white px-6 py-3 rounded-xl font-medium text-sm flex items-center gap-2 transition-all hover:shadow-lg hover:shadow-primary/20 active:scale-[0.98]"
        >
          <Download className="w-4 h-4" />
          Download all {parts.length} playbook parts
        </button>
      </div>

      {/* PDF Part Cards */}
      <h2 className="text-lg font-semibold text-foreground mb-4">📕 Playbook Parts (PDF)</h2>
      <div className="grid gap-4 mb-10">
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
                      Download
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

      {/* Metrics & Excel Resources */}
      <h2 className="text-lg font-semibold text-foreground mb-4">📊 Metrics Handbooks & Workbooks</h2>
      <div className="grid gap-4">
        {extraResources.map((res, i) => {
          const Icon = res.icon;
          return (
            <div
              key={i}
              className={`bg-card rounded-xl border ${res.borderColor} p-5 transition-all duration-200 hover:shadow-lg`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                <div className={`w-12 h-12 rounded-xl bg-muted/30 flex items-center justify-center shrink-0 ${res.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-semibold text-foreground mb-1">{res.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">{res.description}</p>
                  <div className="flex items-center gap-3">
                    <a
                      href={res.fileUrl}
                      download={res.filename}
                      className="inline-flex items-center gap-2 bg-primary/10 hover:bg-primary/20 text-primary px-4 py-2 rounded-lg text-sm font-medium transition border border-primary/20"
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </a>
                    {res.filename.endsWith('.html') && (
                      <a
                        href={res.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground px-4 py-2 rounded-lg text-sm font-medium transition border border-border hover:border-foreground/20"
                      >
                        <ExternalLink className="w-4 h-4" />
                        View in browser
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 text-center">
        <p className="text-xs text-muted-foreground">
          Curated by Kalilur Rahman ·{' '}
          <a href="https://kalilurrahman.lovable.app" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
            Portfolio
          </a>
        </p>
      </div>
    </div>
  );
}