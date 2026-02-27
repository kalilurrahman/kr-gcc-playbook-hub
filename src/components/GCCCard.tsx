import { useState } from "react";
import type { GCCCard as GCCCardType } from "@/data/gccData";

interface GCCCardProps {
  card: GCCCardType;
}

const GCCCard = ({ card }: GCCCardProps) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="card-gcc animate-fade-in-up">
      <div className="icon-box mb-4">{card.icon}</div>
      <h3 className="text-lg font-semibold text-primary mb-2">{card.title}</h3>
      <p className="text-sm text-muted-foreground mb-3">{card.description}</p>
      <div className="flex flex-wrap gap-2 mb-3">
        {card.tags.map((tag) => (
          <span key={tag} className="tag-pill">{tag}</span>
        ))}
      </div>
      <button
        className="expand-button"
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? "Show Less" : "View Details"}
      </button>
      {expanded && (
        <ul className="mt-4 space-y-2 animate-fade-in-up">
          {card.details.map((detail, i) => {
            const colonIdx = detail.indexOf(":");
            const hasColon = colonIdx > 0 && colonIdx < 50;
            return (
              <li key={i} className="text-sm text-muted-foreground leading-relaxed">
                {hasColon ? (
                  <>
                    <strong className="text-foreground">{detail.slice(0, colonIdx)}:</strong>
                    {detail.slice(colonIdx + 1)}
                  </>
                ) : detail}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default GCCCard;
