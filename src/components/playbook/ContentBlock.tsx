import type { Block } from './types';
import { TableRenderer } from './TableRenderer';
import { Info, AlertTriangle, CheckCircle, Copy, Check } from 'lucide-react';
import { useState } from 'react';

interface ContentBlockProps {
  blocks?: Block[];
  fontSize?: number;
}

function CalloutBlock({ block }: { block: Block }) {
  const styleMap: Record<string, { icon: typeof Info; classes: string }> = {
    info: { icon: Info, classes: 'border-primary/60 bg-primary/5 text-foreground' },
    warning: { icon: AlertTriangle, classes: 'border-accent/60 bg-accent/5 text-foreground' },
    success: { icon: CheckCircle, classes: 'border-emerald-500/60 bg-emerald-500/5 text-foreground' },
  };
  const s = styleMap[block.style || 'info'] || styleMap.info;
  const Icon = s.icon;

  return (
    <div className={`border-l-4 p-4 my-4 rounded-r-lg ${s.classes}`}>
      <div className="flex items-start gap-3">
        <Icon className="w-5 h-5 shrink-0 mt-0.5 opacity-70" />
        <p className="text-sm leading-relaxed font-medium">{block.text}</p>
      </div>
    </div>
  );
}

function CodeBlock({ block }: { block: Block }) {
  const [copied, setCopied] = useState(false);
  const code = block.code || block.text || '';

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative my-4 rounded-lg border border-border overflow-hidden">
      {block.language && (
        <div className="flex items-center justify-between bg-muted/50 px-4 py-1.5 border-b border-border">
          <span className="text-xs text-muted-foreground font-mono">{block.language}</span>
          <button onClick={handleCopy} className="text-muted-foreground hover:text-foreground transition p-1">
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>
      )}
      <pre className="bg-card p-4 overflow-x-auto">
        <code className="text-sm font-mono text-foreground leading-relaxed">{code}</code>
      </pre>
    </div>
  );
}

export function ContentBlocks({ blocks, fontSize = 14 }: ContentBlockProps) {
  if (!blocks?.length) return null;

  return (
    <>
      {blocks.map((b, i) => {
        const textStyle = { fontSize: `${fontSize}px` };

        switch (b.type) {
          case 'h2':
            return <h2 key={i} className="text-xl font-bold text-foreground mt-6 mb-3">{b.text}</h2>;
          case 'h3':
            return <h3 key={i} className="text-base font-semibold text-foreground mt-4 mb-2">{b.text}</h3>;
          case 'h4':
            return <h4 key={i} className="text-sm font-semibold text-muted-foreground mt-3 mb-1">{b.text}</h4>;
          case 'heading':
            if (b.level === 2) return <h2 key={i} className="text-xl font-bold text-foreground mt-6 mb-3">{b.text}</h2>;
            if (b.level === 3) return <h3 key={i} className="text-base font-semibold text-foreground mt-4 mb-2">{b.text}</h3>;
            return <h4 key={i} className="text-sm font-semibold text-muted-foreground mt-3 mb-1">{b.text}</h4>;
          case 'li':
            return <li key={i} className="text-muted-foreground leading-relaxed ml-4 list-disc" style={textStyle}>{b.text}</li>;
          case 'ul':
            return (
              <ul key={i} className="list-disc ml-6 mb-3 space-y-1">
                {(b.items || []).map((item, j) => (
                  <li key={j} className="text-muted-foreground leading-relaxed" style={textStyle}>{item}</li>
                ))}
              </ul>
            );
          case 'ol':
            return (
              <ol key={i} className="list-decimal ml-6 mb-3 space-y-1">
                {(b.items || []).map((item, j) => (
                  <li key={j} className="text-muted-foreground leading-relaxed" style={textStyle}>{item}</li>
                ))}
              </ol>
            );
          case 'quote':
            return (
              <blockquote key={i} className="border-l-4 border-primary/40 pl-4 py-2 my-4 italic text-muted-foreground">
                <p style={textStyle}>{b.text}</p>
              </blockquote>
            );
          case 'table':
            return <TableRenderer key={i} block={b} />;
          case 'callout':
            return <CalloutBlock key={i} block={b} />;
          case 'code':
            return <CodeBlock key={i} block={b} />;
          default:
            return <p key={i} className="text-muted-foreground leading-relaxed mb-3" style={textStyle}>{b.text}</p>;
        }
      })}
    </>
  );
}
