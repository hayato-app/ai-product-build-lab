import Link from "next/link";
import { PageHero } from "@/components/site/PageHero";
import { SiteShell } from "@/components/site/SiteShell";
import { getAllCategories, getArticlesByCategory } from "@/lib/articles";

export const metadata = {
  title: "カテゴリ一覧 | AIプロダクト構築ラボ",
  description:
    "AIプロダクト構築ラボの記事カテゴリ一覧です。AIアプリ、RAG、AIエージェント、運用などのテーマ別に記事を探せます。",
};

export default function CategoriesPage() {
  const categories = getAllCategories();

  return (
    <SiteShell>
      <PageHero
        eyebrow="Categories"
        title="カテゴリ一覧"
        description="知りたいテーマから記事を探せます。実装、設計、運用、収益化まで、AI開発の流れに沿って整理しています。"
      />

      <section className="mx-auto grid max-w-7xl gap-5 px-5 py-12 md:grid-cols-2 lg:grid-cols-3 lg:px-8">
        {categories.map((category) => {
          const count = getArticlesByCategory(category).length;

          return (
            <Link
              key={category}
              href={`/categories/${encodeURIComponent(category)}`}
              className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-100"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-lg font-black text-blue-700">
                {count}
              </div>
              <h2 className="text-xl font-black text-slate-950 group-hover:text-blue-700">
                {category}
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                {count} 本の記事を掲載しています。
              </p>
            </Link>
          );
        })}
      </section>
    </SiteShell>
  );
}
