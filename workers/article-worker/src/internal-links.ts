import type { ArticleMeta, SeedTopic } from "./article-schema";

export function findRelatedArticles(
  topic: SeedTopic,
  existingArticles: ArticleMeta[],
  limit = 3,
): ArticleMeta[] {
  return existingArticles
    .map((article) => ({
      article,
      score: scoreArticle(topic, article),
    }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ article }) => article);
}

function scoreArticle(topic: SeedTopic, article: ArticleMeta): number {
  let score = 0;

  if (topic.category === article.category) {
    score += 3;
  }

  for (const tag of topic.tags) {
    if (article.tags.includes(tag)) {
      score += 2;
    }
  }

  const titleWords = topic.title.split(/[ 　、。・/／]+/);
  for (const word of titleWords) {
    if (word.length >= 3 && article.title.includes(word)) {
      score += 1;
    }
  }

  return score;
}
