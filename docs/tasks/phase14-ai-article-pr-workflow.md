# Phase 14: AI Article PR Workflow

## Purpose

Prepare a review and publication workflow for AI-generated article drafts.

AI-generated articles must not be published automatically. They should move
from draft to review to pull request to publication only after human review and
quality checks.

## Scope

This phase is documentation and workflow preparation.

In scope:

- Define the PR-based workflow for AI-generated article drafts.
- Clarify review states and fact-check handling.
- Clarify when a draft may be moved into public article content.
- Clarify what PR descriptions should include.
- Link the workflow from existing editorial and agent instructions.

Out of scope:

- Creating new articles.
- Editing existing article content.
- Changing the public site UI.
- Changing the draft review UI.
- Adding SaaS, login, payment, or dashboard features.
- Automatically publishing AI-generated content.

## Required Documents

Before implementing this phase, read:

- `AGENTS.md`
- `docs/project-brief.md`
- `docs/editorial/article-operation-rules.md`
- `docs/editorial/article-quality-checklist.md`
- `docs/editorial/category-policy.md`
- `docs/editorial/internal-link-policy.md`
- `docs/editorial/publishing-flow.md`
- `docs/editorial/codex-article-instructions.md`
- `docs/operations/codex-issue-workflow.md`
- `docs/operations/smartphone-pr-review-flow.md`

## Deliverables

Create:

- `docs/operations/ai-article-pr-workflow.md`

Update when needed:

- `AGENTS.md`
- `docs/editorial/publishing-flow.md`

## Workflow Requirements

The workflow must state that:

- AI-generated articles are drafts by default.
- Drafts are stored under `docs/article-drafts`.
- Drafts must not be published automatically.
- Drafts must pass editorial review before publication.
- Fact-check requirements must be resolved before merge.
- Publication should happen through a pull request when files move into
  `apps/web/src/content/articles`.
- Article quality checklist items must be satisfied before merge.
- Slugs and URLs must remain stable unless explicitly approved.
- Published articles must preserve the existing Markdown article structure.

## PR Requirements

Article publication PRs should include:

- Source draft path.
- Target published article path.
- Review result.
- Fact-check status.
- Quality checklist summary.
- Internal links added or reviewed.
- Build result when publishing into the web app.
- Remaining manual review points.
- Whether VPS deployment is needed.

## Completion Criteria

This phase is complete when:

- The AI article PR workflow document exists.
- Existing editorial or agent documents link to the workflow where appropriate.
- No article content is created or modified.
- No UI or application code is changed.
- Markdown structure checks pass.
- `git diff --check` passes.
