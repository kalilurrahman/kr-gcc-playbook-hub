import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, ChevronDown, ArrowUpDown, ArrowUp, ArrowDown, Info, RotateCcw } from "lucide-react";
import { locations, sortVal, type Overlap, type SortKey } from "@/data/locationsData";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

type SortDir = "asc" | "desc";

const overlapClasses: Record<Overlap, string> = {
  High: "bg-emerald-500/10 text-emerald-500 border-emerald-500/30",
  Medium: "bg-amber-500/10 text-amber-500 border-amber-500/30",
  Low: "bg-muted text-muted-foreground border-border",
};

const OverlapPill = ({ level }: { level: Overlap }) => (
  <span className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full border ${overlapClasses[level]}`}>
    {level}
  </span>
);

const columns: { key: SortKey; label: string; align?: string }[] = [
  { key: "name", label: "Destination" },
  { key: "talentNum", label: "Tech talent" },
  { key: "costPct", label: "Cost saving" },
  { key: "usOverlap", label: "US overlap" },
  { key: "euOverlap", label: "EU overlap" },
  { key: "gmt", label: "Time zone" },
];

const LocationComparator = () => {
  const [region, setRegion] = useState("All");
  const [fit, setFit] = useState("All");
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("talentNum");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  const regions = useMemo(() => ["All", ...Array.from(new Set(locations.map((l) => l.region)))], []);
  const fits = useMemo(() => ["All", ...Array.from(new Set(locations.map((l) => l.fit)))], []);

  const rows = useMemo(() => {
    let list = locations.filter((l) => {
      if (region !== "All" && l.region !== region) return false;
      if (fit !== "All" && l.fit !== fit) return false;
      if (search.trim()) {
        const q = search.toLowerCase();
        const hay = [l.name, l.region, l.fit, l.bestFor, ...l.cities, ...l.strengths].join(" ").toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
    list = [...list].sort((a, b) => {
      const av = sortVal(a, sortKey);
      const bv = sortVal(b, sortKey);
      const cmp = typeof av === "string" ? av.localeCompare(bv as string) : (av as number) - (bv as number);
      return sortDir === "asc" ? cmp : -cmp;
    });
    return list;
  }, [region, fit, search, sortKey, sortDir]);

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      // sensible default direction: text ascending, numbers descending
      setSortDir(key === "name" || key === "gmt" ? "asc" : "desc");
    }
  };

  const reset = () => {
    setRegion("All");
    setFit("All");
    setSearch("");
    setSortKey("talentNum");
    setSortDir("desc");
  };

  const sortIcon = (col: SortKey) => {
    if (sortKey !== col) return <ArrowUpDown className="w-3 h-3 opacity-40" />;
    return sortDir === "asc" ? <ArrowUp className="w-3 h-3 text-primary" /> : <ArrowDown className="w-3 h-3 text-primary" />;
  };

  const isDefault = region === "All" && fit === "All" && !search.trim();

  return (
    <section className="space-y-6">
      <div>
        <h2 className="section-title mb-1">🧭 GCC Location Comparator</h2>
        <p className="text-sm text-muted-foreground">
          Compare {locations.length} GCC destinations by strategic fit, talent depth, cost, and time-zone overlap — matched to your intent, not just cost.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row flex-wrap gap-3 items-start sm:items-center">
        <FilterDropdown label="Region" value={region} options={regions} onSelect={setRegion} />
        <FilterDropdown label="Strategic fit" value={fit} options={fits} onSelect={setFit} />
        <div className="relative flex-1 min-w-[180px] max-w-md">
          <input
            type="text"
            className="search-input-gcc w-full pr-8 py-2 text-sm"
            placeholder="Filter by city, strength, fit…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Filter destinations"
          />
          <Search className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        </div>
        {!isDefault && (
          <button
            onClick={reset}
            className="flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset
          </button>
        )}
      </div>

      {/* Comparison table */}
      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full min-w-[720px] text-sm border-collapse">
          <thead>
            <tr className="bg-muted/40">
              {columns.map((c) => (
                <th key={c.key} className="text-left px-4 py-3 font-semibold text-xs uppercase tracking-wide text-muted-foreground">
                  <button
                    onClick={() => toggleSort(c.key)}
                    className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors"
                    aria-label={`Sort by ${c.label}`}
                  >
                    {c.label}
                    {sortIcon(c.key)}
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((l, i) => (
              <motion.tr
                key={l.name}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.25, delay: i * 0.03 }}
                className="border-t border-border hover:bg-muted/20 transition-colors align-top"
              >
                <td className="px-4 py-3">
                  <div className="flex items-start gap-2.5">
                    <span className="text-xl leading-none mt-0.5" aria-hidden>{l.flag}</span>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-foreground">{l.name}</span>
                        <span className="tag-pill !text-[9px] !px-1.5 !py-0.5">{l.fit}</span>
                        <span className={`text-[9px] px-1.5 py-0.5 rounded-full border ${l.tier === "Established" ? "border-primary/30 text-primary" : "border-amber-500/30 text-amber-500"}`}>
                          {l.tier}
                        </span>
                      </div>
                      <p className="text-[11px] text-muted-foreground mt-0.5">{l.region} · {l.cities.slice(0, 3).join(", ")}</p>
                      <p className="text-[11px] text-muted-foreground mt-1 leading-snug max-w-xs">{l.bestFor}</p>
                      {l.note && (
                        <p className="text-[10px] text-amber-500/90 mt-1 flex items-start gap-1 max-w-xs">
                          <Info className="w-3 h-3 mt-0.5 shrink-0" />{l.note}
                        </p>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-muted-foreground whitespace-nowrap tabular-nums">{l.talentLabel}</td>
                <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">{l.costLabel}</td>
                <td className="px-4 py-3"><OverlapPill level={l.usOverlap} /></td>
                <td className="px-4 py-3"><OverlapPill level={l.euOverlap} /></td>
                <td className="px-4 py-3 text-muted-foreground whitespace-nowrap text-xs">{l.tzLabel}</td>
              </motion.tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={columns.length} className="px-4 py-10 text-center text-muted-foreground">
                  No destinations match these filters. <button onClick={reset} className="text-primary underline">Reset</button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Footer meta + legend */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs text-muted-foreground">
        <span>Showing {rows.length} of {locations.length} destinations</span>
        <span className="flex items-center gap-3">
          <span className="flex items-center gap-1"><OverlapPill level="High" /> real-time</span>
          <span className="flex items-center gap-1"><OverlapPill level="Medium" /> partial</span>
          <span className="flex items-center gap-1"><OverlapPill level="Low" /> async</span>
        </span>
      </div>
      <p className="text-[11px] text-muted-foreground/80 leading-relaxed">
        Figures are indicative, from the FY2026 refresh research (Nasscom-Zinnov, ANSR, national investment agencies, industry coverage). “Cost saving” is versus US or Western-Europe benchmarks. Match the destination to intent — arbitrage (India, Philippines, Vietnam) vs. EU access (Poland, Romania) vs. US nearshore (Mexico, Colombia) vs. strategic AI presence (Gulf).
      </p>
    </section>
  );
};

interface FilterDropdownProps {
  label: string;
  value: string;
  options: string[];
  onSelect: (v: string) => void;
}

const FilterDropdown = ({ label, value, options, onSelect }: FilterDropdownProps) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <button className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium gradient-bg text-white transition-all hover:opacity-90 focus:outline-none">
        <span className="opacity-80">{label}:</span> {value}
        <ChevronDown className="w-4 h-4" />
      </button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="start" className="max-h-72 overflow-y-auto w-56">
      {options.map((opt) => (
        <DropdownMenuItem
          key={opt}
          onClick={() => onSelect(opt)}
          className={`cursor-pointer ${value === opt ? "font-semibold text-primary" : ""}`}
        >
          {opt}
        </DropdownMenuItem>
      ))}
    </DropdownMenuContent>
  </DropdownMenu>
);

export default LocationComparator;
