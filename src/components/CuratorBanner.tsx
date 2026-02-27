const CuratorBanner = () => (
  <div className="w-full border-b border-border py-2" style={{ background: 'hsl(var(--card))' }}>
    <div className="container mx-auto flex items-center justify-center gap-2 text-xs text-muted-foreground">
      <span className="text-primary">✦</span>
      <span>Curated by</span>
      <a
        href="https://kalilurrahman.lovable.app"
        target="_blank"
        rel="noopener noreferrer"
        className="font-semibold text-foreground hover:text-primary transition-colors"
      >
        Kalilur Rahman
      </a>
      <span className="hidden sm:inline">—</span>
      <a
        href="https://kalilurrahman.github.io"
        target="_blank"
        rel="noopener noreferrer"
        className="hidden sm:inline hover:text-primary transition-colors"
      >
        kalilurrahman.github.io
      </a>
      <span className="hidden sm:inline">·</span>
      <a
        href="https://www.linkedin.com/in/kalilurrahman"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-primary transition-colors"
      >
        LinkedIn
      </a>
      <span>·</span>
      <a
        href="https://kalilurrahman.framer.website/"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-primary transition-colors"
      >
        Portfolio
      </a>
    </div>
  </div>
);

export default CuratorBanner;
