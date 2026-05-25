import Link from "next/link";
import Script from "next/script";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MarkdownBody } from "@/components/site/MarkdownBody";
import { SiteShell } from "@/components/site/SiteShell";
import {
  getDraftBySlug,
  isDraftReviewAllowed,
  isDraftReviewConfigured,
} from "@/lib/drafts";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Draft Preview",
  referrer: "no-referrer",
  robots: {
    index: false,
    follow: false,
  },
};

type Props = {
  params: Promise<{
    slug: string;
  }>;
  searchParams: Promise<{
    token?: string;
  }>;
};

export default async function DraftPreviewPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { token } = await searchParams;

  if (!isDraftReviewAllowed(token)) {
    return (
      <SiteShell>
        <AccessDenied configured={isDraftReviewConfigured()} />
      </SiteShell>
    );
  }

  const draft = await getDraftBySlug(slug);

  if (!draft) {
    notFound();
  }

  return (
    <SiteShell>
      <article>
        <header className="border-b border-slate-200 bg-gradient-to-b from-sky-50 via-white to-emerald-50">
          <div className="mx-auto max-w-4xl px-5 py-12 lg:px-8 lg:py-16">
            <Link
              href={`/admin/drafts?token=${encodeURIComponent(token ?? "")}`}
              className="inline-flex rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 shadow-sm hover:border-sky-200 hover:text-sky-700"
            >
              下書き一覧へ
            </Link>

            <div className="mt-8 flex flex-wrap items-center gap-2 text-sm font-semibold text-slate-500">
              <span className="rounded-full bg-orange-50 px-3 py-1 text-orange-700">
                {draft.status}
              </span>
              <span className="rounded-full bg-sky-50 px-3 py-1 text-sky-700">
                {draft.reviewStatus}
              </span>
              <span>{draft.readingTime}</span>
              {draft.needsFactCheck ? <span>fact check required</span> : null}
            </div>

            <h1 className="mt-5 text-4xl font-black leading-tight tracking-normal text-slate-950 md:text-5xl">
              {draft.title}
            </h1>

            {draft.description ? (
              <p className="mt-6 text-lg leading-8 text-slate-600">
                {draft.description}
              </p>
            ) : null}

            <dl className="mt-8 grid gap-3 rounded-3xl border border-slate-200 bg-white p-5 text-sm shadow-sm sm:grid-cols-2">
              <MetaItem label="Pillar" value={draft.pillar || "未設定"} />
              <MetaItem label="Category" value={draft.category || "未設定"} />
              <MetaItem label="Priority" value={draft.priority} />
              <MetaItem
                label="Publish ready"
                value={draft.estimatedPublishReady ? "yes" : "no"}
              />
            </dl>

            <div className="mt-6 flex flex-wrap gap-2">
              {draft.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-4xl px-5 py-12 lg:px-8">
          <MarkdownBody contentHtml={draft.contentHtml} />
        </div>
      </article>

      <Script
        src="https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js"
        referrerPolicy="no-referrer"
        strategy="afterInteractive"
      />
      <Script id="draft-mermaid-init" strategy="afterInteractive">
        {`
          if (window.mermaid) {
            window.mermaid.initialize({ startOnLoad: true, theme: "neutral" });
            window.mermaid.run();
          }
        `}
      </Script>
    </SiteShell>
  );
}

function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="font-black text-slate-500">{label}</dt>
      <dd className="mt-1 font-semibold text-slate-950">{value}</dd>
    </div>
  );
}

function AccessDenied({ configured }: { configured: boolean }) {
  return (
    <section className="mx-auto max-w-3xl px-5 py-20 lg:px-8">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-black uppercase tracking-normal text-sky-700">
          Draft Preview
        </p>
        <h1 className="mt-3 text-3xl font-black tracking-normal text-slate-950">
          管理者確認が必要です
        </h1>
        <p className="mt-4 leading-8 text-slate-600">
          {configured
            ? "レビュー用トークンが一致しません。管理者用URLからアクセスしてください。"
            : "DRAFT_REVIEW_TOKEN が未設定のため、draftレビュー画面は無効化されています。"}
        </p>
      </div>
    </section>
  );
}
