# Pillar Articles

This document defines pillar article candidates for AI Product Build Lab.

A pillar article is a broad, durable article that gives readers a strong entry
point into a topic cluster. Cluster articles should link back to the pillar, and
the pillar should link out to more specific articles.

## Pillar Article Requirements

A pillar article should:

- Explain the topic broadly.
- Serve a clear search intent.
- Link to related cluster articles.
- Link to relevant tools when useful.
- Be stable enough to update over time.
- Include practical examples, diagrams, tables, or checklists when helpful.
- Avoid thin or generic AI commentary.

## Current Pillar Candidates

### AI Product Development Basics

Candidate:

- `what-is-ai-product-development`

Role:

- Entry point for readers who want to understand AI product development.
- Should connect to beginner terminology, app architecture, cost, and operations
  articles.

Needed improvements:

- Add a clearer path from "concept" to "first implementation".
- Link to beginner tool and terminology articles as they are published.
- Link to the AI API Cost Estimator when cost planning is discussed.

### OpenAI API First Setup

Candidate:

- `openai-api-first-setup`

Role:

- Entry point for readers starting API-based AI app development.

Needed improvements:

- Link to cost, timeout, logging, and API error-resolution cluster articles.
- Add beginner-friendly terminology links when available.

### Next.js AI App Architecture

Candidate:

- `nextjs-ai-app-basic-architecture`

Role:

- Pillar for AI app implementation methods.
- Should connect to troubleshooting and release-readiness articles.

Needed improvements:

- Add links to slow API response, common mistakes, and minimum architecture
  drafts when published.
- Add clearer architecture checklist.

### AI API Cost Estimation

Candidate:

- `ai-api-cost-estimation-guide`

Role:

- Pillar for cost planning and API usage decisions.
- Should connect strongly to `/tools/ai-api-cost-estimator`.

Needed improvements:

- Link to beginner cost basics when published.
- Add clearer examples for monthly usage patterns.

### RAG Basic Architecture

Candidate:

- `rag-basic-architecture`

Role:

- Pillar for RAG basics.

Needed improvements:

- Link to RAG pre-vector-database beginner draft when published.
- Link to production failure and evaluation checklist articles when created.

### AI Agent Basic Design

Candidate:

- `ai-agent-basic-design`

Role:

- Pillar for AI agent development.

Needed improvements:

- Link to agent loop prevention draft when published.
- Add safety and tool execution checklist links.

## Missing Pillar Articles

### Beginner AI Development Glossary

Purpose:

- Explain essential AI and system development terms for beginners.

Cluster articles:

- API basics
- Token basics
- Context window
- Rate limit
- RAG terminology
- Agent terminology

Priority:

- High

### AI App Troubleshooting Guide

Purpose:

- Serve as the parent article for common AI app errors and debugging workflows.

Cluster articles:

- Slow AI API response
- AI-generated app crashes
- Next.js AI API common mistakes
- RAG production failures
- Agent loop prevention

Priority:

- High

### AI Development News for Builders

Purpose:

- Define how AI news should be interpreted from a builder and product
  development perspective.

Cluster articles:

- AI agent platform competition
- MCP and agent SDK standardization
- Model safety testing
- Enterprise AI services
- Google Antigravity and agent development

Priority:

- Medium

## Internal Link Pattern

Use this pattern when publishing or improving articles:

1. Pillar article links to all relevant cluster articles.
2. Each cluster article links back to the pillar.
3. Cluster articles link sideways only when the next article is genuinely
   useful.
4. Tool links appear where the reader can take action.
5. News articles link to evergreen implementation articles when they explain
   practical implications.

## Maintenance Notes

Update this document when:

- A new pillar article is published.
- A draft becomes a public cluster article.
- Search Console data reveals a high-potential topic.
- A category policy changes.
- Internal link strategy changes.
