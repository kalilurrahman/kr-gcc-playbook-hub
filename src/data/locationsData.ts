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
  /**
   * Secondary decision metrics. Office cost is a Grade-A BASE rent in native
   * units (all-in occupancy typically runs 40-60% higher once CAM, parking and
   * fit-out amortisation are added); usdSqFt is a normalised figure used only
   * for sorting. English and IP are deliberately banded ratings rather than
   * index scores — see the provenance note in the comparator UI.
   */
  metrics: {
    officeLabel: string;
    officeUsdSqFt: number; // normalised USD / sq ft / month, for sorting
    englishLevel: "Very high" | "High" | "Working" | "Moderate";
    ipPosture: string;
    ipRank: number; // 3 strong, 2 established, 1 developing — for sorting
    setupLabel: string;
    setupWeeks: number; // midpoint, for sorting
  };
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
    metrics: {
      officeLabel: "₹95+/sq ft/mo (Bengaluru Grade A; Hyderabad lower)", officeUsdSqFt: 1.1,
      englishLevel: "Working",
      ipPosture: "Established — TRIPS-compliant, dedicated IP divisions; enforcement can be slow", ipRank: 2,
      setupLabel: "6–12 weeks (Pvt Ltd + GST/PF/ESI)", setupWeeks: 9,
    },
  },
  {
    name: "Poland", flag: "🇵🇱", region: "Europe (EU)", fit: "EU access", tier: "Established",
    talentLabel: "~650K IT (~300K devs)", talentNum: 650_000,
    costLabel: "40–50% vs W. Europe", costPct: 45,
    tzLabel: "CET · GMT+1", gmt: 1, usOverlap: "Low", euOverlap: "High",
    cities: ["Warsaw", "Kraków", "Wrocław", "Poznań"],
    strengths: ["EU regulations", "Strong engineering", "High English proficiency"],
    bestFor: "EU regulatory access and nearshore Europe delivery",
    metrics: {
      officeLabel: "€18–24/sq m/mo (Warsaw); ~€14/sq m/mo (Kraków)", officeUsdSqFt: 2.1,
      englishLevel: "Very high",
      ipPosture: "Strong — full EU IP framework and enforcement", ipRank: 3,
      setupLabel: "4–8 weeks (sp. z o.o.)", setupWeeks: 6,
    },
  },
  {
    name: "Mexico", flag: "🇲🇽", region: "LATAM", fit: "US nearshore", tier: "Established",
    talentLabel: "~700K+ tech specialists", talentNum: 700_000,
    costLabel: "47–54% vs US", costPct: 50,
    tzLabel: "CST · GMT-6", gmt: -6, usOverlap: "High", euOverlap: "Low",
    cities: ["Mexico City", "Guadalajara", "Monterrey"],
    strengths: ["US time-zone", "Cultural affinity", "Growing ecosystem"],
    bestFor: "Real-time collaboration with US teams",
    metrics: {
      officeLabel: "US$18–28/sq m/mo (Mexico City, by submarket)", officeUsdSqFt: 2.1,
      englishLevel: "Moderate",
      ipPosture: "Established — USMCA IP chapter obligations", ipRank: 2,
      setupLabel: "6–10 weeks (S. de R.L.)", setupWeeks: 8,
    },
  },
  {
    name: "Colombia", flag: "🇨🇴", region: "LATAM", fit: "US nearshore", tier: "Emerging",
    talentLabel: "~165K+ tech professionals", talentNum: 165_000,
    costLabel: "49–59% vs US", costPct: 54,
    tzLabel: "COT · GMT-5", gmt: -5, usOverlap: "High", euOverlap: "Low",
    cities: ["Bogotá", "Medellín", "Cali"],
    strengths: ["US East-coast overlap", "Bilingual talent", "Government incentives"],
    bestFor: "US East Coast time-zone alignment",
    metrics: {
      officeLabel: "US$14–20/sq m/mo (Bogotá Grade A)", officeUsdSqFt: 1.6,
      englishLevel: "Moderate",
      ipPosture: "Established — Andean Community IP regime", ipRank: 2,
      setupLabel: "4–8 weeks (S.A.S.)", setupWeeks: 6,
    },
  },
  {
    name: "Romania", flag: "🇷🇴", region: "Europe (EU)", fit: "EU access", tier: "Established",
    talentLabel: "~200K+ IT professionals", talentNum: 200_000,
    costLabel: "45–55% vs W. Europe", costPct: 50,
    tzLabel: "EET · GMT+2", gmt: 2, usOverlap: "Low", euOverlap: "High",
    cities: ["Bucharest", "Cluj-Napoca", "Timișoara", "Iași"],
    strengths: ["Strong math/engineering", "EU protections", "Value pricing"],
    bestFor: "EU-protected value engineering",
    metrics: {
      officeLabel: "€13–18/sq m/mo (Bucharest Grade A)", officeUsdSqFt: 1.55,
      englishLevel: "Very high",
      ipPosture: "Strong — full EU IP framework and enforcement", ipRank: 3,
      setupLabel: "4–8 weeks (S.R.L.)", setupWeeks: 6,
    },
  },
  {
    name: "Philippines", flag: "🇵🇭", region: "Asia", fit: "Services & BPO", tier: "Established",
    talentLabel: "~1.97M IT-BPM (500K+ IT)", talentNum: 500_000,
    costLabel: "60–70% vs US (support)", costPct: 65,
    tzLabel: "PHT · GMT+8", gmt: 8, usOverlap: "Low", euOverlap: "Low",
    cities: ["Manila", "Cebu", "Davao"],
    strengths: ["Excellent English", "Customer-service excellence", "Cost"],
    bestFor: "Customer support, IT helpdesk, back-office operations",
    metrics: {
      officeLabel: "~US$1.76/sq ft/mo (Metro Manila BGC Grade A)", officeUsdSqFt: 1.76,
      englishLevel: "High",
      ipPosture: "Established — IPOPHL regime; enforcement improving", ipRank: 2,
      setupLabel: "6–12 weeks (domestic corp / PEZA)", setupWeeks: 9,
    },
  },
  {
    name: "Vietnam", flag: "🇻🇳", region: "Asia", fit: "Cost arbitrage", tier: "Emerging",
    talentLabel: "~500–530K developers", talentNum: 515_000,
    costLabel: "Low-cost (SE Asia)", costPct: 60,
    tzLabel: "ICT · GMT+7", gmt: 7, usOverlap: "Low", euOverlap: "Low",
    cities: ["Hanoi", "Ho Chi Minh City", "Da Nang"],
    strengths: ["Fast-growing base", "Low cost", "Young workforce"],
    bestFor: "Cost-efficient engineering in Southeast Asia",
    metrics: {
      officeLabel: "US$25–40/sq m/mo (HCMC Grade A)", officeUsdSqFt: 3.0,
      englishLevel: "Moderate",
      ipPosture: "Developing — improving under CPTPP/EVFTA commitments", ipRank: 1,
      setupLabel: "8–14 weeks (FIE licensing)", setupWeeks: 11,
    },
  },
  {
    name: "Egypt", flag: "🇪🇬", region: "EMEA", fit: "EMEA nearshore", tier: "Emerging",
    talentLabel: "~$5.2B ICT exports · 800K training target", talentNum: 300_000,
    costLabel: "Cost-competitive", costPct: 55,
    tzLabel: "EET · GMT+2", gmt: 2, usOverlap: "Low", euOverlap: "High",
    cities: ["Cairo", "Alexandria"],
    strengths: ["Multilingual talent", "EMEA time-zone", "Government push"],
    bestFor: "Multilingual EMEA nearshore delivery",
    metrics: {
      officeLabel: "US$25–40/sq m/mo (New Cairo / Smart Village)", officeUsdSqFt: 3.0,
      englishLevel: "High",
      ipPosture: "Developing — reforms underway, enforcement uneven", ipRank: 1,
      setupLabel: "6–12 weeks (free-zone or inland)", setupWeeks: 9,
    },
  },
  {
    name: "Malaysia", flag: "🇲🇾", region: "Asia", fit: "Deep-tech", tier: "Emerging",
    talentLabel: "60K-engineer target (Nat. Semiconductor Strategy)", talentNum: 120_000,
    costLabel: "Moderate", costPct: 40,
    tzLabel: "MYT · GMT+8", gmt: 8, usOverlap: "Low", euOverlap: "Low",
    cities: ["Kuala Lumpur", "Penang"],
    strengths: ["Semiconductor strategy", "ER&D", "Political stability"],
    bestFor: "Semiconductor and deep-tech ER&D",
    metrics: {
      officeLabel: "MYR 6–9/sq ft/mo (KL Grade A)", officeUsdSqFt: 1.6,
      englishLevel: "High",
      ipPosture: "Established — strong statutory regime, MSC status incentives", ipRank: 2,
      setupLabel: "4–8 weeks (Sdn Bhd)", setupWeeks: 6,
    },
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
    metrics: {
      officeLabel: "US$15–25/sq m/mo (Kyiv, wartime-discounted)", officeUsdSqFt: 1.85,
      englishLevel: "Moderate",
      ipPosture: "Developing — EU-alignment reforms; wartime enforcement risk", ipRank: 1,
      setupLabel: "4–8 weeks (LLC)", setupWeeks: 6,
    },
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
    metrics: {
      officeLabel: "AED 90–200/sq ft/yr (Dubai Grade A)", officeUsdSqFt: 3.4,
      englishLevel: "High",
      ipPosture: "Strong — modern statutory regime, specialised free-zone courts", ipRank: 3,
      setupLabel: "2–6 weeks (free-zone entity)", setupWeeks: 4,
    },
  },
];

export const overlapScore: Record<Overlap, number> = { High: 3, Medium: 2, Low: 1 };

export type SortKey =
  | "name"
  | "talentNum"
  | "costPct"
  | "gmt"
  | "usOverlap"
  | "euOverlap"
  | "officeUsdSqFt"
  | "englishLevel"
  | "ipRank"
  | "setupWeeks";

/** English bands ordered so "Very high" sorts above "Moderate". */
export const englishScore: Record<GCCLocation["metrics"]["englishLevel"], number> = {
  "Very high": 4,
  High: 3,
  Working: 2,
  Moderate: 1,
};

/** Pure sort-key extractor — the comparable value for a location on a given column. */
export const sortVal = (l: GCCLocation, key: SortKey): number | string => {
  if (key === "usOverlap") return overlapScore[l.usOverlap];
  if (key === "euOverlap") return overlapScore[l.euOverlap];
  if (key === "name") return l.name;
  if (key === "englishLevel") return englishScore[l.metrics.englishLevel];
  if (key === "officeUsdSqFt") return l.metrics.officeUsdSqFt;
  if (key === "ipRank") return l.metrics.ipRank;
  if (key === "setupWeeks") return l.metrics.setupWeeks;
  return l[key] as number;
};
