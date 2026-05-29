# Smartphone PR Review Flow

This document defines how to review and merge Codex pull requests from a
smartphone.

The goal is to make smartphone operation practical while keeping changes safe,
reviewable, and aligned with `AGENTS.md`.

## Scope

This workflow applies when the user creates a GitHub Issue from a smartphone,
approves a Codex implementation plan, and then reviews the resulting pull
request from a smartphone.

It covers:

- Issue creation from GitHub app or Discord
- Codex plan approval
- Pull request review
- Merge decisions
- VPS deployment decisions

It does not authorize automatic merges, automatic publication, or direct VPS
operations from Discord.

## End-to-End Flow

1. Create a GitHub Issue from the GitHub mobile app or Discord bot.
2. Codex reads the Issue and related project rules.
3. Codex presents a Japanese implementation plan.
4. User approves the plan from smartphone.
5. Codex implements the approved scope.
6. Codex creates or updates a pull request.
7. User reviews the pull request from smartphone.
8. User merges only when the merge checklist is satisfied.
9. User or Codex performs VPS deployment only when needed.

## Issue Creation Checklist

Before sending work to Codex, include:

- Target page, file, article slug, or feature
- Purpose of the change
- Allowed changes
- Forbidden changes
- Expected verification
- Screenshots for visual issues when available
- Whether the work is draft-only or public-facing

For article work, include:

- Target slug or topic
- Expected category
- Target reader
- Internal link candidates
- Whether fact check is required
- Publication status: draft, review, or public

## Plan Approval Checklist

Before replying "OK" to a Codex plan from smartphone, confirm:

- The plan matches the Issue purpose.
- The planned files are reasonable.
- The plan does not include unrelated refactors.
- The plan does not add SaaS, login, payment, dashboard, or account features
  unless explicitly requested.
- Article work follows `docs/editorial`.
- The verification method is clear.
- VPS deployment is mentioned only when needed.

If the plan is too broad, ask Codex to narrow the scope before approval.

## Pull Request Review Checklist

When reviewing a PR from smartphone, check:

- PR title and summary are understandable.
- Changed files match the approved scope.
- No unexpected files are changed.
- No `.env` or secret files are included.
- No tokens, passwords, private IP notes, or connection information are exposed.
- Codex reported verification results.
- Build, typecheck, or relevant checks passed when applicable.
- Any skipped verification is clearly explained.
- The PR description states whether VPS deployment is needed.

## Merge OK Conditions

It is usually OK to merge from smartphone when:

- The change matches the approved Issue and plan.
- The changed file list is small or easy to understand.
- Verification passed or the skipped verification is acceptable.
- No secrets or local-only files are included.
- No existing public routes, slugs, or URLs are changed unexpectedly.
- Article drafts remain drafts unless publication was explicitly requested.
- The PR description clearly explains next steps.

## Request Changes Conditions

Ask Codex to revise the PR when:

- Files outside the approved scope are changed.
- Verification is missing without explanation.
- A route, slug, URL, or article structure changes unexpectedly.
- Article content is thin, inaccurate, or missing required review notes.
- The change adds SaaS, login, payment, dashboard, or account behavior without
  explicit approval.
- The PR includes generated files that should not be committed.
- The PR includes unclear deployment instructions.

## PC Review Required Conditions

Do not merge only from smartphone when:

- The PR changes authentication, authorization, environment handling, or tokens.
- The PR changes Docker, deployment scripts, VPS setup, or reverse proxy
  behavior.
- The PR changes many files or a shared data structure.
- The PR publishes articles with facts that still need verification.
- The PR affects public article URLs, sitemap behavior, or routing.
- The visual impact is large and screenshots are not enough.
- The PR includes dependency upgrades that need deeper review.

In these cases, wait until PC review is possible or ask Codex for a smaller PR.

## Article-Specific Review

For article PRs, also check:

- The article follows the three content pillars.
- The category matches `docs/editorial/category-policy.md`.
- Beginner content explains terms clearly.
- Troubleshooting content includes usable steps, examples, commands, or checks.
- News commentary has dates and fact-check notes when needed.
- Internal links are relevant.
- AI-generated drafts are not automatically published.
- Published article slugs and URLs remain stable.

## Bot-Related PR Review

For Discord bot changes, also check:

- The bot still only creates GitHub Issues unless a later phase explicitly
  expands the scope.
- No Discord token or GitHub token is committed.
- `.env.example` contains placeholders only.
- GitHub permissions remain limited to Issue creation for the initial bot.
- Error messages do not expose secrets.
- Logs do not include raw tokens or private connection information.

## VPS Deployment Decision

VPS deployment is usually needed after merging:

- Public site UI changes
- Admin draft review UI changes
- Published article changes
- Worker or script changes that run on the VPS
- Docker Compose or environment-related changes
- Bot changes when the bot is already hosted on the VPS

VPS deployment is usually not needed after merging:

- GitHub Issue templates
- Operations documents
- Planning documents
- Bot design documents
- Bot code that is not yet deployed or running on the VPS

If deployment is needed, use the established VPS pull and Docker restart flow.
Do not trigger VPS commands from Discord.

## Emergency Fix Notes

For urgent fixes:

- Keep the Issue and PR scope as small as possible.
- Ask Codex to state the exact risk and verification.
- Merge from smartphone only if the changed files and risk are easy to inspect.
- Deploy to VPS only when the live site needs the fix immediately.
- Follow up with a normal review task if the emergency fix leaves cleanup work.

## Completion Criteria

A smartphone-driven Codex task is complete when:

- The Issue has enough context.
- The Codex plan was explicitly approved.
- The PR was reviewed against this checklist.
- The PR was merged or returned for changes.
- VPS deployment was performed only if needed.
- Any remaining manual checks are recorded in the Issue or PR.
