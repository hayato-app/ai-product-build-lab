# Phase 16: Codex Issue Workflow

## Purpose

Expand the Codex GitHub Issue workflow so Codex can handle Issue-based work
with a repeatable, safe process.

Phase 13 created the first workflow document. Phase 16 clarifies the standard
flow before approval, after approval, during implementation, verification, and
pull request preparation.

## Scope

In scope:

- Expand `docs/operations/codex-issue-workflow.md`.
- Clarify approval boundaries.
- Clarify branch and pull request rules.
- Clarify verification rules.
- Clarify PR body requirements.
- Clarify handling by Issue template type.

Out of scope:

- Changing site UI.
- Changing article content.
- Changing Discord bot code.
- Running VPS deployment.
- Adding SaaS, login, payment, or dashboard features.

## Required Documents

Before implementing this phase, read:

- `AGENTS.md`
- `docs/operations/codex-issue-workflow.md`
- `docs/operations/github-issue-template-guide.md`
- `docs/operations/smartphone-pr-review-flow.md`
- `docs/operations/ai-article-pr-workflow.md`
- `.github/ISSUE_TEMPLATE/*`

## Required Workflow

The Codex Issue workflow should include:

1. Read the Issue.
2. Read `AGENTS.md`.
3. Read related `docs/operations` and `docs/editorial` documents.
4. Inspect target files.
5. Present a Japanese implementation plan.
6. Wait for explicit approval.
7. Create or use an appropriate branch when PR-based work is required.
8. Keep changes small and scoped.
9. Run relevant build, typecheck, Markdown, or workflow checks.
10. Write a PR body or final summary with changes, verification, and risks.

## Completion Criteria

This phase is complete when:

- `docs/tasks/phase16-codex-issue-workflow.md` exists.
- `docs/operations/codex-issue-workflow.md` contains the expanded workflow.
- Markdown structure checks pass.
- `git diff --check` passes.
- No app code or article content is changed.
