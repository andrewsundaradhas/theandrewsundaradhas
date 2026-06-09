/**
 * Single source of truth for all portfolio content.
 * Edit here — components stay presentational.
 */

export const PROFILE = {
  name: "Andrew Sundaradhas",
  title: "CS & Robotics Engineer · AI/ML · Drone Systems",
  location: "Chennai, India",
  university: "B.Tech Computer Science & Robotics, VIT Chennai (Expected 2027)",
  email: "perartraltechnologies@gmail.com",
  github: "https://github.com/andrewsundaradhas",
  linkedin: "https://www.linkedin.com/in/andrew-sundaradhas/",
  resume: "/Andrew-Sundaradhas-Resume.pdf",
} as const;

export const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
] as const;

export const HERO = {
  eyebrow: "Computer Science & Robotics",
  headline: "Andrew Sundaradhas",
  subheading:
    "I build intelligent systems — from autonomous drones to AI-powered fintech platforms. CS & Robotics engineer with deep ML expertise and a track record of shipping production systems.",
  stats: [
    { value: "95%", label: "Obstacle Detection Accuracy" },
    { value: "1M+", label: "Records Processed Daily" },
    { value: "15+", label: "Engineers Mentored" },
  ],
} as const;

export const ABOUT_PARAGRAPHS = [
  "I'm a second-year Computer Science & Robotics student at VIT Chennai, building at the intersection of machine learning, autonomous systems, and applied software engineering.",
  "My work spans training neural networks for drone navigation, architecting graph databases that serve millions of queries, and building AI-powered SaaS platforms used in production. I don't prototype — I ship.",
  "Outside of engineering, I lead teams. As Vice Chairperson of Atom Robotics and Technical Lead at Yuva VIT, I've recruited, trained, and managed 40+ engineers while building systems that actually work at scale.",
  "Currently open to internships and research roles in AI/ML, robotics, and software engineering.",
] as const;

export const TERMINAL_LINES = [
  { cmd: "whoami", out: "andrew.sundaradhas" },
  { cmd: "skills --top", out: "Python, C++, PyTorch, ROS, Next.js" },
  {
    cmd: "current_status",
    out: "Building: DataPilot AI + WC2026 Predictor\nOpen to: Internships / Research Roles",
  },
  { cmd: "location", out: "Chennai, India 🇮🇳" },
] as const;

export interface Experience {
  role: string;
  org: string;
  period: string;
  badge: string;
  color: string;
  bullets: string[];
}

export const EXPERIENCE: Experience[] = [
  {
    role: "Vice Chairperson & Programming Lead",
    org: "Atom Robotics Club · VIT Chennai",
    period: "2024 – Present",
    badge: "Robotics · Autonomous Systems",
    color: "electric",
    bullets: [
      "Led development of autonomous drone navigation systems using ROS (Robot Operating System) and TensorFlow, achieving 95% obstacle detection accuracy in real-world field testing.",
      "Engineered computer vision pipelines for real-time object tracking, delivering a 40% improvement in processing speed over the baseline system.",
      "Designed and trained ML models for autonomous flight path correction, reducing manual intervention requirements by 70%.",
      "Grew and mentored a team of 15+ engineers across firmware, ML, and systems integration domains.",
    ],
  },
  {
    role: "Technical Lead",
    org: "Yuva VIT Chennai",
    period: "2025 – Present",
    badge: "ML · Graph Databases · Backend",
    color: "mint",
    bullets: [
      "Architected a Neo4j graph database from scratch for the organization's core data layer, improving complex relationship query performance by 60%.",
      "Implemented a Redis caching layer that reduced API response times by 45%, directly improving user experience at scale.",
      "Led backend and data-layer development across multiple internal tools and public-facing products.",
      "Designed and owned end-to-end ML pipelines processing 1M+ records, achieving 99.9% classification accuracy.",
    ],
  },
];

export interface Project {
  name: string;
  tagline: string;
  description: string;
  tech: string[];
  github?: string;
  highlights?: string[];
  featured: boolean;
  color: string;
}

export const PROJECTS: Project[] = [
  {
    name: "Apex 500",
    tagline: "S&P 500 forecasting with a 6-model ML ensemble.",
    description:
      "End-to-end market intelligence platform that pulls real-time S&P 500 data, processes it through a unified feature pipeline, and generates short-term forecasts via a confidence-weighted ensemble of ARIMA, Random Forest, Gradient Boosting, LSTM, and Transformer models. Ships with walk-forward backtesting, sector correlation analysis, and sentiment signal integration.",
    tech: [
      "PyTorch",
      "scikit-learn",
      "FastAPI",
      "React",
      "Vite",
      "Three.js",
      "SQLite",
      "yfinance",
      "FRED",
      "WebSockets",
      "Docker",
    ],
    github: "https://github.com/andrewsundaradhas/apex-500",
    highlights: [
      "6-model ensemble: ARIMA, RF, Gradient Boosting, LSTM, Transformer, GARCH/EWMA",
      "Real-time market dashboard with WebSocket streaming",
      "Walk-forward backtesting engine with performance metrics",
      "Sector and cross-asset correlation analysis",
      "Fully local setup, CPU-friendly (~1s inference per model)",
    ],
    featured: true,
    color: "electric",
  },
  {
    name: "BlueprintAI",
    tagline:
      "From a sentence to a 2D floor plan, 3D walkthrough, and Bill of Quantities.",
    description:
      "Next.js 14 monorepo for Indian architects and civil engineers. Type a natural language prompt like '2BHK in Anand, 8×11m, north entry, ₹24L' and get an editable 2D floor plan, a Three.js 3D walkthrough, and a live deterministic Bill of Quantities in INR. Supports per-room AI editing, multi-floor stacking, and exports to JSON, CSV, PDF, and DXF (CAD).",
    tech: [
      "Next.js 14",
      "Three.js",
      "LLM API",
      "TypeScript",
      "DXF export",
      "PDF generation",
      "Monorepo",
    ],
    github: "https://github.com/andrewsundaradhas/BlueprintAI",
    highlights: [
      "Prompt → editable 2D floor plan with room-level AI editing",
      "Three.js extruded 3D walkthrough, toggled in-browser",
      "Live BOQ recalculation on every room edit (deterministic, INR-denominated)",
      "Multi-floor support (G, G+1, G+2) via left-rail navigation",
      "Exports: JSON (Plan IR), CSV (BOQ), PDF (drawing + BOQ), DXF (CAD)",
    ],
    featured: true,
    color: "violet",
  },
  {
    name: "PayScope",
    tagline: "AI-powered fintech analytics platform.",
    description:
      "Financial intelligence system for transaction pattern analysis, anomaly detection, KPI forecasting, and neural-network-powered report generation. Built on Next.js 16 with advanced ML pipelines and real-time dashboards processing Visa/Mastercard data.",
    tech: ["Next.js 16", "TypeScript", "Python", "ML Pipelines", "Real-time Dashboards"],
    featured: false,
    color: "ember",
  },
  {
    name: "NLP for Emails & Case Notes",
    tagline: "BERT-based intelligent triage with 92% accuracy.",
    description:
      "End-to-end NLP system for enterprise email and case note categorization. Uses transfer learning on BERT for intent recognition and automated summarization, reducing manual processing overhead by 70% through context-aware workflow routing.",
    tech: ["BERT", "PyTorch", "Transfer Learning", "FastAPI", "Python"],
    featured: false,
    color: "sunburst",
  },
  {
    name: "Crop Health Prediction System",
    tagline: "Computer vision disease detection at 95% accuracy on 50,000 images.",
    description:
      "Production-grade crop disease detection pipeline using EfficientNetB0 trained on a 50,000+ image dataset. FastAPI backend with React frontend supports 1,000+ concurrent inference requests with an automated retraining pipeline.",
    tech: ["EfficientNetB0", "PyTorch", "FastAPI", "React", "MongoDB", "Python"],
    featured: false,
    color: "mint",
  },
];

export interface SkillGroup {
  label: string;
  color: string;
  skills: string[];
}

export const SKILL_GROUPS: SkillGroup[] = [
  {
    label: "Languages",
    color: "electric",
    skills: ["Python", "C++", "R", "TypeScript", "JavaScript"],
  },
  {
    label: "ML & AI",
    color: "ember",
    skills: [
      "PyTorch",
      "TensorFlow",
      "scikit-learn",
      "BERT",
      "EfficientNet",
      "LSTM",
      "Transformers",
      "XGBoost",
    ],
  },
  {
    label: "Data & Databases",
    color: "violet",
    skills: ["Neo4j", "PostgreSQL", "MongoDB", "Redis", "MySQL", "SQLite", "Apache Kafka"],
  },
  {
    label: "DevOps & Infra",
    color: "sunburst",
    skills: ["Docker", "GitHub Actions", "Datadog", "Firebase", "Vercel"],
  },
  {
    label: "Robotics",
    color: "lavender",
    skills: [
      "ROS",
      "Autonomous Systems",
      "Drone Navigation",
      "Computer Vision",
      "Sensor Fusion",
    ],
  },
];

export interface Stat {
  value: number;
  suffix: string;
  label: string;
  note: string;
  color: string;
}

export const STATS: Stat[] = [
  { value: 95, suffix: "%", label: "Obstacle Detection Accuracy", note: "autonomous drone systems", color: "electric" },
  { value: 1, suffix: "M+", label: "Records Processed", note: "ML pipelines at Yuva VIT", color: "mint" },
  { value: 99.9, suffix: "%", label: "Classification Accuracy", note: "production ML system", color: "ember" },
  { value: 60, suffix: "%", label: "Query Performance Improvement", note: "Neo4j architecture", color: "violet" },
  { value: 45, suffix: "%", label: "API Latency Reduction", note: "Redis caching layer", color: "sunburst" },
  { value: 40, suffix: "%", label: "Processing Speed Improvement", note: "computer vision pipeline", color: "lavender" },
  { value: 70, suffix: "%", label: "Manual Processing Reduction", note: "NLP system", color: "mint" },
  { value: 15, suffix: "+", label: "Engineers Mentored", note: "Atom Robotics", color: "electric" },
];

export interface LeadershipCard {
  role: string;
  org?: string;
  color: string;
  highlights: string[];
}

export const LEADERSHIP: LeadershipCard[] = [
  {
    role: "Director",
    org: "Vertex Innovate",
    color: "violet",
    highlights: [
      "Led cross-functional teams of 15+ members across engineering, product, and operations.",
      "Recruited and onboarded 25+ engineers with a 95% retention rate.",
      "Organized AI/ML hackathons and served as a technical conference speaker.",
      "Delivered 30% cost savings through strategic vendor negotiations.",
      "Owned HR management including performance reviews and conflict resolution.",
    ],
  },
  {
    role: "Mentor & Community Builder",
    color: "ember",
    highlights: [
      "Personally mentored 100+ students in ML, robotics, and software engineering.",
      "Built and scaled the Atom Robotics programming division from the ground up.",
      "Created learning materials and workshops for junior engineers across VIT Chennai.",
    ],
  },
];

export const CONTACT = {
  headline: "Let's build something.",
  subtext:
    "I'm open to internships, research collaborations, and full-time roles in AI/ML, robotics, and software engineering. If you're working on something hard, reach out.",
  footnote: "Based in Chennai, India · Available for remote and relocation",
} as const;

export const MARQUEE_ITEMS = [
  "AI / ML ENGINEER",
  "AUTONOMOUS DRONES",
  "ML PIPELINES",
  "OPEN TO INTERNSHIPS",
  "ROBOTICS",
  "SHIPPING IN PRODUCTION",
] as const;
