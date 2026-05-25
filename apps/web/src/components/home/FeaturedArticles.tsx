import Link from "next/link";
import type { ArticleMeta } from "@/lib/articles";

type Props = {
  articles: ArticleMeta[];
};

export function FeaturedArticles({ articles }: Props) {
  const [featured, ...compactArticles] = articles.slice(0, 4);

  if (!featured) {
    return null;
  }

  return (
    <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
            Featured Articles
          </p>
          <h2 className="mt-2 text-3xl font-black text-slate-950">注目の記事</h2>
        </div>
        <Link href="/articles" className="text-sm font-bold text-blue-700 hover:text-blue-900">
          すべての記事を見る
        </Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <ArticleFeatureCard article={featured} />
        <div className="grid gap-4">
          {compactArticles.map((article) => (
            <CompactArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ArticleFeatureCard({ article }: { article: ArticleMeta }) {
  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-100">
      <Link
        href={`/categories/${encodeURIComponent(article.category)}`}
        className="mb-5 inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700"
      >
        {article.category}
      </Link>
      <h3 className="text-2xl font-black leading-snug text-slate-950 sm:text-3xl">
        <Link href={`/articles/${article.slug}`} className="hover:text-blue-700">
          {article.title}
        </Link>
      </h3>
      <p className="mt-4 line-clamp-3 text-sm leading-7 text-slate-600 sm:text-base">
        {article.description}
      </p>
      <div className="mt-7 flex flex-wrap items-center gap-3 text-xs font-semibold text-slate-500">
        <time dateTime={article.publishedAt}>{article.publishedAt}</time>
        <span>・</span>
        <span>{article.readingTime}</span>
      </div>
    </article>
  );
}

function CompactArticleCard({ article }: { article: ArticleMeta }) {
  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-blue-200 hover:shadow-md hover:shadow-blue-100">
      <div className="mb-3 flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-500">
        <Link href={`/categories/${encodeURIComponent(article.category)}`} className="text-blue-700 hover:text-blue-900">
          {article.category}
        </Link>
        <span>・</span>
        <time dateTime={article.publishedAt}>{article.publishedAt}</time>
      </div>
      <h3 className="text-base font-black leading-7 text-slate-950">
        <Link href={`/articles/${article.slug}`} className="hover:text-blue-700">
          {article.title}
        </Link>
      </h3>
      <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">
        {article.description}
      </p>
    </article>
  );
}
