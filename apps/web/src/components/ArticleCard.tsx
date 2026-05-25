import Link from "next/link";
import type { ArticleMeta } from "@/lib/articles";

type Props = {
  article: ArticleMeta;
};

export function ArticleCard({ article }: Props) {
  return (
    <article className="h-full rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-100">
      <div className="mb-3 flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-500">
        <Link
          href={`/categories/${encodeURIComponent(article.category)}`}
          className="text-blue-700 hover:text-blue-900"
        >
          {article.category}
        </Link>
        <span>・</span>
        <time dateTime={article.publishedAt}>{article.publishedAt}</time>
        <span>・</span>
        <span>{article.readingTime}</span>
      </div>

      <h2 className="mb-3 text-xl font-black leading-8 text-slate-950">
        <Link href={`/articles/${article.slug}`} className="hover:text-blue-700">
          {article.title}
        </Link>
      </h2>

      <p className="mb-5 line-clamp-3 text-sm leading-7 text-slate-600">
        {article.description}
      </p>

      <div className="flex flex-wrap gap-2">
        {article.tags.map((tag) => (
          <Link
            key={tag}
            href={`/tags/${encodeURIComponent(tag)}`}
            className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
          >
            #{tag}
          </Link>
        ))}
      </div>
    </article>
  );
}
