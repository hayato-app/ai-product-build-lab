# Phase 31: Discord Article Candidates

## Purpose

Add a read-only Discord command that lets the user check article candidates from
a smartphone.

This phase supports the candidate selection workflow without allowing the bot to
edit files, create drafts, publish articles, or run VPS commands.

## Scope

This phase adds:

- `/article-candidates`
- `apps/discord-issue-bot/src/articleCandidates.ts`

It may update:

- `apps/discord-issue-bot/src/commands.ts`
- `apps/discord-issue-bot/src/index.ts`
- `apps/discord-issue-bot/README.md`
- `docs/operations/discord-issue-bot-design.md`
- `docs/operations/smartphone-codex-operation.md`

## In Scope

- Read the latest Markdown file under `docs/article-candidates`.
- Show a short candidate list in Discord.
- Show detailed information for one candidate number.
- Keep replies short enough for smartphone use.

## Out of Scope

This phase does not:

- Create GitHub Issues from selected candidates.
- Create article briefs.
- Create article drafts.
- Generate thumbnails.
- Publish articles.
- Run Codex.
- Run VPS commands.

## Command Usage

```txt
/article-candidates
/article-candidates limit:3
/article-candidates candidate:1
```

## Completion Criteria

- The command is registered in the Discord command definition.
- The bot can read the latest candidate list.
- The list view shows candidate numbers, titles, categories, priorities, and a
  short summary.
- The detail view shows one candidate's full planning context.
- The bot remains read-only for candidate operations.
