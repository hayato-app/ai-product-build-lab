import { ArticleCard } from "@/components/ArticleCard";
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
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-white">
      <section className="mx-auto max-w-5xl">
        <p className="mb-3 text-sm font-semibold tracking-[0.3em] text-cyan-400">
          CATEGORY
        </p>
        <h1 className="mb-10 text-4xl font-bold">{decodedCategory}</h1>

        <div className="grid gap-6 md:grid-cols-2">
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </section>
    </main>
  );
}
