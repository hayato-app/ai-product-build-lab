import Link from "next/link";
import { ArticleCard } from "@/components/ArticleCard";
import { PageHero } from "@/components/site/PageHero";
import { SiteShell } from "@/components/site/SiteShell";
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
    <SiteShell>
      <PageHero
        eyebrow="Tag"
        title={`#${decodedTag}`}
        description={`${decodedTag} に関連する記事をまとめています。`}
      >
        <Link
          href="/articles"
          className="inline-flex rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 shadow-sm hover:border-blue-200 hover:text-blue-700"
        >
          記事一覧へ
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
