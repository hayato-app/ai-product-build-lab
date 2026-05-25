# Task: Redesign homepage as a bright AI development media site

## Goal

Redesign the homepage of AIプロダクト構築ラボ so that it looks like a trustworthy, attractive Japanese media site for AI product development.

The current page is too simple and not visually appealing enough.

The new homepage should make users want to browse articles.

## Scope

Focus on the homepage first.

Primary target:
- apps/web/src/app/page.tsx

Create reusable components as needed under:
- apps/web/src/components/site
- apps/web/src/components/home

Do not redesign all pages yet unless required.

## Required sections

### 1. AnnouncementBar

Add a top blue announcement bar.

Text:
サイトを公開しました！AIプロダクト開発の実践知を、わかりやすく発信していきます。

### 2. Header

Create a clean white header.

Include:
- Site logo placeholder or simple icon
- Site name: AIプロダクト構築ラボ
- Subtitle: AI Product Build Lab
- Navigation:
  - 記事一覧
  - カテゴリ
  - 無料ツール
  - 初めての方へ
  - 運営方針
- Search box style UI on the right:
  - placeholder: 記事を検索...

Search does not need to work yet.

### 3. Hero

Hero headline:
AIプロダクト開発を、
実装ベースで学ぶ。

Hero description:
アイデアを、動くプロダクトに。
AIプロダクトの企画・開発・運用まで、実践的なノウハウをわかりやすく発信するメディアです。

CTA buttons:
- 最新記事を読む → /articles
- 初めての方へ → /beginner or /about

If /beginner or /about does not exist yet, use href="#" for now or create a simple placeholder page.

Add a right-side abstract AI/product illustration using CSS only:
- Light blue shapes
- Rounded panels
- Simple chart/card shapes
- No external image dependency

### 4. FeaturedArticles

Create a featured articles section.

Use getAllArticles().

Layout:
- One large featured article card on the left
- Three compact article cards on the right

If there are not enough articles, handle gracefully.

### 5. Home content grid

Create a 3-column section:
- Popular categories
- Latest articles
- Free tools

### 6. PopularCategories

Show category cards or tiles.

Use getAllCategories() if available.

Preferred labels:
- AIアプリ開発
- AIプロダクト開発
- OpenAI API
- RAG
- Next.js AI開発
- AI運用・改善

If actual categories differ, use actual categories.

### 7. LatestArticles

Show recent articles as a compact list.

Include:
- Category
- Title
- Date
- Link

### 8. FreeToolsPanel

Highlight:
AI API Cost Estimator

Description:
入力トークン数・出力トークン数・実行回数から、AI APIの月額コストを概算できます。

Link:
/tools/ai-api-cost-estimator

### 9. Newsletter

Add a newsletter-style UI.

It does not need to submit.

Include:
- Email input placeholder: メールアドレスを入力
- Button: 登録する（無料）

### 10. Footer

Add a simple footer with:
- Site name
- Short description
- Links to articles, categories, and tools

## Design direction

Use a bright editorial media style.

Colors:
- Background: #F8FAFC / #FFFFFF
- Text: #0F172A
- Secondary text: #64748B
- Accent blue: #2563EB
- Light blue background: #EFF6FF
- Border: #E2E8F0

UI style:
- Rounded cards
- Thin borders
- Soft shadows
- Clean typography
- Good spacing
- Article-first layout

Avoid:
- Dark neon theme
- Heavy animations
- SaaS dashboard look
- Login/payment/dashboard features

## Constraints

- Do not remove existing articles.
- Do not break existing routes.
- Do not change the article Markdown schema.
- Do not add external images.
- Do not add unnecessary dependencies.
- Keep code maintainable and componentized.
- Use Japanese UI copy.
- Run npm run build if possible.

## Expected output

After implementation, summarize:
- Files changed
- Components added
- Build result
- Any follow-up recommendations
