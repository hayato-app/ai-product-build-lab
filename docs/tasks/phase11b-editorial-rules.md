# Phase 11-B: Create Editorial Operation Rules

## Goal

Create editorial operation rules for AIプロダクト構築ラボ / AI Product Build Lab.

The purpose of this phase is to define rules for article expansion before generating or publishing more articles.

This task should prepare documentation only.

Do not create new articles in this task.

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

1. Improve site quality
2. Expand articles
3. Keep article quality consistent
4. Avoid duplicate or thin AI-generated content
5. Prepare a safe workflow for Codex and article-worker generated drafts

## Important instruction

Before editing files, follow the approval flow in AGENTS.md.

First, present an implementation plan in Japanese.

Do not create or edit files until the user explicitly approves the plan.

## Files to create

Create the following files:

- docs/editorial/article-operation-rules.md
- docs/editorial/article-quality-checklist.md
- docs/editorial/category-policy.md
- docs/editorial/internal-link-policy.md
- docs/editorial/publishing-flow.md
- docs/editorial/codex-article-instructions.md

Also update:

- AGENTS.md

## Directory

Create this directory if it does not exist:

- docs/editorial

## File 1: docs/editorial/article-operation-rules.md

Create a document that defines the overall article operation rules.

It should include:

- Project purpose
- Current priority
- Article goals
- Article types
- Preferred topics
- Topics to avoid
- Publishing frequency
- Draft handling rule
- Minimum article requirements
- Definition of publish-ready article

Required content direction:

The document should clearly say:

- AI-generated articles are drafts.
- Drafts must be reviewed before publishing.
- Do not automatically publish generated articles.
- Prefer quality over volume.
- Articles should provide practical value.

Preferred article types:

- Implementation guide
- Concept explanation
- Error / troubleshooting article
- Tool usage article
- Cost / operation article
- Comparison article
- Roadmap / learning path article
- Checklist article

Preferred topics:

- AIプロダクト開発
- 生成AIアプリ開発
- OpenAI API
- RAG
- AIエージェント
- Next.js AI開発
- AI APIコスト管理
- AIプロダクト運用
- AI開発ツール
- AIアプリ公開・改善

Avoid for now:

- Medical, legal, financial advice
- Political topics
- Highly speculative AI news
- Thin AI tool listicles with no original explanation
- SaaS payment / dashboard implementation unless explicitly requested
- Articles that only summarize official docs without practical value

## File 2: docs/editorial/article-quality-checklist.md

Create a checklist used before publishing or merging an article.

It should include sections:

1. Search intent
2. Article structure
3. Practical value
4. AI product relevance
5. Internal links
6. Frontmatter
7. Duplication check
8. Style
9. Technical check

Use Markdown checkboxes.

The checklist should include checks such as:

- The article targets a clear search intent.
- The title matches reader intent.
- The article starts with a clear conclusion.
- The article includes practical examples or concrete guidance.
- The article links to related articles when possible.
- The article links to relevant tools when possible.
- Frontmatter is valid.
- Markdown syntax is valid.
- npm run build succeeds.

## File 3: docs/editorial/category-policy.md

Create category operation rules.

Primary categories should include:

- AIプロダクト開発
- 生成AIアプリ開発
- OpenAI API
- RAG開発
- AIエージェント開発
- Next.js AI開発
- AI APIコスト管理
- AIプロダクト運用
- AI開発ツール
- AI収益化

Rules:

- Use only one primary category per article.
- Use tags for secondary topics.
- Do not create a new category unless at least 3 articles are expected.
- Keep category names short and consistent.
- Avoid duplicate categories with similar meaning.

Include good and bad examples.

## File 4: docs/editorial/internal-link-policy.md

Create internal linking rules.

It should include:

- Purpose of internal links
- Basic rules
- Preferred internal link destinations
- Tool link rules
- Related articles section format
- Links to avoid

Rules:

- Each article should include 2 to 4 related article links when possible.
- Each article should link to a relevant tool when possible.
- Internal links should be useful and natural.
- Do not force links only for SEO.

Important tool link:

- AI API Cost Estimator: /tools/ai-api-cost-estimator

Suggested anchor text:

- AI APIの概算コストを計算する
- AI API Cost Estimatorを使う
- 月間APIコストを見積もる

Related articles section format:

## 関連記事

- [記事タイトル](/articles/example-slug)
- [記事タイトル](/articles/example-slug)

## File 5: docs/editorial/publishing-flow.md

Create publishing flow documentation.

It should define the standard flow:

1. Generate or write article idea
2. Create Markdown draft
3. Check duplication with existing articles
4. Review category and tags
5. Add internal links
6. Review content quality
7. Run build check
8. Commit and push
9. Confirm site display
10. Publish / merge

The document should clearly say:

- A generated article is considered a draft until it passes review.
- Use docs/editorial/article-quality-checklist.md before publishing.
- Confirm frontmatter, links, article usefulness, factual accuracy, and build result.

Include command examples:

- npm run generate --prefix workers/article-worker
- cd apps/web
- npm run build

Include commit message examples.

## File 6: docs/editorial/codex-article-instructions.md

Create Codex-specific article instructions.

It should include:

- Purpose
- Requirement to follow AGENTS.md approval flow
- Article creation rules
- Required article format
- Writing style
- Things to avoid
- Preferred article topics
- Internal link rules
- Verification rules

Important rules:

- Before creating or editing article files, Codex must present an implementation plan in Japanese and wait for explicit approval.
- Check existing articles first.
- Avoid duplicate topics.
- Use the existing Markdown frontmatter format.
- Use one primary category.
- Use 3 to 5 tags.
- Add practical explanations.
- Add internal links when possible.
- Do not publish low-quality filler content.

Required article format:

- 結論
- 対象読者
- 前提
- 基本構成
- 実装手順 or 運用の考え方
- よくある失敗
- 改善ポイント
- 関連記事
- まとめ

Writing style:

- Japanese
- Clear
- Practical
- Developer-friendly
- Beginner-accessible
- Not exaggerated
- Not overly promotional

## AGENTS.md update

Append a new section to AGENTS.md.

Section title:

## Editorial operation documents

Content:

When creating, editing, or expanding articles, refer to the following documents:

- docs/editorial/article-operation-rules.md
- docs/editorial/article-quality-checklist.md
- docs/editorial/category-policy.md
- docs/editorial/internal-link-policy.md
- docs/editorial/publishing-flow.md
- docs/editorial/codex-article-instructions.md

Article drafts should follow these editorial rules.

Do not publish or merge AI-generated article drafts without review.

## Constraints

- Do not create new articles.
- Do not modify existing article content.
- Do not change routes.
- Do not modify UI.
- Do not add dependencies.
- Do not add SaaS, login, payment, or dashboard features.
- Keep the documentation clear and maintainable.
- Use English for document headings and operational rules where practical.
- Japanese article format labels may remain Japanese where they directly refer to article sections.

## Verification

After creating the files:

- Confirm all files exist.
- Show a brief summary of each created file.
- Show the AGENTS.md section that was appended.
- Do not run npm build unless code files are changed.

## Expected final summary

After implementation, summarize in Japanese:

- Files created
- AGENTS.md update
- What rules were added
- Whether any code files were changed
- Suggested next step
