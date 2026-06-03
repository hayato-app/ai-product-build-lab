# Phase 36: Brief to Draft Generator Hardening

## Purpose

This phase hardens the brief-to-draft generator so that GitHub Issue driven
article work can move consistently from an approved article brief to a
review-only draft.

The goal is not automatic publication. The goal is to make the draft appear as
reviewable content under `docs/article-drafts` after the normal Codex approval
flow.

## Scope

Phase 36 covers:

- Improving `scripts/create-draft-from-brief.mjs`.
- Preserving source Issue context when the brief includes it.
- Preserving source brief context in generated draft notes.
- Adding thumbnail TODOs to generated draft scaffolds.
- Adding a `--dry-run` mode for safe preview.
- Updating operational documentation for the Issue to brief to draft review
  flow.

Phase 36 does not cover:

- Creating a new production article.
- Publishing drafts.
- Generating image files.
- Moving files into `apps/web/src/content/articles`.
- Changing public routes, slugs, or URLs.
- Changing the admin UI or Discord bot.
- Running VPS deployment commands.

## Expected Flow After This Phase

```txt
Discord /article-candidates
  -> Discord /article-candidate-select
  -> GitHub Issue
  -> Codex reads Issue
  -> user approves brief creation
  -> article brief
  -> user approves draft creation
  -> review-only draft scaffold
  -> Codex expands draft and adds thumbnail
  -> admin draft review page
```

## Completion Criteria

Phase 36 is complete when:

- The generator passes a Node syntax check.
- The generator can preview output with `--dry-run`.
- The generated scaffold includes review notes, source context, thumbnail TODOs,
  internal link TODOs, and fact-check TODOs.
- Existing published articles and existing drafts are still protected from
  accidental overwrite.
- Article structure checks pass or any remaining warnings are documented.
