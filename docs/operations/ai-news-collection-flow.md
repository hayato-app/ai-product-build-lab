# AI News Collection Flow

This document defines the daily AI news collection operation for AI Product
Build Lab.

The purpose is to notice builder-relevant AI news early and turn useful items
directly into daily article candidates that can be reviewed from Discord.

## Operating Model

Use an independent Codex automation as the daily trigger.

The automation should run separately from ordinary chat threads. It may browse
the web to gather current news and prepare a daily candidate Markdown file, but
it must not create article drafts, publish articles, merge changes, or run VPS
commands.

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

## Daily Candidate File

The daily AI news collection should create a candidate file directly under:

```txt
docs/article-candidates/YYYY-MM-DD.md
```

Use the plain date file name for daily news candidates. Do not use the
`weekly-` prefix for daily news.

Daily news candidate files should contain only AI news commentary candidates.
They should not include evergreen beginner, troubleshooting, or tool topics
unless the topic came from a timely news item.

Each candidate should use:

- `Status: available`
- `Pillar: AI関連ニュース解説`
- `Category: AIニュース解説`
- `Fact check: required` by default
- Source links for every time-sensitive claim
- Fact-check notes for model names, release dates, pricing, plan limits, API
  availability, or preview status

## Daily Output

The automation should produce a concise Japanese report with:

- Date and collection window.
- 3 to 7 notable items when available.
- Source links.
- Why each item matters for builders.
- Suggested classification.
- Candidate entries only for `article_candidate_now`.
- `weekly_candidate_pool` items may be mentioned in notes, but should not be
  mixed into the daily candidate file unless they are also timely news
  candidates.
- Fact-check notes for time-sensitive claims.

## Article Candidate Conversion

News collection output is already a candidate file. News-based candidates
should explain:

- What happened.
- Why it matters for AI app builders.
- What practical angle the site can add.
- Whether the claim is time-sensitive.
- Which sources should be checked before drafting.

Review daily candidates from Discord with:

```txt
/article-candidates type:daily
/article-candidate-select type:daily candidate:<number>
```

## Safety Boundary

The daily news collection does not allow:

- Automatic draft creation.
- Automatic publication.
- Direct VPS deployment.
- Use of unsourced claims as final article facts.

News candidate files are planning material. They are not drafts, and selecting a
candidate still requires the GitHub Issue and Codex approval flow.

## Completion Criteria

A daily news collection run is complete when:

- A dated daily candidate file exists under `docs/article-candidates`.
- Relevant items are summarized with source links.
- Practical builder implications are described.
- Time-sensitive claims are marked for fact-checking.
- Next actions require candidate selection and user approval.
