export interface GCCCard {
  icon: string;
  title: string;
  description: string;
  tags: string[];
  details: string[];
}

export interface GCCSection {
  id: string;
  label: string;
  title: string;
  cards: GCCCard[];
}

export const stats = [
  { value: "6,000+", label: "Active GCCs Globally" },
  { value: "2.5M+", label: "Professionals Employed" },
  { value: "1,700+", label: "GCCs in India" },
  { value: "$64.6B", label: "Export Value (India)" },
];

export const sections: GCCSection[] = [
  {
    id: "purpose",
    label: "GCC Purpose",
    title: "GCC Purpose & Strategic Objectives",
    cards: [
      {
        icon: "💰", title: "Cost Arbitrage", description: "Leveraging labor cost differentials across geographies",
        tags: ["Cost Savings", "Arbitrage", "Foundation"],
        details: [
          "Primary Driver: 30-50% cost reduction through talent arbitrage",
          "Beyond Salary: Infrastructure, real estate, and operational cost optimization",
          "Value Arbitrage: Trigent strategy — from cost center to profit driver https://trigent.com/blog/from-cost-center-to-profit-driver-leverage-value-arbitrage-to-redefine-your-gccs-business-value/",
          "Evolving Model: Cost savings redirected to R&D, market experiments https://www.linkedin.com/pulse/beyond-cost-arbitrage-how-indias-gccs-deliver-strategic-thorat-jsh9f",
          "Key Insight: Cost arbitrage is table stakes — strategic GCCs move beyond this in 2-3 years",
        ],
      },
      {
        icon: "🧠", title: "Capability & Talent Access", description: "Access to deep talent pools and specialized skills",
        tags: ["Talent", "Skills", "Expertise"],
        details: [
          "India: 5.4M+ IT professionals, 1.5M annual STEM graduates",
          "Poland: 430K+ IT professionals with EU-standard education",
          "Skills Focus: AI/ML (63% priority), data engineering (54%), cloud, cybersecurity",
          "Hire-Train-Deploy Models: Reduce time-to-productivity and attrition by 78%",
          "Global Talent Pool: Access to diverse perspectives, 24/7 development cycles",
        ],
      },
      {
        icon: "🔬", title: "Innovation & Incubation", description: "Creating IP, patents, and new products from GCC hubs",
        tags: ["Innovation", "R&D", "IP"],
        details: [
          "EY: How GCCs leverage partner ecosystems for innovation https://www.ey.com/en_in/insights/consulting/global-capability-centers/how-gccs-can-leverage-partner-ecosystems-to-enhance-innovation",
          "Women-Led Innovation: Patents, platforms, products from GCC incubators https://inductusgcc.com/women-led-innovation-case-studies-of-patents-platforms-products-originating-in-gccs/",
          "Innovation Time: 10-20% dedicated to experimental projects",
          "Only 8% of GCCs reach innovation maturity (BCG 2025)",
          "Key Enablers: Hackathons, startup partnerships, academia collaborations",
        ],
      },
      {
        icon: "🌍", title: "Market Expansion", description: "Using GCCs as springboards into new markets and regions",
        tags: ["Growth", "Markets", "Expansion"],
        details: [
          "Regional Hubs: GCCs in India serve as gateway to South/Southeast Asia",
          "Mexico & Colombia: Nearshore GCCs enable LATAM market penetration",
          "Poland & Romania: EU hub providing regulatory access to 27 member states",
          "Customer Proximity: Local teams for customer-facing functions",
          "Revenue Generation: Mature GCCs contribute directly to revenue through local operations",
        ],
      },
      {
        icon: "🎛️", title: "Strategic Control", description: "Maintaining quality, IP ownership, and governance in-house",
        tags: ["Governance", "Control", "IP Protection"],
        details: [
          "In-House vs Outsourcing: Full IP ownership, direct management, aligned culture",
          "Data Security: SOC2, ISO certifications, zero-trust architecture",
          "Decision Rights: Evolving from HQ-controlled to empowered local leadership",
          "Quality Assurance: Direct oversight, standardized processes, continuous improvement",
          "Risk Mitigation: Reduced vendor dependency, business continuity control",
        ],
      },
    ],
  },
  {
    id: "lifecycle",
    label: "Lifecycle Phases",
    title: "GCC Lifecycle Phases",
    cards: [
      {
        icon: "🎯", title: "Phase 1: Inception & Planning", description: "Strategic foundation and feasibility assessment",
        tags: ["Strategy", "Feasibility", "3-6 months"],
        details: ["Define Strategic Objectives: Business goals, functions, cost savings targets", "Feasibility Study: Market analysis, talent availability, cost-benefit analysis", "Location Selection: India, Poland, Mexico, Philippines, Colombia evaluation", "Business Case: ROI projections, risk assessment, governance model", "Key Success Metrics: Clear KPIs, alignment with parent organization"],
      },
      {
        icon: "🏗️", title: "Phase 2: Setup & Foundation", description: "Legal, infrastructure, and operational establishment",
        tags: ["Legal Setup", "Infrastructure", "6-12 months"],
        details: ["Legal Entity Formation: Registration, SEZ/STPI approvals, compliance setup", "Real Estate & Infrastructure: Office space, IT infrastructure, security protocols", "Vendor Management: Payroll, HR, facilities, IT service providers", "Initial Hiring: Leadership team, core operational staff", "Process Documentation: SOPs, governance frameworks, reporting structures"],
      },
      {
        icon: "⚡", title: "Phase 3: Stabilization", description: "Process optimization and stakeholder confidence",
        tags: ["Operations", "Quality", "12-24 months"],
        details: ["Process Standardization: Workflow optimization, quality benchmarks", "Stakeholder Management: Building trust with HQ, demonstrating value", "Talent Retention: Career paths, training programs, culture building", "Technology Adoption: Automation tools, RPA, cloud migration", "Performance Tracking: KPI dashboards, quarterly reviews, continuous improvement"],
      },
      {
        icon: "📈", title: "Phase 4: Growth & Scaling", description: "Expansion of capabilities and headcount",
        tags: ["Expansion", "Capabilities", "2-4 years"],
        details: ["Function Expansion: Adding new domains (R&D, analytics, product)", "Headcount Growth: Phased hiring, talent pipeline development", "Center of Excellence: Specialized skill hubs, domain expertise", "Global Integration: Cross-geography collaboration, knowledge transfer", "Innovation Initiatives: Proof of concepts, pilot projects"],
      },
      {
        icon: "🚀", title: "Phase 5: Maturity & Optimization", description: "Strategic partnership and value creation",
        tags: ["Strategic", "Innovation", "4+ years"],
        details: ["Product Ownership: End-to-end accountability, business outcomes", "Innovation Hub: R&D, IP creation, competitive advantage", "Thought Leadership: Industry contributions, best practices sharing", "Continuous Upskilling: AI/ML, emerging tech capabilities", "Global Integration: Seamless operations with HQ, strategic decision-making"],
      },
      {
        icon: "🔄", title: "Phase 6: Transformation or Exit", description: "Evolution, consolidation, or planned sunset",
        tags: ["Evolution", "Exit Strategy", "Ongoing"],
        details: ["Strategic Pivots: Function rebalancing, geographic shifts", "Consolidation: Merging with other centers, efficiency drives", "Wind-Down Planning: Responsible exit, knowledge transfer", "Transition Management: Staff redeployment, vendor settlements", "Exit Readiness: Documentation, compliance, stakeholder communication"],
      },
    ],
  },
  {
    id: "maturity",
    label: "Maturity Levels",
    title: "GCC Maturity Model",
    cards: [
      {
        icon: "🔹", title: "Stage 1: Cost Center", description: "Focus on reducing expenses through labor arbitrage",
        tags: ["Cost Savings", "Basic Functions"],
        details: ["Primary Goal: 30-50% cost reduction", "Functions: Back-office, IT support, basic operations", "KPIs: Cost per FTE, cost savings percentage", "Decision Rights: HQ-driven, minimal autonomy", "Typical Duration: 1-2 years", "Risk: Viewed as commodity, vulnerable to outsourcing"],
      },
      {
        icon: "🔷", title: "Stage 2: Service Provider", description: "Focus on delivering quality services efficiently",
        tags: ["Efficiency", "SLA-driven"],
        details: ["Primary Goal: High-quality delivery, meeting SLAs", "Functions: Process excellence, standardized workflows", "KPIs: Turnaround time, quality metrics, productivity", "Capabilities: RPA adoption, process optimization (10-15% efficiency gains)", "Challenge: Most GCCs plateau here—optimizing efficiency but not strategic value"],
      },
      {
        icon: "🔶", title: "Stage 3: Capability Builder", description: "Developing deep domain and functional expertise",
        tags: ["Expertise", "Domain Knowledge"],
        details: ["Primary Goal: Building specialized skills and domain mastery", "Functions: Analytics, product support, technical centers of excellence", "KPIs: Skill depth, problem-solving autonomy, stakeholder trust", "Leadership: Strong middle management, reduced HQ dependency", "Culture Shift: From execution to solution-oriented thinking"],
      },
      {
        icon: "💎", title: "Stage 4: Value Creator", description: "Taking ownership of business outcomes",
        tags: ["Ownership", "Business Outcomes"],
        details: ["Primary Goal: Delivering measurable business impact", "Functions: Product ownership, end-to-end accountability", "KPIs: Revenue impact, product launches, innovation delivered", "Decision Making: Cross-functional teams, local decision rights", "Examples: Owning digital products, platform development"],
      },
      {
        icon: "🌟", title: "Stage 5: Innovation Engine", description: "Creating competitive advantage and new value",
        tags: ["Innovation", "IP Creation"],
        details: ["Primary Goal: Creating IP, driving competitive advantage", "Functions: R&D, AI/ML innovation, new business models", "KPIs: Patents filed, products launched, market differentiation", "Integration: Seamless with HQ, viewed as strategic asset", "Maturity: Only 8% of GCCs reach this stage (BCG 2025)", "Risk: 30% of GCCs expected to consolidate/close by 2028"],
      },
      {
        icon: "📊", title: "Maturity Assessment Framework", description: "Key dimensions for measuring GCC maturity",
        tags: ["Assessment", "Framework"],
        details: ["Operating Model: Structure, governance, decision rights", "Talent Maturity: Skill depth, leadership pool, retention", "Digital Capabilities: AI/ML, cloud, automation adoption", "Business Alignment: Strategic integration with parent company", "Innovation Output: IP creation, reusable platforms", "Cultural Integration: Seamless collaboration across geographies"],
      },
    ],
  },
  {
    id: "sizes",
    label: "GCC Sizes",
    title: "GCC Size Categories",
    cards: [
      {
        icon: "🏢", title: "Micro/Nano GCC (10-50 employees)", description: "Pilot phase and proof of concept",
        tags: ["Startup Phase", "Pilot Projects"],
        details: ["Typical Functions: IT development, analytics, finance operations", "Setup Time: 3-6 months", "Investment: $500K - $2M initial setup", "Advantages: Agile, low risk, fast setup, proof of concept", "Challenges: Limited scale, higher per-FTE costs, talent attraction", "Best For: Testing GCC model, niche capabilities, SMEs"],
      },
      {
        icon: "🏬", title: "Small GCC (50-250 employees)", description: "Multi-function growth phase",
        tags: ["Growth Phase", "Multi-function"],
        details: ["Typical Functions: IT, finance, HR, customer support, analytics", "Setup Time: 6-12 months", "Investment: $2M - $10M initial setup", "Advantages: Better talent attraction, economies of scale beginning", "Challenges: Middle management development, process standardization", "Best For: Mid-market companies, regional focus, targeted capabilities"],
      },
      {
        icon: "🏛️", title: "Medium GCC (250-1,000 employees)", description: "Strategic partner with scaled operations",
        tags: ["Strategic Partner", "Scaled Operations"],
        details: ["Typical Functions: Product engineering, R&D, advanced analytics, CoEs", "Setup Time: 12-18 months", "Investment: $10M - $50M initial setup", "Advantages: Strong employer brand, talent retention, innovation capability", "Challenges: Cultural integration, governance complexity", "Best For: Large enterprises, strategic transformation initiatives"],
      },
      {
        icon: "🏙️", title: "Large GCC (1,000-5,000 employees)", description: "Innovation hub at enterprise scale",
        tags: ["Innovation Hub", "Enterprise Scale"],
        details: ["Typical Functions: Full stack development, AI/ML, cloud, cybersecurity", "Setup Time: 18-24 months", "Investment: $50M - $200M+ initial setup", "Advantages: Global talent magnet, multiple CoEs, IP creation", "Challenges: Attrition management (15-20%), complexity, dependencies", "Cost Impact: ₹50-70 crore annual attrition cost (per 1,000 employees)"],
      },
      {
        icon: "🌐", title: "Mega GCC (5,000+ employees)", description: "Global headquarters and strategic leadership",
        tags: ["Global HQ", "Strategic Leadership"],
        details: ["Examples: JPMorgan (20K+), Goldman Sachs (8K+), Microsoft (10K+)", "Typical Functions: Global product ownership, entire business units", "Investment: $200M+ ongoing", "Advantages: Strategic asset, ecosystem development, thought leadership", "Challenges: Talent market saturation, real estate constraints", "Locations: Bengaluru, Hyderabad, Pune (India); Warsaw (Poland)"],
      },
      {
        icon: "📐", title: "Right-Sizing Your GCC", description: "Framework for optimal sizing decisions",
        tags: ["Strategy", "Planning"],
        details: ["Start Small, Scale Gradually: Begin with pilot (50-100), validate, then expand", "Function Criticality: High-value functions justify larger investments", "Parent Company Size: GCC typically 5-15% of global workforce", "Location Capacity: Tier 1 cities support mega GCCs, Tier 2 ideal for medium", "Attrition Risk: Larger centers need stronger retention programs", "Avoid Over-Scaling: 30% consolidation expected by 2028"],
      },
    ],
  },
  {
    id: "geography",
    label: "Geography",
    title: "GCC Geography Guide",
    cards: [
      {
        icon: "🇮🇳", title: "India - Dominant GCC Hub", description: "1,700+ centers with mature ecosystem",
        tags: ["Mature Ecosystem", "Scale"],
        details: ["Tech Talent Pool: 5.4M+ IT professionals, 1.5M annual STEM graduates", "Cost Advantage: 40-50% lower than US/UK", "Top Cities: Bengaluru (500+), Hyderabad (355), Pune, Chennai, NCR", "Emerging Hubs: Ahmedabad, Coimbatore, Kochi, Vizag", "Challenges: High attrition (15-25%), time zone gap (10.5 hrs), market saturation", "Growth Projection: 2,400+ centers by 2030"],
      },
      {
        icon: "🇲🇽", title: "Mexico - Nearshore Advantage", description: "US-aligned time zones with growing ecosystem",
        tags: ["Nearshore", "Time Zone"],
        details: ["Tech Talent Pool: 800K+ tech specialists", "Cost Advantage: 47-54% lower dev salaries than US", "Time Zone: GMT-6 (mirrors Chicago, Austin, Dallas)", "Top Cities: Mexico City, Guadalajara, Monterrey", "Advantages: Cultural affinity, real-time collaboration, growing ecosystem (1,137 startups)", "Education: 22 universities in QS World Rankings, 110K annual STEM grads"],
      },
      {
        icon: "🇨🇴", title: "Colombia - Emerging Nearshore", description: "Rising star with US East Coast alignment",
        tags: ["Emerging", "GMT-5"],
        details: ["Tech Talent Pool: 165K+ tech professionals", "Cost Advantage: 49-59% salary savings vs US", "Time Zone: GMT-5 (perfect US East Coast alignment)", "Top Cities: Bogotá, Medellín, Cali", "Business Climate: A4-rated, growing digital economy", "Advantages: Bilingual talent, government incentives, improving infrastructure"],
      },
      {
        icon: "🇵🇱", title: "Poland - EU Engineering Hub", description: "Premium quality with EU regulatory access",
        tags: ["EU Access", "Quality"],
        details: ["Tech Talent Pool: 430K+ IT professionals", "Cost Advantage: 40-50% lower senior salaries vs Western Europe", "Top Cities: Warsaw, Kraków, Wrocław, Poznań", "Advantages: EU regulations, strong skills, high English proficiency, innovation-friendly", "Education: Excellent STEM programs, tech university partnerships", "Time Zone: CET (aligned with Western Europe)"],
      },
      {
        icon: "🇷🇴", title: "Romania - Value & Quality", description: "Strong engineering with EU protections",
        tags: ["EU", "Engineering"],
        details: ["Tech Talent Pool: 200K+ IT professionals", "Cost Advantage: 45-55% lower than Western Europe", "Top Cities: Bucharest, Cluj-Napoca, Timișoara, Iași", "Advantages: Strong math/engineering education, EU protections", "Growing Ecosystem: Tech parks, startup hubs, government support"],
      },
      {
        icon: "🇺🇦", title: "Ukraine - Tech Powerhouse", description: "Top-tier STEM with competitive costs",
        tags: ["High Skills", "Digital Gov"],
        details: ["Tech Talent Pool: 302K+ tech experts", "Cost Advantage: 50-60% savings vs US", "Top Cities: Kyiv, Lviv, Kharkiv, Dnipro", "Advantages: Top-tier STEM output, digital government, open data", "Specialties: Cybersecurity, blockchain, AI/ML, gaming", "Note: Geopolitical considerations require careful assessment"],
      },
      {
        icon: "🇵🇭", title: "Philippines - Service Excellence", description: "BPO leadership with English proficiency",
        tags: ["English", "BPO"],
        details: ["Tech Talent Pool: 500K+ BPO/IT workforce", "Cost Advantage: 60-70% lower than US for support roles", "Top Cities: Manila, Cebu, Davao", "Advantages: Excellent English, cultural compatibility, customer service excellence", "Best For: Customer support, IT helpdesk, back-office operations"],
      },
      {
        icon: "🌎", title: "Location Selection Framework", description: "Multi-criteria decision framework",
        tags: ["Decision Framework", "Strategy"],
        details: ["Talent Availability: Current pool + future pipeline (universities)", "Cost Structure: Salary, real estate, infrastructure, taxes", "Time Zone: Overlap with HQ for real-time collaboration", "Regulatory Environment: Business-friendly policies, IP protection", "Infrastructure: Digital connectivity, office space, transportation", "Geopolitical Stability: Political risk, economic stability", "Cultural Compatibility: Work ethic alignment, language proficiency", "Scalability: Ability to grow from 100 to 1,000+ employees"],
      },
    ],
  },
  {
    id: "challenges",
    label: "Challenges",
    title: "Challenges & Solutions",
    cards: [
      {
        icon: "👥", title: "Talent Attrition Crisis", description: "₹50-70 crore annual cost per 1,000 employees",
        tags: ["Critical", "People"],
        details: ["Impact: ₹50-70 crore annual cost for 1,000-person center", "Root Causes: Competing offers, inadequate career paths, poor culture", "Solution - Proactive Strategy: Career progression pathways from day one", "Solution - Competitive Comp: Market benchmarking, equity programs, benefits", "Solution - Upskilling: Continuous learning, certifications, global mobility", "Best Practice: Recruit-Train-Deploy (RTD) models reduce attrition by 78%", "Retention Factor: Customized training increases retention 2.3x"],
      },
      {
        icon: "🎓", title: "Skills Gap & Technology Change", description: "63% prioritize AI/ML capabilities",
        tags: ["Skills", "Technology"],
        details: ["Gap Areas: AI/ML (63% priority), data engineering (54%), cloud, cybersecurity", "Solution - Learning Culture: Make L&D core to GCC DNA", "Solution - Partnerships: Ed-tech platforms, university collaborations", "Solution - Internal Academies: JPMorgan AI Academy model, specialized training", "Solution - Peer Learning: Cross-functional exposure, mentorship programs", "Technology Adoption: Digital CoEs to pilot new tech before scaling"],
      },
      {
        icon: "🏛️", title: "Governance & Decision Rights", description: "Transitioning from execution to strategy",
        tags: ["Governance", "Autonomy"],
        details: ["Problem: GCC stuck as execution arm, not strategic partner", "Solution - Clear Decision Rights: Define what GCC can decide independently", "Solution - Accountability: Shift from output to outcome ownership", "Solution - Leadership Empowerment: Local leaders with strategic mandate", "Solution - Business-Aligned KPIs: Measure business outcomes, not just activity", "Maturity Requirement: Transition requires intentional HQ investment"],
      },
      {
        icon: "🌐", title: "Cultural & Communication Barriers", description: "Time zone and work culture challenges",
        tags: ["Culture", "Communication"],
        details: ["Time Zone Challenges: 10+ hours difference (India-US) reduces collaboration", "Work Culture Gaps: Different expectations, communication styles", "Solution - Overlap Hours: Establish core collaboration windows", "Solution - Cultural Training: Cross-cultural awareness programs", "Solution - Rotation Programs: GCC staff working temporarily at HQ", "Solution - Unified Tools: Common platforms for transparency and alignment"],
      },
      {
        icon: "⚖️", title: "Compliance & Regulatory Risk", description: "Navigating complex multi-jurisdiction requirements",
        tags: ["Compliance", "Risk"],
        details: ["Key Areas: SEZ/STPI approvals, labor laws, tax compliance, data privacy", "India-Specific: GST, PF, ESI, contract labor regulations", "Solution - Expert Partners: Local legal and compliance advisors", "Solution - Governance: Strong internal controls, audit trails", "Solution - Data Security: GDPR, SOC2, ISO certifications", "Common Pitfall: Underestimating compliance causes deal failures in exits"],
      },
      {
        icon: "🏗️", title: "Infrastructure & Vendor Management", description: "Avoiding delays and quality issues",
        tags: ["Operations", "Infrastructure"],
        details: ["Common Delays: Real estate, IT infrastructure, vendor onboarding", "Pitfall: Choosing location only on cost, ignoring quality factors", "Solution - Early Planning: Infrastructure 6 months ahead of hiring", "Solution - Proven Vendors: Work with experienced GCC setup partners", "Solution - Backup Systems: Redundancy for critical infrastructure", "Solution - Scalability: Design for 2-3x growth from day one"],
      },
      {
        icon: "🚨", title: "Innovation Plateau & Closure Risk", description: "Only 8% show innovation maturity",
        tags: ["Strategic Risk", "Innovation"],
        details: ["Warning Signs: Only 8% show innovation maturity (BCG 2025)", "Risk Factors: Headcount-focused KPIs, no IP creation, weak autonomy", "Solution - Anchor Capability: Focus on 1-2 irreplaceable capabilities", "Solution - Kill Unproductive CoEs: COE without adoption = expensive title", "Solution - Platform Thinking: Build reusable APIs, libraries, tools", "Solution - Innovation KPIs: Measure IP reused, cost saved, revenue unlocked", "Critical: If innovation can't defend budget financially, it won't survive"],
      },
      {
        icon: "🔄", title: "Scaling Too Fast", description: "Growth without stability creates fragility",
        tags: ["Growth", "Scaling"],
        details: ["Problem: Expanding too quickly leads to inefficiencies, culture dilution", "Solution - Phased Approach: Pilot → Validate → Scale gradually", "Solution - Process First: Stabilize operations before expansion", "Solution - Talent Pipeline: Build hiring capacity before growth", "Solution - Performance Monitoring: Track metrics closely during growth", "Best Practice: Expand in 25-30% increments, not doubling overnight"],
      },
    ],
  },
  {
    id: "bestpractices",
    label: "Best Practices",
    title: "GCC Best Practices",
    cards: [
      { icon: "🎯", title: "Strategic Alignment", description: "Align GCC with parent company vision", tags: ["Strategy"], details: ["Define Clear Objectives: Beyond cost savings—strategic capabilities", "Business Outcome KPIs: Product launches, revenue impact, innovation delivered", "Regular Alignment: Quarterly strategy reviews with HQ leadership", "Stakeholder Engagement: Build trust through consistent value demonstration", "Long-term Vision: 3-5 year roadmap aligned with company goals"] },
      { icon: "🏃", title: "Start Small, Scale Gradually", description: "Validate before expanding", tags: ["Growth"], details: ["Pilot Team: Start with 50-100 focused team", "Validate Processes: Test workflows, governance, communication", "Build Local Leadership: Hire senior leaders early for credibility", "Success Metrics: Clear criteria for scaling decision", "Timeline: 12-18 months stabilization before major expansion"] },
      { icon: "👔", title: "Skills-First Hiring", description: "Competency over credentials", tags: ["Talent"], details: ["Competency-Based: Assess actual skills, not just resume brands", "Cultural Fit: Alignment with values, collaboration mindset", "Growth Potential: Hire for learning agility, not just current knowledge", "Diverse Pipelines: Partner with universities, bootcamps, non-traditional sources", "Candidate Experience: Treat as retention tool—first impression matters"] },
      { icon: "📚", title: "Continuous Learning Ecosystem", description: "Make L&D core to GCC DNA", tags: ["Learning"], details: ["Structured Programs: AI/ML, cloud, emerging tech certifications", "Internal Academies: Domain-specific training aligned with GCC focus", "Cross-Functional Exposure: Rotation programs, knowledge sharing sessions", "Recognize Learning: Reward skill development and innovation", "Partner with Experts: Ed-tech platforms, universities, industry specialists"] },
      { icon: "🤝", title: "Strong Governance Model", description: "Clear roles, accountability, and cadence", tags: ["Governance"], details: ["RACI Framework: Clear roles—Responsible, Accountable, Consulted, Informed", "Decision Authority: Define what GCC can decide vs. escalate", "Regular Cadence: Weekly ops, monthly reviews, quarterly strategy", "Transparency: Shared dashboards, open communication channels", "Risk Management: Proactive issue identification and mitigation"] },
      { icon: "⚙️", title: "Technology Enablement", description: "Automation and cloud-first approach", tags: ["Technology"], details: ["Automation First: RPA for repetitive tasks (10-15% efficiency gains)", "Cloud Infrastructure: Scalable, secure, globally accessible", "Collaboration Tools: Unified platforms for seamless communication", "AI/ML Integration: Intelligent process automation, analytics", "Cybersecurity: Zero-trust architecture, regular audits, AI-enabled monitoring"] },
      { icon: "💼", title: "Product Ownership Transition", description: "From execution to end-to-end ownership", tags: ["Ownership"], details: ["End-to-End Responsibility: Full product lifecycle ownership", "Cross-Functional Teams: Product, engineering, design, QA together", "Business KPIs: Success measured by customer/business outcomes", "Empowered Decision-Making: Local teams make product decisions", "Customer Interaction: Direct engagement with users for feedback"] },
      { icon: "🌟", title: "Culture of Innovation", description: "Foster experimentation and IP creation", tags: ["Innovation"], details: ["Innovation Time: 10-20% time for experimental projects", "Hackathons: Regular events for creative solutions", "Fail Fast: Psychological safety to experiment and learn", "IP Creation: Encourage patents, reusable platforms, thought leadership", "Recognition: Celebrate innovation contributions publicly"] },
      { icon: "📊", title: "Performance Measurement", description: "Beyond cost to value metrics", tags: ["Metrics"], details: ["Beyond Cost: Value delivered, innovation output, business outcomes", "Balanced Scorecard: Financial, operational, customer, growth metrics", "Real-Time Dashboards: Visibility into performance for all stakeholders", "Quarterly Reviews: Actionable insights and course corrections", "Benchmarking: Compare against industry standards and peer GCCs"] },
      { icon: "🔐", title: "Risk & Compliance Readiness", description: "Proactive regulatory and security posture", tags: ["Compliance"], details: ["Regulatory Compliance: Stay current with local labor, tax, data laws", "Audit Trails: Document processes, decisions, transactions", "Data Protection: GDPR, SOC2, ISO certifications", "Risk Registers: Proactive identification and mitigation plans", "Business Continuity: Disaster recovery, backup systems, crisis plans"] },
      { icon: "🎨", title: "Employer Branding", description: "Attract and retain top talent", tags: ["Branding"], details: ["Employee Value Proposition: Clear career growth, meaningful work, impact", "Success Stories: Showcase employee achievements, promotions", "Campus Engagement: University partnerships, internships, hackathons", "Social Media: Active presence on LinkedIn, tech communities", "Awards & Recognition: 'Best Employer' certifications, industry accolades"] },
      { icon: "🌍", title: "Global Integration", description: "Seamless cross-geography collaboration", tags: ["Integration"], details: ["Unified Processes: Standard workflows across all locations", "Knowledge Management: Centralized repositories, documentation", "Rotation Programs: Staff exchanges between GCC and HQ", "Global Teams: Mixed geography teams working on same projects", "Cultural Awareness: Training on working across cultures effectively"] },
    ],
  },
  {
    id: "resources",
    label: "Resources",
    title: "GCC Resources & Tools",
    cards: [
      { icon: "📖", title: "Official Reports & Research", description: "Strategy documents from leading consulting firms", tags: ["Reports", "Research", "PDF"], details: [
        "BCG Rewriting the GCC Playbook 2025: https://web-assets.bcg.com/66/c2/16f4539648f0a6a455ce5058f7f2/rewriting-the-global-capability-center-playbook.pdf",
        "Everest Group GCC Transformation Landscape 2025: https://www.everestgrp.com/how-global-capability-centers-are-driving-transformation-the-evolving-landscape-blog/",
        "Zinnov Location Analysis & GCC Reports 2025: https://zinnov.com/global-capability-center-setup-location-analysis-2025-report/",
        "KPMG GCC Tax Insights & Services 2025: https://assets.kpmg.com/content/dam/kpmgsites/in/pdf/2025/09/gccs-in-india-key-tax-insights.pdf",
        "Deloitte Global GCC Hub: https://www.deloitte.com/in/en/Industries/global-gcc.html",
      ] },
      { icon: "🏢", title: "Consulting & Advisory Firms", description: "Expert partners for GCC setup, strategy and scaling", tags: ["Advisory", "Big 4", "Consulting"], details: [
        "Zinnov GCC Advisory & CoE Setup: https://zinnov.com/centers-of-excellence/",
        "Inductus GCC Maturity Model (5 Stages): https://inductusgcc.com/the-gcc-maturity-model-5-stages-of-capability-center-growth-explained/",
        "eSparkBiz GCC Setup Services: https://www.esparkinfo.com/global-capability-center",
        "Alcor GCC-as-a-Service (India + Nearshore): https://alcor.com/global-capability-center-setup/",
        "TM Services GCC Staffing & Consulting: https://tmservices.co.in/global-capability-centre-gcc/",
        "KPMG GCC Services: https://kpmg.com/in/en/insights/2025/09/gccs-in-india-key-tax-insights.html",
        "Deloitte GCC: https://www.deloitte.com/in/en/Industries/global-gcc.html",
        "EY GCC Insights: https://www.ey.com/en_in/insights/consulting/global-capability-centers",
        "PwC GCC Transformation: Search PwC India GCC on pwc.in",
      ] },
      { icon: "🏛️", title: "Government & Regulatory (India)", description: "Official gateways for compliance, tax benefits, and setup", tags: ["Government", "India", "Regulatory"], details: [
        "Invest India (National GCC Gateway): https://www.investindia.gov.in/sector/it-ites",
        "STPI (Software Technology Parks of India): https://www.stpi.in/",
        "Ministry of Corporate Affairs: https://www.mca.gov.in/",
        "Ministry of Labour & Employment: https://labour.gov.in/",
        "NASSCOM + GCC Community: https://nasscom.in/gcc/",
        "NASSCOM Community Forums: https://community.nasscom.in/communities/global-capability-centers",
        "UP GCC Policy 2024: https://invest.up.gov.in/up-gcc-policy-2024/",
        "Company Registration (MCA): https://www.mca.gov.in/content/mca/global/en/home.html",
        "PAN/TAN Application: https://www.incometax.gov.in",
        "GST Registration: https://www.gst.gov.in",
        "EPFO (PF Registration): https://www.epfindia.gov.in",
        "ESIC Registration: https://www.esic.gov.in",
      ] },
      { icon: "🌎", title: "Global Investment Agencies", description: "Alternative location investment promotion agencies", tags: ["International", "Locations"], details: [
        "Invest Philippines: https://investphilippines.gov.ph/",
        "Poland PAIH: https://www.paih.gov.pl/",
        "ProColombia: https://www.procolombia.co",
        "Mexico ProMexico: https://www.gob.mx/promexico",
        "Vietnam Briefing: https://www.vietnam-briefing.com/",
      ] },
      { icon: "🎓", title: "Training & Learning Platforms", description: "Upskilling, certifications, and development resources", tags: ["Learning", "Certification", "Upskilling"], details: [
        "Coursera for Business: https://www.coursera.org/business",
        "Udacity Enterprise (AI & Tech): https://www.udacity.com/enterprise",
        "LinkedIn Learning: https://www.linkedin.com/learning/",
        "NASSCOM FutureSkills Prime: https://futureskills.nasscom.in/",
        "Pluralsight (Tech Skills): https://www.pluralsight.com/",
        "AWS Training & Certifications: https://aws.amazon.com/training/",
        "Microsoft Azure Learn: https://learn.microsoft.com/en-us/training/",
        "Google Cloud Training: https://cloud.google.com/training",
      ] },
      { icon: "🌐", title: "Communities & Networks", description: "Professional networks, forums, and industry groups", tags: ["Community", "Networking", "Events"], details: [
        "GCC Pulse (Trends & Community): https://gcc-pulse.com/",
        "NASSCOM GCC Events & Summits: https://nasscom.in/gcc/",
        "LinkedIn GCC Groups: Search 'Global Capability Centers' or 'GCC India Leaders'",
        "GCC Summit India: https://gccsummit.in",
        "AmCham India: https://www.amchamindia.com",
        "British Business Group India (UKIBC): https://www.ukibc.com",
        "Reddit r/india_tech: https://www.reddit.com/r/india_tech",
        "Hacker News: https://news.ycombinator.com",
      ] },
      { icon: "⚖️", title: "Legal, Tax & Compliance", description: "Legal firms, tax advisors, and data privacy resources", tags: ["Legal", "Tax", "Privacy"], details: [
        "AZB & Partners (Corporate law, M&A): https://www.azbpartners.com",
        "Cyril Amarchand Mangaldas (Corporate, tax): https://www.cyrilshroff.com",
        "Khaitan & Co (Tech, IP, employment): https://www.khaitanco.com",
        "Nishith Desai Associates (Cross-border setup): Top tier tech law firm",
        "Deloitte India Tax: https://www2.deloitte.com/in/en/services/tax.html",
        "PwC India Tax: https://www.pwc.in/services/tax.html",
        "KPMG India Tax: https://kpmg.com/in/en/home/services/tax.html",
        "EY India Tax: https://www.ey.com/en_in/tax",
        "GDPR Official Site: https://gdpr.eu",
        "India Data Protection Act: https://www.meity.gov.in/data-protection-framework",
        "CCPA (California): https://oag.ca.gov/privacy/ccpa",
      ] },
      { icon: "💻", title: "Technology Platforms & Tools", description: "HR, collaboration, project management, and analytics", tags: ["Tools", "Platforms", "SaaS"], details: [
        "HRIS: Workday (workday.com), SAP SuccessFactors, Zoho People (zoho.com/people)",
        "Collaboration: Slack (slack.com), Microsoft Teams, Zoom (zoom.us)",
        "Project Management: Jira (atlassian.com/software/jira), Asana (asana.com), Monday.com",
        "Analytics: Tableau (tableau.com), Power BI (powerbi.microsoft.com)",
        "Learning Management: Docebo (docebo.com), TalentLMS (talentlms.com)",
        "Microsoft 365, Slack Enterprise, Jira, Asana, Workday for GCC operations",
      ] },
      { icon: "📊", title: "Benchmarking & Market Data", description: "Salary surveys, real estate, and talent analytics", tags: ["Data", "Salary", "Intelligence"], details: [
        "Mercer Salary Surveys: https://www.mercer.com/solutions/talent/salary-surveys.html",
        "Aon Salary Surveys: https://www.aon.com/human-capital-solutions/salary-surveys.jsp",
        "ECA International (Expat comp): https://www.eca-international.com",
        "CBRE India (Office space): https://www.cbre.co.in",
        "JLL India (Real estate): https://www.jll.co.in",
        "LinkedIn Talent Insights: https://business.linkedin.com/talent-solutions/talent-insights",
        "Indeed Hiring Lab: https://www.hiringlab.org",
        "Levels.fyi (GCC salaries): https://www.levels.fyi",
        "Crunchbase (funding data): https://www.crunchbase.com",
        "CB Insights (tech trends): https://www.cbinsights.com",
      ] },
      { icon: "🎯", title: "Assessment & Calculator Tools", description: "Maturity assessments, cost calculators, and ROI models", tags: ["Assessment", "Calculator"], details: [
        "GCC Maturity Assessment (eSparkBiz): https://www.esparkinfo.com/gcc-maturity-assessment",
        "GCC Setup Cost Calculator (TM Services): https://tmservices.co.in/gcc-cost-calculator",
        "Location Scorecard Tool (Zinnov): https://zinnov.com/location-scorecard",
        "ANSR GCC Setup Calculator: Search ANSR GCC Calculator",
        "ROI Calculator: Spreadsheet-based NPV, IRR, payback models from consulting firms",
      ] },
      { icon: "📚", title: "Templates & Frameworks", description: "Ready-to-use documents, charters, and SOPs", tags: ["Templates", "Documents"], details: [
        "Business Case Template: Financial projections, risk assessment, KPIs (NASSCOM, consulting firms)",
        "Governance Charter Template: RACI, decision rights, escalation paths (Deloitte, KPMG)",
        "SOP Documentation Framework: Process flows, quality standards (ISO)",
        "KPI Dashboard Templates: Balanced scorecard metrics (Tableau, Power BI communities)",
        "Vendor RFP Templates: Requirements, evaluation criteria for procurement",
        "BCG Playbook Templates: Strategy and planning templates",
      ] },
      { icon: "🎤", title: "Events & Conferences 2026", description: "Major industry events and regional meetups", tags: ["Events", "Conferences"], details: [
        "GCC Summit India 2026: Sep 15-17, Bengaluru — https://gccsummit.in",
        "NASSCOM Technology & Leadership Forum: Feb 2026, Mumbai — https://nasscom.in/tlf",
        "HR Tech Summit India: Jun 2026, Hyderabad — https://hrtechsummit.in",
        "AWS re:Invent: Nov 2026, Las Vegas — https://reinvent.awsevents.com",
        "Google Cloud Next: Apr 2026, San Francisco — https://cloud.withgoogle.com/next",
        "Bengaluru GCC Leaders Meetup: Quarterly — Meetup.com / LinkedIn",
        "Hyderabad GCC Forum: Bi-monthly focus on talent & ops excellence",
      ] },
      { icon: "📢", title: "News & Thought Leadership", description: "Stay updated with GCC news, blogs, and podcasts", tags: ["News", "Blogs", "Podcasts"], details: [
        "GCC Pulse: Dedicated GCC news — https://gcc-pulse.com/",
        "Economic Times Tech: India GCC coverage — https://economictimes.indiatimes.com/tech",
        "Inc42: Startup & tech ecosystem — https://inc42.com",
        "YourStory: Technology & business — https://yourstory.com",
        "Zinnov Blog: Weekly GCC insights — https://zinnov.com/blog",
        "Inductus GCC Blog: Maturity & practices — https://inductusgcc.com/blog",
        "eSparkBiz GCC Insights: Digital transformation — https://www.esparkinfo.com/blog/category/gcc",
        "Podcasts: Tech Leadership Podcast, GCC Unplugged on Spotify",
        "'GCC 2030 & Beyond' events on YouTube",
      ] },
      { icon: "🚀", title: "Quick Start Checklist", description: "90-day launch plan for your GCC", tags: ["Checklist", "Launch"], details: [
        "Days 1-30: Strategic planning, feasibility study, location selection",
        "Days 31-60: Legal entity, real estate, hire leadership, vendor onboarding",
        "Days 61-90: Infrastructure setup, initial hiring, process documentation",
        "Month 4-6: Operations stabilization, stakeholder management",
        "Month 7-12: Performance optimization, capability building, scaling preparation",
        "Tip: Feed all resource URLs into your app Resources tab for clickable access",
        "Download: Zip all PDFs + this resource list for complete offline bible",
      ] },
    ],
  },
  {
    id: "finance",
    label: "Finance & Accounting",
    title: "Finance & Accounting",
    cards: [
      {
        icon: "📊", title: "CapEx vs OpEx Management", description: "Capital vs operational expenditure frameworks for GCCs",
        tags: ["CapEx", "OpEx", "Budgeting"],
        details: [
          "CapEx: Office fit-out, servers, network gear → Capitalize and depreciate",
          "OpEx: Salaries, cloud subscriptions, rent, support → Expense immediately",
          "CFI Guide: Comprehensive CapEx vs OpEx decision framework https://corporatefinanceinstitute.com/resources/accounting/capex-vs-opex/",
          "Cloud Shift: Modern GCCs moving from CapEx (on-prem) to OpEx (cloud-first)",
          "Tax Impact: CapEx depreciation schedules vs immediate OpEx deductions affect cash flow",
        ],
      },
      {
        icon: "🏛️", title: "SEZ vs STPI vs Non-STPI", description: "Comparing tax benefit structures for GCC setup in India",
        tags: ["SEZ", "STPI", "Tax Benefits"],
        details: [
          "SEZ: 15-year tax holiday, duty-free imports, dedicated infrastructure https://sourcebae.com/blog/gccs-in-india-tax-reliefs-incentives-explained/",
          "STPI: 10-year tax benefits, location flexibility, simpler compliance",
          "Non-STPI: No special tax benefits but maximum location freedom",
          "Comparison Guide: TaxGuru deep dive on choosing the right model https://taxguru.in/corporate-law/choosing-model-gccs-india-sez-stpi-non-stpi.html",
          "GST Exemptions: Exports from SEZ units exempt from GST",
          "Decision Factors: Scale, timeline, compliance appetite, location preference",
        ],
      },
      {
        icon: "📑", title: "KPMG GCC Tax Insights", description: "Key tax considerations for GCCs operating in India",
        tags: ["Tax", "KPMG", "India"],
        details: [
          "KPMG Report: Comprehensive GCC tax guide (PDF) https://assets.kpmg.com/content/dam/kpmgsites/in/pdf/2025/09/gccs-in-india-key-tax-insights.pdf",
          "Single vs Multiple Registrations: Implications for tax and compliance",
          "Transfer Pricing: Document intercompany SLAs, cost allocation methodologies",
          "Cost Optimization: Tax-efficient structuring of GCC operations",
          "Withholding Tax: Cross-border payment considerations for GCC entities",
        ],
      },
      {
        icon: "📐", title: "GAAP vs Ind AS vs IFRS", description: "Accounting standards comparison for multinational GCCs",
        tags: ["GAAP", "Ind AS", "IFRS"],
        details: [
          "PwC Comparison (PDF): IFRS, US GAAP, Ind AS, Indian GAAP side-by-side https://www.pwc.in/assets/pdfs/publications/2017/ifrs-us-gaap-ind-as-and-indian-gaap-similarities-and-differences.pdf",
          "Key Differences: Revaluation model, inventory (no LIFO under Ind AS), fair value emphasis",
          "Transitioning: Practical reconciliation from Ind AS to US GAAP https://blog.ipleaders.in/transitioning-from-indian-accounting-standards-to-us-gaap-a-practical-approach/",
          "Deloitte Guide: Indian GAAP, IFRS, and Ind AS implementation https://www.deloitte.com/in/en/services/audit-assurance/services/assurance/indian-gaap-ifrs-and-ind-as.html",
          "LawSikho: Ind AS reconciliation tools and sample tables https://lawsikho.com/blog/transitioning-from-ifrs-ind-as-to-us-gaap/",
        ],
      },
      {
        icon: "📈", title: "GCC Efficiency & Success Metrics", description: "Measuring financial performance and value realization",
        tags: ["Metrics", "Performance", "KPIs"],
        details: [
          "Inductus Framework: 8 pillars of GCC efficiency measurement (PDF) https://inductusgcc.com/wp-content/uploads/2025/05/A-Guide-to-Measuring-Global-Capability-Center-GCC-Efficiency-and-Success-Pillars.pdf",
          "Financial KPIs: Cost per FTE, cost avoidance, revenue per employee",
          "Value Metrics: IP creation, product launches, innovation output",
          "Balanced Scorecard: Financial, operational, customer, and growth dimensions",
          "Benchmarking: Compare against industry standards and peer GCCs",
        ],
      },
      {
        icon: "📊", title: "Financial Dashboards & Tools", description: "Templates and platforms for GCC financial reporting",
        tags: ["Dashboards", "Tools", "Reporting"],
        details: [
          "Qlik: 12 financial dashboard examples — revenue, cash flow, P&L https://www.qlik.com/us/dashboard-examples/financial-dashboards",
          "Coupler.io: 26 financial dashboard templates for QuickBooks, Xero, Excel https://blog.coupler.io/financial-dashboards/",
          "Power BI: Microsoft's enterprise analytics for GCC financial reporting",
          "Tableau: Advanced visualization for cross-geography financial consolidation",
          "Key Dashboards: Revenue tracking, cost center P&L, transfer pricing reconciliation",
        ],
      },
    ],
  },
];

export const navItems = [
  { id: "overview", label: "Overview" },
  { id: "resources", label: "Resources" },
  ...sections.filter((s) => s.id !== "resources").map((s) => ({ id: s.id, label: s.label })),
];
