# Phase 20: Advanced Article Worker

## Purpose

Enhance `workers/article-worker` from a draft generator into an editorial
planning helper.

The worker should help choose topics, avoid duplication, suggest categories and
internal links, generate title and description ideas, outline a draft structure,
and output a pre-publication checklist.

## Scope

In scope:

- Add a non-API content planning command.
- Read existing published articles and drafts.
- Suggest duplicate risk, category, internal links, titles, descriptions,
  headings, and quality checklist items.
- Output a review report under `docs/article-drafts/_worker-reports`.

Out of scope:

- Connecting to external AI APIs.
- Creating published articles.
- Overwriting existing articles or drafts.
- Moving drafts into public content.
- Changing the public site UI.
- Adding SaaS, login, payment, or dashboard features.

## Required Documents

Before implementing this phase, read:

- `AGENTS.md`
- `docs/project-brief.md`
- `docs/editorial/*`
- `docs/seo/content-clusters.md`
- `docs/seo/pillar-articles.md`
- `docs/operations/ai-article-pr-workflow.md`
- Existing published articles
- Existing draft articles

## Deliverables

Update:

- `workers/article-worker/package.json`
- `workers/article-worker/README.md`

Create as needed:

- `workers/article-worker/src/content-planner.ts`
- `workers/article-worker/src/plan.ts`

## Completion Criteria

This phase is complete when:

- `npm run build` succeeds in `workers/article-worker`.
- A sample `npm run plan` command creates a report.
- Existing articles and drafts are not overwritten.
- Generated reports are clearly review-only.
- `git diff --check` passes.
