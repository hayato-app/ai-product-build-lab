import { ArticleCard } from "@/components/ArticleCard";
import { getAllTags, getArticlesByTag } from "@/lib/articles";

type Props = {
  params: Promise<{
    tag: string;
  }>;
};

export async function generateStaticParams() {
  return getAllTags().map((tag) => ({
    tag,
  }));
}

export async function generateMetadata({ params }: Props) {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);

  return {
    title: `#${decodedTag} の記事一覧 | AIプロダクト構築ラボ`,
    description: `${decodedTag} に関するAIプロダクト開発記事の一覧です。`,
  };
}

export default async function TagPage({ params }: Props) {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);
  const articles = getArticlesByTag(decodedTag);

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-white">
      <section className="mx-auto max-w-5xl">
        <p className="mb-3 text-sm font-semibold tracking-[0.3em] text-cyan-400">
          TAG
        </p>
        <h1 className="mb-10 text-4xl font-bold">#{decodedTag}</h1>

        <div className="grid gap-6 md:grid-cols-2">
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </section>
    </main>
  );
}
