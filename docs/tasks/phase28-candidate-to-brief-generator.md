# Phase 28: Candidate to Brief Generator

## Purpose

Add a local script that converts explicitly selected article candidates into
article briefs.

This phase creates a safe intermediate step between article candidate selection
and article draft creation.

## Scope

This phase adds:

- `scripts/create-article-brief-from-candidate.mjs`
- `docs/article-briefs/README.md`

It may create one or more brief files under:

- `docs/article-briefs`

It may update:

- `docs/article-candidates/README.md`
- `docs/operations/article-candidate-flow.md`

## In Scope

- Read an existing candidate list.
- Select candidates by number.
- Convert selected candidates to Markdown briefs.
- Preserve candidate context for future draft creation.
- Add draft creation notes and required reading references.
- Avoid overwriting existing briefs unless `--force` is used.

## Out of Scope

This phase does not:

- Create article drafts automatically.
- Generate thumbnail images.
- Publish articles.
- Move drafts into public content.
- Use OpenAI API or any external AI API.
- Add Discord commands.
- Run VPS deployment automation.

## Script Usage

```bash
node scripts/create-article-brief-from-candidate.mjs --source docs/article-candidates/2026-06-02.md --candidate 1
node scripts/create-article-brief-from-candidate.mjs --source docs/article-candidates/2026-06-02.md --candidate 1,3
node scripts/create-article-brief-from-candidate.mjs --source docs/article-candidates/2026-06-02.md --candidate 1 --slug beginner-environment-variables-ai-apps
```

Use `--force` only when intentionally overwriting an existing brief.

## Completion Criteria

- The script can generate a Markdown brief from a selected candidate.
- Multiple candidates can be selected in one command.
- Existing brief files are not overwritten by default.
- No article drafts are created automatically.
- No existing articles or drafts are modified.
