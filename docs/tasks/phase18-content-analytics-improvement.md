# Phase 18: Content Analytics Improvement

## Purpose

Prepare a lightweight workflow for identifying articles that should be improved
using exported Search Console or Analytics data.

This phase does not connect to external APIs. It uses local CSV exports and
produces a Markdown summary that can be reviewed before creating improvement
Issues.

## Scope

In scope:

- Define the analytics CSV workflow.
- Add a Node.js script that reads exported CSV data.
- Extract content improvement candidates with rule-based scoring.
- Produce a Markdown report under `docs/seo`.

Out of scope:

- Search Console API integration.
- Google Analytics API integration.
- Changing article content.
- Changing site UI.
- Changing VPS configuration.
- Adding SaaS, login, payment, or dashboard features.

## Input Data

Expected CSV location:

```txt
data/analytics/
```

The `data` directory is ignored by Git and should be used for private analytics
exports.

Minimum CSV columns:

- `page`
- `clicks`
- `impressions`
- `ctr`
- `position`

Optional CSV columns:

- `engagedSessions`
- `averageEngagementTime`
- `toolClicks`

## Output

The script writes:

```txt
docs/seo/content-improvement-opportunities.md
```

The output should contain only reviewable summaries and improvement candidates,
not private raw analytics exports.

## Opportunity Types

The script should identify:

- High impressions with low CTR.
- Average position between 11 and 30.
- Traffic with short engagement.
- Tool conversion opportunities.
- Articles with few internal links.

## Completion Criteria

This phase is complete when:

- `scripts/analyze-content-opportunities.mjs` exists.
- `docs/seo/content-improvement-opportunities.md` exists.
- The script runs with a sample CSV.
- Raw analytics data remains outside Git.
- `git diff --check` passes.
