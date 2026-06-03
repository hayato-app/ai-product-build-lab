# Article Brief: AIアプリ開発でよく出るAPI Routeとは

This brief was generated from an approved article candidate.
It is not an article draft and should not be published directly.

## Source

- GitHub Issue: https://github.com/hayato-app/ai-product-build-lab/issues/12
- Issue source command: `/article-candidate-select`
- Source candidate file: docs/article-candidates/2026-06-02.md
- Candidate number: 2

## Candidate Summary

- Title: AIアプリ開発でよく出るAPI Routeとは
- Proposed slug: ai-app-api-route-basics
- Pillar: 開発初心者向けツール紹介/用語解説
- Category: システム開発用語解説
- Target reader: Next.jsでAIアプリを作り始めた初心者
- Search intent: API RouteやRoute HandlerがAIアプリで何を担当するのか知りたい
- Reader problem: 画面から直接AI APIを呼んでよいのか、サーバー側処理が必要なのか分からない
- Proposed angle: 画面、API Route、AI APIの役割分担を図解し、APIキー保護と入力チェックの理由を説明する
- Existing overlap: Next.jsでAIアプリを作る基本構成：画面・API・AI API・ログの役割 (nextjs-ai-app-basic-architecture); Next.jsでAI APIを呼ぶ時のよくあるミス (app-nextjs-ai-api-common-mistakes); OpenAI APIを使ったAIアプリ開発の始め方 (openai-api-first-setup)
- Difference from existing content: Beginner-focused terminology explanation for API Route / Route Handler, with practical AI app context.
- Internal link candidates: /articles/nextjs-ai-app-basic-architecture, /articles/openai-api-first-setup
- Thumbnail idea: ブラウザ、API Route、AI APIクラウドの3段構成の図
- Fact check: not_required
- Priority: high
- Draft recommendation: Recommended for the next draft batch after user approval.

## Duplication Check

- Published articles checked: `apps/web/src/content/articles`
- Existing drafts checked: `docs/article-drafts`
- Existing briefs checked: `docs/article-briefs`
- Published article status: not published as of this brief creation.
- Existing draft status: no draft with the proposed slug existed before this work.
- Overlap decision: keep this article focused on the term and role of API Route / Route Handler. Existing architecture and mistake articles can be used as related next reads.

## Review Handoff

- Review target: `docs/article-drafts/ai-app-api-route-basics.md`
- Review page status: `needs_review`
- Review result: `pending`
- Fact check status: `completed`
- Next action: review the draft in the admin draft review page, then mark it OK, request changes, or reject it.
- Publishing rule: even if the draft is marked OK, publication requires a separate human decision through the publishing flow.

## Draft Creation Notes

- Create the article as a draft under `docs/article-drafts` only after explicit user approval.
- Keep the proposed slug stable unless the user approves a better slug.
- Add `description` to the draft frontmatter.
- Add `thumbnail` to the draft frontmatter by default.
- Store the thumbnail under `apps/web/public/images/drafts`.
- Insert the same thumbnail near the beginning of the draft body with useful alt text.
- Include a role comparison table, a simple request flow, a short Route Handler example, and a checklist.
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

This brief is approved planning material only. Before publishing this draft,
Codex must follow the publishing flow and wait for explicit user approval.
