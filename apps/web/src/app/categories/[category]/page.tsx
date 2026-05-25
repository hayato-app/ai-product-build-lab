import Link from "next/link";
import { ArticleCard } from "@/components/ArticleCard";
import { PageHero } from "@/components/site/PageHero";
import { SiteShell } from "@/components/site/SiteShell";
import { getAllCategories, getArticlesByCategory } from "@/lib/articles";

type Props = {
  params: Promise<{
    category: string;
  }>;
};

export async function generateStaticParams() {
  return getAllCategories().map((category) => ({
    category,
  }));
}

export async function generateMetadata({ params }: Props) {
  const { category } = await params;
  const decodedCategory = decodeURIComponent(category);

  return {
    title: `${decodedCategory}の記事一覧 | AIプロダクト構築ラボ`,
    description: `${decodedCategory}に関するAIプロダクト開発記事の一覧です。`,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const decodedCategory = decodeURIComponent(category);
  const articles = getArticlesByCategory(decodedCategory);

  return (
    <SiteShell>
      <PageHero
        eyebrow="Category"
        title={decodedCategory}
        description={`${decodedCategory}に関する実装記事をまとめています。`}
      >
        <Link
          href="/categories"
          className="inline-flex rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 shadow-sm hover:border-blue-200 hover:text-blue-700"
        >
          カテゴリ一覧へ
        </Link>
      </PageHero>

      <section className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
