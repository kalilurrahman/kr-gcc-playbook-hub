import { navItems } from "@/data/gccData";

interface GCCNavProps {
  activeSection: string;
  onSectionChange: (id: string) => void;
}

const GCCNav = ({ activeSection, onSectionChange }: GCCNavProps) => {
  return (
    <nav className="nav-glass sticky top-[73px] z-40 border-b border-border py-3 overflow-x-auto">
      <div className="container mx-auto">
        <ul className="flex gap-2 flex-wrap">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                className={`nav-pill ${activeSection === item.id ? "active" : ""}`}
                onClick={() => onSectionChange(item.id)}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default GCCNav;
