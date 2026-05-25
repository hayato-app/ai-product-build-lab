# Phase 10: Article Worker Preparation

## Goal

Prepare an article generation worker for AIプロダクト構築ラボ / AI Product Build Lab.

The worker should help generate article drafts for a Japanese AI product development media site.

This phase should NOT automatically publish articles.

The worker should generate Markdown draft files that can be reviewed by a human before publishing.

## Current priority

SaaS, login, payment, and user account features are postponed.

The current priority is:
- Site quality
- Article expansion
- SEO content structure
- Semi-automated article draft generation

## Target directories

Worker source:
- workers/article-worker

Generated article output:
- apps/web/src/content/articles

Existing article reader should inspect:
- apps/web/src/content/articles/*.md

## Required behavior

Create a TypeScript-based article worker.

The worker should support:

1. Reading existing articles
   - Read Markdown files from apps/web/src/content/articles
   - Extract slug, title, description, category, tags, publishedAt
   - Use this to avoid duplicate article ideas

2. Generating article ideas
   - For now, use static seed topics rather than external APIs
   - Seed topics should focus on:
     - AIプロダクト開発
     - 生成AIアプリ開発
     - OpenAI API
     - RAG
     - AIエージェント
     - Next.js AI開発
     - AI APIコスト管理
     - AIプロダクト運用

3. Generating article outlines
   - Each outline should include:
     - title
     - description
     - category
     - tags
     - target reader
     - article sections
     - related internal link candidates

4. Generating Markdown drafts
   - Output valid Markdown files with frontmatter compatible with the existing article schema
   - Use Japanese text
   - Do not overwrite existing articles
   - Use safe unique slugs
   - Use current date for publishedAt and updatedAt

5. Internal link suggestions
   - Suggest related articles based on tags and categories
   - Add a "関連記事" section at the bottom of generated drafts

6. Dry-run mode
   - The first implementation should support a dry-run or preview mode
   - It should log what would be generated
   - It should not overwrite existing content

## Initial implementation scope

Do not connect to OpenAI API yet.

For the first version, implement a deterministic local generator using predefined templates and seed topics.

This makes the worker safe and testable before connecting any AI API.

## Files to create

Create:

- workers/article-worker/package.json
- workers/article-worker/tsconfig.json
- workers/article-worker/src/index.ts
- workers/article-worker/src/config.ts
- workers/article-worker/src/article-schema.ts
- workers/article-worker/src/existing-articles.ts
- workers/article-worker/src/generate-outline.ts
- workers/article-worker/src/generate-markdown.ts
- workers/article-worker/src/internal-links.ts
- workers/article-worker/src/utils.ts

## CLI behavior

The worker should support commands like:

npm run dev
npm run generate

The generate command should create one draft article by default.

Optionally support:

npm run generate -- --count 3

## Output rules

Generated files should be saved under:

apps/web/src/content/articles

The file name should be based on the generated slug.

Do not overwrite if the file already exists.

If a slug conflict occurs, append a suffix such as:

- -2
- -3

## Markdown frontmatter format

Use the existing format:

---
title: ""
description: ""
publishedAt: "YYYY-MM-DD"
updatedAt: "YYYY-MM-DD"
category: ""
tags:
  - ""
---

## Design constraints

This task is only for article worker preparation.

Do not modify the site design unless necessary.

Do not modify existing routes.

Do not remove existing articles.

Do not add authentication, payment, SaaS dashboards, or login features.

Do not add external API dependencies yet.

## Build / verification

After implementation, check:

From worker directory:

npm install
npm run generate

From app directory:

cd apps/web
npm run build

## Expected summary

After implementation, summarize:

- Files created
- How to run the worker
- What kind of article draft was generated
- Whether existing articles were preserved
- Build result
- Suggested next step
