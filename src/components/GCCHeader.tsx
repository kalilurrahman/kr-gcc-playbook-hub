import { useTheme } from "@/hooks/useTheme";
import { Search } from "lucide-react";

interface GCCHeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const GCCHeader = ({ searchQuery, onSearchChange }: GCCHeaderProps) => {
  const { isDark, toggle } = useTheme();

  return (
    <header className="header-glass sticky top-0 z-50 border-b border-border py-4">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="icon-box text-lg font-bold text-primary-foreground select-none">
            GCC
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold gradient-text leading-tight">
              GCC Playbook Bible
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Your Complete Global Capability Center Resource
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <input
              type="text"
              className="search-input-gcc w-48 sm:w-72 pr-10"
              placeholder="Search topics..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              aria-label="Search topics"
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          </div>
          <button
            className="theme-toggle-btn"
            onClick={toggle}
            aria-label="Toggle theme"
          >
            {isDark ? "☀️ Light" : "🌙 Dark"}
          </button>
        </div>
      </div>
    </header>
  );
};

export default GCCHeader;
