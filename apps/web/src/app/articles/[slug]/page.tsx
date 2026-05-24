import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllArticleSlugs, getArticleBySlug } from "@/lib/articles";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return getAllArticleSlugs().map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return {
      title: "記事が見つかりません | AIプロダクト構築ラボ",
    };
  }

  return {
    title: `${article.title} | AIプロダクト構築ラボ`,
    description: article.description,
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-white">
      <article className="mx-auto max-w-3xl">
        <Link href="/articles" className="text-sm text-cyan-400 hover:text-cyan-300">
          ← 記事一覧へ戻る
        </Link>

        <div className="mt-8">
          <div className="mb-4 flex flex-wrap items-center gap-2 text-sm text-slate-400">
            <span>{article.category}</span>
            <span>•</span>
            <time dateTime={article.publishedAt}>{article.publishedAt}</time>
            <span>•</span>
            <span>{article.readingTime}</span>
          </div>

          <h1 className="mb-6 text-4xl font-bold leading-tight">
            {article.title}
          </h1>

          <p className="mb-6 text-lg leading-8 text-slate-300">
            {article.description}
          </p>

          <div className="mb-10 flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <Link
                key={tag}
                href={`/tags/${encodeURIComponent(tag)}`}
                className="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-300 hover:border-cyan-500 hover:text-cyan-300"
              >
                #{tag}
              </Link>
            ))}
          </div>
        </div>

        <div
          className="prose prose-invert prose-slate max-w-none prose-a:text-cyan-400 prose-code:text-cyan-300"
          dangerouslySetInnerHTML={{ __html: article.contentHtml }}
        />
      </article>
    </main>
  );
}
