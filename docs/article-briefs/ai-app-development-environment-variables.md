# Article Brief: AIアプリ開発で使う環境変数とは

This brief was generated from an approved article candidate.
It is not an article draft and should not be published directly.

## Source

- GitHub Issue: https://github.com/hayato-app/ai-product-build-lab/issues/11
- Issue source command: `/article-candidate-select`
- Source candidate file: docs/article-candidates/2026-06-02.md
- Candidate number: 1

## Candidate Summary

- Title: AIアプリ開発で使う環境変数とは
- Proposed slug: ai-app-development-environment-variables
- Pillar: 開発初心者向けツール紹介/用語解説
- Category: システム開発用語解説
- Target reader: AIアプリ開発を始めたばかりで、APIキーの管理に不安がある人
- Search intent: 環境変数とは何か、AI APIキーをなぜコードに直接書かないのかを理解したい
- Reader problem: APIキー、.env、本番環境の設定の関係が分からず、秘密情報を安全に扱えるか不安
- Proposed angle: OpenAI APIキーを例に、ローカル開発、本番環境、GitHub管理で何を避けるべきかを説明する
- Existing overlap: Next.jsでAI APIを呼ぶ時のよくあるミス (app-nextjs-ai-api-common-mistakes); AI開発初心者が最初に覚えたい基本用語 (beginner-ai-development-terms); Next.jsでAIアプリを作る基本構成：画面・API・AI API・ログの役割 (nextjs-ai-app-basic-architecture)
- Difference from existing content: Beginner-focused terminology explanation with practical AI app context.
- Internal link candidates: /articles/openai-api-first-setup, /articles/nextjs-ai-app-basic-architecture
- Thumbnail idea: 鍵アイコン、.envファイル、サーバー、AI APIがつながる明るい図
- Fact check: not_required
- Priority: high
- Draft recommendation: Recommended for the next draft batch after user approval.

## Duplication Check

- Published articles checked: `apps/web/src/content/articles`
- Existing drafts checked: `docs/article-drafts`
- Existing briefs checked: `docs/article-briefs`
- Published article status: not published as of this brief update.
- Existing draft status: `docs/article-drafts/ai-app-development-environment-variables.md` already exists.
- Overlap decision: keep this as a focused beginner terminology article about environment variables and AI API key handling. It supports, but does not replace, the broader Next.js architecture and beginner terminology articles.

## Current Workflow Status

- Candidate selection Issue has been read.
- Article brief exists and is aligned with the Issue content.
- Draft article already exists as review-only content.
- Thumbnail already exists for the draft.
- Publication has not been approved by this brief.

## Draft Creation Notes

- Create the article as a draft under `docs/article-drafts` only after explicit user approval.
- Keep the proposed slug stable unless the user approves a better slug.
- Add `description` to the draft frontmatter.
- Add `thumbnail` to the draft frontmatter by default.
- Store the thumbnail under `apps/web/public/images/drafts`.
- Insert the same thumbnail near the beginning of the draft body with useful alt text.
- Include tables, diagrams, checklists, or command examples when useful.
- Keep existing published articles, drafts, routes, and Markdown structure intact.
- Do not publish the draft automatically.

## Required Reading Before Draft Creation

- `AGENTS.md`
- `docs/project-brief.md`
- `docs/editorial/article-operation-rules.md`
- `docs/editorial/article-quality-checklist.md`
- `docs/editorial/category-policy.md`
- `docs/editorial/internal-link-policy.md`
- `docs/editorial/codex-article-instructions.md`
- `docs/operations/article-candidate-flow.md`
- `docs/operations/ai-article-pr-workflow.md`

## Approval Boundary

This brief is approved planning material only. Before creating or editing a
draft article, Codex must present a Japanese implementation plan and wait for
explicit user approval.

## Original Candidate Block

```md
## Candidate 1

- Title: AIアプリ開発で使う環境変数とは
- Pillar: 開発初心者向けツール紹介/用語解説
- Category: システム開発用語解説
- Target reader: AIアプリ開発を始めたばかりで、APIキーの管理に不安がある人
- Search intent: 環境変数とは何か、AI APIキーをなぜコードに直接書かないのかを理解したい
- Reader problem: APIキー、.env、本番環境の設定の関係が分からず、秘密情報を安全に扱えるか不安
- Proposed angle: OpenAI APIキーを例に、ローカル開発、本番環境、GitHub管理で何を避けるべきかを説明する
- Existing overlap: Next.jsでAI APIを呼ぶ時のよくあるミス (app-nextjs-ai-api-common-mistakes); AI開発初心者が最初に覚えたい基本用語 (beginner-ai-development-terms); Next.jsでAIアプリを作る基本構成：画面・API・AI API・ログの役割 (nextjs-ai-app-basic-architecture)
- Difference from existing content: Beginner-focused terminology explanation with practical AI app context.
- Internal link candidates: /articles/openai-api-first-setup, /articles/nextjs-ai-app-basic-architecture
- Thumbnail idea: 鍵アイコン、.envファイル、サーバー、AI APIがつながる明るい図
- Fact check: not_required
- Priority: high
- Draft recommendation: Recommended for the next draft batch after user approval.
```
