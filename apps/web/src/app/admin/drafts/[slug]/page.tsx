import Link from "next/link";
import Script from "next/script";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { MarkdownBody } from "@/components/site/MarkdownBody";
import { SiteShell } from "@/components/site/SiteShell";
import {
  getDraftBySlug,
  isDraftReviewAllowed,
  isDraftReviewConfigured,
} from "@/lib/drafts";
import { updateDraftReviewAction } from "./actions";

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
              <span
                className={`rounded-full px-3 py-1 ${reviewStatusClass(
                  draft.reviewStatus,
                )}`}
              >
                {reviewStatusLabel(draft.reviewStatus)}
              </span>
              <span
                className={`rounded-full px-3 py-1 ${reviewResultClass(
                  draft.reviewResult,
                )}`}
              >
                {draft.reviewResult.toUpperCase()}
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
              <MetaItem label="Review result" value={draft.reviewResult} />
              <MetaItem
                label="Reviewed at"
                value={draft.reviewedAt || "not reviewed"}
              />
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
          <section className="mb-10 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-sm font-black uppercase tracking-normal text-sky-700">
                  Review decision
                </p>
                <h2 className="mt-2 text-2xl font-black tracking-normal text-slate-950">
                  レビュー状態を記録
                </h2>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                  OK/NGや修正依頼の判定はdraft Markdownのfrontmatterに保存されます。公開記事への移動は行いません。
                </p>
              </div>
            </div>

            <form action={updateDraftReviewAction} className="mt-5 grid gap-4">
              <input type="hidden" name="token" value={token ?? ""} />
              <input type="hidden" name="slug" value={draft.slug} />
              <label className="grid gap-2">
                <span className="text-sm font-bold text-slate-700">
                  Review notes
                </span>
                <textarea
                  name="review_notes"
                  defaultValue={draft.reviewNotes}
                  rows={4}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-800 outline-none transition focus:border-sky-300 focus:bg-white focus:ring-4 focus:ring-sky-100"
                  placeholder="修正点、確認事項、公開前に見るべき観点を記録"
                />
              </label>

              <div className="grid gap-2 sm:grid-cols-4">
                <ReviewButton name="approve" tone="green">
                  OK
                </ReviewButton>
                <ReviewButton name="changes" tone="orange">
                  修正依頼
                </ReviewButton>
                <ReviewButton name="reject" tone="red">
                  NG
                </ReviewButton>
                <ReviewButton name="reset" tone="slate">
                  未レビュー
                </ReviewButton>
              </div>
            </form>
          </section>

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

function ReviewButton({
  children,
  name,
  tone,
}: {
  children: ReactNode;
  name: string;
  tone: "green" | "orange" | "red" | "slate";
}) {
  const toneClass = {
    green: "border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100",
    orange: "border-orange-200 bg-orange-50 text-orange-700 hover:bg-orange-100",
    red: "border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100",
    slate: "border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100",
  }[tone];

  return (
    <button
      type="submit"
      name="review_action"
      value={name}
      className={`rounded-2xl border px-4 py-3 text-sm font-black transition ${toneClass}`}
    >
      {children}
    </button>
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

function reviewStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    needs_review: "Needs review",
    approved: "OK",
    changes_requested: "Changes requested",
    rejected: "NG",
  };

  return labels[status] ?? status;
}

function reviewStatusClass(status: string): string {
  const classes: Record<string, string> = {
    approved: "bg-emerald-50 text-emerald-700",
    changes_requested: "bg-orange-50 text-orange-700",
    rejected: "bg-rose-50 text-rose-700",
    needs_review: "bg-sky-50 text-sky-700",
  };

  return classes[status] ?? "bg-slate-100 text-slate-600";
}

function reviewResultClass(result: string): string {
  const classes: Record<string, string> = {
    ok: "bg-emerald-50 text-emerald-700",
    ng: "bg-rose-50 text-rose-700",
    pending: "bg-slate-100 text-slate-600",
  };

  return classes[result] ?? "bg-slate-100 text-slate-600";
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
