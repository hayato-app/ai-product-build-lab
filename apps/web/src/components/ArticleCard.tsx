import Link from "next/link";
import type { ArticleMeta } from "@/lib/articles";

type Props = {
  article: ArticleMeta;
};

export function ArticleCard({ article }: Props) {
  return (
    <article className="h-full overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-100">
      <ArticleThumbnail article={article} />

      <div className="p-6">
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
      </div>
    </article>
  );
}

function ArticleThumbnail({ article }: Props) {
  if (article.thumbnail) {
    return (
      <Link href={`/articles/${article.slug}`} className="block">
        <img
          src={article.thumbnail}
          alt={`${article.title}のサムネイル`}
          className="aspect-[16/9] w-full object-cover"
          loading="lazy"
        />
      </Link>
    );
  }

  return (
    <Link
      href={`/articles/${article.slug}`}
      className="flex aspect-[16/9] w-full items-center justify-center bg-gradient-to-br from-blue-50 via-white to-slate-100 px-6"
      aria-label={`${article.title}を読む`}
    >
      <div className="grid h-20 w-20 place-items-center rounded-3xl border border-blue-100 bg-white text-sm font-black text-blue-700 shadow-sm">
        {article.category.slice(0, 2)}
      </div>
    </Link>
  );
}
