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
- Site improvement
- Tool improvement
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

## Standard Codex Issue Flow

Use this as the default sequence for Issue-based work:

1. Read the Issue title, body, labels, and template fields.
2. Read `AGENTS.md`.
3. Read related documents:
   - `docs/operations/github-issue-template-guide.md`
   - `docs/operations/smartphone-pr-review-flow.md`
   - `docs/operations/ai-article-pr-workflow.md` for AI article publication
     work
   - `docs/editorial` for article work
4. Inspect the target files, routes, articles, tools, or scripts.
5. Identify what is in scope and out of scope.
6. Present a Japanese implementation plan.
7. Wait for explicit user approval.
8. After approval, make small scoped changes.
9. Run the most relevant verification.
10. Summarize changes, verification, residual risks, and deployment needs.

## Before Approval

Before explicit user approval, Codex may:

- Read repository files.
- Inspect Issue content.
- Search for relevant code, documents, or articles.
- Run non-destructive read-only commands.
- Present questions when the Issue is too ambiguous.
- Present a Japanese implementation plan.

Before explicit user approval, Codex must not:

- Create files.
- Edit files.
- Delete files.
- Move articles from draft to public content.
- Change routes, slugs, or URLs.
- Run deployment commands.
- Run destructive commands.
- Commit or push changes.

## After Approval

After explicit user approval, Codex should:

- Keep changes inside the approved scope.
- Prefer the smallest useful diff.
- Preserve existing routes, slugs, and URLs unless explicitly approved.
- Preserve existing article files.
- Avoid unrelated refactors.
- Avoid adding SaaS, login, payment, dashboard, or account features unless
  explicitly requested.
- Report unexpected findings before expanding scope.

If the requested change becomes broader than the approved plan, pause and
present an updated Japanese plan before continuing.

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

### Site Improvement

Use this for public site, navigation, readability, discovery, layout, or admin
UI improvements.

Codex should:

- Read `AGENTS.md`.
- Read `docs/project-brief.md` when the public site experience is affected.
- Keep existing routes stable.
- Use Japanese UI text when UI text is changed.
- Preserve the bright AI development media direction unless the Issue
  explicitly requests another style.
- Run `npm run build` under `apps/web` when app code changes.
- State whether VPS deployment is needed.

### Tool Improvement

Use this for free tool pages or tool behavior improvements.

Codex should:

- Read `AGENTS.md`.
- Confirm the target tool URL.
- Keep existing tool URLs stable.
- Preserve existing inputs and outputs unless the Issue explicitly approves a
  change.
- Avoid adding login, payment, account, or dashboard behavior.
- Add or improve internal links when useful.
- Run `npm run build` under `apps/web` when app code changes.
- State whether VPS deployment is needed.

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

## Branch Rules

When working in an environment that supports branch creation, use a short
branch name with the `codex/` prefix.

Good examples:

- `codex/site-improvement-home-discovery`
- `codex/article-review-beginner-cost`
- `codex/tool-cost-estimator-copy`

Branch creation is especially useful when:

- The work is expected to become a pull request.
- Multiple files will change.
- App code, article publication, worker code, or bot code changes.

For tiny documentation changes in a direct-push workflow, the branch step may
be skipped when the user has approved that workflow.

## Verification Rules

Choose verification based on the files changed.

Use `npm run build` under `apps/web` when:

- Public site code changes.
- Admin UI code changes.
- Published article content changes.
- Routing or article rendering behavior changes.

Use bot package checks when `apps/discord-issue-bot` changes:

```bash
cd apps/discord-issue-bot
npm run typecheck
npm run build
```

Use worker package checks when `workers/article-worker` changes:

```bash
cd workers/article-worker
npm run build
```

Use Markdown and structure checks when only documentation changes.

If verification cannot be run, explain why and state the remaining risk.

## PR Body Requirements

When preparing a pull request, include:

- Linked Issue number.
- Purpose of the change.
- Summary of changed files.
- Verification results.
- Screenshots or URLs when UI changed.
- Article review status and fact-check status for article work.
- Whether VPS deployment is needed.
- Remaining risks or manual checks.

For article publication PRs, also follow:

```txt
docs/operations/ai-article-pr-workflow.md
```

## Commit and Push Rules

Before committing:

- Confirm the changed file list.
- Confirm no `.env` or secret files are staged.
- Confirm no private connection information is staged.
- Run relevant checks or explain why they were skipped.

Use concise commit messages that describe the completed unit of work.

Push after each approved phase or Issue-sized unit when the work is complete
and verified.

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
