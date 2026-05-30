import fs from "fs";
import path from "path";
import type { ArticleMeta } from "./article-schema";
import { defaultDraftOutputDir, repoRoot } from "./config";
import {
  readExistingArticles,
  readExistingDrafts,
} from "./existing-articles";
import { ensureDirectory, slugify, todayIsoDate } from "./utils";

export type ContentPlanOptions = {
  topic: string;
  outputDir: string;
};

type ScoredArticle = {
  article: ArticleMeta;
  score: number;
  reasons: string[];
  source: "published" | "draft";
};

type CategorySuggestion = {
  category: string;
  score: number;
};

export function createContentPlan(options: ContentPlanOptions): string {
  const topic = options.topic.trim();
  if (!topic) {
    throw new Error("--topic is required");
  }

  const publishedArticles = readExistingArticles();
  const drafts = readExistingDrafts(defaultDraftOutputDir);
  const allArticles = [
    ...publishedArticles.map((article) => ({ article, source: "published" as const })),
    ...drafts.map((article) => ({ article, source: "draft" as const })),
  ];
  const duplicateCandidates = findDuplicateCandidates(topic, allArticles);
  const relatedArticles = findRelatedArticles(topic, publishedArticles);
  const categorySuggestions = suggestCategories(topic, allArticles.map(({ article }) => article));
  const primaryCategory = categorySuggestions[0]?.category || "AI development";
  const titleIdeas = createTitleIdeas(topic);
  const descriptionIdeas = createDescriptionIdeas(topic, primaryCategory);
  const headingIdeas = createHeadingIdeas(topic);
  const qualityScore = scorePlan({
    duplicateCandidates,
    relatedArticles,
    categorySuggestions,
  });

  return buildReport({
    topic,
    slug: slugify(topic),
    duplicateCandidates,
    relatedArticles,
    categorySuggestions,
    titleIdeas,
    descriptionIdeas,
    headingIdeas,
    qualityScore,
  });
}

export function writeContentPlan(options: ContentPlanOptions): string {
  const markdown = createContentPlan(options);
  ensureDirectory(options.outputDir);

  const outputPath = path.join(
    options.outputDir,
    `${todayIsoDate()}-${slugify(options.topic) || "content-plan"}.md`,
  );

  if (fs.existsSync(outputPath)) {
    throw new Error(`Refusing to overwrite existing report: ${outputPath}`);
  }

  fs.writeFileSync(outputPath, markdown, "utf8");
  return outputPath;
}

function tokenize(input: string): string[] {
  return input
    .toLowerCase()
    .split(/[\s,./:;!?()[\]{}"'`|\\縲√ゅ・]+/)
    .map((word) => word.trim())
    .filter((word) => word.length >= 2);
}

function findDuplicateCandidates(
  topic: string,
  articles: Array<{ article: ArticleMeta; source: "published" | "draft" }>,
): ScoredArticle[] {
  const topicTokens = tokenize(topic);

  return articles
    .map(({ article, source }) => {
      const reasons: string[] = [];
      const text = `${article.slug} ${article.title} ${article.description} ${article.category} ${article.tags.join(" ")}`;
      const articleTokens = new Set(tokenize(text));
      let score = 0;

      for (const token of topicTokens) {
        if (articleTokens.has(token)) {
          score += 2;
        }
        if (article.title.toLowerCase().includes(token)) {
          score += 2;
        }
        if (article.slug.toLowerCase().includes(token)) {
          score += 1;
        }
      }

      if (article.title.toLowerCase() === topic.toLowerCase()) {
        score += 10;
        reasons.push("same title");
      }

      if (score >= 6) {
        reasons.push("overlapping topic terms");
      }

      return { article, score, reasons, source };
    })
    .filter((candidate) => candidate.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 8);
}

function findRelatedArticles(topic: string, articles: ArticleMeta[]): ArticleMeta[] {
  const topicTokens = tokenize(topic);

  return articles
    .map((article) => {
      const haystack = `${article.title} ${article.description} ${article.category} ${article.tags.join(" ")}`.toLowerCase();
      const score = topicTokens.reduce(
        (sum, token) => sum + (haystack.includes(token) ? 1 : 0),
        0,
      );
      return { article, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)
    .map(({ article }) => article);
}

function suggestCategories(topic: string, articles: ArticleMeta[]): CategorySuggestion[] {
  const topicTokens = tokenize(topic);
  const scores = new Map<string, number>();

  for (const article of articles) {
    if (!article.category) {
      continue;
    }

    const haystack = `${article.title} ${article.description} ${article.tags.join(" ")}`.toLowerCase();
    const tokenScore = topicTokens.reduce(
      (sum, token) => sum + (haystack.includes(token) ? 1 : 0),
      0,
    );
    scores.set(article.category, (scores.get(article.category) ?? 0) + tokenScore + 1);
  }

  return [...scores.entries()]
    .map(([category, score]) => ({ category, score }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);
}

function createTitleIdeas(topic: string): string[] {
  return [
    `${topic}の基本と実装前に確認すること`,
    `${topic}をAI開発初心者向けに整理する`,
    `${topic}でつまずかないための実践チェックリスト`,
  ];
}

function createDescriptionIdeas(topic: string, category: string): string[] {
  return [
    `${topic}について、${category}の文脈で基礎知識、判断ポイント、実装時の注意点を整理します。`,
    `${topic}で迷いやすいポイントを、AIアプリ開発で実際に使える形で解説します。`,
    `${topic}を理解し、次の設計・実装・改善につなげるための実践的なガイドです。`,
  ];
}

function createHeadingIdeas(topic: string): string[] {
  return [
    "## 結論",
    "## 対象読者",
    `## ${topic}とは`,
    "## なぜAI開発で重要なのか",
    "## 実装・運用で確認するポイント",
    "## よくある失敗",
    "## 改善チェックリスト",
    "## 関連記事",
    "## まとめ",
  ];
}

function scorePlan(input: {
  duplicateCandidates: ScoredArticle[];
  relatedArticles: ArticleMeta[];
  categorySuggestions: CategorySuggestion[];
}): number {
  let score = 70;

  if (input.duplicateCandidates[0]?.score >= 10) {
    score -= 25;
  } else if (input.duplicateCandidates[0]?.score >= 6) {
    score -= 10;
  }

  if (input.relatedArticles.length >= 3) {
    score += 10;
  }

  if (input.categorySuggestions.length > 0) {
    score += 10;
  }

  return Math.max(0, Math.min(100, score));
}

function buildReport(input: {
  topic: string;
  slug: string;
  duplicateCandidates: ScoredArticle[];
  relatedArticles: ArticleMeta[];
  categorySuggestions: CategorySuggestion[];
  titleIdeas: string[];
  descriptionIdeas: string[];
  headingIdeas: string[];
  qualityScore: number;
}): string {
  return `# Article Planning Report

This report is generated by Article Worker and is review-only.

Do not publish this report as an article. Use it to create or refine a draft
after human review.

## Topic

- Topic: ${input.topic}
- Suggested slug: \`${input.slug || "generated-article"}\`
- Generated at: ${todayIsoDate()}
- Repository root: \`${path.relative(repoRoot, repoRoot) || "."}\`

## Quality Planning Score

- Score: ${input.qualityScore}/100

This score is a planning aid, not an approval result.

## Duplicate Risk

${formatDuplicateCandidates(input.duplicateCandidates)}

## Category Suggestions

${formatCategorySuggestions(input.categorySuggestions)}

## Internal Link Suggestions

${formatRelatedArticles(input.relatedArticles)}

## Title Ideas

${input.titleIdeas.map((title) => `- ${title}`).join("\n")}

## Description Ideas

${input.descriptionIdeas.map((description) => `- ${description}`).join("\n")}

## Heading Structure Idea

${input.headingIdeas.map((heading) => `- ${heading}`).join("\n")}

## Pre-Publication Checklist

- [ ] Existing published articles were checked.
- [ ] Existing drafts were checked.
- [ ] The topic has a distinct angle.
- [ ] One primary category was selected.
- [ ] 3 to 5 tags were selected.
- [ ] Internal links were added naturally.
- [ ] Fact-check needs were identified.
- [ ] The draft follows \`docs/editorial/article-quality-checklist.md\`.
- [ ] The draft remains unpublished until human review.

## Suggested Next Step

Create or update a draft under \`docs/article-drafts\` only after approval.
`;
}

function formatDuplicateCandidates(candidates: ScoredArticle[]): string {
  if (candidates.length === 0) {
    return "- No strong duplicate candidates found.";
  }

  return candidates
    .map(
      ({ article, score, source, reasons }) =>
        `- \`${article.slug}\` (${source}, score ${score}): ${article.title}${reasons.length ? ` - ${reasons.join(", ")}` : ""}`,
    )
    .join("\n");
}

function formatCategorySuggestions(suggestions: CategorySuggestion[]): string {
  if (suggestions.length === 0) {
    return "- No category suggestion available. Review `docs/editorial/category-policy.md`.";
  }

  return suggestions
    .map(({ category, score }) => `- ${category} (score ${score})`)
    .join("\n");
}

function formatRelatedArticles(articles: ArticleMeta[]): string {
  if (articles.length === 0) {
    return "- No related published articles found.";
  }

  return articles
    .map((article) => `- [${article.title}](/articles/${article.slug})`)
    .join("\n");
}
