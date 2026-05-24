import Link from "next/link";
import type { ArticleMeta } from "@/lib/articles";

type Props = {
  article: ArticleMeta;
};

export function ArticleCard({ article }: Props) {
  return (
    <article className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:border-cyan-500/60">
      <div className="mb-3 flex flex-wrap items-center gap-2 text-xs text-slate-400">
        <Link
          href={`/categories/${encodeURIComponent(article.category)}`}
          className="hover:text-cyan-300"
        >
          {article.category}
        </Link>
        <span>•</span>
        <time dateTime={article.publishedAt}>{article.publishedAt}</time>
        <span>•</span>
        <span>{article.readingTime}</span>
      </div>

      <h2 className="mb-3 text-xl font-bold text-white">
        <Link href={`/articles/${article.slug}`} className="hover:text-cyan-400">
          {article.title}
        </Link>
      </h2>

      <p className="mb-4 line-clamp-3 text-sm leading-6 text-slate-300">
        {article.description}
      </p>

      <div className="flex flex-wrap gap-2">
        {article.tags.map((tag) => (
          <Link
            key={tag}
            href={`/tags/${encodeURIComponent(tag)}`}
            className="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-300 hover:border-cyan-500 hover:text-cyan-300"
          >
            #{tag}
          </Link>
        ))}
      </div>
    </article>
  );
}
