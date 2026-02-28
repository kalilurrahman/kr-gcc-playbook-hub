export interface Resource {
  category: string;
  type: string;
  url: string;
  name: string;
}

// Cleaned resource library: failure URLs removed, success URLs merged & de-duplicated
export const allResources: Resource[] = [
  // Benchmarking
  { category: "Benchmarking", type: "Web Dashboard", url: "https://wetheuae2031.com/benchmark/", name: "GCC Benchmark Intelligence - WE THE UAE 2031" },
  { category: "Benchmarking", type: "Web Resource", url: "https://www.vision2030.ai/benchmark/", name: "Saudi Vision 2030 - GCC Benchmarks" },
  // Best Practices
  { category: "Best Practices", type: "Web Article", url: "https://amnic.com/blogs/best-practices-for-gcc", name: "Amnic - Best Practices for Global Capability Centers (GCCs)" },
  { category: "Best Practices", type: "Web Guide", url: "https://www.esparkinfo.com/global-capability-center/gcc-best-practices", name: "ESpark - GCC Best Practices for Building High-Impact GCCs in 2026" },
  { category: "Best Practices", type: "Web Article", url: "https://www.ivalueplus.com/gcc-best-practices-2025/", name: "iValuePlus - GCC Best Practices 2025" },
  { category: "Best Practices", type: "Web Article", url: "https://www.ivalueplus.com/gcc-best-practices-2026-what-high-performing-global-capability-centers-do-differently/", name: "iValuePlus - GCC Best Practices 2026" },
  // Communication
  { category: "Communication", type: "Web Resource", url: "https://www.iabc.com/gcc-internal-communications/", name: "IABC - Internal Communications for GCCs" },
  // Community
  { category: "Community", type: "Web Resource", url: "https://www.linkedin.com/groups/gcc-professionals/", name: "LinkedIn - GCC Professionals Group" },
  // Digital & GCC Evolution
  { category: "Digital & GCC Evolution", type: "Web Report", url: "https://www.oliverwyman.com/our-expertise/insights/2025/nov/india-gcc-evolution.html", name: "Oliver Wyman - The Next Evolution Of India's GCCs" },
  // Digital Strategy
  { category: "Digital Strategy", type: "Web Article", url: "https://www.linkedin.com/pulse/digital-transformation-strategy-map-practical-gcc-mazen-bou-diab-wjpuf", name: "Digital Transformation Strategy Map for GCC Businesses" },
  // Digital Transformation
  { category: "Digital Transformation", type: "Web Article", url: "https://www.linkedin.com/pulse/digital-transformation-gcc-smes-complete-2026-skeof", name: "Digital Transformation for GCC SMEs | Complete 2026 Guide" },
  { category: "Digital Transformation", type: "Pdf Report", url: "https://elibrary.imf.org/view/journals/087/2025/003/087.2025.issue-003-en.xml", name: "IMF - Digital Transformation in GCC Economies" },
  // Digital Trends
  { category: "Digital Trends", type: "Web Article", url: "https://www.oliverwyman.com/our-expertise/insights/2025/mar/7-digital-trends-transforming-the-gcc.html", name: "Oliver Wyman - 7 Digital Trends Transforming the GCC" },
  // Finance Operations
  { category: "Finance Operations", type: "Pdf Case Study", url: "https://hexaware.com/case-study/centralizing-and-transforming-finance-operations-building-a-global-capability-center-gcc/", name: "Hexaware - Transform Finance Operations with a GCC" },
  { category: "Finance Operations", type: "Web Article", url: "https://www.linkedin.com/pulse/how-indian-gccs-transforming-global-finance-2025-deepanya-gautam-qcrdc", name: "How Indian GCCs Are Transforming Global Finance in 2025" },
  // Finance Transformation
  { category: "Finance Transformation", type: "Web Resource", url: "https://www.grantthornton.in/events/navigating-finance-transformation-in-gccs/", name: "Grant Thornton - Navigating Finance Transformation in GCCs" },
  // Functions - HR
  { category: "Functions - HR", type: "Pdf Report", url: "https://www.mercer.com/our-thinking/career/gcc-hr-transformation.html", name: "Mercer - HR Transformation in GCCs" },
  // GCC Cybersecurity & Data Privacy
  { category: "GCC Cybersecurity & Data Privacy", type: "Article", url: "https://corporate.cyrilamarchandblogs.com/2024/07/data-privacy-and-cybersecurity-landscape-for-gccs-in-india-key-considerations/", name: "Cyril Amarchand: Data Privacy & Cybersecurity for GCCs" },
  { category: "GCC Cybersecurity & Data Privacy", type: "Annual Report", url: "https://www.dsci.in/content/annual-report-2024-25", name: "DSCI Annual Report 2024-25" },
  { category: "GCC Cybersecurity & Data Privacy", type: "Report PDF", url: "https://www.dsci.in/files/content/knowledge-centre/2024/DSCI-DIGEST-3.pdf", name: "DSCI Digest October 2024 – Cybersecurity Ecosystem" },
  { category: "GCC Cybersecurity & Data Privacy", type: "Web Page", url: "https://www.dsci.in/content/dsci-cyber-gcc-summit", name: "DSCI: Cyber GCC Summit" },
  { category: "GCC Cybersecurity & Data Privacy", type: "Report PDF", url: "https://www.dsci.in/files/content/knowledge-centre/2023/India%20Cybersecurity%20Domestic%20Market%202023%20Report.pdf", name: "DSCI: India Cybersecurity Domestic Market 2023" },
  { category: "GCC Cybersecurity & Data Privacy", type: "Web Page", url: "https://www.dsci.in/", name: "DSCI: India's Cybersecurity & Privacy Resource Hub" },
  { category: "GCC Cybersecurity & Data Privacy", type: "Report", url: "https://nasscom.in/knowledge-center/publications/dsci-kpmg-secure-india-2023-gcc-empowered-global-cybersecurity-and-digital-risk-management", name: "NASSCOM: DSCI-KPMG 'Secure in India' 2023" },
  // GCC ESG & Sustainability
  { category: "GCC ESG & Sustainability", type: "Article", url: "https://www.deloitte.com/in/en/about/press-room/indias-gccs-lead-in-empowerment-and-inclusion-driving-employee-centric-growth.html", name: "Deloitte India: GCCs Lead in Empowerment & Inclusion" },
  { category: "GCC ESG & Sustainability", type: "Report", url: "https://www.deloitte.com/in/en/services/consulting/services/human-capital/india-culture-index.html", name: "Deloitte India: Culture Sensing Report 2025" },
  { category: "GCC ESG & Sustainability", type: "Report", url: "https://www.deloitte.com/in/en/issues/climate/navigating-esg-global-regulations-and-tools.html", name: "Deloitte India: Navigating ESG Global Regulations" },
  { category: "GCC ESG & Sustainability", type: "Report", url: "https://www.deloitte.com/us/en/services/audit-assurance/articles/esg-survey.html", name: "Deloitte: 2024 Sustainability Action Report" },
  { category: "GCC ESG & Sustainability", type: "Article", url: "https://www.ey.com/en_in/insights/consulting/global-capability-centers/eight-ways-gcc-s-are-anchoring-global-esg-initiatives", name: "EY: 8 Ways GCCs Are Anchoring Global ESG Initiatives" },
  { category: "GCC ESG & Sustainability", type: "Article", url: "https://www.mondaq.com/india/diversity-equity-inclusion/1418944/yearly-rewind-diversity-equity-and-inclusion-dei", name: "Mondaq: DEI in India's GCC Ecosystem 2024" },
  { category: "GCC ESG & Sustainability", type: "Article", url: "https://www.ey.com/en_in/insights/climate-change-sustainability-services/esg-excellence-unlocking-potential-through-gcc-s", name: "EY: ESG Excellence – Unlocking Potential through GCCs" },
  { category: "GCC ESG & Sustainability", type: "Report PDF", url: "https://www.ey.com/content/dam/ey-unified-site/ey-com/en-in/insights/climate-change-sustainability-services/documents/ey-state-of-play-role-of-gcc-s-in-esg.pdf", name: "EY: State of Play – Role of GCCs in ESG (2023)" },
  { category: "GCC ESG & Sustainability", type: "Market Research", url: "https://univdatos.com/reports/india-esg-and-sustainability-consulting-market", name: "UniDatos: India ESG & Sustainability Consulting Market" },
  { category: "GCC ESG & Sustainability", type: "Report PDF", url: "https://www.ey.com/content/dam/ey-unified-site/ey-com/en-gl/about-us/analyst-relations/documents/ey-gl-verdantix-green-quadrant-esg-sustainability-consulting-03-2024.pdf", name: "Verdantix: Green Quadrant – ESG Consulting 2024" },
  { category: "GCC ESG & Sustainability", type: "Article", url: "https://www.ey.com/en_in/services/climate-change-sustainability-services/esg-compass/navigating-sustainable-future", name: "EY: Navigating a Sustainable Future – ESG Compass" },
  // GCC Ecosystem & Enablers
  { category: "GCC Ecosystem & Enablers", type: "Web Page", url: "https://www.manpowergroup.co.in/", name: "ManpowerGroup India: Workforce Solutions for GCCs" },
  { category: "GCC Ecosystem & Enablers", type: "Web Page", url: "https://nasscom.in/", name: "NASSCOM: GCC Apex Body" },
  { category: "GCC Ecosystem & Enablers", type: "Web Page", url: "https://www.teamlease.com/", name: "TeamLease: GCC Talent Deployment Partner" },
  // GCC Future & Trends
  { category: "GCC Future & Trends", type: "Blog", url: "https://aeriestechnology.com/future-gcc-trends-2025/", name: "Aeries Technology: Future GCC Trends 2025" },
  { category: "GCC Future & Trends", type: "Blog", url: "https://inductusgcc.com/", name: "Inductus: Why Enterprises Are Rethinking GCC Strategies" },
  { category: "GCC Future & Trends", type: "Blog", url: "https://zinnov.com/", name: "Zinnov: Globalization as PE's Value Lever" },
  // GCC Governance & Operating Framework
  { category: "GCC Governance & Operating Framework", type: "Event", url: "https://www.ey.com/en_in/services/consulting/global-capability-centers/gcc-exchange", name: "EY GCC Exchange – Quarterly Roundtable" },
  { category: "GCC Governance & Operating Framework", type: "Web Page", url: "https://www.pwc.com/gx/en/about/analyst-relations/2025/everest-gcc-transformation-india-2025.html", name: "PwC: Leader in Everest Group GCC PEAK Matrix 2025" },
  // GCC Government Policy
  { category: "GCC Government Policy", type: "Web Page", url: "https://stpi.in/en/", name: "STPI India: GCC Policy & Registration Portal" },
  // GCC Landscape & Market Overview
  { category: "GCC Landscape & Market Overview", type: "Report", url: "https://community.nasscom.in/communities/gcc/global-capability-centers-gcc-quarterly-landscape-report", name: "ANSR: GCC Quarterly Landscape Report 2024" },
  { category: "GCC Landscape & Market Overview", type: "Blog", url: "https://www.brickworkindia.com/blog/what-is-a-gcc-an-overview-of-gccs-in-india", name: "Brickwork India: What Is a GCC?" },
  { category: "GCC Landscape & Market Overview", type: "Report PDF", url: "https://www.dnb.co.in/files/reports/DNB-Rethinking-the-Future-of-Global-Capability-Centers-2025.pdf", name: "D&B India: Rethinking Future of GCCs 2025" },
  { category: "GCC Landscape & Market Overview", type: "Web Page", url: "https://www.deloitte.com/in/en/Industries/global-gcc.html", name: "Deloitte India: Global Capability Centers Hub" },
  { category: "GCC Landscape & Market Overview", type: "Report", url: "https://www.everestgrp.com/report/egr-2025-34-r-7804/", name: "Everest Group: Accelerating GCC Growth 2025" },
  { category: "GCC Landscape & Market Overview", type: "Report PDF", url: "https://ssfglobal.in/wp-content/uploads/2025/01/beyond-boundaries-gccs-shaping-tomorrows-enterprises-a-research-report-by-everest-group-n-ssf-global.pdf", name: "Everest Group: Beyond Boundaries – GCCs Shaping Tomorrow" },
  { category: "GCC Landscape & Market Overview", type: "Report", url: "https://www2.everestgrp.com/report/egr-2025-34-r-7314/", name: "Everest Group: Chasing the GCC Opportunity 2025" },
  { category: "GCC Landscape & Market Overview", type: "Blog", url: "https://www.everestgrp.com/shared-services-global-business-services-centers/the-evolution-and-growth-of-global-capability-centers-gccs-and-the-critical-role-of-providers-blog.html", name: "Everest Group: Evolution & Growth of GCCs" },
  { category: "GCC Landscape & Market Overview", type: "Web Page", url: "https://www.everestgrp.com/tag/gcc/", name: "Everest Group: GCC Research Hub" },
  { category: "GCC Landscape & Market Overview", type: "Report PDF", url: "https://www.hcltech.com/sites/default/files/documents/analyst-reports/files/2025/11/25/Everest-Group-GCC-Transformation-Capabilities.pdf", name: "Everest Group: GCC Transformation PEAK Matrix 2025" },
  { category: "GCC Landscape & Market Overview", type: "Web Hub", url: "https://www.everestgrp.com/market-insights/overview-of-the-global-gcc-market-market-insights.html", name: "Everest Group: Global GCC Market Insights" },
  { category: "GCC Landscape & Market Overview", type: "Report PDF", url: "https://inductusgcc.com/wp-content/uploads/2024/08/GCC-%E2%80%93-Annual-Report-2024.pdf", name: "Inductus GCC Annual Report 2024" },
  { category: "GCC Landscape & Market Overview", type: "Blog", url: "https://inductusgcc.com/global-capability-centers-in-india-evolution-benefits-for-global-firms/", name: "Inductus: GCCs in India – Evolution and Benefits" },
  { category: "GCC Landscape & Market Overview", type: "Report", url: "https://community.nasscom.in/communities/global-capability-centers/gcc-annual-report-2024", name: "NASSCOM: GCC Annual Report 2024" },
  { category: "GCC Landscape & Market Overview", type: "Blog", url: "https://community.nasscom.in/communities/global-capability-centers/global-capability-centers-reshaping-corporates", name: "NASSCOM: GCCs Reshaping Corporates" },
  { category: "GCC Landscape & Market Overview", type: "Report", url: "https://zinnov.com/centers-of-excellence/zinnov-nasscom-india-gcc-landscape-report-the-5-year-journey-report/", name: "NASSCOM-Zinnov: India GCC – 5-Year Journey" },
  { category: "GCC Landscape & Market Overview", type: "Report", url: "https://nasscom.in/knowledge-center/publications/nasscom-zinnov-india-gcc-trends-half-yearly-analysis", name: "NASSCOM-Zinnov: India GCC H1 2023" },
  { category: "GCC Landscape & Market Overview", type: "Report", url: "https://nasscom.in/knowledge-center/publications/nasscom-zinnov-india-gcc-trends-quarterly-analysis-q3cy2023", name: "NASSCOM-Zinnov: GCC Q3 CY2023" },
  { category: "GCC Landscape & Market Overview", type: "Report", url: "https://nasscom.in/knowledge-center/publications/india-gcc-trends-quarterly-analysis-q4cy2023", name: "NASSCOM-Zinnov: GCC Q4 CY2023" },
  { category: "GCC Landscape & Market Overview", type: "Report", url: "https://nasscom.in/knowledge-center/publications/forging-ahead-strategic-partnerships-between-global-capability", name: "NASSCOM: GCC & Service Provider Partnerships" },
  { category: "GCC Landscape & Market Overview", type: "Report", url: "https://nasscom.in/knowledge-center/publications/gcc-40-india-redefining-globalization-blueprint", name: "NASSCOM: GCC 4.0 – India Blueprint" },
  { category: "GCC Landscape & Market Overview", type: "Article", url: "https://community.nasscom.in/communities/global-capability-centers/gcc-industry-brief-feb-2025-inductus", name: "NASSCOM: GCC Industry Brief Feb 2025" },
  { category: "GCC Landscape & Market Overview", type: "Report", url: "https://nasscom.in/knowledge-center/publications/gccs-india-building-resilience-sustainable-growth", name: "NASSCOM: GCCs – Building Resilience" },
  { category: "GCC Landscape & Market Overview", type: "Report", url: "https://nasscom.in/knowledge-center/publications/india-gcc-landscape-report-5-year-journey", name: "NASSCOM: India GCC Landscape 5-Year" },
  { category: "GCC Landscape & Market Overview", type: "Report", url: "https://nasscom.in/knowledge-center/publications/quarterly-industry-review-march-2025", name: "NASSCOM: Quarterly Review March 2025" },
  { category: "GCC Landscape & Market Overview", type: "Report", url: "https://nasscom.in/knowledge-center/publications/technology-sector-india-strategic-review-2024", name: "NASSCOM: Technology Sector Review 2024" },
  { category: "GCC Landscape & Market Overview", type: "Blog", url: "https://www.plugscale.com/gcc-a-complete-guide-2026", name: "Plugscale: Complete GCC Guide 2026" },
  { category: "GCC Landscape & Market Overview", type: "Market Research", url: "https://www.snsinsider.com/reports/india-capability-centers-market-4556", name: "SNS Insider: India Capability Centers Market" },
  { category: "GCC Landscape & Market Overview", type: "Report", url: "https://stpi.in/en/knowledge-center/publication/accelerating-growth-global-capability-centres-gccs-india", name: "STPI: Accelerating GCC Growth in India" },
  { category: "GCC Landscape & Market Overview", type: "Report PDF", url: "https://media.zinnov.com/wp-content/uploads/2025/05/zinnov-india-gcc-landscape-the-5-year-report-2024.pdf", name: "Zinnov-NASSCOM: India GCC 5-Year Report PDF" },
  { category: "GCC Landscape & Market Overview", type: "Blog", url: "https://zinnov.com/centers-of-excellence/7-reasons-why-gccs-will-drive-global-growth-in-2025-blog/", name: "Zinnov: 7 Reasons GCCs Drive Growth 2025" },
  { category: "GCC Landscape & Market Overview", type: "Blog", url: "https://zinnov.com/center-of-excellence/global-capability-centers-gccs-leading-the-charge-in-2025-blog/", name: "Zinnov: GCCs Leading the Charge in 2025" },
  { category: "GCC Landscape & Market Overview", type: "Blog", url: "https://zinnov.com/centers-of-excellence/growth-strategies-for-gccs-the-india-opportunity-blog/", name: "Zinnov: India GCC Growth 2024" },
  { category: "GCC Landscape & Market Overview", type: "Blog", url: "https://zinnov.com/centers-of-excellence/5-shifts-defining-indias-global-capability-centers-gccs-story-in-2025-blog/", name: "Zinnov: 5 Shifts Defining India's GCC Story" },
  { category: "GCC Landscape & Market Overview", type: "Blog", url: "https://zinnov.com/news-media/indias-gcc-boom-insights-from-the-zinnov-nasscom-report/", name: "Zinnov: India's GCC Boom – Insights from NASSCOM Report" },
  { category: "GCC Landscape & Market Overview", type: "Blog", url: "https://community.nasscom.in/communities/gcc/setting-global-capability-center-gcc-india-comprehensive-guide-and-success-factors", name: "NASSCOM: Setting Up a GCC in India – Guide & Success Factors" },
  { category: "GCC Landscape & Market Overview", type: "Report", url: "https://www.spag.asia/news-insights/india-gcc-landscape-decoded-the-5-year-report-by-nasscom-zinnov/", name: "SPAG: India GCC Landscape Decoded – 5-Year Report" },
  { category: "GCC Landscape & Market Overview", type: "News", url: "https://www.entrepreneur.com/en-in/technology/mid-market-gccs-set-to-drive-the-next-phase-of-growth/490546", name: "Entrepreneur: Mid-Market GCCs – Next Phase of Growth" },
  // GCC Leadership & Culture
  { category: "GCC Leadership & Culture", type: "Blog", url: "https://aeriestechnology.com/gcc-cross-cultural-management/", name: "Aeries: Cross-Cultural Management in GCCs" },
  // GCC Learning & Development
  { category: "GCC Learning & Development", type: "Report", url: "https://www.mygreatlearning.com/blog/upskilling-trends-report-for-2024-25/", name: "Great Learning: Upskilling Trends 2024-25" },
  { category: "GCC Learning & Development", type: "Report", url: "https://www.mygreatlearning.com/blog/upskilling-trends-in-india/", name: "Great Learning: Upskilling Trends India" },
  // GCC Legal & Regulatory
  { category: "GCC Legal & Regulatory", type: "Article", url: "https://indiaemployerforum.org/compliance/legal-and-regulatory-compliance-for-gcc-in-india/", name: "India Employer Forum: Legal Compliance for GCCs" },
  { category: "GCC Legal & Regulatory", type: "Blog", url: "https://inductusgcc.com/legal-regulatory-compliance-to-set-up-a-gcc-in-india/", name: "Inductus: Legal Compliance for GCC in India" },
  { category: "GCC Legal & Regulatory", type: "Report PDF", url: "https://assets.kpmg.com/content/dam/kpmgsites/in/pdf/2025/09/gccs-in-india-key-tax-insights.pdf", name: "KPMG: GCCs in India – Key Tax Insights" },
  { category: "GCC Legal & Regulatory", type: "Article", url: "https://www.lexology.com/library/detail.aspx?g=c9df270c-c244-464f-a300-242de6e576bb", name: "Lexology: SEZ vs STPI vs Non-SEZ Legal Implications" },
  { category: "GCC Legal & Regulatory", type: "Guide", url: "https://supersourcing.com/blog/legal-compliance-for-gccs-in-india/", name: "Supersourcing: Legal Compliance for GCCs" },
  { category: "GCC Legal & Regulatory", type: "Article", url: "https://taxguru.in/corporate-law/choosing-model-gccs-india-sez-stpi-non-stpi.html", name: "Tax Guru: SEZ vs STPI vs Non-STPI" },
  { category: "GCC Legal & Regulatory", type: "Article", url: "https://trilegal.com/navigating-tax-challenges-gcc-setup/", name: "Trilegal: Tax Challenges for GCC Setup" },
  { category: "GCC Legal & Regulatory", type: "Guide", url: "https://www.vjmglobal.com/blog/legal-compliance-checklist-gcc-setup-gcc", name: "VJM Global: Legal Compliance Checklist" },
  { category: "GCC Legal & Regulatory", type: "Guide", url: "https://www.esparkinfo.com/global-capability-center/legal-compliance", name: "eSparkBiz: Legal Compliance 2026 Guide" },
  { category: "GCC Legal & Regulatory", type: "Web Page", url: "https://kpmg.com/in/en/insights/2025/09/gccs-in-india-key-tax-insights.html", name: "KPMG: GCC Tax Insights (Web)" },
  { category: "GCC Legal & Regulatory", type: "Article", url: "https://kpmg.com/us/en/taxnewsflash/news/2025/05/kpmg-article-cost-delivery-gccs-india.html", name: "KPMG: Cost of Delivery for GCCs – Transfer Pricing" },
  { category: "GCC Legal & Regulatory", type: "Whitepaper", url: "https://www.indiasnews.net/news/278280880/india-based-gccs-emerge-as-global-hubs-for-complex-tax-operations-deloitte", name: "Deloitte: Transforming Global Tax Functions – GCC Advantage" },
  { category: "GCC Legal & Regulatory", type: "Article", url: "https://www.lexology.com/library/detail.aspx?g=0cccdf80-6534-4000-87ed-3fe4e532c665", name: "Lexology: Data Privacy and Cybersecurity for GCCs" },
  { category: "GCC Legal & Regulatory", type: "Guide", url: "https://practiceguides.chambers.com/practice-guides/cybersecurity-2025/india", name: "Chambers: Cybersecurity 2025 – India Practice Guide" },
  { category: "GCC Legal & Regulatory", type: "Guide", url: "https://practiceguides.chambers.com/practice-guides/data-protection-privacy-2025/india", name: "Chambers: Data Protection & Privacy 2025 – India" },
  { category: "GCC Legal & Regulatory", type: "Report PDF", url: "https://www.dhruvaadvisors.com/wp-content/uploads/2025/07/Dhruva-GCC-Report-2025.pdf", name: "Dhruva Advisors: GCC Guide for Multinationals 2025" },
  { category: "GCC Legal & Regulatory", type: "Blog", url: "https://www.vjmglobal.com/blog/set-up-global-capability-center-india-gcc", name: "VJM Global: How to Set Up a GCC in India" },
  { category: "GCC Legal & Regulatory", type: "Article", url: "https://www.upguard.com/blog/cybersecurity-regulations-india", name: "UpGuard: Cybersecurity Regulations in India 2026" },
  { category: "GCC Legal & Regulatory", type: "Blog", url: "https://www.encryptionconsulting.com/compliance-trends-of-2025/", name: "Encryption Consulting: Compliance Trends 2025" },
  { category: "GCC Legal & Regulatory", type: "Article", url: "https://www.sattrix.com/blog/prepare-gdpr-compliance-in-cybersecurity/", name: "Sattrix: GDPR Compliance Cybersecurity for GCCs" },
  { category: "GCC Legal & Regulatory", type: "Article", url: "https://www.ey.com/en_in/insights/cybersecurity/redefining-global-privacy-the-critical-role-of-india-s-gccs", name: "EY: Redefining Global Privacy – Role of India's GCCs" },
  // GCC Location Strategy
  { category: "GCC Location Strategy", type: "Report", url: "https://www.cushmanwakefield.com/en/japan/insights/worlds-major-gcc-hotspots", name: "Cushman & Wakefield: GCC Key Hotspots" },
  { category: "GCC Location Strategy", type: "Report PDF", url: "https://cushwake.cld.bz/worldsmajorgcchotspots-11-2024-apac-regional-en-content-trep-realestate", name: "Cushman & Wakefield: GCC APAC Hotspots 2024" },
  { category: "GCC Location Strategy", type: "Article", url: "https://www.ey.com/en_in/services/consulting/global-capability-centers/ey-gcc-conclave-2024-delhi", name: "EY GCC Conclave 2024 Delhi" },
  { category: "GCC Location Strategy", type: "Article", url: "https://theiecgroup.com/the-global-gcc-dilemma-finding-the-ideal-country-for-talent-cost-and-culture/", name: "IEC Group: Global GCC Dilemma" },
  { category: "GCC Location Strategy", type: "Blog", url: "https://zinnov.com/centers-of-excellence/how-tier-2-talent-is-powering-india-global-capability-centers-blog/", name: "Zinnov: Tier-II Talent Powering India's GCCs" },
  { category: "GCC Location Strategy", type: "Report", url: "https://zinnov.com/global-capability-center-setup-location-analysis-2024-report/", name: "Zinnov: GCC Location Analysis 2024" },
  { category: "GCC Location Strategy", type: "Report", url: "https://zinnov.com/global-capability-center-setup-location-analysis-2025-report/", name: "Zinnov: CoE Hotspots 2025" },
  { category: "GCC Location Strategy", type: "Article", url: "https://zinnov.com/global-talent/", name: "Zinnov: Global Talent Insights 2025" },
  { category: "GCC Location Strategy", type: "Blog", url: "https://www.altre.co.in/blogs/global-capability-centers-in-india-country-trends-location-strategy", name: "altre: GCCs in India – Location Strategy" },
  { category: "GCC Location Strategy", type: "News", url: "https://www.tribuneindia.com/news/banks/us-firms-hit-record-office-leasing-volumes-in-india-bengaluru-hyderabad-lead-in-growth-jll", name: "Tribune: US Firms Record Office Leasing – Bengaluru, Hyderabad Lead" },
  // GCC Real Estate & Workspace
  { category: "GCC Real Estate & Workspace", type: "Report", url: "https://www.cushmanwakefield.com/en/india/news/2023/02/gccs-in-india-are-accelerating-transformation", name: "Cushman & Wakefield: GCCs in Real Estate" },
  { category: "GCC Real Estate & Workspace", type: "Article", url: "https://theflexinsights.com/the-future-of-workspaces-aligning-real-estate-with-gcc-evolution/", name: "FlexInsights: GCC Workspace Evolution" },
  { category: "GCC Real Estate & Workspace", type: "Report", url: "https://www.jll.com/en-in/insights/market-dynamics/india-office", name: "JLL: India Office Market Dynamics" },
  { category: "GCC Real Estate & Workspace", type: "Report", url: "https://www.jll.co.in/en/newsroom/gccs-drive-record-77-2-mn-sqft-office-leasing-in-india", name: "JLL: GCCs Drive Record 77.2 Mn Sq Ft Leasing" },
  { category: "GCC Real Estate & Workspace", type: "Report", url: "https://www.jll.co.in/en/newsroom/office-market-at-49-56-mn-sq-ft-of-net-absorption-in-2024", name: "JLL: India Office 49.56 Mn Sq Ft Net Absorption 2024" },
  { category: "GCC Real Estate & Workspace", type: "Report", url: "https://www.jll.co.in/en/newsroom/office-space-leasing-of-53-point-43-mn-sq-ft", name: "JLL: India Office Leasing 53.43 Mn Sq Ft – 9M 2024" },
  { category: "GCC Real Estate & Workspace", type: "News", url: "https://www.newkerala.com/news/a/indias-office-market-scales-new-high-2025-global-924.htm", name: "India Office Market Record 83.3 Mn Sq Ft in 2025" },
  { category: "GCC Real Estate & Workspace", type: "News", url: "https://www.freepressjournal.in/mumbai/gccs-drive-record-breaking-office-leasing-in-india-in-2024-jll-report", name: "GCCs Drive Record-Breaking Office Leasing – JLL 2024" },
  // GCC Setup & Operating Models
  { category: "GCC Setup & Operating Models", type: "Web Page", url: "https://ansr.com/build-operate-transfer/", name: "ANSR: Build-Operate-Transfer Model" },
  { category: "GCC Setup & Operating Models", type: "Web Hub", url: "https://ansr.com/", name: "ANSR: GCC Setup Benchmarking" },
  { category: "GCC Setup & Operating Models", type: "Blog", url: "https://aeriestechnology.com/the-2025-guide-to-scaling-global-capability-centers-gccs-with-bot-outsourcing-models/", name: "Aeries: Scaling GCCs with BOT Models" },
  { category: "GCC Setup & Operating Models", type: "Blog", url: "https://aeriestechnology.com/gcc-setup-guide-india/", name: "Aeries: GCC Setup Guide India" },
  { category: "GCC Setup & Operating Models", type: "Web Page", url: "https://www.anlage.co.in/build-operate-transfer-model/", name: "Anlage: BOT Model" },
  { category: "GCC Setup & Operating Models", type: "Blog", url: "https://inductusgcc.com/build-operate-transfer-strategic-bot-model-for-gcc/", name: "Inductus: Strategic BOT Model" },
  { category: "GCC Setup & Operating Models", type: "Blog", url: "https://inspiredgeit.com/2025/10/24/bot-framework-build-operate-transfer-gcc-model/", name: "Inspiredge: BOT Framework" },
  { category: "GCC Setup & Operating Models", type: "Guide", url: "https://knowvisoryglobal.com/step-by-step-guide-to-creating-a-global-capability-center-in-india/", name: "Knowvisory: Step-by-Step GCC Guide" },
  { category: "GCC Setup & Operating Models", type: "Web Page", url: "https://www.parkar.in/gcc-bot", name: "Parkar: BOT Model for GCCs" },
  { category: "GCC Setup & Operating Models", type: "Case Study", url: "https://www.plugscale.com/india-gcc-bot-model-case-study", name: "Plugscale: BOT Model Case Study" },
  { category: "GCC Setup & Operating Models", type: "Web Page", url: "https://scalegcc.com/gcc-location-feasibility-assessment-tool/", name: "ScaleGCC: Location Feasibility Tool" },
  { category: "GCC Setup & Operating Models", type: "Web Page", url: "https://www.torryharris.com/global-capability-center/framework-for-excellence", name: "Torry Harris: GCC Framework" },
  { category: "GCC Setup & Operating Models", type: "Guide", url: "https://www.esparkinfo.com/global-capability-center/build-operate-transfer/guide", name: "eSparkBiz: BOT Guide 2026" },
  // GCC Strategy & Business Case
  { category: "GCC Strategy & Business Case", type: "Whitepaper", url: "https://codeninjaconsulting.com/research/how-modern-organizations-scale-role-of-global-capability-centers-gccs", name: "CodeNinja: Role of GCCs in Enterprise Growth" },
  { category: "GCC Strategy & Business Case", type: "Article", url: "https://www.ey.com/en_in/services/consulting/global-capability-centers/how-gcc-s-are-evolving-into-global-value-organizations", name: "EY: GCCs Evolving Into GVOs" },
  { category: "GCC Strategy & Business Case", type: "Article", url: "https://www.ey.com/en_in/insights/consulting/global-capability-centers/how-can-global-capability-centers-continuously-reinvent-to-deliver-value", name: "EY: GCCs Reinventing to Deliver Value" },
  { category: "GCC Strategy & Business Case", type: "Article", url: "https://www.ey.com/en_in/insights/consulting/global-capability-centers/india-s-gccs-are-leading-the-shift-to-intelligent-ai-native-enterprises", name: "EY: India's GCCs Leading AI-Native Shift" },
  { category: "GCC Strategy & Business Case", type: "Report", url: "https://www2.everestgrp.com/report/egr-2025-33-v-7371/", name: "Everest Group: GCCs & Consulting 2025" },
  { category: "GCC Strategy & Business Case", type: "Article", url: "https://www.everestgrp.com/how-global-capability-centers-are-driving-transformation-the-evolving-landscape-blog/", name: "Everest Group: GCCs Driving Transformation" },
  { category: "GCC Strategy & Business Case", type: "Blog", url: "https://www.everestgrp.com/blog/the-rise-of-holistic-global-capability-center-gcc-set-up-solutions-partnerships-playbooks-and-pitfalls-blog.html", name: "Everest Group: Holistic GCC Setup" },
  { category: "GCC Strategy & Business Case", type: "Article", url: "https://isg-one.com/articles/whats-next-for-gccs--operating-model-challenges-and-genai-opportunities", name: "ISG: What's Next for GCCs" },
  { category: "GCC Strategy & Business Case", type: "Blog", url: "https://inductusgcc.com/establishing-an-exemplary-global-capability-center-a-step-by-step-guide/", name: "Inductus: Establishing an Exemplary GCC" },
  { category: "GCC Strategy & Business Case", type: "Blog", url: "https://inductusgcc.com/gcc-vs-outsourcing/", name: "Inductus: GCC vs Outsourcing" },
  { category: "GCC Strategy & Business Case", type: "Blog", url: "https://inductusgcc.com/transforming-global-capability-centers-into-centers-of-excellence/", name: "Inductus: Transforming GCCs into CoEs" },
  { category: "GCC Strategy & Business Case", type: "Blog", url: "https://www.morganlewis.com/blogs/sourcingatmorganlewis/2025/03/the-rise-of-the-global-capability-center-key-considerations", name: "Morgan Lewis: Rise of the GCC" },
  { category: "GCC Strategy & Business Case", type: "Report", url: "https://nasscom.in/knowledge-center/publications/digital-enterprise-2025-advancing-ai-first-enterprise", name: "NASSCOM: AI-First Enterprise 2025" },
  { category: "GCC Strategy & Business Case", type: "Blog", url: "https://community.nasscom.in/communities/nasscom-insights/nasscom-indias-gcc-leap-powering-global-mid-market-momentum", name: "NASSCOM: India's GCC Leap" },
  { category: "GCC Strategy & Business Case", type: "Report", url: "https://nasscom.in/knowledge-center/publications/technology-sector-india-strategic-review-2025", name: "NASSCOM: Tech Review 2025" },
  { category: "GCC Strategy & Business Case", type: "Report", url: "https://nasscom.in/knowledge-center/publications/unlocking-growth-and-value-creation-technology-services-2024-25", name: "NASSCOM: Growth & Value Creation 2024-25" },
  { category: "GCC Strategy & Business Case", type: "Report", url: "https://zinnov.com/centers-of-excellence/zinnov-nasscom-mid-market-global-capability-centers-gccs-2025-report/", name: "Zinnov-NASSCOM: Mid-Market GCC 2025" },
  { category: "GCC Strategy & Business Case", type: "Blog", url: "https://zinnov.com/centers-of-excellence/", name: "Zinnov: Centers of Excellence Hub" },
  { category: "GCC Strategy & Business Case", type: "Blog", url: "https://zinnov.com/private-equity/why-globalization-is-pes-strongest-value-lever-blog/", name: "Zinnov: PE's Globalization Lever" },
  { category: "GCC Strategy & Business Case", type: "Blog", url: "https://zinnov.com/private-equity/why-are-private-equity-portcos-going-global-blog/", name: "Zinnov: PE Portcos Going Global" },
  { category: "GCC Strategy & Business Case", type: "Article", url: "https://theintechgroup.com/blog/gcc-cybersecurity-compliance-governance-guide/", name: "InTech: GCC Cybersecurity Compliance & Governance Guide" },
  // GCC Talent & HR
  { category: "GCC Talent & HR", type: "Blog", url: "https://aeriestechnology.com/gcc-hr-management/", name: "Aeries: GCC HR Management" },
  { category: "GCC Talent & HR", type: "Survey", url: "https://www.ey.com/en_in/newsroom/2024/11/gen-ai-a-top-priority-for-70-percent-gcc-s-in-india-more-than-half-leveraging-it-to-boost-ops-and-customer-experience-ey-survey", name: "EY GCC Pulse Survey 2024" },
  { category: "GCC Talent & HR", type: "Survey", url: "https://www.ey.com/en_in/newsroom/2025/11/58-percent-gccs-in-india-investing-in-agentic-ai-two-third-creating-dedicated-innovation-teams-to-globalize-ideas-ey-gcc-pulse-survey-2025", name: "EY GCC Pulse Survey 2025" },
  { category: "GCC Talent & HR", type: "Report PDF", url: "https://www.ey.com/content/dam/ey-unified-site/ey-com/en-in/insights/ai/documents/ey-nasscom-ai-adoption-index.pdf", name: "EY-NASSCOM: AI Adoption Index" },
  { category: "GCC Talent & HR", type: "Blog", url: "https://www.mtlc.co/gccs-driving-innovation-employment-and-economic-expansion-in-india/", name: "MTLC: GCCs Driving Innovation in India" },
  { category: "GCC Talent & HR", type: "Blog", url: "https://www.multirecruit.com/blogs/gic-gcc-recruitment-trends-and-insights/", name: "Multirecruit: GCC Recruitment Trends" },
  { category: "GCC Talent & HR", type: "Article", url: "https://community.nasscom.in/communities/global-capability-centers/new-gccs-set-and-existing-gccs-expansion-india-overview", name: "NASSCOM: GCC Expansions Overview" },
  { category: "GCC Talent & HR", type: "Blog", url: "https://trigent.com/blog/how-gccs-are-influencing-indias-future-workforce-and-economy/", name: "Trigent: GCCs Influencing India's Workforce" },
  { category: "GCC Talent & HR", type: "Report", url: "https://zinnov.com/center-of-excellence/employee-benefits-study-an-india-gcc-view-2024-report/", name: "Zinnov: Employee Benefits 2024" },
  { category: "GCC Talent & HR", type: "Report PDF", url: "https://media.zinnov.com/wp-content/uploads/2025/03/gcc-talent-trends-2025.pdf", name: "Zinnov: GCC Talent Trends 2025" },
  { category: "GCC Talent & HR", type: "Blog", url: "https://zinnov.com/global-talent/how-india-gccs-can-attract-and-retain-top-talent-blog/", name: "Zinnov: Attract & Retain Top Talent" },
  { category: "GCC Talent & HR", type: "Report", url: "https://zinnov.com/global-talent/zinnov-recruitment-benchmarking-2024-report/", name: "Zinnov: Recruitment Benchmarking 2024" },
  { category: "GCC Talent & HR", type: "Report", url: "https://zinnov.com/global-talent/salary-increase-attrition-and-hiring-trends-india-gcc-view-2023-2024-report/", name: "Zinnov: Salary & Attrition 2023-2024" },
  { category: "GCC Talent & HR", type: "Report", url: "https://zinnov.com/global-talent/salary-increase-attrition-and-hiring-trends-an-india-gcc-view-2024-report/", name: "Zinnov: Salary & Attrition 2024" },
  { category: "GCC Talent & HR", type: "Report", url: "https://zinnov.com/global-talent/salary-increase-attrition-and-hiring-trends-an-india-gcc-view-2025-26-report/", name: "Zinnov: Salary & Attrition 2025-26" },
  { category: "GCC Talent & HR", type: "Web Page", url: "https://www.kornferry.com/capabilities/talent-suite/korn-ferry-pay", name: "Korn Ferry: Global Compensation Benchmarking" },
  { category: "GCC Talent & HR", type: "Web Page", url: "https://www.kornferry.com/capabilities/talent-suite/korn-ferry-pay/compensation-surveys", name: "Korn Ferry: Compensation Surveys – 150+ Countries" },
  { category: "GCC Talent & HR", type: "Web Page", url: "https://www.kornferry.com/insights/featured-topics/employee-experience/global-rewards-pulse-survey", name: "Korn Ferry: Global Total Rewards Pulse Survey 2025" },
  { category: "GCC Talent & HR", type: "Web Page", url: "https://www.kornferry.com/insights/featured-topics/workforce-management/walking-the-pay-transparency-tightrope", name: "Korn Ferry: Pay Transparency in APAC" },
  { category: "GCC Talent & HR", type: "Article", url: "https://ravio.com/blog/compensation-benchmarking-companies", name: "Ravio: Best Compensation Benchmarking Companies 2026" },
  // GCC Technology & Digital
  { category: "GCC Technology & Digital", type: "Event", url: "https://www.ey.com/en_in/services/consulting/global-capability-centers/ey-gcc-conclave-2024-chennai", name: "EY GCC Conclave 2024 Chennai" },
  { category: "GCC Technology & Digital", type: "Event", url: "https://www.ey.com/en_in/services/consulting/global-capability-centers/ey-gcc-conclave-2024-pune", name: "EY GCC Conclave 2024 Pune" },
  { category: "GCC Technology & Digital", type: "Event", url: "https://www.ey.com/en_in/services/consulting/global-capability-centers/ey-gcc-gen-ai-conclave-2024", name: "EY GCC GenAI Conclave 2024" },
  { category: "GCC Technology & Digital", type: "Article", url: "https://www.zawya.com/en/business/technology-and-telecom/gcc-ahead-of-the-curve-in-gen-ai-adoption-mckinsey-s80njbnu", name: "Zawya: GCC Gen AI Adoption" },
  { category: "GCC Technology & Digital", type: "Blog", url: "https://inductusgcc.com/gccs-cybersecurity-building-secure-scalable-global-operations-in-2025/", name: "Inductus: GCC Cybersecurity 2025 – Secure Operations" },
  // GCC by Industry
  { category: "GCC by Industry", type: "Report PDF", url: "https://ansr.com/wp-content/uploads/2024/04/State-of-BFSI-GCCs-in-India-PDF.pdf", name: "ANSR: BFSI GCCs in India" },
  { category: "GCC by Industry", type: "News Article", url: "https://www.newkerala.com/news/o/indias-bfsi-gcc-sector-reach-125-billion-2032-report-408", name: "India BFSI GCC to Hit $125B by 2032" },
  { category: "GCC by Industry", type: "Article", url: "https://community.nasscom.in/communities/bfsi/bfsi-industry-2024-overview-challenges-and-recent-trends", name: "NASSCOM: BFSI Industry 2024" },
  { category: "GCC by Industry", type: "Report", url: "https://www.nasscom.in/knowledge-center/publications/bfsi-gccs-road-ahead", name: "NASSCOM-KPMG: BFSI GCCs Road Ahead" },
  { category: "GCC by Industry", type: "Market Research", url: "https://www.snsinsider.com/reports/gccs-in-the-bfsi-market-4725", name: "SNS: GCCs in BFSI Market" },
  { category: "GCC by Industry", type: "Blog", url: "https://sansovi.com/indias-top-gccs-2025-revenue-growth-sansovi/", name: "Sansovi: India's Top GCCs 2025" },
  { category: "GCC by Industry", type: "Blog", url: "https://aeriestechnology.com/bfsi-gcc-india/", name: "Aeries: BFSI GCC Setup Guide" },
  { category: "GCC by Industry", type: "Report", url: "https://www.ey.com/en_in/newsroom/2025/12/pe-vc-investments-in-india-reach-88-percent-of-2024-levels-as-2025-nears-close-ey-ivca-report", name: "EY: GIFT City Compendium" },
  { category: "GCC by Industry", type: "Event", url: "https://www2.everestgrp.com/reportaction/EGR-2025-77-V-6929/Marketing", name: "Everest Group: Banking GBS/GCC" },
  { category: "GCC by Industry", type: "Blog", url: "https://inductusgcc.com/bfsi-gcc/", name: "Inductus: BFSI GCCs in India" },
  { category: "GCC by Industry", type: "Blog", url: "https://inductusgcc.com/healthcare-gcc/", name: "Inductus: Healthcare GCCs in India" },
  { category: "GCC by Industry", type: "Article", url: "https://www.ey.com/en_in/services/assurance/esg-sustainability", name: "EY: GCCs in Retail & CPG" },
  // Geography
  { category: "Geography", type: "Web Resource", url: "https://www.investhyderabad.in/global-capability-centers/", name: "Invest Hyderabad - GCC Ecosystem" },
  { category: "Geography", type: "Web Portal", url: "https://www.investpune.com/sectors/gcc-pune", name: "Invest Pune - GCC Sector" },
  { category: "Geography", type: "Web Report", url: "https://www.bpap.org/research-and-insights/", name: "BPAP - Philippines Research" },
  // HR Transformation
  { category: "HR Transformation", type: "Web Article", url: "https://www.peoplematters.in/article/gcc/gcc-hr-transformation-strategies", name: "People Matters - GCC HR Transformation" },
  // Inception & Planning
  { category: "Inception & Planning", type: "Web Article", url: "https://www.anlage.co.in/how-global-capability-centers-drive-cost-optimization/", name: "Anlage - GCCs Drive Cost Optimization" },
  { category: "Inception & Planning", type: "Web Article", url: "https://corridalegal.com/how-to-set-up-a-global-capability-centre-gcc-in-india-in-2026/", name: "Corrida Legal - GCC Setup India 2026" },
  { category: "Inception & Planning", type: "Web Article", url: "https://www.esparkinfo.com/global-capability-center/gcc-operating-models", name: "ESpark - GCC Operating Models" },
  { category: "Inception & Planning", type: "Web Article", url: "https://inorg.com/blog/cost-reduction-strategies-for-global-capability-centers", name: "InOrg - Cost Reduction Strategies" },
  { category: "Inception & Planning", type: "Web Article", url: "https://inductusgcc.com/cost-optimization-strategies-for-high-performing-gccs/", name: "Inductus - Cost Optimization for GCCs" },
  { category: "Inception & Planning", type: "Web Article", url: "https://www.linkedin.com/pulse/optimizing-costs-global-capability-centers-raghu-babu-gunturu-x9ync", name: "LinkedIn - Optimizing Costs in GCCs" },
  { category: "Inception & Planning", type: "Pdf Report", url: "https://www.mordorintelligence.com/industry-reports/global-capability-centers-market", name: "Mordor Intelligence - GCC Market" },
  { category: "Inception & Planning", type: "Web Article", url: "https://www.rishabhsoft.com/blog/gcc-operating-models", name: "RishabhSoft - GCC Operating Models" },
  { category: "Inception & Planning", type: "Web Article", url: "https://supersourcing.com/blog/10-ways-gccs-cut-costs/", name: "Supersourcing - 10 Ways GCCs Cut Costs" },
  { category: "Inception & Planning", type: "Web Article", url: "https://www.torryharris.com/insights/articles/global-capability-center", name: "Torry Harris - GCC Cost Efficiency" },
  // Industry Reports
  { category: "Industry Reports", type: "Web Portal", url: "https://www.isg-one.com/research/isg-provider-lens", name: "ISG - Provider Lens" },
  // Infrastructure
  { category: "Infrastructure", type: "Pdf Report", url: "https://www.cushmanwakefield.com/en/insights/gcc-workplace-strategy", name: "Cushman & Wakefield - Workplace Strategy" },
  { category: "Infrastructure", type: "Web Article", url: "https://www.jll.co.in/en/trends-and-insights/workplace/gcc-smart-building-solutions", name: "JLL - Smart Building for GCCs" },
  { category: "Infrastructure", type: "Web Report", url: "https://www.knightfrank.co.in/research/gcc-real-estate-guide", name: "Knight Frank - GCC Real Estate" },
  // Legal & Regulatory
  { category: "Legal & Regulatory", type: "Web Guide", url: "https://www.mondaq.com/india/employment-and-hr/gcc-labor-compliance", name: "Mondaq - GCC Labor Compliance" },
  { category: "Legal & Regulatory", type: "Pdf Guide", url: "https://www.nishithdesai.com/information/research-and-articles/gcc-setup-legal-guide.html", name: "Nishith Desai - GCC Legal Guide" },
  { category: "Legal & Regulatory", type: "Pdf Report", url: "https://www.shardul.com/insights/gcc-regulatory-framework-india", name: "Shardul Amarchand - GCC Regulatory" },
  // Maturity & Optimization
  { category: "Maturity & Optimization", type: "Pdf Whitepaper", url: "https://www.ibm.com/thought-leadership/gcc-ai-transformation", name: "IBM - AI Transformation in GCCs" },
  // Overview
  { category: "Overview", type: "Web Report", url: "https://www.everestgrp.com/research/global-capability-centers/", name: "Everest Group - GCC Research" },
  { category: "Overview", type: "Web Dashboard", url: "https://www.statista.com/topics/6847/global-capability-centers-in-india/", name: "Statista - GCC India Stats" },
  // PDF Reports & Playbooks
  { category: "PDF Reports & Playbooks", type: "PDF", url: "https://inductusgcc.com/wp-content/uploads/2025/02/India-as-the-Preferred-GCC-Destination-A-Business-Case-.pdf", name: "India as Preferred GCC Destination (Inductus)" },
  { category: "PDF Reports & Playbooks", type: "PDF", url: "https://www.jll.com/en-in/guides/gcc-office-guide", name: "India GCC Guide 2026 (JLL)" },
  { category: "PDF Reports & Playbooks", type: "PDF", url: "https://invest.up.gov.in/wp-content/uploads/2025/08/GCC_040825.pdf", name: "UP GCC Policy (Govt)" },
  { category: "PDF Reports & Playbooks", type: "PDF", url: "https://inductusgcc.com/wp-content/uploads/2024/10/GCC-Strategy-Playbook.pdf", name: "GCC Strategy Playbook (Inductus)" },
  { category: "PDF Reports & Playbooks", type: "PDF", url: "https://www.pipaltreeservices.com/insights/setting-up-gcc-india-2026-guide/", name: "GCC Setup India 2026 (PipalTree)" },
  { category: "PDF Reports & Playbooks", type: "PDF Brochure", url: "https://isg-one.com/docs/default-source/2025-ipl-brochures/gcc-services---brochure-(global)---2025.pdf", name: "ISG GCC Services Brochure 2025" },
  { category: "PDF Reports & Playbooks", type: "PDF Guide", url: "https://static.investindia.gov.in/s3fs-public/2025-05/gcc-policy-2025.pdf", name: "Invest India GCC Policy 2025" },
  { category: "PDF Reports & Playbooks", type: "PDF", url: "https://inductusgroup.com/wp-content/uploads/2025/02/GCC-INDUSTRY-BRIEF-FEB-2025-INDUCTUS-.pdf", name: "GCC Industry Brief Feb 2025 (Inductus)" },
  { category: "PDF Reports & Playbooks", type: "PDF Report", url: "https://ansr.com/wp-content/uploads/2025/10/whitepaper-India-Takes-the-No-3-1-compressed.pdf", name: "Executive's Playbook to GCC Strategy (ANSR)" },
  { category: "PDF Reports & Playbooks", type: "PDF Report", url: "https://media.zinnov.com/wp-content/uploads/2025/11/salary-increase-attrition-hiring-trends-an-india-gcc-view-2026-report.pdf", name: "Zinnov: Salary & Hiring Trends 2026" },
  { category: "PDF Reports & Playbooks", type: "PDF Report", url: "https://www.ey.com/content/dam/ey-unified-site/ey-com/en-in/pdf/2025/ey-reimagining-life-sciences-global-capability-centers.pdf", name: "EY: Life Sciences GCCs" },
  { category: "PDF Reports & Playbooks", type: "PDF Report", url: "https://www.alvarezandmarsal.com/sites/default/files/2025-02/Global%20Capability%20Centers%20The%20Great%20Force%20Multiplier_final.pdf", name: "A&M: GCCs The Great Force Multiplier" },
  { category: "PDF Reports & Playbooks", type: "PDF Report", url: "https://www.ey.com/content/dam/ey-unified-site/ey-com/en-in/insights/consullting/global-capability-centers/documents/ey-eastern-india-s-role-in-the-next-gcc-wave-from-scale-to-intelligence.pdf", name: "EY: Eastern India's GCC Wave" },
  { category: "PDF Reports & Playbooks", type: "PDF Report", url: "https://web-assets.bcg.com/a9/93/3df8dfb2476bb64878a63521a431/unlocking-potential-how-gcc-organizations-can-convert-ai-momentum-into-value-at-scale.pdf", name: "BCG: GCC AI Momentum to Value" },
  { category: "PDF Reports & Playbooks", type: "PDF Report", url: "https://gcc-pulse.com/wp-content/uploads/2025/08/Suggestions-for-a-National-Framework-on-GCCs_-July-2025.pdf", name: "National Framework on GCCs (GCC Pulse)" },
  { category: "PDF Reports & Playbooks", type: "PDF Report", url: "https://web-assets.bcg.com/66/c2/16f4539648f0a6a455ce5058f7f2/rewriting-the-global-capability-center-playbook.pdf", name: "BCG: Rewriting the GCC Playbook" },
  { category: "PDF Reports & Playbooks", type: "PDF Report", url: "https://inductusgcc.com/wp-content/uploads/2025/05/A-Guide-to-Measuring-Global-Capability-Center-GCC-Efficiency-and-Success-Pillars-Parameters-and-Strategic-Action.pdf", name: "Inductus: GCC Efficiency Guide" },
  { category: "PDF Reports & Playbooks", type: "PDF Report", url: "https://www.hcltech.com/sites/default/files/documents/business_pages/files/2026/01/29/GCC-Trends-2026-Report-GCC-Pulse.pdf", name: "HCLTech/GCC Pulse: GCC Trends 2026" },
  { category: "PDF Reports & Playbooks", type: "PDF Report", url: "https://talent500.com/blog/wp-content/uploads/sites/42/2025/05/Increment-Compensation-Trends-in-GCCs-updated.pdf", name: "Talent500: Compensation Trends 2025" },
  { category: "PDF Reports & Playbooks", type: "PDF Report", url: "https://www.ey.com/content/dam/ey-unified-site/ey-com/en-in/newsroom/2026/02/ey-future-of-pay-report-2026.pdf", name: "EY Future of Pay Report 2026" },
  { category: "PDF Reports & Playbooks", type: "PDF Report", url: "https://assets.kpmg.com/content/dam/kpmgsites/in/pdf/2025/07/kpmg-firms-identified-as-a-leader-in-isg-provider-lens-global-capability-center-gcc-services-2025.pdf.coredownload.inline.pdf", name: "ISG Provider Lens GCC Services 2025 (KPMG)" },
  { category: "PDF Reports & Playbooks", type: "PDF Report", url: "https://www.rsystems.com/gcc-report/", name: "R Systems/NASSCOM: Next-Gen GCCs" },
  { category: "PDF Reports & Playbooks", type: "PDF Report", url: "https://wheebox.com/assets/pdf/ISR_Report_2026.pdf", name: "India Skills Report 2026 (Wheebox)" },
  { category: "PDF Reports & Playbooks", type: "PDF Report", url: "https://assets.kpmg.com/content/dam/kpmgsites/in/pdf/2025/09/from-cost-centre-to-nerve-centre-of-the-energy-enterprise.pdf", name: "KPMG: Cost Centre to Nerve Centre" },
  { category: "PDF Reports & Playbooks", type: "PDF Report", url: "https://www.scribd.com/document/851911559/GCC-Strategy-Playbook", name: "GCC Strategy Playbook (Scribd)" },
  // Playbooks
  { category: "Playbooks", type: "Web Resource", url: "https://ansr.com/whitepaper-ebooks/", name: "ANSR - GCC Whitepapers" },
  { category: "Playbooks", type: "Web Resource", url: "https://www.ey.com/en_in/services/consulting/global-capability-centers/the-fs-gcc-playbook", name: "EY - FS GCC Playbook" },
  { category: "Playbooks", type: "Web Resource", url: "https://workplaceawards.in/conference/introducing-the-gcc-playbook-2025/", name: "GCC Playbook 2025" },
  { category: "Playbooks", type: "Web Resource", url: "https://community.nasscom.in/communities/global-capability-centers/whitepaper-indias-gcc-landscape", name: "NASSCOM - India GCC Landscape" },
  // Podcasts & Events
  { category: "Podcasts & Events", type: "Audio/Web", url: "https://open.spotify.com/show/gcc-insights-podcast", name: "GCC Insights Podcast" },
  { category: "Podcasts & Events", type: "Web Page", url: "https://nasscom.in/gcc", name: "NASSCOM GCC Awards 2025" },
  { category: "Podcasts & Events", type: "Web Page", url: "https://zinnov.com/news-media/", name: "Zinnov: Media & Podcasts Hub" },
  { category: "Podcasts & Events", type: "Web Page", url: "https://www.linkedin.com/company/zinnov/", name: "Zinnov LinkedIn – GCC Insights" },
  { category: "Podcasts & Events", type: "Web Page", url: "https://www.linkedin.com/company/everest-group/", name: "Everest Group LinkedIn – GCC Research" },
  { category: "Podcasts & Events", type: "Web Page", url: "https://nasscom.in/events", name: "NASSCOM Events – GCC Summits & Conferences" },
  { category: "Podcasts & Events", type: "Web Page", url: "https://community.nasscom.in/communities/gcc", name: "NASSCOM Community: GCC Knowledge Hub" },
  // Research
  { category: "Research", type: "Journal Database", url: "https://scholar.google.com/scholar?q=global+capability+centers", name: "Google Scholar - GCC Research" },
  // Setup & Foundation
  { category: "Setup & Foundation", type: "Web Report", url: "https://www.jll.com/en-in/guides/gcc-office-guide", name: "JLL - India GCC Guide 2026" },
  { category: "Setup & Foundation", type: "Web Guide", url: "https://www.knightfrank.co.in/research/india-gcc-office-space-report", name: "Knight Frank - Office Space" },
  { category: "Setup & Foundation", type: "Web Resource", url: "https://www.stpi.in/", name: "STPI Registration" },
  // Shared Services
  { category: "Shared Services", type: "Web Guide", url: "https://cioindex.com/reference/how-to-implement-shared-services-guide/", name: "CIO Index - Shared Services Guide" },
  { category: "Shared Services", type: "Pdf Guide", url: "https://www.imanet.org/-/media/2b85bcf1f2c64b73b28a0562ff7947e9", name: "IMA - Shared Services Centers" },
  { category: "Shared Services", type: "Web Article", url: "https://www.ssonetwork.com/shared-services/articles/building-a-modern-shared-services-center", name: "SSON - Modern Shared Services" },
  // Stabilization
  { category: "Stabilization", type: "Web Report", url: "https://www.aonhewitt.com/india/gcc-talent-trends", name: "Aon Hewitt - GCC Talent Trends" },
  { category: "Stabilization", type: "Pdf Report", url: "https://www.mercer.com/our-thinking/career/total-remuneration-survey.html", name: "Mercer - Remuneration Survey" },
  // Talent Management
  { category: "Talent Management", type: "Web Article", url: "https://www.satincorp.com/blog/talent-management-gccs-2024", name: "Satin Corp - Talent Management" },
  // Technology Platforms
  { category: "Technology Platforms", type: "Web Guide", url: "https://www.microsoft.com/en-in/microsoft-365/gcc-collaboration-tools", name: "Microsoft 365 - Collaboration" },
  // Training
  { category: "Training", type: "Web Resource", url: "https://www.coursera.org/courses?query=gcc%20management", name: "Coursera - GCC Management" },
  // Landing Pages & Portals
  { category: "Landing Pages & Portals", type: "Landing", url: "https://www.everestgrp.com/sourcing-expertise/gbs-shared-services-gics/", name: "Everest Group GCC Research Portal" },
  { category: "Landing Pages & Portals", type: "Landing", url: "https://alcor.com/global-capability-center-setup/", name: "Alcor: GCC Setup Guide 2026" },
  { category: "Landing Pages & Portals", type: "Landing", url: "https://newgensoft.com/resources/report-gcc-2025/", name: "Newgen: Future of GCCs 2025" },
  { category: "Landing Pages & Portals", type: "Landing", url: "https://community.nasscom.in/communities/global-capability-centers/global-gcc-summit-2025-post-summit-report", name: "NASSCOM: Global GCC Summit 2025" },
];

// Get unique categories sorted
export const resourceCategories = [...new Set(allResources.map(r => r.category))].sort();

// Group resources by category
export const resourcesByCategory: Record<string, Resource[]> = {};
allResources.forEach(r => {
  if (!resourcesByCategory[r.category]) resourcesByCategory[r.category] = [];
  resourcesByCategory[r.category].push(r);
});
