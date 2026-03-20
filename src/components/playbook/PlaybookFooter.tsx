import type { MasterIndex } from './types';

interface PlaybookFooterProps {
  masterIndex?: MasterIndex | null;
  onNavigatePart?: (partNumber: number) => void;
}

export function PlaybookFooter({ masterIndex, onNavigatePart }: PlaybookFooterProps) {
  const branding = masterIndex?.branding;

  return (
    <footer className="border-t border-border mt-16 bg-card">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full gradient-bg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xs">KR</span>
              </div>
              <span className="font-bold text-foreground text-sm">Kalilur Rahman</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {branding?.authorTitle || 'Global IT Executive · AI Evangelist · Technologist · GCC Leader'}
            </p>
          </div>

          {/* Playbook */}
          <div>
            <h3 className="font-semibold text-foreground text-sm mb-3">Playbook</h3>
            <ul className="space-y-2 text-xs">
              {masterIndex?.parts.map(part => (
                <li key={part.partNumber}>
                  <button
                    onClick={() => onNavigatePart?.(part.partNumber)}
                    className="text-muted-foreground hover:text-primary transition"
                  >
                    Part {part.partNumber}: {part.title.replace(/^Part \w+:\s*/, '')}
                  </button>
                </li>
              ))}
              <li>
                <a href="/playbook" className="text-muted-foreground hover:text-primary transition">
                  Download PDFs
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-foreground text-sm mb-3">Resources</h3>
            <ul className="space-y-2 text-xs">
              <li>
                <a href={branding?.portfolioUrl || 'https://kalilurrahman.lovable.app'} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition">
                  Portfolio
                </a>
              </li>
              <li>
                <a href={branding?.githubUrl || 'https://github.com/kalilurrahman'} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition">
                  GitHub
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/kalilurrahman" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="https://kaggle.com/kalilurrahman" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition">
                  Kaggle
                </a>
              </li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="font-semibold text-foreground text-sm mb-3">About</h3>
            <ul className="space-y-2 text-xs">
              <li><span className="text-muted-foreground">Open Access Resource</span></li>
              <li><span className="text-muted-foreground">143 Chapters · 3 Parts</span></li>
              <li><span className="text-muted-foreground">2026–2030 Edition</span></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-6 text-center">
          <p className="text-xs text-muted-foreground">
            © 2026 Kalilur Rahman. Open Access Resource. Made with ❤️ for the Global GCC Community.
          </p>
        </div>
      </div>
    </footer>
  );
}
