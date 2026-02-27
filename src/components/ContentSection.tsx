import { motion } from "framer-motion";
import type { GCCSection } from "@/data/gccData";
import GCCCard from "./GCCCard";

interface ContentSectionProps {
  section: GCCSection;
  searchQuery: string;
}

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.3, ease: [0.25, 0.1, 0.25, 1] as const },
  }),
};

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
    <section>
      <h2 className="section-title">{section.title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filteredCards.map((card, i) => (
          <motion.div
            key={card.title}
            custom={i}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
          >
            <GCCCard card={card} />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ContentSection;
