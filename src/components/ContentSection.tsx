import type { GCCSection } from "@/data/gccData";
import GCCCard from "./GCCCard";

interface ContentSectionProps {
  section: GCCSection;
  searchQuery: string;
}

const ContentSection = ({ section, searchQuery }: ContentSectionProps) => {
  const query = searchQuery.toLowerCase();
  const filteredCards = query
    ? section.cards.filter(
        (c) =>
          c.title.toLowerCase().includes(query) ||
          c.description.toLowerCase().includes(query) ||
          c.tags.some((t) => t.toLowerCase().includes(query)) ||
          c.details.some((d) => d.toLowerCase().includes(query))
      )
    : section.cards;

  if (query && filteredCards.length === 0) return null;

  return (
    <section className="animate-fade-in-up">
      <h2 className="section-title">{section.title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filteredCards.map((card) => (
          <GCCCard key={card.title} card={card} />
        ))}
      </div>
    </section>
  );
};

export default ContentSection;
