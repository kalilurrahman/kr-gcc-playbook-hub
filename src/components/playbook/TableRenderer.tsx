import type { Block } from './types';

interface TableRendererProps {
  block: Block;
}

export function TableRenderer({ block }: TableRendererProps) {
  const { headers = [], rows = [] } = block;
  if (!headers.length) return null;

  return (
    <div className="overflow-x-auto my-6 rounded-lg border border-border shadow-sm">
      <table className="min-w-full border-collapse">
        <thead>
          <tr className="bg-primary text-primary-foreground">
            {headers.map((header, i) => (
              <th
                key={i}
                className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider border-b-2 border-primary/80 whitespace-nowrap"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              className={`transition-colors ${
                i % 2 === 0 ? 'bg-card' : 'bg-muted/30'
              } hover:bg-muted/50`}
            >
              {headers.map((header, j) => (
                <td
                  key={j}
                  className={`px-4 py-3 border-b border-border text-sm text-foreground leading-relaxed ${
                    j === 0 ? 'font-medium' : ''
                  }`}
                >
                  {row[header] || ''}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
