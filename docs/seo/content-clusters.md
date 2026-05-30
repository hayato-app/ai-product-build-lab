# Content Clusters

This document defines SEO content clusters for AI Product Build Lab.

The site should grow as a practical AI development media site, not as a loose
collection of disconnected articles. Each new article should support at least
one cluster and link naturally to related pillar or cluster articles.

## Content Pillars

Current content pillars:

1. Beginner AI development tools and terminology
2. AI application development methods, error cases, and solutions
3. AI-related news commentary for builders

## Cluster Model

Each cluster should have:

- One pillar article that explains the topic broadly.
- Several cluster articles that answer narrower search intents.
- Internal links from pillar to cluster articles.
- Internal links from cluster articles back to the pillar.
- Related links to tools when useful.

## Pillar 1: Beginner AI Development Tools and Terminology

### Audience

- Beginners who want to build AI apps.
- Developers new to AI APIs, RAG, agents, or AI coding tools.
- Product builders who need practical vocabulary before implementation.

### Search Intents

- "What does this AI development term mean?"
- "Which tool should I use first?"
- "What is the minimum architecture for an AI app?"
- "How should I estimate AI API cost?"

### Existing Published Articles

- `what-is-ai-product-development`
- `openai-api-first-setup`
- `ai-development-tools-stack`
- `ai-api-cost-estimation-guide`
- `nextjs-ai-app-basic-architecture`
- `rag-basic-architecture`

### Existing Draft Candidates

- `beginner-ai-api-cost-basics`
- `beginner-ai-app-requirements`
- `beginner-ai-coding-tools`
- `beginner-ai-frameworks-comparison`
- `beginner-minimum-ai-app-architecture`
- `beginner-rag-before-vector-db`

### Missing Article Opportunities

- System development terminology for AI app beginners
- API, token, context window, and rate limit terminology
- Prompt engineering basics for app builders
- Vector database terminology
- AI agent terminology
- Development environment setup checklist

### Internal Link Direction

- Beginner terminology articles should link to:
  - `what-is-ai-product-development`
  - `openai-api-first-setup`
  - `nextjs-ai-app-basic-architecture`
- Cost-related beginner articles should link to:
  - `ai-api-cost-estimation-guide`
  - `/tools/ai-api-cost-estimator`
- RAG beginner articles should link to:
  - `rag-basic-architecture`

## Pillar 2: AI Application Development Methods, Errors, and Solutions

### Audience

- Developers building AI apps with Next.js, APIs, RAG, or agents.
- Builders who need concrete debugging and implementation guidance.
- Product builders improving a prototype into a usable product.

### Search Intents

- "Why is my AI API response slow?"
- "How do I prevent AI agent loops?"
- "How do I structure a Next.js AI app?"
- "How do I debug RAG failures?"

### Existing Published Articles

- `nextjs-ai-app-basic-architecture`
- `openai-api-first-setup`
- `ai-agent-basic-design`
- `rag-basic-architecture`
- `ai-app-cost-estimation`
- `ai-api-cost-estimation-guide`

### Existing Draft Candidates

- `app-slow-ai-api-response`
- `app-agent-loop-prevention`
- `app-ai-generated-app-crashes`
- `app-nextjs-ai-api-common-mistakes`
- `app-rag-production-failures`

### Missing Article Opportunities

- AI API timeout troubleshooting
- Prompt version management for production apps
- Logging design for AI features
- RAG evaluation checklist
- Agent tool execution safety checklist
- AI app release readiness checklist

### Internal Link Direction

- Error-resolution articles should link back to:
  - `nextjs-ai-app-basic-architecture`
  - `openai-api-first-setup`
- Agent troubleshooting should link to:
  - `ai-agent-basic-design`
- RAG troubleshooting should link to:
  - `rag-basic-architecture`
- Cost and performance articles should link to:
  - `ai-api-cost-estimation-guide`
  - `/tools/ai-api-cost-estimator`

## Pillar 3: AI-Related News Commentary for Builders

### Audience

- Developers and product builders who want to understand AI news practically.
- Readers who need implications for tools, architecture, cost, or operations.

### Search Intents

- "What does this AI platform news mean for app builders?"
- "Should developers care about this AI agent trend?"
- "How does this model safety or standardization news affect product teams?"

### Existing Published Articles

No strong published pillar article exists yet for AI news commentary.

### Existing Draft Candidates

- `news-ai-agent-platform-competition`
- `news-ai-model-safety-testing`
- `news-enterprise-ai-services`
- `news-google-antigravity-agent-development`
- `news-mcp-agent-sdk-standardization`

### Missing Article Opportunities

- AI news commentary policy for builders
- Monthly AI development trend summary
- AI agent platform trend overview
- Model safety and product risk overview
- MCP and agent SDK standardization overview

### Internal Link Direction

- News commentary should link to evergreen implementation articles when useful.
- Platform news should link to:
  - `ai-agent-basic-design`
  - `ai-development-tools-stack`
- API or model news should link to:
  - `openai-api-first-setup`
  - `ai-api-cost-estimation-guide`
- News articles should avoid unsupported predictions and include date context.

## Cross-Cluster Link Rules

- Link from beginner articles to implementation articles when the reader is
  ready for the next step.
- Link from troubleshooting articles back to beginner or architecture articles
  when background knowledge is needed.
- Link from news commentary to evergreen articles that explain implementation
  implications.
- Link to `/tools/ai-api-cost-estimator` from cost, pricing, token, or usage
  planning content.
- Avoid adding links only for SEO when they do not help the reader.

## Priority Clusters

Recommended near-term priority:

1. Beginner AI development terminology and tools
2. AI app troubleshooting and implementation methods
3. AI news commentary for builders

This order supports the current strategy: improve article usefulness, expand
content safely, and build trust as an AI development media site.
