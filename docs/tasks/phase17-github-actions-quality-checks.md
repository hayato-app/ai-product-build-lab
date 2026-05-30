# Phase 17: GitHub Actions Quality Checks

## Purpose

Add automated quality checks for pull requests and pushes to `main`.

The goal is to make PR review safer from smartphone workflows by catching
broken builds, invalid article metadata, duplicate slugs, broken internal
links, and accidentally committed environment files.

## Scope

In scope:

- Add a GitHub Actions workflow.
- Add a lightweight article validation script.
- Check the Next.js web app build.
- Check published and draft article metadata.
- Check internal links used in Markdown articles.
- Check for committed `.env` files.

Out of scope:

- Changing public site UI.
- Changing article content.
- Changing Discord bot behavior.
- Changing VPS configuration.
- Adding SaaS, login, payment, or dashboard features.

## Checks

Initial checks:

- `npm ci` in `apps/web`
- `npm run build` in `apps/web`
- Published article frontmatter validation
- Draft article frontmatter validation
- Duplicate slug detection
- Internal link validation for `/articles`, `/tools`, `/categories`, and
  `/tags`
- Committed `.env` file detection

## Completion Criteria

This phase is complete when:

- `.github/workflows/quality-checks.yml` exists.
- `scripts/check-articles.mjs` exists.
- The article check script runs locally.
- The web build runs locally when possible.
- `git diff --check` passes.
