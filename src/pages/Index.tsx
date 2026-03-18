import { useState, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import CuratorBanner from "@/components/CuratorBanner";
import GCCHeader from "@/components/GCCHeader";
import OverviewSection from "@/components/OverviewSection";
import ContentSection from "@/components/ContentSection";
import ResourcesExplorer from "@/components/ResourcesExplorer";
import GCCFooter from "@/components/GCCFooter";
import InstallPrompt from "@/components/InstallPrompt";
import PlaybookBanner from "@/components/PlaybookBanner";
import PlaybookNavCard from "@/components/PlaybookNavCard";
import { sections } from "@/data/gccData";

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] as const } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.2, ease: [0.25, 0.1, 0.25, 1] as const } },
};

const Index = () => {
  const [activeSection, setActiveSection] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSectionChange = (id: string) => {
    setActiveSection(id);
    setSearchQuery("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const isSearching = searchQuery.trim().length > 0;

  const visibleSections = useMemo(() => {
    if (isSearching) {
      const q = searchQuery.toLowerCase();
      return sections.filter((s) =>
        s.cards.some(
          (c) =>
            c.title.toLowerCase().includes(q) ||
            c.description.toLowerCase().includes(q) ||
            c.tags.some((t) => t.toLowerCase().includes(q)) ||
            c.details.some((d) => d.toLowerCase().includes(q))
        )
      );
    }
    if (activeSection === "overview" || activeSection === "resources") return [];
    return sections.filter((s) => s.id === activeSection);
  }, [activeSection, searchQuery, isSearching]);

  const showOverview = !isSearching && activeSection === "overview";
  const showResources = !isSearching && activeSection === "resources";
  const contentKey = isSearching ? `search-${searchQuery}` : activeSection;

  return (
    <div className="min-h-screen flex flex-col">
      <PlaybookBanner variant="inline" />
      <CuratorBanner />
      <GCCHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeSection={isSearching ? "" : activeSection}
        onSectionChange={handleSectionChange}
      />

      <main className="container mx-auto py-6 px-4 flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={contentKey}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {showOverview && <OverviewSection />}

            {showResources && <ResourcesExplorer />}

            {visibleSections.length > 0 && (
              <div className="space-y-12">
                {visibleSections.map((section) => (
                  <ContentSection
                    key={section.id}
                    section={section}
                    searchQuery={searchQuery}
                  />
                ))}
              </div>
            )}

            {isSearching && visibleSections.length === 0 && (
              <div className="text-center py-20">
                <p className="text-xl text-muted-foreground">
                  No results found for "{searchQuery}"
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Try different keywords or browse sections using the navigation above.
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Playbook download banner above footer */}
      <div className="container mx-auto px-4 pb-8">
        <PlaybookBanner variant="hero" />
      </div>

      <GCCFooter />
      <InstallPrompt />
    </div>
  );
};

export default Index;
