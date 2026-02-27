import { useState, useMemo } from "react";
import { Download, ExternalLink, Search } from "lucide-react";
import { allResources, resourceCategories, resourcesByCategory } from "@/data/resourcesData";

const ResourcesExplorer = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch] = useState("");

  const tabs = useMemo(() => ["All", ...resourceCategories], []);

  const filtered = useMemo(() => {
    let list = activeTab === "All" ? allResources : (resourcesByCategory[activeTab] || []);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(r => r.name.toLowerCase().includes(q) || r.category.toLowerCase().includes(q) || r.type.toLowerCase().includes(q));
    }
    return list;
  }, [activeTab, search]);

  return (
    <section className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="section-title mb-1">📚 Resource Library</h2>
          <p className="text-sm text-muted-foreground">{allResources.length} curated resources across {resourceCategories.length} categories</p>
        </div>
        <a
          href="/GCC_Resources_Consolidated.csv"
          download="GCC_Resources_Consolidated.csv"
          className="expand-button inline-flex items-center gap-2 no-underline w-fit"
        >
          <Download className="w-4 h-4" />
          Download CSV
        </a>
      </div>

      {/* Category tabs */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
              activeTab === tab
                ? "gradient-bg text-white"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/50 border border-border"
            }`}
          >
            {tab} {tab === "All" ? `(${allResources.length})` : `(${resourcesByCategory[tab]?.length || 0})`}
          </button>
        ))}
      </div>

      {/* Search within resources */}
      <div className="relative max-w-md">
        <input
          type="text"
          className="search-input-gcc w-full pr-8 py-2 text-sm"
          placeholder="Filter resources..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <Search className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
      </div>

      {/* Resource list */}
      <div className="space-y-2">
        {filtered.length === 0 && (
          <p className="text-center py-8 text-muted-foreground">No resources found.</p>
        )}
        {filtered.map((r, i) => (
          <a
            key={`${r.url}-${i}`}
            href={r.url}
            target="_blank"
            rel="noopener noreferrer"
            className="card-gcc flex items-start gap-3 !p-4 group"
          >
            <ExternalLink className="w-4 h-4 mt-0.5 shrink-0 text-primary opacity-60 group-hover:opacity-100 transition-opacity" />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors truncate">{r.name}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="tag-pill !text-[10px] !px-2 !py-0.5">{r.category}</span>
                <span className="text-[10px] text-muted-foreground">{r.type}</span>
              </div>
            </div>
          </a>
        ))}
      </div>

      {filtered.length > 0 && (
        <p className="text-xs text-muted-foreground text-center pt-4">
          Showing {filtered.length} of {allResources.length} resources
        </p>
      )}
    </section>
  );
};

export default ResourcesExplorer;
