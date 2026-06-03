# AI News Collection Flow

This document defines the daily AI news collection operation for AI Product
Build Lab.

The purpose is to notice builder-relevant AI news early and convert only useful
items into article candidates after human review.

## Operating Model

Use an independent Codex automation as the daily trigger.

The automation should run separately from ordinary chat threads. It may browse
the web to gather current news, but it must not create articles, drafts,
candidates, commits, or VPS changes without user approval.

Recommended schedule:

```txt
Every day at 08:00 JST
```

## News Scope

Prioritize news that affects AI application builders and AI product developers.

Preferred sources and topics:

- OpenAI, Anthropic, Google, Meta, Microsoft, and major AI platform updates.
- AI API changes, model releases, pricing, rate limits, SDKs, and developer
  tooling.
- RAG, agents, evaluation, safety, and workflow tooling.
- Next.js or web development changes that affect AI app implementation.
- Regulation or policy changes only when they directly affect builders.

Avoid:

- Hype-only model rumors.
- Political commentary.
- Financial, medical, or legal advice.
- Thin tool launch lists with no builder implication.
- Topics unrelated to AI application or AI product development.

## Classification

Classify each item as one of:

- `article_candidate_now`: Worth turning into an article candidate soon.
- `weekly_candidate_pool`: Useful, but better saved for weekly planning.
- `watch_only`: Monitor, but do not act yet.
- `out_of_scope`: Not relevant for this site.

## Daily Output

The automation should produce a concise Japanese report with:

- Date and collection window.
- 3 to 7 notable items when available.
- Source links.
- Why each item matters for builders.
- Suggested classification.
- Candidate title ideas only for `article_candidate_now` or
  `weekly_candidate_pool`.
- Fact-check notes for time-sensitive claims.

## Article Candidate Conversion

News collection does not automatically create candidate files.

When the user approves conversion, create or update a candidate file under:

```txt
docs/article-candidates
```

News-based candidates should explain:

- What happened.
- Why it matters for AI app builders.
- What practical angle the site can add.
- Whether the claim is time-sensitive.
- Which sources should be checked before drafting.

## Safety Boundary

The daily news collection does not allow:

- Automatic draft creation.
- Automatic publication.
- Automatic commits or pushes.
- Direct VPS deployment.
- Use of unsourced claims as final article facts.

News items are inputs for editorial judgment, not automatic content.

## Completion Criteria

A daily news collection run is complete when:

- Relevant items are summarized with source links.
- Items are classified.
- Practical builder implications are described.
- Next actions require user approval.
