// GCC location intelligence — structured, comparable dataset powering the
// Location Comparator. Figures are indicative and sourced from the FY2026
// refresh research (Nasscom-Zinnov, ANSR, national IPAs, industry coverage).
// Numeric *_num fields exist only for sorting; display uses the label fields.

export type Overlap = "High" | "Medium" | "Low";

export interface GCCLocation {
  name: string;
  flag: string;
  region: "Asia" | "Europe (EU)" | "Europe" | "LATAM" | "EMEA" | "Middle East";
  /** Primary strategic fit — the one filter dimension that matters most. */
  fit:
    | "Scale & ownership"
    | "EU access"
    | "US nearshore"
    | "Services & BPO"
    | "Cost arbitrage"
    | "EMEA nearshore"
    | "Deep-tech"
    | "Strategic / AI";
  tier: "Established" | "Emerging";
  talentLabel: string;
  talentNum: number; // representative tech talent pool, for sorting
  costLabel: string;
  costPct: number; // approx. saving vs US / W. Europe (higher = cheaper), for sorting
  tzLabel: string;
  gmt: number; // UTC offset, for sorting
  usOverlap: Overlap;
  euOverlap: Overlap;
  cities: string[];
  strengths: string[];
  bestFor: string;
  note?: string;
}

export const locations: GCCLocation[] = [
  {
    name: "India", flag: "🇮🇳", region: "Asia", fit: "Scale & ownership", tier: "Established",
    talentLabel: "2.36M in GCCs · 5.4M+ tech", talentNum: 5_400_000,
    costLabel: "50–70% vs US", costPct: 60,
    tzLabel: "IST · GMT+5:30", gmt: 5.5, usOverlap: "Low", euOverlap: "Medium",
    cities: ["Bengaluru", "Hyderabad", "Pune", "NCR", "Chennai"],
    strengths: ["Unmatched scale", "AI/ML depth", "English", "Deep GCC ecosystem"],
    bestFor: "End-to-end product ownership, AI/ML, ER&D at scale",
  },
  {
    name: "Poland", flag: "🇵🇱", region: "Europe (EU)", fit: "EU access", tier: "Established",
    talentLabel: "~650K IT (~300K devs)", talentNum: 650_000,
    costLabel: "40–50% vs W. Europe", costPct: 45,
    tzLabel: "CET · GMT+1", gmt: 1, usOverlap: "Low", euOverlap: "High",
    cities: ["Warsaw", "Kraków", "Wrocław", "Poznań"],
    strengths: ["EU regulations", "Strong engineering", "High English proficiency"],
    bestFor: "EU regulatory access and nearshore Europe delivery",
  },
  {
    name: "Mexico", flag: "🇲🇽", region: "LATAM", fit: "US nearshore", tier: "Established",
    talentLabel: "~700K+ tech specialists", talentNum: 700_000,
    costLabel: "47–54% vs US", costPct: 50,
    tzLabel: "CST · GMT-6", gmt: -6, usOverlap: "High", euOverlap: "Low",
    cities: ["Mexico City", "Guadalajara", "Monterrey"],
    strengths: ["US time-zone", "Cultural affinity", "Growing ecosystem"],
    bestFor: "Real-time collaboration with US teams",
  },
  {
    name: "Colombia", flag: "🇨🇴", region: "LATAM", fit: "US nearshore", tier: "Emerging",
    talentLabel: "~165K+ tech professionals", talentNum: 165_000,
    costLabel: "49–59% vs US", costPct: 54,
    tzLabel: "COT · GMT-5", gmt: -5, usOverlap: "High", euOverlap: "Low",
    cities: ["Bogotá", "Medellín", "Cali"],
    strengths: ["US East-coast overlap", "Bilingual talent", "Government incentives"],
    bestFor: "US East Coast time-zone alignment",
  },
  {
    name: "Romania", flag: "🇷🇴", region: "Europe (EU)", fit: "EU access", tier: "Established",
    talentLabel: "~200K+ IT professionals", talentNum: 200_000,
    costLabel: "45–55% vs W. Europe", costPct: 50,
    tzLabel: "EET · GMT+2", gmt: 2, usOverlap: "Low", euOverlap: "High",
    cities: ["Bucharest", "Cluj-Napoca", "Timișoara", "Iași"],
    strengths: ["Strong math/engineering", "EU protections", "Value pricing"],
    bestFor: "EU-protected value engineering",
  },
  {
    name: "Philippines", flag: "🇵🇭", region: "Asia", fit: "Services & BPO", tier: "Established",
    talentLabel: "~1.97M IT-BPM (500K+ IT)", talentNum: 500_000,
    costLabel: "60–70% vs US (support)", costPct: 65,
    tzLabel: "PHT · GMT+8", gmt: 8, usOverlap: "Low", euOverlap: "Low",
    cities: ["Manila", "Cebu", "Davao"],
    strengths: ["Excellent English", "Customer-service excellence", "Cost"],
    bestFor: "Customer support, IT helpdesk, back-office operations",
  },
  {
    name: "Vietnam", flag: "🇻🇳", region: "Asia", fit: "Cost arbitrage", tier: "Emerging",
    talentLabel: "~500–530K developers", talentNum: 515_000,
    costLabel: "Low-cost (SE Asia)", costPct: 60,
    tzLabel: "ICT · GMT+7", gmt: 7, usOverlap: "Low", euOverlap: "Low",
    cities: ["Hanoi", "Ho Chi Minh City", "Da Nang"],
    strengths: ["Fast-growing base", "Low cost", "Young workforce"],
    bestFor: "Cost-efficient engineering in Southeast Asia",
  },
  {
    name: "Egypt", flag: "🇪🇬", region: "EMEA", fit: "EMEA nearshore", tier: "Emerging",
    talentLabel: "~$5.2B ICT exports · 800K training target", talentNum: 300_000,
    costLabel: "Cost-competitive", costPct: 55,
    tzLabel: "EET · GMT+2", gmt: 2, usOverlap: "Low", euOverlap: "High",
    cities: ["Cairo", "Alexandria"],
    strengths: ["Multilingual talent", "EMEA time-zone", "Government push"],
    bestFor: "Multilingual EMEA nearshore delivery",
  },
  {
    name: "Malaysia", flag: "🇲🇾", region: "Asia", fit: "Deep-tech", tier: "Emerging",
    talentLabel: "60K-engineer target (Nat. Semiconductor Strategy)", talentNum: 120_000,
    costLabel: "Moderate", costPct: 40,
    tzLabel: "MYT · GMT+8", gmt: 8, usOverlap: "Low", euOverlap: "Low",
    cities: ["Kuala Lumpur", "Penang"],
    strengths: ["Semiconductor strategy", "ER&D", "Political stability"],
    bestFor: "Semiconductor and deep-tech ER&D",
  },
  {
    name: "Ukraine", flag: "🇺🇦", region: "Europe", fit: "EU access", tier: "Emerging",
    talentLabel: "~302K tech experts", talentNum: 302_000,
    costLabel: "50–60% vs US", costPct: 55,
    tzLabel: "EET · GMT+2", gmt: 2, usOverlap: "Low", euOverlap: "High",
    cities: ["Kyiv", "Lviv", "Kharkiv"],
    strengths: ["Top-tier STEM", "Cybersecurity", "AI/ML"],
    bestFor: "High-skill engineering — assess geopolitical risk",
    note: "Geopolitical considerations require careful assessment.",
  },
  {
    name: "UAE & Gulf", flag: "🇦🇪", region: "Middle East", fit: "Strategic / AI", tier: "Emerging",
    talentLabel: "Strategy-driven (imported talent)", talentNum: 60_000,
    costLabel: "High-cost", costPct: 5,
    tzLabel: "GST · GMT+4", gmt: 4, usOverlap: "Low", euOverlap: "Medium",
    cities: ["Dubai", "Abu Dhabi", "Riyadh"],
    strengths: ["Strategic AI plays", "Data-centres", "Tax regime", "Market access"],
    bestFor: "Strategic AI, data-centre and market presence",
    note: "A strategy-driven, high-cost destination — NOT a cost-arbitrage play.",
  },
];

export const overlapScore: Record<Overlap, number> = { High: 3, Medium: 2, Low: 1 };

export type SortKey = "name" | "talentNum" | "costPct" | "gmt" | "usOverlap" | "euOverlap";

/** Pure sort-key extractor — the comparable value for a location on a given column. */
export const sortVal = (l: GCCLocation, key: SortKey): number | string => {
  if (key === "usOverlap") return overlapScore[l.usOverlap];
  if (key === "euOverlap") return overlapScore[l.euOverlap];
  if (key === "name") return l.name;
  return l[key] as number;
};
