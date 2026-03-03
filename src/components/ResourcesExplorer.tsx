import { useState, useMemo } from "react";
import { Download, ExternalLink, Search, ChevronDown, ChevronRight } from "lucide-react";
import { allResources, resourceCategories, resourcesByCategory } from "@/data/resourcesData";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

const ResourcesExplorer = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch] = useState("");
  const [collapsedCategories, setCollapsedCategories] = useState<Set<string>>(new Set());

  const tabs = useMemo(() => ["All", ...resourceCategories], []);

  const filtered = useMemo(() => {
    let list = activeTab === "All" ? allResources : (resourcesByCategory[activeTab] || []);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(r => r.name.toLowerCase().includes(q) || r.category.toLowerCase().includes(q) || r.type.toLowerCase().includes(q));
    }
    return list;
  }, [activeTab, search]);

  // Group by category for display
  const groupedResources = useMemo(() => {
    const groups: Record<string, typeof filtered> = {};
    filtered.forEach(r => {
      if (!groups[r.category]) groups[r.category] = [];
      groups[r.category].push(r);
    });
    return Object.entries(groups).sort(([a], [b]) => a.localeCompare(b));
  }, [filtered]);

  const activeCount = activeTab === "All" ? allResources.length : (resourcesByCategory[activeTab]?.length || 0);
  const showGrouped = activeTab === "All" || search.trim().length > 0;

  const toggleCategory = (cat: string) => {
    setCollapsedCategories(prev => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat);
      else next.add(cat);
      return next;
    });
  };

  const isPdf = (url: string) => url.toLowerCase().endsWith('.pdf') || url.includes('/pdf/');

  return (
    <section className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="section-title mb-1">📚 Resource Library</h2>
          <p className="text-sm text-muted-foreground">{allResources.length} curated resources across {resourceCategories.length} categories</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <a
            href="/GCC_Playbook_v_0.9.pdf"
            download="GCC_Playbook_v0.9.pdf"
            className="expand-button inline-flex items-center gap-2 no-underline w-fit"
          >
            <Download className="w-4 h-4" />
            Playbook PDF
          </a>
          <a
            href="/GCC_Resources_URLs.txt"
            download="GCC_Resources_URLs.txt"
            className="expand-button inline-flex items-center gap-2 no-underline w-fit"
          >
            <Download className="w-4 h-4" />
            Resource List (TXT)
          </a>
        </div>
      </div>

      {/* Category dropdown + search row */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium gradient-bg text-white transition-all hover:opacity-90 focus:outline-none">
              {activeTab} ({activeCount})
              <ChevronDown className="w-4 h-4" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="start"
            className="max-h-72 overflow-y-auto w-64"
          >
            {tabs.map(tab => {
              const count = tab === "All" ? allResources.length : (resourcesByCategory[tab]?.length || 0);
              return (
                <DropdownMenuItem
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`cursor-pointer ${activeTab === tab ? "font-semibold text-primary" : ""}`}
                >
                  {tab} ({count})
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Search within resources */}
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            className="search-input-gcc w-full pr-8 py-2 text-sm"
            placeholder="Filter resources..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <Search className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        </div>
      </div>

      {/* Resource list */}
      <div className="space-y-1">
        {filtered.length === 0 && (
          <p className="text-center py-8 text-muted-foreground">No resources found.</p>
        )}

        {showGrouped ? (
          // Grouped by category view
          groupedResources.map(([category, resources]) => (
            <div key={category} className="mb-3">
              <button
                onClick={() => toggleCategory(category)}
                className="flex items-center gap-2 w-full px-3 py-2.5 rounded-lg text-sm font-semibold text-primary hover:bg-muted/30 transition-colors"
              >
                {collapsedCategories.has(category) ? (
                  <ChevronRight className="w-4 h-4 shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 shrink-0" />
                )}
                {category}
                <span className="text-xs font-normal text-muted-foreground">({resources.length})</span>
              </button>
              {!collapsedCategories.has(category) && (
                <div className="space-y-1 ml-2 mt-1">
                  {resources.map((r, i) => (
                    <ResourceRow key={`${r.url}-${i}`} resource={r} showCategory={false} isPdf={isPdf} />
                  ))}
                </div>
              )}
            </div>
          ))
        ) : (
          // Flat list for specific category
          filtered.map((r, i) => (
            <ResourceRow key={`${r.url}-${i}`} resource={r} showCategory={true} isPdf={isPdf} />
          ))
        )}
      </div>

      {filtered.length > 0 && (
        <p className="text-xs text-muted-foreground text-center pt-4">
          Showing {filtered.length} of {allResources.length} resources
        </p>
      )}
    </section>
  );
};

interface ResourceRowProps {
  resource: { category: string; type: string; url: string; name: string };
  showCategory: boolean;
  isPdf: (url: string) => boolean;
}

const ResourceRow = ({ resource: r, showCategory, isPdf }: ResourceRowProps) => (
  <div className="card-gcc flex items-start gap-3 !p-3 group">
    <a
      href={r.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-start gap-3 min-w-0 flex-1 no-underline"
    >
      <ExternalLink className="w-4 h-4 mt-0.5 shrink-0 text-primary opacity-60 group-hover:opacity-100 transition-opacity" />
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors truncate">{r.name}</p>
        <div className="flex items-center gap-2 mt-1">
          {showCategory && <span className="tag-pill !text-[10px] !px-2 !py-0.5">{r.category}</span>}
          <span className="text-[10px] text-muted-foreground">{r.type}</span>
        </div>
      </div>
    </a>
    {isPdf(r.url) && (
      <a
        href={r.url}
        download
        className="shrink-0 p-1.5 rounded-md hover:bg-muted/50 transition-colors"
        title="Download PDF"
        onClick={(e) => e.stopPropagation()}
      >
        <Download className="w-3.5 h-3.5 text-muted-foreground hover:text-primary transition-colors" />
      </a>
    )}
  </div>
);

export default ResourcesExplorer;
