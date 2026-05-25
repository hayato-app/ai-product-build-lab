export type ArticleMeta = {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
  category: string;
  tags: string[];
};

export type SeedTopic = {
  id: string;
  pillar: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  targetReader: string;
  angle: string;
  sections: string[];
};

export type ArticleOutline = SeedTopic & {
  slug: string;
  relatedArticles: ArticleMeta[];
};

export type GenerateOptions = {
  count: number;
  dryRun: boolean;
  outputDir: string;
};
