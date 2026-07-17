export interface IndustrySiloData {
  id: string;
  slug: string;
  title: string;
  overview: string;
  challenges: string[];
  aiOpportunities: string[];
  implementationExamples: string[];
  roiMetrics: string[];
}

export const industriesData: IndustrySiloData[] = [
  {
    id: "manufacturing",
    slug: "manufacturing",
    title: "Manufacturing & Industry 4.0",
    overview: "Transform legacy manufacturing floors into autonomous, data-driven operations. We deploy predictive AI and ERP integrations to optimize supply chains and eliminate downtime.",
    challenges: [
      "Unplanned equipment downtime costing millions annually.",
      "Disconnected floor sensors and legacy ERP systems.",
      "Inefficient inventory management and supply chain bottlenecks."
    ],
    aiOpportunities: [
      "Predictive maintenance models using IoT sensor telemetry.",
      "Computer vision for automated quality assurance.",
      "Autonomous supply chain routing and procurement."
    ],
    implementationExamples: [
      "Implemented a predictive maintenance AI model that foresaw 85% of hardware failures 48 hours in advance, saving $1.2M in downtime.",
      "Integrated shop-floor IoT data with SAP Business One to automate inventory reordering."
    ],
    roiMetrics: ["30% reduction in unplanned downtime", "15% optimization in supply chain logistics"]
  },
  {
    id: "healthcare",
    slug: "healthcare",
    title: "Healthcare & Life Sciences",
    overview: "Modernize patient care and operational workflows with HIPAA-compliant AI systems. We build secure data pipelines and intelligent automation for healthcare providers.",
    challenges: [
      "Overwhelming administrative burden and manual data entry for clinicians.",
      "Fragmented patient data across non-communicative EHR systems.",
      "Strict HIPAA compliance requirements hindering cloud adoption."
    ],
    aiOpportunities: [
      "LLM-powered clinical documentation and transcription.",
      "Automated patient triage and appointment scheduling agents.",
      "Predictive analytics for patient readmission risks."
    ],
    implementationExamples: [
      "Built a secure, HIPAA-compliant patient portal with an AI triage assistant that reduced ER wait times by 20%.",
      "Deployed automated RCM (Revenue Cycle Management) workflows, reducing claim denials by 18%."
    ],
    roiMetrics: ["40% reduction in administrative overhead", "Zero compliance breaches"]
  },
  {
    id: "finance",
    slug: "finance",
    title: "Financial Services & FinTech",
    overview: "Engineer secure, high-throughput financial infrastructure. From automated compliance reporting to real-time fraud detection and predictive market analytics.",
    challenges: [
      "Manual reconciliation processes delaying month-end close.",
      "Rising costs of regulatory compliance and risk management.",
      "Legacy banking cores struggling to support modern, personalized customer experiences."
    ],
    aiOpportunities: [
      "Real-time fraud detection using machine learning on transaction streams.",
      "RPA for automated financial consolidation and ledger reconciliation.",
      "AI financial advisors and personalized wealth management interfaces."
    ],
    implementationExamples: [
      "Automated month-end financial consolidation across 15 global subsidiaries, reducing close time from 22 days to 4.",
      "Built a high-performance native FinTech app with biometric security and sub-second transaction times."
    ],
    roiMetrics: ["80% reduction in manual reconciliation", "Sub-100ms transaction processing"]
  },
  {
    id: "retail",
    slug: "retail",
    title: "Retail & E-Commerce",
    overview: "Drive omnichannel growth through AI-powered personalization and unified commerce infrastructure. We build high-performance storefronts and predictive inventory systems.",
    challenges: [
      "Siloed customer data across in-store POS and online platforms.",
      "High cart abandonment rates due to slow, generic web experiences.",
      "Inefficient inventory distribution leading to stockouts and overstock."
    ],
    aiOpportunities: [
      "Unified Customer Data Platforms (CDPs) for hyper-personalized marketing.",
      "Headless commerce architecture for lightning-fast mobile shopping.",
      "Demand forecasting AI to optimize inventory allocation."
    ],
    implementationExamples: [
      "Migrated a luxury brand to headless Shopify Plus, improving mobile load times by 300% and increasing conversions by 42%.",
      "Deployed a unified inventory system connecting 50+ physical stores with a central D2C platform."
    ],
    roiMetrics: ["40%+ increase in mobile conversions", "98.5% inventory accuracy across channels"]
  },
  {
    id: "education",
    slug: "education",
    title: "Education & EdTech",
    overview: "Create intelligent, scalable learning platforms. We engineer data-driven EdTech infrastructure that personalizes education and automates administrative overhead.",
    challenges: [
      "One-size-fits-all learning management systems (LMS).",
      "High student dropout rates with no early warning indicators.",
      "Administrative overload in admissions and student support."
    ],
    aiOpportunities: [
      "AI tutors and personalized learning pathways.",
      "Predictive models to identify at-risk students before they churn.",
      "Automated admissions processing and 24/7 student support agents."
    ],
    implementationExamples: [
      "Built a centralized data warehouse and ML churn model that predicted student dropouts with 82% accuracy.",
      "Deployed an AI-powered student support agent handling 60% of routine inquiries."
    ],
    roiMetrics: ["30% improvement in student retention", "90% reduction in reporting time"]
  },
  {
    id: "construction",
    slug: "construction",
    title: "Construction & Engineering",
    overview: "Digitize the job site and automate project management. We build robust tools for resource allocation, safety monitoring, and supply chain visibility.",
    challenges: [
      "Paper-based processes leading to data loss and project delays.",
      "Lack of real-time visibility into resource utilization across multiple sites.",
      "Cost overruns due to inaccurate project estimations."
    ],
    aiOpportunities: [
      "Computer vision for automated site safety monitoring.",
      "AI-driven project estimation and resource allocation.",
      "Mobile-first field reporting and automated compliance tracking."
    ],
    implementationExamples: [
      "Developed a custom mobile app for field engineers allowing offline data capture and automated sync with central ERP.",
      "Implemented a predictive scheduling tool that reduced idle equipment time by 25%."
    ],
    roiMetrics: ["25% reduction in equipment idle time", "100% digitization of field reporting"]
  },
  {
    id: "mining",
    slug: "mining",
    title: "Mining & Heavy Industry",
    overview: "Deploy rugged, reliable data infrastructure and predictive AI to optimize extraction, improve safety, and manage complex global logistics.",
    challenges: [
      "Harsh environments causing unpredictable equipment failure.",
      "Massive amounts of unstructured telemetry data going unused.",
      "Complex, high-risk operational safety requirements."
    ],
    aiOpportunities: [
      "Predictive maintenance on heavy machinery using IoT streams.",
      "Automated geological data analysis for resource estimation.",
      "Real-time environmental and safety monitoring."
    ],
    implementationExamples: [
      "Processed real-time IoT sensor data to train anomaly detection models, predicting hardware failures and saving millions.",
      "Built a secure, edge-computing network to process data locally in low-connectivity mining sites."
    ],
    roiMetrics: ["$1.2M saved in first-year downtime", "Significant improvement in safety incident response"]
  },
  {
    id: "hospitality",
    slug: "hospitality",
    title: "Hospitality & Travel",
    overview: "Elevate guest experiences and streamline operations. We architect dynamic pricing engines, automated booking workflows, and personalized guest portals.",
    challenges: [
      "Fragmented booking systems and legacy property management software.",
      "Inability to dynamically adjust pricing based on real-time market data.",
      "High customer service volume for routine booking inquiries."
    ],
    aiOpportunities: [
      "AI-driven dynamic pricing and yield management models.",
      "Conversational AI agents for seamless booking and concierge services.",
      "Unified customer profiles for hyper-personalized guest experiences."
    ],
    implementationExamples: [
      "Integrated a custom booking engine with legacy PMS, enabling real-time inventory sync and dynamic pricing.",
      "Deployed a multilingual AI concierge that handles 70% of guest requests autonomously."
    ],
    roiMetrics: ["15% increase in RevPAR", "70% automation of routine guest inquiries"]
  },
  {
    id: "legal",
    slug: "legal",
    title: "Legal & Compliance",
    overview: "Secure, intelligent infrastructure for law firms and legal tech. We build robust document management, automated contract analysis, and strict compliance systems.",
    challenges: [
      "Manual review of thousands of documents for discovery and due diligence.",
      "Extreme data security and confidentiality requirements.",
      "Inefficient, siloed document management systems."
    ],
    aiOpportunities: [
      "LLM-powered contract analysis and clause extraction.",
      "Automated eDiscovery and legal research tools.",
      "Secure, role-based document management systems with DLP."
    ],
    implementationExamples: [
      "Implemented a highly secure, custom Document Management System with precise metadata tagging and automated access audits.",
      "Built an AI tool that reduces contract review time by automatically highlighting non-standard clauses."
    ],
    roiMetrics: ["95% reduction in eDiscovery search time", "100% document traceability"]
  },
  {
    id: "government",
    slug: "government",
    title: "Government & Public Sector",
    overview: "Modernize public services with secure, scalable infrastructure. We deliver compliant, citizen-centric platforms and operational automation for government agencies.",
    challenges: [
      "Aging legacy systems that are costly to maintain and vulnerable to attack.",
      "Fragmented citizen data across disparate departments.",
      "Strict procurement and compliance standards (FedRAMP, etc.)."
    ],
    aiOpportunities: [
      "Automated processing of citizen applications and permits.",
      "Unified identity and access management (IAM) for secure cross-department portals.",
      "AI-driven analysis of public data for urban planning and resource allocation."
    ],
    implementationExamples: [
      "Implemented a unified SSO and IAM solution across 30+ internal government portals, reducing helpdesk tickets by 90%.",
      "Built a secure, scalable public-facing portal for streamlined civic services."
    ],
    roiMetrics: ["90% drop in IT support tickets", "Significant improvement in citizen service delivery"]
  },
  {
    id: "real-estate",
    slug: "real-estate",
    title: "Real Estate & PropTech",
    overview: "Automate property management and empower brokerages. We build high-volume CRMs, automated marketing pipelines, and predictive valuation models.",
    challenges: [
      "Lead leakage due to slow follow-up times by agents.",
      "Manual, disconnected property management workflows.",
      "Inaccurate property valuations based on stale data."
    ],
    aiOpportunities: [
      "Autonomous lead qualification and routing agents.",
      "Machine learning models for dynamic property valuation (AVMs).",
      "Automated lease management and maintenance ticketing."
    ],
    implementationExamples: [
      "Custom built a mobile-first CRM for a national brokerage with automated SMS drip campaigns, increasing conversion by 28%.",
      "Developed a centralized portal for property managers to automate rent collection and maintenance dispatch."
    ],
    roiMetrics: ["28% increase in lead conversion", "Massive reduction in administrative overhead"]
  },
  {
    id: "startups",
    slug: "startups",
    title: "High-Growth Startups",
    overview: "Rapid, scalable engineering for venture-backed startups. We build robust MVPs and SaaS cores designed to survive extreme growth without a rewrite.",
    challenges: [
      "Balancing the need for rapid time-to-market with the risk of technical debt.",
      "Building a premium user experience that attracts investors and early adopters.",
      "Scaling infrastructure efficiently during hyper-growth phases."
    ],
    aiOpportunities: [
      "Integrating cutting-edge AI features (LLMs, GenAI) as core product differentiators.",
      "Serverless architectures for infinite, cost-effective scaling.",
      "Rapid prototyping using modern composable frameworks."
    ],
    implementationExamples: [
      "Engineered a highly secure React Native FinTech app that launched in 5 months and passed SOC2 audits.",
      "Architected a scalable SaaS core for an AI startup, deploying to production in under 90 days."
    ],
    roiMetrics: ["Launch in 6-10 weeks", "Enterprise-grade architecture from day one"]
  },
  {
    id: "smbs",
    slug: "smbs",
    title: "SMBs & Mid-Market",
    overview: "Democratize enterprise-grade automation. We help SMBs punch above their weight by automating operations, integrating systems, and deploying AI agents.",
    challenges: [
      "Small teams bogged down by manual, repetitive administrative tasks.",
      "Inability to afford massive enterprise software licenses (e.g., Salesforce, SAP).",
      "Disconnected software stack (using 20+ different SaaS tools)."
    ],
    aiOpportunities: [
      "No-code/Low-code automation (n8n, Zapier) to connect disparate tools.",
      "AI customer support agents to handle 24/7 inquiries without adding headcount.",
      "Custom, lightweight web applications tailored to specific operational needs."
    ],
    implementationExamples: [
      "Automated a logistics company's routing and dispatch using n8n and Google Maps APIs, saving 20 hours a week.",
      "Deployed a custom CRM and lead routing system for a regional service business, doubling close rates."
    ],
    roiMetrics: ["20+ hours saved per week per employee", "Zero recurring enterprise software license fees"]
  },
  {
    id: "enterprise",
    slug: "enterprise",
    title: "Large Enterprise",
    overview: "Transform massive organizations with AI-first digital infrastructure. We architect multi-tenant systems, unified data lakes, and complex integrations.",
    challenges: [
      "Decades of technical debt and deeply entrenched legacy systems.",
      "Data silos preventing a unified view of global operations.",
      "Need for strict governance, compliance, and zero-downtime deployments."
    ],
    aiOpportunities: [
      "Enterprise-wide AI copilots securely trained on internal knowledge bases.",
      "Modernization of legacy monoliths into scalable microservices.",
      "Unified data lakes and real-time business intelligence dashboards."
    ],
    implementationExamples: [
      "Decomposed a fragile monolithic API handling 50K+ daily calls into 12 microservices, reducing response time to 200ms.",
      "Built a secure, compliant compliance automation platform for a global insurance firm."
    ],
    roiMetrics: ["99.99% system uptime achieved", "75% reduction in compliance effort"]
  },
  {
    id: "logistics",
    slug: "logistics",
    title: "Logistics & Supply Chain",
    overview: "Optimize global movement with data and automation. We build custom routing engines, real-time tracking portals, and predictive supply chain analytics.",
    challenges: [
      "Inefficient route planning leading to high fuel costs and delays.",
      "Lack of real-time visibility for customers and internal dispatch.",
      "Manual processing of complex B2B invoices and customs documentation."
    ],
    aiOpportunities: [
      "Algorithmic route optimization using live traffic and weather data.",
      "AI-driven OCR to automate invoice and customs document processing.",
      "Real-time predictive ETA modeling."
    ],
    implementationExamples: [
      "Built a custom routing engine that reduced fuel overhead by 18% and improved ETA accuracy to 96%.",
      "Developed a full-stack B2B vendor portal with automated invoicing, saving $1.2M annually."
    ],
    roiMetrics: ["18% reduction in fuel costs", "65% faster invoice processing"]
  },
  {
    id: "energy",
    slug: "energy",
    title: "Energy & Utilities",
    overview: "Modernize grid infrastructure and resource management. We deliver robust data engineering and predictive models for the energy sector.",
    challenges: [
      "Balancing volatile grid demand with renewable energy fluctuations.",
      "Aging infrastructure requiring constant, costly maintenance.",
      "Vast amounts of unanalyzed telemetry data from smart meters."
    ],
    aiOpportunities: [
      "Predictive analytics for grid load balancing and demand forecasting.",
      "AI models for predictive maintenance on turbines and grid infrastructure.",
      "Automated customer portals for energy usage insights."
    ],
    implementationExamples: [
      "Architected a real-time data pipeline to ingest and analyze telemetry from thousands of smart meters.",
      "Deployed predictive maintenance models to optimize service schedules for remote infrastructure."
    ],
    roiMetrics: ["Significant reduction in maintenance costs", "Improved grid reliability and forecasting"]
  }
];
