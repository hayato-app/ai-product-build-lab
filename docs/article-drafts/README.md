# Article Drafts

This directory contains unpublished article drafts.

Drafts in this directory are not loaded by the Next.js site.
Move a reviewed draft into `apps/web/src/content/articles` only when it is ready to publish.

## Review workflow

Recommended review method:

1. Keep new article ideas in `docs/article-drafts`.
2. Review title, target reader, outline, factual claims, and publication priority.
3. Revise the draft in this directory until approved.
4. Move approved drafts to `apps/web/src/content/articles`.
5. Run `npm run build` under `apps/web`.
6. Commit, push, and deploy with `scripts/deploy-vps.ps1`.

## Review checklist

- The article fits one of the three content pillars.
- The title is specific and useful for search users.
- The article has a clear target reader.
- The article contains practical steps, examples, or decision criteria.
- News articles separate facts, interpretation, and builder-facing implications.
- The article does not introduce SaaS, payment, login, or dashboard features unless explicitly planned.
