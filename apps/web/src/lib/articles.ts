import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import gfm from "remark-gfm";
import html from "remark-html";
import readingTime from "reading-time";

const articlesDirectory = path.join(process.cwd(), "src/content/articles");

export type ArticleMeta = {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
  tags: string[];
  category: string;
  readingTime: string;
};

export type Article = ArticleMeta & {
  contentHtml: string;
};

export function getAllArticleSlugs(): string[] {
  if (!fs.existsSync(articlesDirectory)) {
    return [];
  }

  return fs
    .readdirSync(articlesDirectory)
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => fileName.replace(/\.md$/, ""));
}

export function getAllArticles(): ArticleMeta[] {
  const slugs = getAllArticleSlugs();

  const articles = slugs.map((slug) => {
    const fullPath = path.join(articlesDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      slug,
      title: data.title ?? "",
      description: data.description ?? "",
      publishedAt: data.publishedAt ?? "",
      updatedAt: data.updatedAt ?? "",
      tags: data.tags ?? [],
      category: data.category ?? "未分類",
      readingTime: readingTime(content).text,
    };
  });

  return articles.sort((a, b) => {
    return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
  });
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const fullPath = path.join(articlesDirectory, `${slug}.md`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const processedContent = await remark().use(gfm).use(html).process(content);
  const contentHtml = processedContent.toString();

  return {
    slug,
    title: data.title ?? "",
    description: data.description ?? "",
    publishedAt: data.publishedAt ?? "",
    updatedAt: data.updatedAt ?? "",
    tags: data.tags ?? [],
    category: data.category ?? "未分類",
    readingTime: readingTime(content).text,
    contentHtml,
  };
}

export function getAllTags(): string[] {
  const articles = getAllArticles();
  const tags = articles.flatMap((article) => article.tags);
  return Array.from(new Set(tags)).sort();
}

export function getArticlesByTag(tag: string): ArticleMeta[] {
  return getAllArticles().filter((article) => article.tags.includes(tag));
}

export function getAllCategories(): string[] {
  const articles = getAllArticles();
  const categories = articles.map((article) => article.category);
  return Array.from(new Set(categories)).sort();
}

export function getArticlesByCategory(category: string): ArticleMeta[] {
  return getAllArticles().filter((article) => article.category === category);
}
