export interface ServiceSiloData {
  id: string;
  slug: string;
  title: string;
  category: string;
  overview: string;
  businessChallenges: string[];
  solutionOverview: string;
  howWeDeliver: string;
  benefits: string[];
  technologyStack: string[];
  timeline: string;
  deliverables: string[];
  relatedServices: string[];
}

export const servicesData: ServiceSiloData[] = [
  {
    id: "ai-agents",
    slug: "ai-agents",
    title: "AI Agents",
    category: "Artificial Intelligence",
    overview: "Deploy autonomous AI agents that act as intelligent workers within your organization. We engineer Custom Support AI, Sales AI, HR AI, Finance AI, Voice AI, Internal Knowledge AI, AI Copilots, and complex Multi-Agent Systems.",
    businessChallenges: [
      "Scaling customer support without linearly increasing headcount costs.",
      "Inconsistent sales follow-ups and unqualified pipeline congestion.",
      "Information silos and slow internal knowledge retrieval."
    ],
    solutionOverview: "We build and deploy proprietary AI agents trained on your specific organizational data. These aren't generic chatbots; they are task-oriented systems capable of executing complex workflows, accessing databases, and reasoning through multi-step processes autonomously.",
    howWeDeliver: "Using advanced RAG architectures, orchestrator frameworks like LangChain/LlamaIndex, and robust API meshes, we securely expose your data to custom-trained models, ensuring hallucination-free, deterministic execution.",
    benefits: [
      "60-80% reduction in Level 1 support tickets.",
      "24/7 autonomous operations across sales, HR, and finance.",
      "100% IP ownership of your custom agent infrastructure."
    ],
    technologyStack: ["OpenAI / Anthropic APIs", "LangChain / LlamaIndex", "Pinecone / Qdrant", "Python / FastAPI"],
    timeline: "6-12 Weeks to Production",
    deliverables: [
      "Fully integrated, proprietary AI Agent",
      "Custom RAG pipeline connecting your private data",
      "Security and role-based access control layer",
      "Full source code and IP transfer"
    ],
    relatedServices: ["ai-workflow-automation", "data-engineering", "api-development"]
  },
  {
    id: "ai-workflow-automation",
    slug: "ai-workflow-automation",
    title: "AI Workflow Automation",
    category: "Automation",
    overview: "Eliminate manual data entry and human bottlenecks. We architect robust automation pipelines using n8n, Make, and Zapier combined with custom Python RPA for CRM, Finance, HR, Procurement, and ERP processes.",
    businessChallenges: [
      "Manual data transfer between disjointed SaaS tools.",
      "Slow approval routing and procurement delays.",
      "High operational overhead for repetitive, low-value tasks."
    ],
    solutionOverview: "We construct autonomous workflows that connect your entire software ecosystem. By integrating AI decision-making into the routing logic, we enable systems to classify, extract, and route data without human intervention.",
    howWeDeliver: "We map your current manual processes, design optimized target architectures, and deploy custom API integrations and webhook listeners on self-hosted n8n or enterprise Make/Zapier instances.",
    benefits: [
      "Reclaim 20+ hours per week, per team member.",
      "Eliminate human error in data entry and reconciliation.",
      "Zero vendor lock-in with open-standard architectures."
    ],
    technologyStack: ["n8n", "Make", "Python RPA", "Zapier Enterprise"],
    timeline: "4-8 Weeks",
    deliverables: [
      "Process mapping documentation",
      "Deployed automated workflows",
      "Error handling and alerting systems",
      "Knowledge transfer and documentation"
    ],
    relatedServices: ["system-integration", "erp-automation", "custom-software-development"]
  },
  {
    id: "custom-software-development",
    slug: "custom-software-development",
    title: "Custom Software Development",
    category: "Engineering",
    overview: "Enterprise-grade software tailored precisely to your operational realities. We engineer secure, highly scalable custom applications that provide a distinct competitive advantage.",
    businessChallenges: [
      "Off-the-shelf software failing to match complex internal workflows.",
      "Expensive licensing costs for enterprise SaaS platforms.",
      "Inability to scale existing legacy applications."
    ],
    solutionOverview: "We build bespoke software from the ground up, focusing on clean architecture, maintainability, and scalability. Your system is designed specifically to optimize your unique business processes.",
    howWeDeliver: "Following rigorous agile methodologies, we move from deep architectural discovery to rapid iterative development, ensuring perfect alignment with business objectives at every sprint.",
    benefits: [
      "Software that adapts to your business, not vice versa.",
      "Elimination of recurring SaaS licensing fees.",
      "Infinite horizontal scalability."
    ],
    technologyStack: ["React / Next.js", "Node.js / NestJS", "PostgreSQL", "AWS / Google Cloud"],
    timeline: "12-24 Weeks",
    deliverables: [
      "Production-ready custom software application",
      "Comprehensive test suites",
      "Deployment infrastructure",
      "Full IP and source code transfer"
    ],
    relatedServices: ["saas-product-development", "cloud-solutions", "ui-ux-design"]
  },
  {
    id: "saas-product-development",
    slug: "saas-product-development",
    title: "SaaS Product Development",
    category: "Engineering",
    overview: "From vision to a market-ready, multi-tenant SaaS platform. We architect scalable, secure, and highly performant software products designed for rapid user acquisition and low churn.",
    businessChallenges: [
      "Long time-to-market resulting in missed opportunities.",
      "Architecture that crumbles under multi-tenant scale.",
      "Subpar user experiences driving high churn rates."
    ],
    solutionOverview: "We act as your elite engineering partner, building a robust SaaS core with multi-tenant architecture, robust billing integrations, and a premium user interface that commands enterprise pricing.",
    howWeDeliver: "We deploy hardened proprietary 'Nexus Primitives' for authentication, billing, and tenancy, allowing us to focus 80% of our effort on your unique business logic and competitive differentiator.",
    benefits: [
      "Accelerated time-to-market (deploy in 90 days).",
      "Enterprise-grade reliability and security from day one.",
      "Architecture built to handle 10x scale without rewrites."
    ],
    technologyStack: ["Next.js", "Vercel Edge", "Supabase / PostgreSQL", "Stripe"],
    timeline: "12-16 Weeks to MVP",
    deliverables: [
      "Market-ready SaaS product",
      "Subscription billing infrastructure",
      "Multi-tenant database architecture",
      "Admin control panel"
    ],
    relatedServices: ["web-development", "startup-mvp-development", "ui-ux-design"]
  },
  {
    id: "enterprise-applications",
    slug: "enterprise-applications",
    title: "Enterprise Applications",
    category: "Engineering",
    overview: "Mission-critical applications designed for large-scale organizational deployment. We engineer resilient systems with advanced RBAC, strict compliance, and massive data throughput capabilities.",
    businessChallenges: [
      "Fragmented legacy systems causing operational gridlock.",
      "Strict data compliance and governance requirements (GDPR, SOC2).",
      "Need for complex role-based access control across thousands of users."
    ],
    solutionOverview: "We architect applications specifically for the enterprise environment. Our systems feature audit logging, SSO integrations, advanced security postures, and integrations with existing ERP/CRM behemoths.",
    howWeDeliver: "Our senior architects lead discovery, mapping existing legacy infrastructures and designing a modernization path that ensures zero operational downtime during rollout.",
    benefits: [
      "Uncompromised security and regulatory compliance.",
      "Seamless integration with existing enterprise ecosystems.",
      "Unified operational visibility across global departments."
    ],
    technologyStack: ["Java / Spring Boot", "C# / .NET", "Kubernetes", "Kafka"],
    timeline: "16-32 Weeks",
    deliverables: [
      "Enterprise-grade application deployment",
      "SSO/IAM integrations",
      "Compliance and security audit reports",
      "High-availability architecture setup"
    ],
    relatedServices: ["system-integration", "cybersecurity", "cloud-solutions"]
  },
  {
    id: "web-development",
    slug: "web-development",
    title: "High-Performance Web Development",
    category: "Engineering",
    overview: "We build headless, composable web platforms optimized for Core Web Vitals, conversion rate optimization (CRO), and advanced AI Engine Optimization (AEO/GEO).",
    businessChallenges: [
      "Slow, bloated websites driving away high-intent traffic.",
      "Poor search visibility in the era of AI Overviews and ChatGPT search.",
      "Low conversion rates due to generic user experiences."
    ],
    solutionOverview: "We deliver blazingly fast web experiences using modern edge computing. Our web platforms are structured with precise semantic HTML and schema markup to dominate both traditional search and AI-driven discovery.",
    howWeDeliver: "By leveraging Next.js and Vercel, we push computation to the edge. We pair this with headless CMS architectures to empower marketing teams while maintaining strict performance guardrails.",
    benefits: [
      "Near-instant page loads (Sub-second Core Web Vitals).",
      "Optimized for AI Search (Perplexity, ChatGPT, Google AI).",
      "Premium, enterprise-grade aesthetic that builds instant trust."
    ],
    technologyStack: ["Next.js", "React", "Tailwind CSS", "Sanity / Contentful"],
    timeline: "6-12 Weeks",
    deliverables: [
      "High-performance headless web platform",
      "Integrated headless CMS",
      "Comprehensive AEO/GEO schema implementation",
      "Analytics and telemetry setup"
    ],
    relatedServices: ["technical-seo", "ai-search-optimization", "ui-ux-design"]
  },
  {
    id: "mobile-app-development",
    slug: "mobile-app-development",
    title: "Mobile App Development",
    category: "Engineering",
    overview: "Native and cross-platform mobile applications that deliver premium user experiences. We embed AI features natively to create predictive, intelligent mobile interfaces.",
    businessChallenges: [
      "Clunky, unresponsive mobile experiences damaging brand perception.",
      "High development costs to maintain separate iOS and Android codebases.",
      "Lack of on-device intelligence and personalization."
    ],
    solutionOverview: "We build highly performant mobile applications using React Native or Native Swift/Kotlin. We specialize in embedding on-device AI models for features like predictive UX and localized processing.",
    howWeDeliver: "We utilize unified codebases where appropriate to reduce time-to-market, without sacrificing the fluid, native feel expected by modern consumers and enterprise users.",
    benefits: [
      "Launch on both iOS and Android simultaneously.",
      "Premium, fluid user interfaces (60+ FPS).",
      "Secure, scalable mobile architectures."
    ],
    technologyStack: ["React Native", "Swift", "Kotlin", "CoreML / TensorFlow Lite"],
    timeline: "10-16 Weeks",
    deliverables: [
      "Production-ready iOS and Android applications",
      "App Store and Google Play deployment",
      "Mobile CI/CD pipelines",
      "Analytics and crash reporting integration"
    ],
    relatedServices: ["ui-ux-design", "api-development", "saas-product-development"]
  },
  {
    id: "cloud-solutions",
    slug: "cloud-solutions",
    title: "Cloud Infrastructure Solutions",
    category: "Infrastructure",
    overview: "Scalable, secure, and cost-optimized cloud architectures. We design, migrate, and manage infrastructure on AWS, Google Cloud, and Azure to ensure 99.99% availability.",
    businessChallenges: [
      "Spiraling cloud costs with no clear ROI.",
      "Frequent downtime and lack of disaster recovery capabilities.",
      "Inability to scale infrastructure dynamically with traffic spikes."
    ],
    solutionOverview: "We implement Infrastructure as Code (IaC) to create reproducible, secure, and auto-scaling cloud environments. Our architectures are designed for multi-AZ resilience and optimal resource utilization.",
    howWeDeliver: "We audit existing infrastructure, design an optimized target state, and execute zero-downtime migrations using Terraform and modern CI/CD practices.",
    benefits: [
      "30-50% reduction in monthly cloud expenditure.",
      "Enterprise-grade reliability and disaster recovery.",
      "Infinite, automated scalability."
    ],
    technologyStack: ["AWS / GCP / Azure", "Terraform", "Docker", "Kubernetes"],
    timeline: "4-12 Weeks",
    deliverables: [
      "Infrastructure as Code (IaC) repositories",
      "Cloud migration execution",
      "Security and compliance hardening",
      "Cost optimization report"
    ],
    relatedServices: ["devops", "cybersecurity", "data-engineering"]
  },
  {
    id: "devops",
    slug: "devops",
    title: "DevOps & CI/CD",
    category: "Infrastructure",
    overview: "Accelerate your software delivery lifecycle. We implement robust DevOps practices, automated testing, and CI/CD pipelines to ensure rapid, reliable, and secure deployments.",
    businessChallenges: [
      "Slow, manual deployment processes prone to human error.",
      "Integration hell resulting in delayed releases.",
      "Lack of visibility into system health and deployment bottlenecks."
    ],
    solutionOverview: "We bridge the gap between development and operations. By automating the build, test, and deployment phases, we enable teams to ship code multiple times a day with zero fear of breaking production.",
    howWeDeliver: "We implement modern GitOps workflows, containerize applications, and set up comprehensive telemetry and alerting systems using industry-leading observability tools.",
    benefits: [
      "10x faster deployment frequency.",
      "Near-zero deployment failure rates.",
      "Instant rollback capabilities."
    ],
    technologyStack: ["GitHub Actions / GitLab CI", "Docker", "Kubernetes", "Datadog / Prometheus"],
    timeline: "4-8 Weeks",
    deliverables: [
      "Automated CI/CD pipelines",
      "Containerization of existing applications",
      "Observability and alerting dashboards",
      "DevOps culture and workflow documentation"
    ],
    relatedServices: ["cloud-solutions", "cybersecurity", "custom-software-development"]
  },
  {
    id: "business-intelligence",
    slug: "business-intelligence",
    title: "Business Intelligence",
    category: "Data",
    overview: "Transform raw data into actionable strategic insights. We design sophisticated BI dashboards and reporting systems that eliminate guesswork from executive decision-making.",
    businessChallenges: [
      "Decision-making based on gut feeling or stale spreadsheet data.",
      "Fragmented data across dozens of isolated SaaS platforms.",
      "Inability to track real-time KPIs and ROI."
    ],
    solutionOverview: "We consolidate your data silos into a unified visualization layer. We build interactive, real-time dashboards that provide granular visibility into operations, sales, finance, and marketing performance.",
    howWeDeliver: "We connect to your data warehouse or operational databases, define standardized metrics, and build customized reports in tools like Tableau, PowerBI, or custom React dashboards.",
    benefits: [
      "Single source of truth for all organizational metrics.",
      "Real-time visibility into business performance.",
      "Reduction in manual reporting overhead by 90%."
    ],
    technologyStack: ["Tableau", "PowerBI", "Metabase", "Custom React Dashboards"],
    timeline: "4-8 Weeks",
    deliverables: [
      "Executive and operational BI dashboards",
      "Data semantic layer definition",
      "Automated reporting schedules",
      "User training and documentation"
    ],
    relatedServices: ["data-engineering", "system-integration", "ai-agents"]
  },
  {
    id: "data-engineering",
    slug: "data-engineering",
    title: "Data Engineering",
    category: "Data",
    overview: "Architecting the foundational plumbing for the AI era. We build robust data pipelines, data lakes, and warehouses that ingest, transform, and serve petabytes of data reliably.",
    businessChallenges: [
      "Inability to trust data due to inconsistent pipelines.",
      "Slow query performance stalling operational intelligence.",
      "Lack of clean, structured data required to train AI models."
    ],
    solutionOverview: "We design modern data stacks. We implement scalable ETL/ELT pipelines, set up massive data warehouses, and ensure your data infrastructure is ready to fuel advanced machine learning and AI applications.",
    howWeDeliver: "Using tools like dbt for transformation, Airflow for orchestration, and Snowflake/BigQuery for storage, we build resilient pipelines that guarantee data accuracy and freshness.",
    benefits: [
      "Sub-100ms query performance on massive datasets.",
      "AI-ready data infrastructure.",
      "Elimination of data silos."
    ],
    technologyStack: ["Snowflake / BigQuery", "dbt", "Apache Airflow", "Kafka"],
    timeline: "8-16 Weeks",
    deliverables: [
      "Scalable data warehouse architecture",
      "Automated ETL/ELT pipelines",
      "Data governance and quality frameworks",
      "Real-time streaming infrastructure (if required)"
    ],
    relatedServices: ["business-intelligence", "ai-workflow-automation", "cloud-solutions"]
  },
  {
    id: "api-development",
    slug: "api-development",
    title: "API Development & Architecture",
    category: "Engineering",
    overview: "Design and deployment of secure, high-performance APIs. We build the connective tissue that allows your systems, partners, and customers to communicate flawlessly.",
    businessChallenges: [
      "Fragile point-to-point integrations that break frequently.",
      "Inability to monetize data or services externally.",
      "Security vulnerabilities in data transit."
    ],
    solutionOverview: "We architect RESTful and GraphQL APIs designed for scale and security. We implement robust API gateways, rate limiting, and comprehensive documentation to ensure seamless developer experiences.",
    howWeDeliver: "We follow API-first design principles, establishing clear contracts before writing code. We deploy on serverless or microservices architectures to guarantee high availability and low latency.",
    benefits: [
      "Secure, scalable exposure of business logic.",
      "New revenue streams through external API monetization.",
      "Accelerated internal development through decoupled systems."
    ],
    technologyStack: ["Node.js / Python", "GraphQL / REST", "Kong / AWS API Gateway", "Swagger / OpenAPI"],
    timeline: "4-10 Weeks",
    deliverables: [
      "Production-ready API endpoints",
      "API Gateway configuration",
      "Interactive developer documentation (Swagger/Postman)",
      "Authentication and rate-limiting implementation"
    ],
    relatedServices: ["system-integration", "custom-software-development", "mobile-app-development"]
  },
  {
    id: "system-integration",
    slug: "system-integration",
    title: "Enterprise System Integration",
    category: "Engineering",
    overview: "Unifying your technology ecosystem. We architect complex integrations between legacy systems, modern SaaS platforms, and custom applications to create a cohesive digital nervous system.",
    businessChallenges: [
      "Disjointed systems causing severe operational friction.",
      "Data inconsistencies across CRM, ERP, and Finance systems.",
      "Costly manual reconciliation processes."
    ],
    solutionOverview: "We replace fragile, manual data transfers with robust, automated integration layers. We utilize enterprise service buses (ESB) or modern API meshes to ensure data flows securely and reliably across your entire organization.",
    howWeDeliver: "We map your data models, design resilient integration patterns (event-driven or batch), and deploy middleware solutions that gracefully handle failures and retries.",
    benefits: [
      "100% data consistency across all platforms.",
      "Elimination of manual data entry.",
      "Real-time synchronization of critical business events."
    ],
    technologyStack: ["MuleSoft / Boomi", "Apache Kafka", "Custom Middleware", "Webhooks"],
    timeline: "8-16 Weeks",
    deliverables: [
      "Integration architecture design",
      "Deployed middleware/API mesh",
      "Data mapping and transformation logic",
      "Monitoring and alerting systems"
    ],
    relatedServices: ["api-development", "data-engineering", "ai-workflow-automation"]
  },
  {
    id: "cybersecurity",
    slug: "cybersecurity",
    title: "Cybersecurity & Compliance",
    category: "Infrastructure",
    overview: "Securing your digital assets against evolving threats. We provide comprehensive security audits, architecture hardening, and compliance readiness for enterprise systems.",
    businessChallenges: [
      "Vulnerabilities in critical software exposing sensitive data.",
      "Inability to meet strict enterprise compliance (SOC2, ISO27001).",
      "Lack of incident response planning."
    ],
    solutionOverview: "We adopt a Zero-Trust architecture approach. From penetration testing your applications to hardening your cloud infrastructure and setting up automated security scanning in your CI/CD pipelines.",
    howWeDeliver: "Our security engineers conduct thorough audits, identify vulnerabilities, and work alongside your development teams to implement robust encryption, IAM policies, and threat detection systems.",
    benefits: [
      "Protection against data breaches and cyber threats.",
      "Accelerated path to SOC2/ISO27001 compliance.",
      "Continuous security monitoring and threat intelligence."
    ],
    technologyStack: ["AWS Security Hub", "CrowdStrike", "SonarQube", "HashiCorp Vault"],
    timeline: "4-12 Weeks",
    deliverables: [
      "Comprehensive Vulnerability Assessment (VAPT)",
      "Architecture hardening implementation",
      "Identity and Access Management (IAM) overhaul",
      "Compliance readiness documentation"
    ],
    relatedServices: ["cloud-solutions", "devops", "enterprise-applications"]
  },
  {
    id: "digital-transformation",
    slug: "digital-transformation",
    title: "Digital Transformation Consulting",
    category: "Consulting",
    overview: "Strategic advisory to navigate the AI and automation era. We help executive teams align technology investments with business outcomes, mapping the journey from legacy operations to an AI-first enterprise.",
    businessChallenges: [
      "Lack of a coherent strategy for adopting AI and automation.",
      "Wasted investments on technology that doesn't generate ROI.",
      "Cultural resistance to operational change."
    ],
    solutionOverview: "We don't just write code; we design operational shifts. We act as your fractional CTO/CIO, auditing your current state, identifying high-ROI automation opportunities, and delivering a concrete architectural roadmap.",
    howWeDeliver: "Through deep-dive workshops and operational audits, we analyze your business processes, vendor ecosystem, and data maturity to construct a multi-phase transformation blueprint.",
    benefits: [
      "Clear, actionable technology roadmap aligned with revenue goals.",
      "De-risked technology investments.",
      "Identification of immediate operational efficiencies."
    ],
    technologyStack: ["Enterprise Architecture Frameworks", "Process Mining Tools", "ROI Modeling"],
    timeline: "2-6 Weeks",
    deliverables: [
      "Comprehensive Technology Audit",
      "AI Readiness Assessment",
      "Multi-phase Transformation Roadmap",
      "Vendor and technology stack recommendations"
    ],
    relatedServices: ["ai-workflow-automation", "data-engineering", "enterprise-applications"]
  },
  {
    id: "startup-mvp-development",
    slug: "startup-mvp-development",
    title: "Startup MVP Development",
    category: "Engineering",
    overview: "Rapid engineering for high-growth startups. We build scalable Minimum Viable Products (MVPs) designed to validate market fit quickly while establishing a foundation that won't require a rewrite at Series A.",
    businessChallenges: [
      "Need to prove traction fast before runway expires.",
      "Balancing speed-to-market with technical debt.",
      "Attracting early adopters with a premium user experience."
    ],
    solutionOverview: "We deploy our battle-tested 'Nexus Primitives' to accelerate development, focusing custom engineering solely on your core differentiator. We build fast, but we build right.",
    howWeDeliver: "Using highly agile sprints, we prioritize core features, integrate necessary third-party APIs (Stripe, Auth), and deploy a polished product that feels enterprise-ready from day one.",
    benefits: [
      "Launch your product in 6-10 weeks.",
      "Premium UX that attracts investors and early adopters.",
      "Scalable architecture that supports rapid growth."
    ],
    technologyStack: ["Next.js", "Supabase", "Tailwind CSS", "Vercel"],
    timeline: "6-10 Weeks",
    deliverables: [
      "Fully functional MVP application",
      "Integrated authentication and payments",
      "Scalable database architecture",
      "Production deployment and handover"
    ],
    relatedServices: ["saas-product-development", "ui-ux-design", "branding"]
  },
  {
    id: "ui-ux-design",
    slug: "ui-ux-design",
    title: "Enterprise UI/UX Design",
    category: "Design",
    overview: "Crafting digital experiences that command authority. We design intuitive, premium interfaces for complex enterprise software, SaaS products, and high-conversion web platforms.",
    businessChallenges: [
      "Complex software interfaces that require extensive user training.",
      "Outdated aesthetics diminishing brand trust and perceived value.",
      "Low user adoption rates due to friction in critical workflows."
    ],
    solutionOverview: "We apply rigorous UX methodologies to simplify complex data and workflows. Our UI design language is inspired by industry leaders (Linear, Stripe, Vercel), ensuring your product feels state-of-the-art.",
    howWeDeliver: "We move from wireframing and user journey mapping to high-fidelity prototyping, creating comprehensive design systems that ensure consistency across your entire digital ecosystem.",
    benefits: [
      "Increased user adoption and reduced training costs.",
      "Premium aesthetic that supports premium pricing.",
      "Scalable design system for future development."
    ],
    technologyStack: ["Figma", "Framer", "Design Systems", "Prototyping"],
    timeline: "4-8 Weeks",
    deliverables: [
      "High-fidelity interactive prototypes",
      "Comprehensive UI Design System / Component Library",
      "User Journey Maps",
      "Developer-ready design handoffs"
    ],
    relatedServices: ["custom-software-development", "web-development", "branding"]
  },
  {
    id: "branding",
    slug: "branding",
    title: "Brand Strategy & Identity",
    category: "Design",
    overview: "Positioning technology companies as category leaders. We develop cohesive brand identities, messaging frameworks, and visual systems that communicate enterprise authority and trust.",
    businessChallenges: [
      "Generic brand identity indistinguishable from competitors.",
      "Inconsistent messaging across marketing and product.",
      "Inability to communicate complex technical value simply."
    ],
    solutionOverview: "We forge strong visual identities and clear narrative positioning. We ensure your brand looks, sounds, and feels like a tier-one technology partner.",
    howWeDeliver: "Through deep discovery, we define your core archetypes and market positioning, translating that strategy into a robust visual identity system (logos, typography, color systems, and digital assets).",
    benefits: [
      "Instant credibility with enterprise decision-makers.",
      "Cohesive brand experience across all touchpoints.",
      "Clear, compelling communication of technical value."
    ],
    technologyStack: ["Illustrator", "Photoshop", "Figma", "Brand Guidelines"],
    timeline: "4-6 Weeks",
    deliverables: [
      "Brand Strategy and Positioning Document",
      "Logo Suite and Visual Identity System",
      "Comprehensive Brand Guidelines",
      "Digital Asset Library (Social, Web, Print)"
    ],
    relatedServices: ["ui-ux-design", "web-development", "digital-transformation"]
  },
  {
    id: "ai-search-optimization",
    slug: "ai-search-optimization",
    title: "AI Search Optimization (AEO/GEO)",
    category: "Marketing",
    overview: "Dominate the new era of search. We optimize your digital presence to be cited and recommended by LLMs like ChatGPT, Perplexity, Google AI Overviews, and Claude.",
    businessChallenges: [
      "Plummeting traditional search traffic due to AI Overviews.",
      "Competitors being cited by AI agents while your brand is ignored.",
      "Lack of structured data making content invisible to LLMs."
    ],
    solutionOverview: "Traditional SEO is no longer enough. We implement Generative Engine Optimization (GEO). We structure your content with precise semantic depth, advanced schema markup, and high Information Gain to ensure AI systems confidently summarize and cite your brand.",
    howWeDeliver: "We restructure page architectures to include dense Q&A blocks, definition tables, and semantic HTML. We build Knowledge Graph authority to ensure AI models recognize you as the definitive entity in your space.",
    benefits: [
      "Visibility in ChatGPT, Perplexity, and Google AI Overviews.",
      "Higher brand authority and citation rates.",
      "Future-proofed digital presence."
    ],
    technologyStack: ["Schema.org", "Semantic HTML", "Knowledge Graphs", "Entity SEO"],
    timeline: "Ongoing / Campaign Based",
    deliverables: [
      "AEO/GEO Strategy and Audit",
      "Advanced Schema Markup Implementation",
      "Semantic Content Restructuring",
      "Entity Authority Building Strategy"
    ],
    relatedServices: ["technical-seo", "web-development", "digital-transformation"]
  },
  {
    id: "technical-seo",
    slug: "technical-seo",
    title: "Enterprise Technical SEO",
    category: "Marketing",
    overview: "Building the technical foundation for search dominance. We audit, repair, and optimize enterprise web infrastructures to ensure flawless crawling, indexing, and ranking.",
    businessChallenges: [
      "Large-scale indexing issues and crawl budget waste.",
      "Poor Core Web Vitals resulting in ranking penalties.",
      "Complex site architectures diluting link equity."
    ],
    solutionOverview: "We perform deep technical audits to resolve JavaScript rendering issues, optimize server response times, and implement flawless canonical and internationalization (hreflang) strategies.",
    howWeDeliver: "Working directly with development teams, we implement server-side rendering optimizations, dynamic XML sitemaps, advanced caching strategies, and structured data deployments.",
    benefits: [
      "Flawless technical foundation for organic growth.",
      "Perfect Core Web Vitals scores.",
      "Maximized crawl budget and indexation rates."
    ],
    technologyStack: ["Screaming Frog", "Google Search Console", "Lighthouse", "Next.js SEO"],
    timeline: "4-8 Weeks (Audit & Fixes)",
    deliverables: [
      "Comprehensive Technical SEO Audit",
      "Core Web Vitals Optimization",
      "Site Architecture & Internal Linking Strategy",
      "JavaScript SEO & Rendering Optimization"
    ],
    relatedServices: ["ai-search-optimization", "web-development", "business-intelligence"]
  }
];
