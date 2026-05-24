import { ArticleCard } from "@/components/ArticleCard";
import { getAllArticles } from "@/lib/articles";

export const metadata = {
  title: "記事一覧 | AIプロダクト構築ラボ",
  description:
    "生成AIアプリ、AI SaaS、AIエージェント開発に関する実装ガイド・技術記事一覧です。",
};

export default function ArticlesPage() {
  const articles = getAllArticles();

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-white">
      <section className="mx-auto max-w-5xl">
        <div className="mb-10">
          <p className="mb-3 text-sm font-semibold tracking-[0.3em] text-cyan-400">
            ARTICLES
          </p>
          <h1 className="text-4xl font-bold">記事一覧</h1>
          <p className="mt-4 max-w-2xl text-slate-300">
            AIプロダクト開発に必要な実装ノウハウ、設計パターン、開発手順をまとめています。
          </p>
        </div>

        {articles.length === 0 ? (
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8 text-slate-300">
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
    </main>
  );
}
