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

## Issue to Draft Review Flow

When a draft starts from a Discord or GitHub Issue, use this safe sequence:

1. Create or identify an article candidate Issue.
2. Create an article brief under `docs/article-briefs` after user approval.
3. Generate a draft scaffold from the approved brief:

```bash
node scripts/create-draft-from-brief.mjs --brief docs/article-briefs/<slug>.md
```

4. Expand the scaffold into a useful draft article.
5. Add a local thumbnail image under `apps/web/public/images/drafts`.
6. Add `thumbnail` frontmatter and insert the same image near the beginning of
   the draft body.
7. Check the draft in the admin draft review page.

Issue creation and brief creation do not automatically approve publication.
Draft publication remains a separate human decision.

## Review checklist

- The article fits one of the three content pillars.
- The title is specific and useful for search users.
- The article has a clear target reader.
- The article contains practical steps, examples, or decision criteria.
- News articles separate facts, interpretation, and builder-facing implications.
- The article does not introduce SaaS, payment, login, or dashboard features unless explicitly planned.
