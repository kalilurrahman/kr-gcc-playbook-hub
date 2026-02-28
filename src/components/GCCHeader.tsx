import { useState, useEffect } from "react";
import { useTheme } from "@/hooks/useTheme";
import { Search, Menu, X, Home, Target, Rocket, BarChart3, Building2, Globe, AlertTriangle, CheckCircle, BookOpen, DollarSign } from "lucide-react";
import { navItems } from "@/data/gccData";

interface GCCHeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  activeSection: string;
  onSectionChange: (id: string) => void;
}

const navIcons: Record<string, React.ReactNode> = {
  overview: <Home className="w-4 h-4" />,
  resources: <BookOpen className="w-4 h-4" />,
  purpose: <Target className="w-4 h-4" />,
  lifecycle: <Rocket className="w-4 h-4" />,
  maturity: <BarChart3 className="w-4 h-4" />,
  sizes: <Building2 className="w-4 h-4" />,
  geography: <Globe className="w-4 h-4" />,
  challenges: <AlertTriangle className="w-4 h-4" />,
  bestpractices: <CheckCircle className="w-4 h-4" />,
  finance: <DollarSign className="w-4 h-4" />,
};

const GCCHeader = ({ searchQuery, onSearchChange, activeSection, onSectionChange }: GCCHeaderProps) => {
  const { isDark, toggle } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  // Close menu on escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setMenuOpen(false); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const handleNavClick = (id: string) => {
    onSectionChange(id);
    setMenuOpen(false);
  };

  return (
    <>
      <header className="header-glass sticky top-0 z-50 border-b border-border">
        <div className="container mx-auto flex items-center justify-between gap-3 py-2.5 px-4">
          {/* Left: Logo + Title */}
          <div className="flex items-center gap-3 shrink-0">
            <img src="/icon-512.png" alt="GCC Playbook" className="w-9 h-9 rounded-lg" />
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold gradient-text leading-tight">GCC Playbook</h1>
              <p className="text-[10px] text-muted-foreground leading-tight">Global Capability Center Resource</p>
            </div>
          </div>

          {/* Center: Desktop nav — wraps to 2 lines if crowded */}
          <nav className="hidden lg:flex items-center justify-center flex-wrap gap-1 min-w-0 flex-1 mx-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 whitespace-nowrap ${
                  activeSection === item.id
                    ? "gradient-bg text-white"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                {navIcons[item.id]}
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right: Search + Theme + Hamburger */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="relative">
              <input
                type="text"
                className="search-input-gcc w-32 sm:w-48 pr-8 py-2 text-xs"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                aria-label="Search topics"
              />
              <Search className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
            </div>

            <button
              onClick={toggle}
              className="p-2 rounded-lg border border-border text-xs font-medium transition-all hover:bg-muted/50"
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDark ? "☀️" : "🌙"}
            </button>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden p-2 rounded-lg border border-border transition-all hover:bg-muted/50"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile/tablet drawer */}
      {menuOpen && (
        <div className="lg:hidden fixed inset-0 z-40" onClick={() => setMenuOpen(false)}>
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <nav
            className="absolute top-0 right-0 h-full w-64 border-l border-border p-4 pt-16 animate-slide-in-right overflow-y-auto"
            style={{ background: "hsl(var(--card))" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    activeSection === item.id
                      ? "gradient-bg text-white"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
                  }`}
                >
                  {navIcons[item.id]}
                  {item.label}
                </button>
              ))}
            </div>
          </nav>
        </div>
      )}
    </>
  );
};

export default GCCHeader;
