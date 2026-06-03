import Link from "next/link";
import { notFound } from "next/navigation";
import { MarkdownBody } from "@/components/site/MarkdownBody";
import { SiteShell } from "@/components/site/SiteShell";
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
    <SiteShell>
      <article>
        <header className="border-b border-slate-200 bg-gradient-to-b from-blue-50 via-white to-slate-50">
          <div className="mx-auto max-w-4xl px-5 py-12 lg:px-8 lg:py-16">
            <Link
              href="/articles"
              className="inline-flex rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 shadow-sm hover:border-blue-200 hover:text-blue-700"
            >
              記事一覧へ
            </Link>

            <div className="mt-8 flex flex-wrap items-center gap-2 text-sm font-semibold text-slate-500">
              <Link
                href={`/categories/${encodeURIComponent(article.category)}`}
                className="rounded-full bg-blue-50 px-3 py-1 text-blue-700 hover:text-blue-900"
              >
                {article.category}
              </Link>
              <span>・</span>
              <time dateTime={article.publishedAt}>{article.publishedAt}</time>
              <span>・</span>
              <span>{article.readingTime}</span>
            </div>

            <h1 className="mt-5 text-4xl font-black leading-tight tracking-normal text-slate-950 md:text-5xl">
              {article.title}
            </h1>

            <p className="mt-6 text-lg leading-8 text-slate-600">
              {article.description}
            </p>

            {article.thumbnail ? (
              <img
                src={article.thumbnail}
                alt={`${article.title}のサムネイル`}
                className="mt-8 aspect-[16/9] w-full rounded-3xl border border-slate-200 object-cover shadow-lg shadow-blue-100"
              />
            ) : (
              <div className="mt-8 grid aspect-[16/9] w-full place-items-center rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-slate-100 shadow-sm">
                <div className="rounded-2xl bg-white px-5 py-3 text-sm font-black text-blue-700 shadow-sm">
                  {article.category}
                </div>
              </div>
            )}

            <div className="mt-8 flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/tags/${encodeURIComponent(tag)}`}
                  className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-4xl px-5 py-12 lg:px-8">
          <MarkdownBody contentHtml={article.contentHtml} />
        </div>
      </article>
    </SiteShell>
  );
}
