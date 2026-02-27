import { motion } from "framer-motion";
import { stats } from "@/data/gccData";

const statVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: i * 0.1, duration: 0.35, ease: [0.25, 0.1, 0.25, 1] as const },
  }),
};

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
          Welcome to the GCC Playbook
        </h2>
        <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Your comprehensive guide to building, scaling, and optimizing Global
          Capability Centers from inception to excellence. Navigate through
          phases, maturity levels, geographies, and proven strategies.
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
    </section>
  );
};

export default OverviewSection;
