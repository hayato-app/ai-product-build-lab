# Phase 12-B: Connect AI API to Article Worker

## Goal

Connect the existing article generation worker to an AI API so that AIプロダクト構築ラボ / AI Product Build Lab can generate higher-quality Japanese article drafts.

This task should extend the existing article-worker.

The goal is NOT automatic publishing.

AI-generated articles must remain drafts and require human review before publishing.

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
2. Expand article drafts safely
3. Keep editorial review before publishing
4. Avoid duplicate or thin AI-generated content
5. Use AI API only for draft generation, not automatic publishing

## Important instruction

Before editing files, follow the approval flow in AGENTS.md.

First, present an implementation plan in Japanese.

Do not create or edit files until the user explicitly approves the plan.

## Required reference documents

Before implementation, read:

- AGENTS.md
- docs/project-brief.md
- docs/editorial/article-operation-rules.md
- docs/editorial/article-quality-checklist.md
- docs/editorial/category-policy.md
- docs/editorial/internal-link-policy.md
- docs/editorial/publishing-flow.md
- docs/editorial/codex-article-instructions.md

If any editorial document is missing, report it before editing files.

## Target directory

Primary target:

- workers/article-worker

Generated article output:

- apps/web/src/content/articles

Existing article source:

- apps/web/src/content/articles/*.md

## Current assumption

An article-worker already exists or is planned under:

- workers/article-worker

If it does not exist, report the current state before implementation.

Do not create a completely unrelated worker structure.

Build on the current worker if possible.

## Required features

### 1. Add AI provider layer

Add a provider module for AI text generation.

Suggested file:

- workers/article-worker/src/ai-provider.ts

The provider should:

- Use the OpenAI API
- Read API key from environment variable
- Never hardcode API keys
- Fail with a clear error message if API key is missing
- Return generated text as a string
- Keep model name configurable

Environment variables:

- OPENAI_API_KEY
- ARTICLE_WORKER_MODEL

Default model should be configurable in code.

Use a reasonable default model name, but keep it easy to change.

### 2. Add environment example file

Create:

- workers/article-worker/.env.example

Include:

OPENAI_API_KEY=
ARTICLE_WORKER_MODEL=

Do not create a real .env file with secrets.

Do not commit any API key.

### 3. Add AI draft generation command

Add or update worker commands so that the worker supports:

- npm run generate
- npm run generate:ai
- npm run dry-run

Expected behavior:

#### npm run dry-run

- Does not call AI API
- Does not write files
- Shows selected topic, planned slug, category, tags, and related internal link candidates

#### npm run generate

- Existing deterministic/template generation should continue to work if already implemented
- Does not require AI API

#### npm run generate:ai

- Calls AI API
- Generates one Markdown draft article
- Saves it to apps/web/src/content/articles
- Does not overwrite existing files
- Adds unique slug suffix if needed
- Adds frontmatter compatible with the existing article schema
- Adds internal link suggestions where possible
- Adds a related articles section
- Clearly marks generated content as requiring review if appropriate

### 4. Add safe prompt structure

Create prompt construction logic.

Suggested file:

- workers/article-worker/src/prompts.ts

The prompt should instruct the AI to write in Japanese.

The generated article should follow this structure:

- 結論
- 対象読者
- 前提
- 基本構成
- 実装手順 or 運用の考え方
- よくある失敗
- 改善ポイント
- 関連記事
- まとめ

The prompt must include:

- Site name: AIプロダクト構築ラボ
- Site purpose
- Target topic
- Target category
- Target tags
- Existing article titles or slugs to avoid duplication
- Related internal link candidates
- Editorial requirements from docs/editorial

The prompt must explicitly prohibit:

- Fabricated statistics
- Unsupported claims
- Medical/legal/financial advice
- Automatic publishing
- Excessive promotional language
- Changing site routes
- Creating fake external citations

### 5. Add output validation

Before writing a generated article, validate:

- Frontmatter exists
- title exists
- description exists
- publishedAt exists
- updatedAt exists
- category exists
- tags exist
- Body is not too short
- Slug is unique
- Markdown appears non-empty

Suggested file:

- workers/article-worker/src/validate-article.ts

If validation fails, do not write the file.

Print a clear error message.

### 6. Preserve existing safety behavior

The worker must:

- Never overwrite existing articles
- Never delete articles
- Never rename existing slugs
- Never automatically publish without review
- Generate only one AI article per command by default
- Support an explicit count option only if it already exists or is easy to implement safely
- Cap generated count to a safe maximum such as 3

### 7. Improve logging

Add clear console output:

- Selected topic
- Selected category
- Generated slug
- Related internal link candidates
- Output file path
- Whether AI API was called
- Whether file was written
- Validation result

### 8. Update package.json

Update workers/article-worker/package.json if needed.

Potential dependency:

- openai

Add scripts such as:

- "dry-run"
- "generate"
- "generate:ai"

Do not add unnecessary dependencies.

### 9. Add README for worker usage

Create or update:

- workers/article-worker/README.md

Include:

- Purpose of the worker
- Setup instructions
- Environment variables
- Commands
- Safety rules
- Example workflow
- Reminder that generated articles require review

Include example:

cp .env.example .env
# then set OPENAI_API_KEY

npm install
npm run dry-run
npm run generate:ai

## Constraints

- Do not create new public routes.
- Do not modify site UI.
- Do not modify existing article content unless necessary.
- Do not create more than one generated article during implementation unless explicitly approved.
- Do not commit .env or secrets.
- Do not hardcode API keys.
- Do not add SaaS, login, payment, or dashboard features.
- Do not automatically publish AI-generated content.
- Do not bypass editorial rules.
- Keep changes small and reviewable.

## Implementation plan requirement

Before editing files, present a Japanese implementation plan including:

- 作業の目的
- このファイルで使用する言語
- マイルストーン
- 具体的な変更予定
- 懸念事項または確認事項
- 変更対象ファイル一覧

Wait for explicit approval before implementation.

## Verification

After implementation, run if possible:

From worker directory:

npm install
npm run dry-run

If OPENAI_API_KEY is available:

npm run generate:ai

If OPENAI_API_KEY is not available:

- Do not fake a successful API call
- Report that AI generation was not executed due to missing API key
- Confirm dry-run works

From app directory:

cd apps/web
npm run build

## Expected final summary

After implementation, summarize in Japanese:

- Files changed
- Dependencies added
- New commands
- How API key is configured
- Whether dry-run succeeded
- Whether AI generation was executed
- Whether any article file was generated
- Validation behavior
- Build result
- Recommended next step
