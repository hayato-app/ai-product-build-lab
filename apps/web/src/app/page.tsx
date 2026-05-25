import Link from "next/link";
import { ArticleCard } from "@/components/ArticleCard";
import { getAllArticles, getAllCategories } from "@/lib/articles";

export default function Home() {
  const articles = getAllArticles().slice(0, 3);
  const categories = getAllCategories().slice(0, 8);

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-6 py-20 text-center">
        <p className="mb-4 text-sm font-semibold tracking-[0.3em] text-cyan-400">
          AI PRODUCT BUILD LAB
        </p>

        <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-6xl">
          AIプロダクト構築ラボ
        </h1>

        <p className="mb-8 max-w-2xl text-lg leading-8 text-slate-300">
          生成AIアプリ、AI SaaS、AIエージェントを構築するための実装ガイド・開発ノウハウ・無料ツールを提供する開発者向けメディアです。
        </p>

        <div className="mb-14 flex flex-wrap justify-center gap-4">
          <Link
            href="/articles"
            className="rounded-full bg-cyan-400 px-6 py-3 text-sm font-bold text-slate-950 hover:bg-cyan-300"
          >
            記事を見る
          </Link>
          <Link
            href="/tools/ai-api-cost-estimator"
            className="rounded-full border border-slate-700 px-6 py-3 text-sm font-bold text-white hover:border-cyan-400 hover:text-cyan-300"
          >
            AI APIコストを計算する
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <h2 className="mb-2 font-semibold">AIアプリ開発</h2>
            <p className="text-sm text-slate-400">
              OpenAI API、RAG、AI Agentの実装手順を解説します。
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <h2 className="mb-2 font-semibold">無料ツール</h2>
            <p className="text-sm text-slate-400">
              AI APIコスト計算など、開発に使える小さなWebツールを公開します。
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <h2 className="mb-2 font-semibold">SaaS構築</h2>
            <p className="text-sm text-slate-400">
              小さなAIプロダクトを収益化する流れを検証します。
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-20">
        <div className="mb-8 rounded-2xl border border-cyan-500/30 bg-cyan-950/20 p-8">
          <p className="mb-3 text-sm font-semibold tracking-[0.3em] text-cyan-400">
            FEATURED TOOL
          </p>
          <h2 className="mb-4 text-3xl font-bold">AI API Cost Estimator</h2>
          <p className="mb-6 max-w-2xl text-slate-300">
            AI APIの入力トークン数・出力トークン数・実行回数から、月間運用コストを概算できます。
            AI SaaSを作る前の費用見積もりに使えます。
          </p>
          <Link
            href="/tools/ai-api-cost-estimator"
            className="inline-flex rounded-full bg-cyan-400 px-6 py-3 text-sm font-bold text-slate-950 hover:bg-cyan-300"
          >
            無料で計算する
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-20">
        <div className="mb-8">
          <p className="mb-3 text-sm font-semibold tracking-[0.3em] text-cyan-400">
            CATEGORIES
          </p>
          <h2 className="mb-6 text-3xl font-bold">カテゴリから探す</h2>

          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <Link
                key={category}
                href={`/categories/${encodeURIComponent(category)}`}
                className="rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-300 hover:border-cyan-500 hover:text-cyan-300"
              >
                {category}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-20">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="mb-3 text-sm font-semibold tracking-[0.3em] text-cyan-400">
              LATEST ARTICLES
            </p>
            <h2 className="text-3xl font-bold">最新記事</h2>
          </div>

          <Link href="/articles" className="text-sm text-cyan-400 hover:text-cyan-300">
            すべて見る →
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </section>
    </main>
  );
}
