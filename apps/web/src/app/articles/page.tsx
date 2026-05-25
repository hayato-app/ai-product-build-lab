import Link from "next/link";
import { ArticleCard } from "@/components/ArticleCard";
import { PageHero } from "@/components/site/PageHero";
import { SiteShell } from "@/components/site/SiteShell";
import { getAllArticles, getAllCategories } from "@/lib/articles";

export const metadata = {
  title: "記事一覧 | AIプロダクト構築ラボ",
  description:
    "AIアプリ、OpenAI API、RAG、AIエージェント、Next.js開発に関する実践記事の一覧です。",
};

export default function ArticlesPage() {
  const articles = getAllArticles();
  const categories = getAllCategories();

  return (
    <SiteShell>
      <PageHero
        eyebrow="Articles"
        title="記事一覧"
        description="AIプロダクト開発に必要な実装ノウハウ、設計パターン、運用改善の考え方をまとめています。"
      >
        <div className="rounded-3xl border border-blue-100 bg-white p-5 shadow-sm">
          <p className="text-sm font-bold text-slate-950">{articles.length} 本の記事</p>
          <p className="mt-1 text-sm text-slate-500">新しい順に表示しています。</p>
        </div>
      </PageHero>

      <section className="mx-auto grid max-w-7xl gap-8 px-5 py-12 lg:grid-cols-[240px_1fr] lg:px-8">
        <aside className="h-fit rounded-3xl border border-slate-200 bg-slate-50 p-5">
          <p className="text-sm font-black text-slate-950">カテゴリから探す</p>
          <div className="mt-4 flex flex-wrap gap-2 lg:flex-col">
            {categories.map((category) => (
              <Link
                key={category}
                href={`/categories/${encodeURIComponent(category)}`}
                className="rounded-full border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-600 hover:border-blue-200 hover:text-blue-700 lg:rounded-2xl"
              >
                {category}
              </Link>
            ))}
          </div>
        </aside>

        {articles.length === 0 ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-8 text-slate-600">
            まだ記事がありません。
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {articles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        )}
      </section>
    </SiteShell>
  );
}
