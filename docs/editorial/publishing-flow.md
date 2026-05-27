# Publishing Flow

## Purpose

This document defines the standard flow for creating, reviewing, and publishing articles.

A generated article is considered a draft until it passes review.

## Standard Flow

1. Generate or write article idea.
2. Create Markdown draft.
3. Check duplication with existing articles.
4. Review category and tags.
5. Add internal links.
6. Review content quality.
7. Run build check.
8. Commit and push.
9. Confirm site display.
10. Publish / merge.

## 1. Generate or Write Article Idea

Article ideas may come from:

- Manual editorial planning
- Codex suggestions
- article-worker generated topics
- Existing reader problems
- Common development errors
- AI news that needs practical interpretation

## 2. Create Markdown Draft

Create drafts under:

```txt
docs/article-drafts
```

Do not create generated articles directly under:

```txt
apps/web/src/content/articles
```

## 3. Check Duplication

Before expanding a draft:

- Check existing published articles.
- Check existing draft articles.
- Confirm that the article has a distinct angle.

## 4. Review Category and Tags

Use one primary category.

Use 3 to 5 tags when possible.

Use `docs/editorial/category-policy.md` when choosing categories.

## 5. Add Internal Links

Use `docs/editorial/internal-link-policy.md`.

Add 2 to 4 related article links when possible.

Link to the AI API Cost Estimator when it is relevant:

```txt
/tools/ai-api-cost-estimator
```

## 6. Review Content Quality

Use:

```txt
docs/editorial/article-quality-checklist.md
```

Confirm:

- Frontmatter
- Links
- Article usefulness
- Factual accuracy
- Practical value
- Build result when publishing

## 7. Run Build Check

When publishing into the web app, run:

```bash
cd apps/web
npm run build
```

For draft generation, the worker can be run with:

```bash
npm run generate --prefix workers/article-worker
```

## 8. Commit and Push

Use a clear commit message.

Examples:

```txt
Add draft article about OpenAI API error handling
Publish article about AI API cost estimation
Update editorial operation rules
```

## 9. Confirm Site Display

After publishing or deploying, confirm:

- Article page displays correctly.
- Article list displays correctly.
- Category and tag pages work.
- Internal links are valid.

## 10. Publish / Merge

Only publish or merge after review.

Do not publish AI-generated drafts without human review.
