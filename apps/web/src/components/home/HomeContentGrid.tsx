import Link from "next/link";
import type { ArticleMeta } from "@/lib/articles";

type Props = {
  categories: string[];
  latestArticles: ArticleMeta[];
};

export function HomeContentGrid({ categories, latestArticles }: Props) {
  return (
    <section className="bg-slate-50 py-16">
      <div className="mx-auto grid max-w-7xl gap-6 px-5 lg:grid-cols-3 lg:px-8">
        <PopularCategories categories={categories} />
        <LatestArticles articles={latestArticles} />
        <FreeToolsPanel />
      </div>
    </section>
  );
}

function PopularCategories({ categories }: { categories: string[] }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
        Categories
      </p>
      <h2 className="mt-2 text-2xl font-black text-slate-950">人気カテゴリ</h2>
      <div className="mt-6 grid gap-3">
        {categories.slice(0, 6).map((category) => (
          <Link
            key={category}
            href={`/categories/${encodeURIComponent(category)}`}
            className="group flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
          >
            <span>{category}</span>
            <span className="text-slate-400 group-hover:text-blue-600">→</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

function LatestArticles({ articles }: { articles: ArticleMeta[] }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
        Latest
      </p>
      <h2 className="mt-2 text-2xl font-black text-slate-950">最新記事</h2>
      <div className="mt-6 divide-y divide-slate-100">
        {articles.slice(0, 5).map((article) => (
          <article key={article.slug} className="py-4 first:pt-0 last:pb-0">
            <div className="mb-2 flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-500">
              <span className="text-blue-700">{article.category}</span>
              <span>・</span>
              <time dateTime={article.publishedAt}>{article.publishedAt}</time>
            </div>
            <h3 className="text-sm font-black leading-6 text-slate-950">
              <Link href={`/articles/${article.slug}`} className="hover:text-blue-700">
                {article.title}
              </Link>
            </h3>
          </article>
        ))}
      </div>
    </div>
  );
}

function FreeToolsPanel() {
  return (
    <div className="rounded-3xl border border-blue-100 bg-blue-600 p-6 text-white shadow-lg shadow-blue-100">
      <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-100">
        Free Tools
      </p>
      <h2 className="mt-2 text-2xl font-black">AI API Cost Estimator</h2>
      <p className="mt-4 text-sm leading-7 text-blue-50">
        入力トークン数・出力トークン数・実行回数から、AI APIの月額コストを概算できます。
      </p>
      <div className="mt-6 rounded-3xl bg-white/12 p-4">
        <div className="flex items-center justify-between text-sm font-bold">
          <span>月間利用量</span>
          <span>概算</span>
        </div>
        <div className="mt-4 h-3 rounded-full bg-white/20">
          <div className="h-3 w-2/3 rounded-full bg-white" />
        </div>
      </div>
      <Link
        href="/tools/ai-api-cost-estimator"
        className="mt-6 inline-flex rounded-full bg-white px-5 py-3 text-sm font-black text-blue-700 transition hover:bg-blue-50"
      >
        無料で計算する
      </Link>
    </div>
  );
}
