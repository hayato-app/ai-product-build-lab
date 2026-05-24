import type { MetadataRoute } from "next";
import { getAllArticles, getAllTags, getAllCategories } from "@/lib/articles";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const articles = getAllArticles();
  const tags = getAllTags();
  const categories = getAllCategories();

  const staticRoutes = ["", "/articles", "/tools", "/categories"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }));

  const articleRoutes = articles.map((article) => ({
    url: `${baseUrl}/articles/${article.slug}`,
    lastModified: new Date(article.updatedAt || article.publishedAt),
  }));

  const tagRoutes = tags.map((tag) => ({
    url: `${baseUrl}/tags/${encodeURIComponent(tag)}`,
    lastModified: new Date(),
  }));

  const categoryRoutes = categories.map((category) => ({
    url: `${baseUrl}/categories/${encodeURIComponent(category)}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...articleRoutes, ...tagRoutes, ...categoryRoutes];
}
