import { Download, FileText } from "lucide-react";

const PlaybookBanner = ({ variant = "inline" }: { variant?: "inline" | "hero" }) => {
  if (variant === "hero") {
    return (
      <div className="rounded-xl border border-primary/20 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 p-6 sm:p-8 text-center space-y-3">
        <FileText className="w-8 h-8 text-primary mx-auto" />
        <h3 className="text-lg font-bold text-foreground">📘 GCC Playbook v0.9</h3>
        <p className="text-sm text-muted-foreground max-w-xl mx-auto">
          Download the complete GCC Playbook — frameworks, checklists, and strategies for every phase of your GCC journey.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <a
            href="/GCC_Playbook_v_0.9.pdf"
            download="GCC_Playbook_v0.9.pdf"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium gradient-bg text-white hover:opacity-90 transition-opacity no-underline"
          >
            <Download className="w-4 h-4" />
            Download Playbook (PDF)
          </a>
           <a
            href="/GCC_Resources_URLs.txt"
            download="GCC_Resources_URLs.txt"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium border border-border bg-card text-foreground hover:bg-muted/50 transition-colors no-underline"
          >
            <Download className="w-4 h-4" />
            Download Resource List (TXT)
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center gap-2 py-2 px-4 text-xs text-muted-foreground border-b border-border" style={{ background: 'hsl(var(--card))' }}>
      <FileText className="w-3.5 h-3.5 text-primary" />
      <span>📘 GCC Playbook v0.9 available —</span>
      <a
        href="/GCC_Playbook_v_0.9.pdf"
        download="GCC_Playbook_v0.9.pdf"
        className="font-medium text-primary hover:underline no-underline"
      >
        Download PDF
      </a>
    </div>
  );
};

export default PlaybookBanner;
