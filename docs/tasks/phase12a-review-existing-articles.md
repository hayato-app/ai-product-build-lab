# Phase 12-A: Review and Improve Existing Articles

## Goal

Review and improve existing articles for AIプロダクト構築ラボ / AI Product Build Lab.

The purpose of this phase is to improve article quality, readability, internal links, category consistency, and practical value.

This task should improve existing articles only.

Do not create new articles unless explicitly approved later.

Do not modify site UI in this task.

Do not implement SaaS, login, payment, or dashboard features.

## Background

The project is a Japanese media site about:

- AI product development
- AI application development
- OpenAI API
- RAG
- AI agents
- Next.js AI development
- AI API cost management
- AI product operation and improvement

The current priority is:

1. Improve article quality
2. Make existing articles more useful
3. Improve internal links
4. Align categories and tags
5. Reduce thin or generic AI-generated text
6. Prepare articles for search and user trust

## Important instruction

Before editing files, follow the approval flow in AGENTS.md.

First, present an implementation plan in Japanese.

Do not create or edit files until the user explicitly approves the plan.

## Required reference documents

Before reviewing articles, read the following documents:

- AGENTS.md
- docs/project-brief.md
- docs/editorial/article-operation-rules.md
- docs/editorial/article-quality-checklist.md
- docs/editorial/category-policy.md
- docs/editorial/internal-link-policy.md
- docs/editorial/publishing-flow.md
- docs/editorial/codex-article-instructions.md

If any editorial document is missing, report it before editing files.

## Target files

Review existing Markdown articles under:

- apps/web/src/content/articles/*.md

Do not change files outside article content unless necessary.

Do not change article routing or the Markdown frontmatter schema.

## Work scope

### Step 1: Inventory existing articles

Inspect all existing article files.

Create a short review summary in Japanese before editing.

The summary should include:

- Number of existing articles
- Article titles
- Current categories
- Obvious duplicate or overlapping topics
- Articles that look thin or generic
- Articles that should be prioritized for improvement

### Step 2: Select improvement targets

Select up to 3 articles for the first improvement batch.

Prioritize articles that:

- Are important for the site theme
- Are likely to become pillar articles
- Have thin content
- Need better internal links
- Support the AI API Cost Estimator tool
- Have broad search value

Do not edit all articles at once.

### Step 3: Present implementation plan in Japanese

Before editing, present a Japanese implementation plan that includes:

- 作業の目的
- このファイルで使用する言語
- マイルストーン
- 具体的な変更予定
- 懸念事項または確認事項
- 改善対象の記事一覧

Wait for explicit approval before editing.

### Step 4: Improve selected articles

For each selected article, improve:

- Title if necessary
- Description if necessary
- Introduction
- Conclusion near the beginning
- Target reader clarity
- Practical explanations
- Section structure
- Common mistakes or 注意点
- Improvement points
- Related internal links
- Tool links when relevant
- Summary

Keep the article theme intact.

Do not make unsupported claims.

Do not add fake statistics.

Do not add external citations unless explicitly requested.

### Step 5: Internal links

Use internal links naturally.

Prefer links to:

- Related articles under /articles
- Relevant category pages under /categories
- AI API Cost Estimator: /tools/ai-api-cost-estimator

When relevant, add a section near the end:

## 関連記事

- [記事タイトル](/articles/example-slug)
- [記事タイトル](/articles/example-slug)

### Step 6: Category and tag cleanup

Ensure each edited article has:

- One valid primary category
- 3 to 5 useful tags
- Category aligned with docs/editorial/category-policy.md

Do not create new categories unless clearly justified.

### Step 7: Quality checklist

Use docs/editorial/article-quality-checklist.md.

Each edited article should satisfy:

- Clear search intent
- Clear reader benefit
- Practical content
- Natural Japanese
- Valid frontmatter
- Valid Markdown
- Useful internal links
- No major duplication

## Constraints

- Do not create new articles.
- Do not delete articles.
- Do not rename slugs unless explicitly approved.
- Do not change URLs unless explicitly approved.
- Do not modify UI components.
- Do not modify app routes.
- Do not add dependencies.
- Do not add SaaS, login, payment, or dashboard features.
- Do not overwrite unrelated files.
- Keep changes small and reviewable.
- Improve up to 3 articles in the first batch only.

## Verification

After editing:

1. Show changed article files.
2. Summarize improvements for each article.
3. Confirm frontmatter remains valid.
4. Run build if possible:

cd apps/web
npm run build

If build cannot be run, explain why.

## Expected final summary

After implementation, summarize in Japanese:

- Reviewed article count
- Edited article files
- Main improvements
- Internal links added
- Category/tag changes
- Build result
- Recommended next batch of articles to improve
