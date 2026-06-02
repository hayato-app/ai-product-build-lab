# Phase 27: Article Candidate Generator

## Purpose

Add a local script that generates article candidate lists from predefined seed
topics while checking existing published articles and existing drafts.

The output supports the Phase 26 article candidate flow.

## Scope

This phase adds:

- `scripts/generate-article-candidates.mjs`

It may create one candidate list under:

- `docs/article-candidates`

## In Scope

- Rule-based candidate generation.
- Existing published article checks.
- Existing draft checks.
- Existing candidate list checks.
- Markdown candidate list output.
- Pillar filtering.
- Count and output path options.

## Out of Scope

This phase does not:

- Create article drafts automatically.
- Generate thumbnails.
- Publish articles.
- Use OpenAI API or any external AI API.
- Use Search Console or Analytics data.
- Add Discord commands.
- Run VPS deployment automation.

## Script Usage

```bash
node scripts/generate-article-candidates.mjs
node scripts/generate-article-candidates.mjs --count 5
node scripts/generate-article-candidates.mjs --pillar beginner
node scripts/generate-article-candidates.mjs --out docs/article-candidates/2026-06-02.md
```

Supported pillar aliases:

- `beginner`
- `app`
- `news`

Use `--force` only when intentionally overwriting an existing candidate list.

## Completion Criteria

- The script can generate a Markdown candidate list.
- Existing published articles and drafts are checked.
- The output uses the candidate format from `docs/article-candidates/README.md`.
- No draft articles are created automatically.
- No existing articles or drafts are modified.
