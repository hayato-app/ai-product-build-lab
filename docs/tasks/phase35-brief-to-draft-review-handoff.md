# Phase 35: Brief to Draft Review Handoff

## Purpose

This phase connects the candidate Issue and article brief from Phase 34 to the
existing review-only draft.

The goal is to make the smartphone-driven article flow traceable:

```txt
Discord /article-candidate-select
  -> GitHub Issue
  -> article brief
  -> review-only draft
  -> admin draft review page
```

## Scope

Phase 35 covers only:

- Recording the relationship between GitHub Issue #11, the article brief, and
  the existing draft.
- Making the draft review handoff explicit.
- Documenting what to do when a brief already has a corresponding draft.

Phase 35 does not cover:

- Creating a new draft article.
- Rewriting the article body.
- Creating or replacing thumbnails.
- Publishing the draft.
- Changing routes, slugs, or URLs.
- Updating UI, Discord bot code, or VPS runtime files.

## Target

- GitHub Issue: https://github.com/hayato-app/ai-product-build-lab/issues/11
- Brief: `docs/article-briefs/ai-app-development-environment-variables.md`
- Draft: `docs/article-drafts/ai-app-development-environment-variables.md`

## Implementation Result

- The draft `review_notes` now references GitHub Issue #11 and the source brief.
- The draft body includes a short review-state section with the source Issue
  and brief path.
- The brief now records the corresponding draft path and admin review handoff.
- The article brief README now explains how to handle brief-to-draft review
  handoff without creating duplicate drafts.

## Completion Criteria

Phase 35 is complete when:

- The Issue, brief, and draft can be traced from the repository files.
- The draft remains unpublished and review-only.
- The next step is clearly human review in the admin draft review page.
- Publication still requires a separate human decision.
