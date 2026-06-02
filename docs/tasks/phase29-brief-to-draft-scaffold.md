# Phase 29: Brief to Draft Scaffold

## Purpose

Add a local script that converts an approved article brief into a review-only
draft scaffold.

This phase keeps the workflow safe by creating only a structured draft outline,
not a finished article and not a published article.

## Scope

This phase adds:

- `scripts/create-draft-from-brief.mjs`

It may create one draft scaffold under:

- `docs/article-drafts`

It may update:

- `docs/article-briefs/README.md`
- `docs/operations/article-candidate-flow.md`

## In Scope

- Read an existing article brief.
- Extract title, proposed slug, pillar, category, reader, search intent, problem,
  angle, internal links, thumbnail idea, fact-check status, and priority.
- Create a Markdown draft scaffold under `docs/article-drafts`.
- Add review-oriented frontmatter.
- Add placeholder sections for future article writing.
- Refuse to overwrite existing drafts by default.
- Refuse to create a draft when a published article already uses the same slug.

## Out of Scope

This phase does not:

- Create a finished article.
- Generate thumbnail images.
- Publish articles.
- Move drafts into public content.
- Use OpenAI API or any external AI API.
- Add Discord commands.
- Run VPS deployment automation.

## Script Usage

```bash
node scripts/create-draft-from-brief.mjs --brief docs/article-briefs/ai-app-development-environment-variables.md
node scripts/create-draft-from-brief.mjs --brief docs/article-briefs/ai-app-development-environment-variables.md --slug beginner-environment-variables-ai-apps
```

Use `--force` only when intentionally overwriting an existing draft scaffold.
`--force` never overwrites a published article.

## Completion Criteria

- The script can generate a draft scaffold from a selected article brief.
- Existing public articles are never overwritten.
- Existing drafts are not overwritten unless `--force` is used.
- The generated scaffold passes article validation.
- No finished article or public content is created automatically.
