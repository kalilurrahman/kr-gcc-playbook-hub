import { stats } from "@/data/gccData";

const OverviewSection = () => {
  return (
    <section className="animate-fade-in-up">
      <div className="text-center py-12 sm:py-16">
        <h2 className="text-3xl sm:text-4xl font-bold gradient-text-accent mb-5">
          Welcome to the GCC Playbook Bible
        </h2>
        <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Your comprehensive guide to building, scaling, and optimizing Global
          Capability Centers from inception to excellence. Navigate through
          phases, maturity levels, geographies, and proven strategies.
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="stat-gradient-bg rounded-xl p-5 sm:p-6 text-center border border-border"
          >
            <div className="text-3xl sm:text-4xl font-extrabold gradient-text-accent">
              {stat.value}
            </div>
            <div className="text-xs sm:text-sm text-muted-foreground mt-2">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OverviewSection;
