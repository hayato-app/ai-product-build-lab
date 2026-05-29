# Codex Issue Workflow

This document defines how Codex should handle GitHub Issues created from a
smartphone, GitHub app, or a future Discord bot.

The goal is to keep remote work safe, reviewable, and aligned with the
project rules in `AGENTS.md`.

## Scope

This workflow applies when a GitHub Issue is used as the entry point for
Codex work.

Supported Issue types:

- Codex task
- Article review / improvement
- New draft article
- Bug report

This workflow does not authorize direct deployment, direct VPS operations, or
automatic publication of generated content.

## Core Principles

- Treat GitHub Issues as work requests, not as automatic execution commands.
- Read `AGENTS.md` before planning any implementation.
- Present an implementation plan in Japanese before creating files, editing
  files, or implementing code.
- Wait for explicit user approval such as "OK", "approved", or
  "please proceed" before making file changes.
- Keep work inside the approved Issue scope.
- Prefer pull requests for reviewable changes.
- Do not add SaaS, login, payment, dashboard, or account features unless the
  Issue explicitly requests them and the user approves the plan.
- Do not run VPS commands from Discord or other bots.

## First Response Checklist

When Codex starts from an Issue, first inspect:

- Issue title and body
- Issue type or template
- Requested files, pages, slugs, or URLs
- Allowed changes
- Forbidden changes
- Required verification
- Related documents listed in the Issue

Then reply with a Japanese implementation plan that includes:

- Purpose of the work
- Languages or technologies used for the target files
- Milestones
- Specific planned changes
- Concerns or confirmation points

Do not edit files until the user clearly approves the plan.

## Issue Type Handling

### Codex Task

Use this for general site work, UI adjustments, small feature changes,
documentation, or operations improvements.

Codex should:

- Read `AGENTS.md`.
- Check whether the request affects app code, docs, articles, or deployment.
- Identify whether build verification is needed.
- Keep the implementation limited to the requested area.
- Summarize changed files and verification results in the final response.

### Article Review / Improvement

Use this for improving an existing published article or draft.

Codex should:

- Read `AGENTS.md`, `docs/project-brief.md`, and all documents under
  `docs/editorial`.
- Confirm the target slug and whether it is a published article or draft.
- Preserve existing slugs and URLs unless the user explicitly approves a
  change.
- Do not delete existing articles.
- Add practical examples, tables, diagrams, internal links, and clearer
  explanations when they improve usefulness.
- Keep AI-generated or heavily revised content in review until approved.

### New Draft Article

Use this for creating a new article draft.

Codex should:

- Read `AGENTS.md`, `docs/project-brief.md`, and all documents under
  `docs/editorial`.
- Check existing published articles and drafts for duplication.
- Create new drafts under `docs/article-drafts`.
- Treat the result as unpublished draft content.
- Do not move drafts into the public article directory automatically.
- Include review notes when facts, product names, dates, or external claims
  require confirmation.

### Bug Report

Use this for behavior that appears broken in the site, admin draft review UI,
article rendering, or related tooling.

Codex should:

- Reproduce the issue when possible.
- Identify the likely cause before editing.
- Keep the fix narrow.
- Run the most relevant verification available.
- Explain any verification that could not be performed.

## Pull Request Rules

When the approved work changes files, Codex should prepare a pull request when
the repository workflow allows it.

The PR description should include:

- What changed
- Why it changed
- How it was verified
- Any remaining risks or manual review points
- Whether VPS deployment is needed

Documentation-only changes usually do not require VPS deployment.

## VPS Deployment Rules

VPS pull and Docker restart are needed only when the live site or server-side
runtime must be updated.

VPS deployment is usually needed for:

- Public site UI changes
- Admin review UI changes
- Article content that should appear on the live site
- Worker or script changes that are run on the VPS
- Docker or environment-related changes

VPS deployment is usually not needed for:

- GitHub Issue templates
- Planning documents
- Operations documents
- Discord bot design documents

If deployment is needed, Codex should state that in the final summary or PR.

## Smartphone Operation Notes

Smartphone-created Issues should be written so that Codex can act without
guessing:

- Use the closest Issue template.
- Include the target slug, URL, or file path when known.
- State what may be changed.
- State what must not be changed.
- Add screenshots when reporting visual issues.
- Confirm whether the change should be draft-only or public-facing.

The user can approve the plan from a smartphone with a clear short reply such
as "OK" or "please proceed".

## Future Discord Bot Boundary

The first Discord bot should only create GitHub Issues.

It must not:

- Edit repository files directly
- Push commits directly
- Run VPS commands directly
- Publish articles directly
- Merge pull requests directly

The bot may later help collect structured inputs for Issue templates, such as
article slug, topic, category, target reader, and notes.

## Completion Criteria

An Issue-based Codex task is complete when:

- The approved scope is handled.
- Any required verification is performed or clearly explained.
- Changes are committed and pushed, or a PR is created when appropriate.
- The user receives a concise summary of changed files, verification, and next
  steps.
