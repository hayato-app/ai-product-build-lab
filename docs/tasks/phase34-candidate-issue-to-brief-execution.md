# Phase 34: Candidate Issue to Brief Execution

## Purpose

This phase verifies the practical flow from a Discord-created article candidate
selection Issue to an article brief.

The target Issue is:

```txt
https://github.com/hayato-app/ai-product-build-lab/issues/11
```

## Scope

Phase 34 covers only:

- Reading the GitHub Issue created by `/article-candidate-select`.
- Confirming the selected candidate source and candidate number.
- Checking existing published articles, drafts, and briefs for duplication.
- Creating or updating one article brief under `docs/article-briefs`.
- Recording the workflow status in the brief.

Phase 34 does not cover:

- Creating a new draft article.
- Expanding article body content.
- Creating or replacing thumbnails.
- Moving a draft into published articles.
- Changing public routes, slugs, or URLs.
- Updating UI or Discord bot code.
- Running VPS deployment commands.

## Target Candidate

- Source candidate file: `docs/article-candidates/2026-06-02.md`
- Candidate number: 1
- Title: AIアプリ開発で使う環境変数とは
- Proposed slug: `ai-app-development-environment-variables`
- Category: システム開発用語解説
- Fact check: not_required

## Implementation Result

The corresponding brief is:

```txt
docs/article-briefs/ai-app-development-environment-variables.md
```

The brief now records:

- The GitHub Issue URL.
- The Discord command source.
- Duplication check status.
- Existing draft status.
- Current workflow status.

## Completion Criteria

Phase 34 is complete when:

- The Issue can be read through the GitHub connector.
- The selected candidate context is reflected in the brief.
- The brief clearly states that draft and publication work require separate
  approval.
- No public article or route is changed.
