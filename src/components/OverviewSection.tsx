import { motion } from "framer-motion";
import { stats } from "@/data/gccData";
import { sections } from "@/data/gccData";
import { Target, Rocket, BarChart3, Building2, Globe, AlertTriangle, CheckCircle, DollarSign, BookOpen, TrendingUp, Cpu, Users, Shield } from "lucide-react";

const statVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: i * 0.1, duration: 0.35, ease: [0.25, 0.1, 0.25, 1] as const },
  }),
};

const sectionIcons: Record<string, React.ReactNode> = {
  purpose: <Target className="w-5 h-5" />,
  lifecycle: <Rocket className="w-5 h-5" />,
  maturity: <BarChart3 className="w-5 h-5" />,
  sizes: <Building2 className="w-5 h-5" />,
  geography: <Globe className="w-5 h-5" />,
  challenges: <AlertTriangle className="w-5 h-5" />,
  bestpractices: <CheckCircle className="w-5 h-5" />,
  finance: <DollarSign className="w-5 h-5" />,
  resources: <BookOpen className="w-5 h-5" />,
};

const sectionDescriptions: Record<string, string> = {
  purpose: "Understand cost arbitrage, talent access, innovation, and strategic control objectives.",
  lifecycle: "Navigate the 6 phases from inception & planning through transformation or exit.",
  maturity: "Review the FY2026 Zinnov maturity distribution from Outpost to Transformation Hub.",
  sizes: "Right-size your GCC from micro (10 employees) to mega (5,000+).",
  geography: "Compare India, Mexico, Poland, Philippines, and other GCC destinations.",
  challenges: "Tackle attrition, skills gaps, governance, compliance, and scaling risks.",
  bestpractices: "Proven strategies for alignment, hiring, learning, governance, and innovation.",
  finance: "CapEx vs OpEx, SEZ/STPI tax benefits, accounting standards, and KPIs.",
  resources: "250+ curated reports, playbooks, tools, and communities in one place.",
};

const metricsHighlights = [
  { icon: <TrendingUp className="w-5 h-5" />, value: "64%", label: "Dual Mandates", desc: "Site leaders increasingly own global business units alongside India leadership" },
  { icon: <Cpu className="w-5 h-5" />, value: "#1", label: "AI Hiring Intensity", desc: "India leads global enterprise AI hiring intensity and ranks #2 for AI talent" },
  { icon: <Users className="w-5 h-5" />, value: "96%", label: "Portfolio Mandates", desc: "Post-FY2021 GCCs launched with product or portfolio ownership from day one" },
  { icon: <Shield className="w-5 h-5" />, value: "5%", label: "Transformation Hubs", desc: "FY2026 Zinnov maturity mix shows a small AI-led CXO-sovereign frontier" },
];

const OverviewSection = () => {
  return (
    <section>
      <motion.div
        className="text-center py-12 sm:py-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h2 className="text-3xl sm:text-4xl font-bold gradient-text-accent mb-5">
          2,117 GCCs | USD 98.4 Bn Revenue | 2.36 Mn Professionals
        </h2>
        <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          India's GCC ecosystem has moved from Delivery Engine to Enterprise Nerve Centre.
          This playbook reflects the FY2026 Zinnov-Nasscom GCC Value Orbit landscape.
        </p>
      </motion.div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            custom={i}
            variants={statVariants}
            initial="hidden"
            animate="visible"
            className="stat-gradient-bg rounded-xl p-5 sm:p-6 text-center border border-border"
          >
            <div className="text-3xl sm:text-4xl font-extrabold gradient-text-accent">
              {stat.value}
            </div>
            <div className="text-xs sm:text-sm text-muted-foreground mt-2">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>

      {/* GCC Metrics Highlights */}
      <motion.div
        className="mt-10"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <div className="flex items-center gap-2 mb-4">
          <BarChart3 className="w-5 h-5 text-amber-400" />
          <h3 className="text-lg font-semibold text-foreground">GCC Metrics at a Glance</h3>
          <span className="text-xs bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2.5 py-0.5 rounded-full font-medium">NEW</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {metricsHighlights.map((m, i) => (
            <motion.div
              key={m.label}
              custom={i + 4}
              variants={statVariants}
              initial="hidden"
              animate="visible"
              className="bg-card rounded-xl border border-amber-500/20 p-4 hover:border-amber-500/40 transition-colors"
            >
              <div className="flex items-center gap-2 mb-2 text-amber-400">
                {m.icon}
                <span className="text-xl font-bold">{m.value}</span>
              </div>
              <p className="text-sm font-medium text-foreground">{m.label}</p>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{m.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Section guide */}
      <motion.div
        className="mt-10 space-y-2"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.5 }}
      >
        <h3 className="text-lg font-semibold text-foreground mb-4">What's Inside</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {[...sections.filter(s => s.id !== "resources"), { id: "resources", label: "Resources", title: "" }].map((s) => (
            <div
              key={s.id}
              className="flex items-start gap-3 p-3 rounded-lg border border-border bg-card/50 hover:border-primary/40 transition-colors"
            >
              <div className="shrink-0 mt-0.5 text-primary">
                {sectionIcons[s.id]}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-foreground">{s.label}</p>
                <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                  {sectionDescriptions[s.id]}
                </p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default OverviewSection;
