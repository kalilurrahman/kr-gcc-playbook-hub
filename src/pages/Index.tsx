import { useState, useMemo } from "react";
import CuratorBanner from "@/components/CuratorBanner";
import GCCHeader from "@/components/GCCHeader";
import GCCNav from "@/components/GCCNav";
import OverviewSection from "@/components/OverviewSection";
import ContentSection from "@/components/ContentSection";
import GCCFooter from "@/components/GCCFooter";
import InstallPrompt from "@/components/InstallPrompt";
import { sections } from "@/data/gccData";

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
    if (activeSection === "overview") return [];
    return sections.filter((s) => s.id === activeSection);
  }, [activeSection, searchQuery, isSearching]);

  const showOverview = !isSearching && activeSection === "overview";

  return (
    <div className="min-h-screen flex flex-col">
      <CuratorBanner />
      <GCCHeader searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <GCCNav activeSection={isSearching ? "" : activeSection} onSectionChange={handleSectionChange} />

      <main className="container mx-auto py-8 flex-1">
        {showOverview && <OverviewSection />}

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
          <div className="text-center py-20 animate-fade-in-up">
            <p className="text-xl text-muted-foreground">
              No results found for "{searchQuery}"
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Try different keywords or browse sections using the navigation above.
            </p>
          </div>
        )}
      </main>

      <GCCFooter />
      <InstallPrompt />
    </div>
  );
};

export default Index;
