# AGENTS.md

## Project

AIプロダクト構築ラボ / AI Product Build Lab

## Purpose

This is a Japanese media site for AI application and AI product development.

The site focuses on practical articles and tools for:

- AI application development
- AI product development
- OpenAI API
- RAG
- AI agents
- Next.js AI development
- AI API cost estimation
- AI product operation and improvement

## Current priority

For now, SaaS and payment features are postponed.

The current priority is:

1. Improve the site's visual design
2. Improve readability and article discovery
3. Expand articles
4. Build a trustworthy AI development media site
5. Keep free tools as supporting content

## Tech stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Markdown articles
- Docker Compose
- Site source is under apps/web

## Important directories

- apps/web/src/app
- apps/web/src/components
- apps/web/src/content/articles
- apps/web/src/lib/articles.ts
- docs
- docs/seo
- docs/templates

## Rules

- Keep existing routes stable.
- Do not remove existing articles.
- Do not change the Markdown article data structure unless required.
- Do not add SaaS, payment, login, or authentication features unless explicitly requested.
- Do not rely on external images.
- Use CSS gradients, simple shapes, cards, and icons instead of external image assets.
- Use Japanese UI text.
- Prioritize readability, SEO, maintainability, and practical implementation.
- Keep components small and reusable.
- Use a clean light editorial design unless otherwise requested.
- Avoid overly flashy animations.
- Avoid dark neon SaaS landing page style for the main media site.

## Design direction

The preferred design direction is a bright AI development media site.

Use:

- White / slate background
- Blue accents
- Rounded cards
- Thin borders
- Soft shadows
- Clear typography
- Article-first layout
- Good spacing
- Search and category discovery UI

Suggested color direction:

- Background: #F8FAFC / #FFFFFF
- Main text: #0F172A
- Secondary text: #64748B
- Accent blue: #2563EB
- Light blue background: #EFF6FF
- Border: #E2E8F0

## Build and verification

When changing code, check the following when possible:

cd apps/web
npm run build

If build cannot be run, explain why.

## Editorial operation documents

When creating, editing, or expanding articles, refer to the following documents:

- docs/editorial/article-operation-rules.md
- docs/editorial/article-quality-checklist.md
- docs/editorial/category-policy.md
- docs/editorial/internal-link-policy.md
- docs/editorial/publishing-flow.md
- docs/editorial/codex-article-instructions.md
- docs/operations/ai-article-pr-workflow.md

Article drafts should follow these editorial rules.

Do not publish or merge AI-generated article drafts without review.

## GitHub Issue based operations

When working from a GitHub Issue, follow:

- docs/operations/codex-issue-workflow.md
- docs/operations/smartphone-pr-review-flow.md
- docs/operations/smartphone-codex-operation.md

Issues are work requests, not automatic execution commands.
Codex must still follow the Pre-Implementation Approval Flow before creating
files, editing files, or implementing code.

## Done means

A task is done only when:

- The requested UI or feature is implemented
- Existing routes still work
- TypeScript/build errors are avoided
- The change is summarized clearly

## Pre-Implementation Approval Flow

Before starting any implementation work, including code generation, file creation, or file editing, always present an implementation plan in Japanese.

The implementation plan must include the following items:

- Purpose of the work
- Languages or technologies used for the target files
- Milestones
- Specific planned changes
- Concerns or confirmation points

Do not start file operations or code implementation until the user gives explicit approval, such as "承認", "OK", "進めてください", or a similar clear approval.

If the user requests changes to the plan, revise the implementation plan, present the updated version, and wait for approval again before starting any implementation work.
