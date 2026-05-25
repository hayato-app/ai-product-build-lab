import type { ArticleMeta, ArticleOutline, SeedTopic } from "./article-schema";
import { findRelatedArticles } from "./internal-links";
import { slugify, uniqueSlug } from "./utils";

export function generateOutlines(
  topics: SeedTopic[],
  existingContent: ArticleMeta[],
  linkableArticles: ArticleMeta[],
  existingSlugs: Set<string>,
  count: number,
): ArticleOutline[] {
  return selectTopics(topics, existingContent, count).map((topic) => {
    const baseSlug = slugify(topic.id);
    const slug = uniqueSlug(baseSlug, existingSlugs);

    return {
      ...topic,
      slug,
      relatedArticles: findRelatedArticles(topic, linkableArticles),
    };
  });
}

function selectTopics(
  topics: SeedTopic[],
  existingArticles: ArticleMeta[],
  count: number,
): SeedTopic[] {
  const existingText = existingArticles
    .map((article) => `${article.title} ${article.description}`)
    .join("\n");

  const scoredTopics = topics
    .map((topic, index) => ({
      topic,
      index,
      score: scoreTopicNovelty(topic, existingText),
    }))
    .sort((a, b) => b.score - a.score || a.index - b.index);

  return scoredTopics.slice(0, count).map(({ topic }) => topic);
}

function scoreTopicNovelty(topic: SeedTopic, existingText: string): number {
  let score = 10;

  for (const tag of topic.tags) {
    if (existingText.includes(tag)) {
      score -= 1;
    }
  }

  for (const keyword of topic.title.split(/[ 　、。・/／]+/)) {
    if (keyword.length >= 3 && existingText.includes(keyword)) {
      score -= 1;
    }
  }

  return score;
}
