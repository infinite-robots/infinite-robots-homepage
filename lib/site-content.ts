import type { LucideIcon } from "lucide-react";
import {
  AudioLines,
  Bot,
  Building2,
  Cable,
  Code,
  Cpu,
  Database,
  Eye,
  FileSearch,
  FlaskConical,
  Gauge,
  Landmark,
  Lock,
  Radar,
  Scale,
  ShieldCheck,
  SlidersHorizontal,
  SquareTerminal,
  Truck,
  Workflow,
} from "lucide-react";

export type Service = {
  id: string;
  title: string;
  summary: string;
  icon: LucideIcon;
  description: string[];
  lists: Array<{ heading: string; items: string[] }>;
};

export const SERVICES: Service[] = [
  {
    id: "agentic-development",
    title: "Agentic Development",
    icon: Bot,
    summary:
      "Production AI agents that plug into your existing stack, run multi-step workflows end to end, and hand off to your team when judgment matters.",
    description: [
      "We design and ship AI agents that work inside the tools you already run: your CRM, ERP, inbox, document stores, and internal APIs. Not demos or chat wrappers. Agents that plan, call tools, and finish the job.",
      "Every agent ships with scoped permissions, human approval where it counts, and a full trace of what it did and why.",
    ],
    lists: [
      {
        heading: "Best for:",
        items: [
          "Teams buried in repetitive, multi-step work that spans several systems",
          "Products adding agentic features customers need to trust",
          "Operations scaling output without scaling headcount",
          "Leaders who want a senior engineering partner, not a chatbot vendor",
        ],
      },
      {
        heading: "Examples:",
        items: [
          "Inbox and ticket triage with drafted replies and routing",
          "Document intake: statements, contracts, and forms into structured data",
          "Quote, proposal, and report generation from scattered sources",
          "CRM hygiene, enrichment, and follow-up agents",
          "Multi-agent pipelines with review and approval steps",
        ],
      },
    ],
  },
  {
    id: "harness-engineering",
    title: "Harness Engineering",
    icon: Workflow,
    summary:
      "The model is the engine; the harness is everything around it. We engineer the tools, context, evals, guardrails, and observability that make agents dependable.",
    description: [
      "Most AI projects don't stall because the model is weak. They stall because nothing around it is engineered: tools are flaky, context is stale, nothing is measured, and nobody can see what happened when it went wrong.",
      "Harness engineering is the discipline of building that surrounding system, so agents stay accurate, safe, affordable, and debuggable as models and requirements change.",
    ],
    lists: [
      {
        heading: "Best for:",
        items: [
          "AI prototypes that impress in demos but wobble in production",
          "Agents that hallucinate, loop, or cost more than expected",
          "Teams that need auditability and permissions around AI",
          "Anyone planning to swap or upgrade models without regressions",
        ],
      },
      {
        heading: "What's Included:",
        items: [
          "Tool and MCP server design with least-privilege access",
          "Context engineering: retrieval, memory, and prompt architecture",
          "Eval suites that gate every prompt change and model upgrade",
          "Guardrails, prompt-injection defenses, and approval workflows",
          "Tracing, cost and latency monitoring, and model routing",
        ],
      },
    ],
  },
  {
    id: "ai-integrations",
    title: "AI Integrations & MCP",
    icon: Cable,
    summary:
      "Connect models to your data and systems securely: MCP servers, knowledge search over your documents, and AI features inside the software your team already uses.",
    description: [
      "Your data and systems are what make AI useful to your business. We connect them, safely, so models can search your knowledge, read your records, and act through well-defined interfaces.",
      "We build on open standards like the Model Context Protocol, so the same integrations work across assistants, agents, and whichever model is best next year.",
    ],
    lists: [
      {
        heading: "Best for:",
        items: [
          "Companies whose knowledge lives in PDFs, wikis, drives, and inboxes",
          "Teams that want Claude, ChatGPT, or Copilot to work with internal systems",
          "SaaS products exposing their platform to customers' AI agents",
        ],
      },
      {
        heading: "What's Included:",
        items: [
          "Custom MCP servers and agent-facing APIs",
          "Retrieval (RAG) over documents, databases, and tickets",
          "Internal copilots and assistants with access controls",
          "Data pipelines, cleanup, and sync for AI-ready data",
          "Private and self-hosted model deployments when data can't leave",
        ],
      },
    ],
  },
  {
    id: "ai-engineering-enablement",
    title: "AI-Native Engineering",
    icon: SquareTerminal,
    summary:
      "Help your developers ship faster with coding agents. We set up agent-ready repos, workflows, and review processes, then pair with your team until it sticks.",
    description: [
      "Coding agents like Cursor, Claude Code, and Codex change how software gets built. The teams getting the most out of them have invested in the setup: context, conventions, tooling, and safe review loops.",
      "We bring the playbook we use on our own projects and adapt it to your codebase and team.",
    ],
    lists: [
      {
        heading: "Best for:",
        items: [
          "Engineering teams experimenting with AI tools but not seeing real gains",
          "Leaders who need AI-assisted development that stays secure and reviewable",
          "Legacy codebases that need modernization, tests, or documentation",
        ],
      },
      {
        heading: "What's Included:",
        items: [
          "Agent-ready repos: rules, skills, AGENTS.md, and project context",
          "MCP tooling for your internal systems and docs",
          "Background agents, automated code review, and eval-gated CI",
          "Security and governance policies for AI-generated code",
          "Hands-on pairing and training for your developers",
        ],
      },
    ],
  },
  {
    id: "custom-software",
    title: "AI-Powered Apps & Software",
    icon: Code,
    summary:
      "Custom web platforms, mobile apps, and internal tools with AI designed in from day one, built to be maintained for years rather than rebuilt next quarter.",
    description: [
      "Sometimes the right answer is a new product or internal tool, with AI where it helps and nowhere it doesn't. We handle architecture, UX, and delivery end to end.",
      "Native or cross-platform, cloud or on-prem, depending on your needs and constraints.",
    ],
    lists: [
      {
        heading: "Best for:",
        items: [
          "Customer-facing products with AI features at the core",
          "Internal tools and dashboards for teams in the office or the field",
          "Replacing spreadsheets and manual processes with real software",
        ],
      },
      {
        heading: "What's Included:",
        items: [
          "Product and UX design",
          "System architecture and cloud infrastructure",
          "Web, iOS, and Android builds with automated testing",
          "Ongoing updates and support plans",
        ],
      },
    ],
  },
  {
    id: "aeo",
    title: "AEO & AI-Era Growth",
    icon: Radar,
    summary:
      "Search is moving into ChatGPT, Claude, Gemini, and Perplexity. We make sure AI assistants, and the agents acting for your customers, can find, cite, and choose you.",
    description: [
      "Your customers are asking AI assistants who to hire and what to buy, and more of them are sending agents to compare options and act on their behalf. If those systems can't read and trust your business, you're not in the answer.",
      "AEO (agent engine optimization) is SEO for the agent era: an agent-ready site, answer-ready content, a clear brand story, and campaigns that feed it all, measured by how often AI recommends you.",
    ],
    lists: [
      {
        heading: "Best for:",
        items: [
          "Businesses watching search traffic flatten as AI answers take over",
          "Brands that want to be the recommendation, not a link on page two",
          "Companies preparing for customers who buy through agents",
        ],
      },
      {
        heading: "What's Included:",
        items: [
          "AI visibility audit across major assistants and answer engines",
          "Agent-ready website: structured data, llms.txt, fast crawlable pages",
          "Answer-ready content, positioning, and brand voice",
          "Agent-facing actions: MCP servers and APIs for quotes, booking, and orders",
          "AI-assisted content and campaigns, tracked by share of AI answers",
        ],
      },
    ],
  },
];

export type Industry = {
  title: string;
  icon: LucideIcon;
  summary: string;
  examples: string[];
};

export const INDUSTRIES: Industry[] = [
  {
    title: "Fintech & Financial Services",
    icon: Landmark,
    summary:
      "Agents that move fast without breaking compliance: every decision traced, every action permissioned.",
    examples: [
      "KYC and onboarding document review",
      "Transaction and reconciliation exception handling",
      "Analyst research and reporting copilots",
    ],
  },
  {
    title: "Real Estate & PropTech",
    icon: Building2,
    summary:
      "From lead to lease to close, agents that keep deals moving and paperwork out of your team's way.",
    examples: [
      "Lead qualification and follow-up agents",
      "Lease, title, and disclosure abstraction",
      "Listing, comps, and market analysis generation",
    ],
  },
  {
    title: "Semiconductors & Advanced Materials",
    icon: Cpu,
    summary:
      "AI for the fab and the lab: thin-film growth, molecular beam epitaxy (MBE), metrology, and process data that's hard to wrangle.",
    examples: [
      "Run-log and sensor analysis for MBE and CVD growth",
      "Recipe search and process knowledge assistants",
      "Metrology and characterization data pipelines",
    ],
  },
  {
    title: "Scientific R&D & Labs",
    icon: FlaskConical,
    summary:
      "Help researchers spend time on experiments instead of paperwork, literature, and data cleanup.",
    examples: [
      "Literature and patent research agents",
      "Electronic lab notebook and LIMS integrations",
      "Experiment summaries and report drafting",
    ],
  },
  {
    title: "Legal & Professional Services",
    icon: Scale,
    summary:
      "Document-heavy work, done faster and more consistently, with experts reviewing what matters.",
    examples: [
      "Contract review and clause extraction",
      "Client intake and matter triage",
      "Proposal, engagement letter, and report drafting",
    ],
  },
  {
    title: "Logistics & Operations",
    icon: Truck,
    summary:
      "Agents that watch the queues, chase the exceptions, and keep humans in the loop on the calls that matter.",
    examples: [
      "Order, invoice, and bill-of-lading processing",
      "Exception monitoring and vendor follow-up",
      "Scheduling and dispatch assistance",
    ],
  },
];

export type Capability = { title: string; icon: LucideIcon; summary: string };

export const CAPABILITIES: Capability[] = [
  {
    title: "Tools & MCP",
    icon: Cable,
    summary: "Well-scoped tools and MCP servers so agents act on real systems.",
  },
  {
    title: "Context & Retrieval",
    icon: Database,
    summary:
      "RAG, memory, and prompt architecture that feed agents the right facts.",
  },
  {
    title: "Evals",
    icon: Gauge,
    summary:
      "Test suites on your real cases, so every change is measured, not guessed.",
  },
  {
    title: "Guardrails",
    icon: ShieldCheck,
    summary:
      "Validation, prompt-injection defenses, and policy checks before any action.",
  },
  {
    title: "Human in the Loop",
    icon: SlidersHorizontal,
    summary:
      "Approvals and clean handoffs wherever judgment, money, or customers are involved.",
  },
  {
    title: "Observability",
    icon: Eye,
    summary:
      "Traces, cost, and latency dashboards for everything your agents do.",
  },
];

export const SKILLSETS: Capability[] = [
  {
    title: "Document Intelligence",
    icon: FileSearch,
    summary:
      "Extraction and classification from PDFs, scans, statements, and forms.",
  },
  {
    title: "Voice Agents",
    icon: AudioLines,
    summary:
      "Real-time phone and voice assistants for intake, scheduling, and support.",
  },
  {
    title: "Private & Local Models",
    icon: Lock,
    summary:
      "Open-weight and self-hosted models when data can't leave your network.",
  },
  {
    title: "Fine-Tuning & Model Selection",
    icon: SlidersHorizontal,
    summary:
      "Choosing, tuning, and routing between models for cost, speed, and quality.",
  },
  {
    title: "Computer Vision",
    icon: Eye,
    summary:
      "Image and video understanding for inspection, metrology, and field work.",
  },
  {
    title: "Data Engineering",
    icon: Database,
    summary:
      "Pipelines that turn scattered, messy data into something AI can use.",
  },
];

export const FAQS: Array<{ question: string; answer: string }> = [
  {
    question: "What's the difference between an AI agent and a chatbot?",
    answer:
      "A chatbot answers questions. An agent takes actions: it reads your systems, calls tools, makes decisions within limits you set, and completes multi-step work like processing a document, updating a record, or drafting a reply, then asks a human when it should.",
  },
  {
    question: "What is harness engineering?",
    answer:
      "The harness is everything around the model: the tools it can use, the context it sees, the guardrails it follows, the evals that prove it works, and the monitoring that shows what it did. Harness engineering is building that system so agents are reliable in production, not just in a demo.",
  },
  {
    question: "What is AEO?",
    answer:
      "AEO (agent engine optimization) makes your business easy for AI assistants and agents to find, understand, cite, and act on. It covers structured data, answer-ready content, crawler access, and agent-facing endpoints, and it's measured by how often AI recommends you.",
  },
  {
    question: "Which AI models do you work with?",
    answer:
      "We're model-agnostic. We regularly build with models from Anthropic, OpenAI, and Google, plus open-weight models that can run privately, and we choose based on your accuracy, cost, latency, and data requirements.",
  },
  {
    question: "Do we need to replace our existing systems?",
    answer:
      "Almost never. Most of our work connects AI to the tools you already use, such as your CRM, ERP, document storage, and internal APIs, so your team keeps its workflow and the busywork disappears.",
  },
  {
    question: "How do you keep our data secure?",
    answer:
      "Agents get least-privilege access, sensitive actions require approval, and every step is logged. When data can't leave your environment, we deploy private or self-hosted models.",
  },
];
