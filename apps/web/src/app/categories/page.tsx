import Link from "next/link";
import { getAllCategories, getArticlesByCategory } from "@/lib/articles";

export const metadata = {
  title: "カテゴリ一覧 | AIプロダクト構築ラボ",
  description:
    "AIプロダクト構築ラボの記事カテゴリ一覧です。生成AIアプリ、AI SaaS、RAG、AIエージェントなどのテーマ別に記事を探せます。",
};

export default function CategoriesPage() {
  const categories = getAllCategories();

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-white">
      <section className="mx-auto max-w-5xl">
        <p className="mb-3 text-sm font-semibold tracking-[0.3em] text-cyan-400">
          CATEGORIES
        </p>
        <h1 className="mb-6 text-4xl font-bold">カテゴリ一覧</h1>
        <p className="mb-10 max-w-2xl text-slate-300">
          AIプロダクト開発に関する記事をカテゴリ別に探せます。
        </p>

        <div className="grid gap-4 md:grid-cols-2">
          {categories.map((category) => {
            const count = getArticlesByCategory(category).length;

            return (
              <Link
                key={category}
                href={`/categories/${encodeURIComponent(category)}`}
                className="rounded-2xl border border-slate-800 bg-slate-900 p-6 hover:border-cyan-500"
              >
                <h2 className="mb-2 text-xl font-bold">{category}</h2>
                <p className="text-sm text-slate-400">{count}記事</p>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}
