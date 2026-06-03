# Issue 12: AI App API Route Draft

## Source

- GitHub Issue: https://github.com/hayato-app/ai-product-build-lab/issues/12
- Source command: `/article-candidate-select`
- Candidate number: 2
- Source candidate file: `docs/article-candidates/2026-06-02.md`

## Purpose

Create a review-only draft article for the selected candidate:

```txt
AIアプリ開発でよく出るAPI Routeとは
```

The draft should be available in the admin draft review page, but it must not
be published automatically.

## Created Files

- Brief: `docs/article-briefs/ai-app-api-route-basics.md`
- Draft: `docs/article-drafts/ai-app-api-route-basics.md`
- Thumbnail: `apps/web/public/images/drafts/ai-app-api-route-basics-thumbnail.png`

## Editorial Positioning

This article is a beginner terminology explanation focused on API Route /
Route Handler.

It differs from existing related content:

- `nextjs-ai-app-basic-architecture` explains the broader app structure.
- `app-nextjs-ai-api-common-mistakes` explains mistakes and troubleshooting.
- This draft explains the term and role of API Route in a beginner-friendly way.

## Review Notes

- Keep this draft unpublished until human review is complete.
- Confirm the explanation of API Route / Route Handler is clear for beginners.
- Confirm internal links are useful.
- Confirm the thumbnail is appropriate for the draft list and article body.
- Confirm no API key or secret handling guidance is misleading.

## Verification

Run:

```bash
node scripts/check-articles.mjs
```

Run `npm run build` under `apps/web` only if the draft is moved into published
article content or app code changes are made.
