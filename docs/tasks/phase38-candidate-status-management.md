# Phase 38: Candidate Status Management

## Purpose

Add lifecycle status tracking to article candidates so the team can see which
topics are still available, already selected, drafted, published, or rejected.

This prevents duplicate candidate selection and makes the article topic stock
easier to maintain from smartphone and Discord workflows.

## Scope

This phase covers:

- Candidate Markdown status fields.
- Discord candidate list and detail status display.
- Blocking `/article-candidate-select` for non-available candidates.
- Candidate generator default status output.
- Editorial operation documentation for candidate status updates.

This phase does not cover:

- Automatic draft creation.
- Automatic publication.
- Discord direct file editing.
- Discord direct push.
- Discord direct VPS commands.
- SaaS, login, payment, or dashboard features.

## Status Values

Use these values:

- `available`: Candidate can be selected.
- `selected`: User selected the candidate and an Issue exists.
- `briefed`: An article brief exists.
- `drafted`: A draft article exists.
- `published`: The article was published.
- `rejected`: Candidate should not be used.
- `watch`: Keep as a future idea, but do not draft yet.

## Implementation Notes

- New generated candidates should start with `Status: available`.
- The Discord bot should read and display status.
- The Discord bot should only create Issues from `available` candidates.
- Candidate status updates should be committed as normal repository changes
  after user-approved Codex work.
- Existing candidates should be updated to reflect current lifecycle state.

## Verification

Run:

```bash
cd apps/discord-issue-bot
npm run build
```

If command definitions or bot behavior changed on the VPS, rebuild and restart
the bot after pulling the repository.
