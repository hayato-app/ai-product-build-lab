# Phase 32: Discord Candidate Select Issue

## Purpose

Add a Discord command that turns a selected article candidate into a GitHub
Issue for Codex.

This phase lets the user choose an article candidate from a smartphone while
keeping Codex work approval-based.

## Scope

This phase adds:

- `/article-candidate-select`

It may update:

- `apps/discord-issue-bot/src/commands.ts`
- `apps/discord-issue-bot/src/index.ts`
- `apps/discord-issue-bot/src/issueBodies.ts`
- `apps/discord-issue-bot/src/articleCandidates.ts`
- `apps/discord-issue-bot/README.md`
- `docs/operations/discord-issue-bot-design.md`
- `docs/operations/smartphone-codex-operation.md`

## In Scope

- Read the latest candidate list.
- Select one candidate by number.
- Create a GitHub Issue containing the selected candidate context.
- Include Codex approval-flow instructions in the Issue body.
- Keep the bot limited to Issue creation.

## Out of Scope

This phase does not:

- Create article briefs.
- Create article drafts.
- Generate thumbnails.
- Publish articles.
- Run Codex.
- Run VPS commands.
- Push commits.

## Command Usage

```txt
/article-candidate-select candidate:1
/article-candidate-select candidate:1 note:初心者向けに詳しく
/article-candidate-select candidate:1 note:図解を多めに priority:high
```

## Completion Criteria

- The command is registered in the Discord command definition.
- The command creates a GitHub Issue from a selected candidate.
- The generated Issue includes candidate context and Codex approval-flow
  instructions.
- The bot does not create briefs, drafts, published articles, commits, or VPS
  operations.
