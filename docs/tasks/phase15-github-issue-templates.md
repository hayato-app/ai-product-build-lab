# Phase 15: GitHub Issue Templates

## Purpose

Improve GitHub Issue templates so smartphone-created work requests contain
enough information for Codex to plan safely.

Basic templates already exist from Phase 13. This phase adds more specific
templates for site improvements and tool improvements.

## Scope

In scope:

- Add a site improvement Issue template.
- Add a tool improvement Issue template.
- Add a guide that explains which template to use.
- Keep existing article and bug templates stable.

Out of scope:

- Changing site UI.
- Changing article content.
- Changing Discord bot code.
- Running VPS deployment.
- Adding SaaS, login, payment, or dashboard features.

## Existing Templates

Existing templates:

- `.github/ISSUE_TEMPLATE/article-review.yml`
- `.github/ISSUE_TEMPLATE/article-new.yml`
- `.github/ISSUE_TEMPLATE/bug-report.yml`
- `.github/ISSUE_TEMPLATE/codex-task.yml`
- `.github/ISSUE_TEMPLATE/config.yml`

## New Templates

Add:

- `.github/ISSUE_TEMPLATE/site-improvement.yml`
- `.github/ISSUE_TEMPLATE/tool-improvement.yml`

## Requirements

All templates should remind Codex to:

- Read `AGENTS.md`.
- Present a Japanese implementation plan before editing files.
- Wait for explicit user approval before implementation.
- Keep existing routes stable.
- Avoid SaaS, login, payment, dashboard, or account features unless explicitly
  requested.
- Submit reviewable changes through pull requests when files change.

## Completion Criteria

This phase is complete when:

- The two new Issue templates exist.
- A template usage guide exists.
- YAML structure checks pass.
- `git diff --check` passes.
- No app code or article content is changed.
