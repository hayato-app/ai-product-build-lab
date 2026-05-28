import Link from "next/link";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SiteShell } from "@/components/site/SiteShell";
import {
  getAllDrafts,
  isDraftReviewAllowed,
  isDraftReviewConfigured,
} from "@/lib/drafts";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Draft Review",
  referrer: "no-referrer",
  robots: {
    index: false,
    follow: false,
  },
};

type Props = {
  searchParams: Promise<{
    token?: string;
    status?: string;
  }>;
};

export default async function DraftReviewPage({ searchParams }: Props) {
  const { token, status } = await searchParams;

  if (!isDraftReviewAllowed(token)) {
    return (
      <SiteShell>
        <AccessDenied configured={isDraftReviewConfigured()} />
      </SiteShell>
    );
  }

  const drafts = getAllDrafts();
  const activeStatus = isReviewStatusFilter(status) ? status : "all";
  const filteredDrafts =
    activeStatus === "all"
      ? drafts
      : drafts.filter((draft) => draft.reviewStatus === activeStatus);
  const needsReviewCount = drafts.filter(
    (draft) => draft.reviewStatus === "needs_review",
  ).length;
  const approvedCount = drafts.filter(
    (draft) => draft.reviewStatus === "approved",
  ).length;
  const changesRequestedCount = drafts.filter(
    (draft) => draft.reviewStatus === "changes_requested",
  ).length;
  const rejectedCount = drafts.filter(
    (draft) => draft.reviewStatus === "rejected",
  ).length;
  const highPriorityCount = drafts.filter(
    (draft) => draft.priority === "high",
  ).length;

  return (
    <SiteShell>
      <section className="border-b border-slate-200 bg-gradient-to-b from-sky-50 via-white to-emerald-50">
        <div className="mx-auto max-w-6xl px-5 py-12 lg:px-8 lg:py-16">
          <div className="flex flex-wrap items-center gap-3 text-sm font-bold text-slate-600">
            <span className="rounded-full border border-sky-200 bg-white px-3 py-1 text-sky-700">
              Admin
            </span>
            <span>Draft review only</span>
          </div>
          <h1 className="mt-5 text-4xl font-black leading-tight tracking-normal text-slate-950 md:text-5xl">
            下書き記事レビュー
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
            公開前の記事をWeb表示に近い形で確認するための管理者向けページです。
            ここに表示されるdraftは、公開記事一覧・カテゴリ・タグ・サイトマップには出ません。
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
            <StatCard label="Drafts" value={drafts.length} />
            <StatCard label="Needs review" value={needsReviewCount} />
            <StatCard label="OK" value={approvedCount} />
            <StatCard label="Changes" value={changesRequestedCount} />
            <StatCard label="NG" value={rejectedCount} />
            <StatCard label="High priority" value={highPriorityCount} />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-10 lg:px-8">
        <div className="mb-6 flex flex-wrap gap-2">
          {reviewFilters.map((filter) => (
            <Link
              key={filter.value}
              href={`/admin/drafts?token=${encodeURIComponent(token ?? "")}&status=${filter.value}`}
              className={`rounded-full border px-4 py-2 text-sm font-bold transition ${
                activeStatus === filter.value
                  ? "border-sky-300 bg-sky-50 text-sky-700"
                  : "border-slate-200 bg-white text-slate-600 hover:border-sky-200 hover:text-sky-700"
              }`}
            >
              {filter.label}
            </Link>
          ))}
        </div>

        <div className="grid gap-4">
          {filteredDrafts.map((draft) => (
            <Link
              key={draft.slug}
              href={`/admin/drafts/${draft.slug}?token=${encodeURIComponent(token ?? "")}`}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-sky-200 hover:shadow-md"
            >
              <div className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-normal text-slate-500">
                <Badge tone={draft.priority === "high" ? "orange" : "slate"}>
                  {draft.priority}
                </Badge>
                <Badge
                  tone={
                    reviewBadgeTone(draft.reviewStatus)
                  }
                >
                  {reviewStatusLabel(draft.reviewStatus)}
                </Badge>
                <Badge
                  tone={draft.reviewResult === "ok" ? "green" : draft.reviewResult === "ng" ? "red" : "slate"}
                >
                  {draft.reviewResult.toUpperCase()}
                </Badge>
                {draft.needsFactCheck ? (
                  <Badge tone="red">fact check</Badge>
                ) : null}
                <span>{draft.readingTime}</span>
              </div>

              <h2 className="mt-3 text-2xl font-black tracking-normal text-slate-950">
                {draft.title}
              </h2>
              {draft.description ? (
                <p className="mt-2 max-w-3xl leading-7 text-slate-600">
                  {draft.description}
                </p>
              ) : null}

              <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold text-slate-500">
                {draft.pillar ? (
                  <span className="rounded-full bg-slate-100 px-3 py-1">
                    {draft.pillar}
                  </span>
                ) : null}
                {draft.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-sky-50 px-3 py-1 text-sky-700">
                    #{tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
          {filteredDrafts.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-sm font-semibold text-slate-500">
              No drafts match this review filter.
            </div>
          ) : null}
        </div>
      </section>
    </SiteShell>
  );
}

const reviewFilters = [
  { value: "all", label: "All" },
  { value: "needs_review", label: "Needs review" },
  { value: "approved", label: "OK" },
  { value: "changes_requested", label: "Changes requested" },
  { value: "rejected", label: "NG" },
] as const;

function isReviewStatusFilter(
  value: string | undefined,
): value is (typeof reviewFilters)[number]["value"] {
  return reviewFilters.some((filter) => filter.value === value);
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

function reviewBadgeTone(status: string): "green" | "orange" | "red" | "sky" | "slate" {
  const tones: Record<string, "green" | "orange" | "red" | "sky" | "slate"> = {
    approved: "green",
    changes_requested: "orange",
    rejected: "red",
    needs_review: "sky",
  };

  return tones[status] ?? "slate";
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="text-sm font-bold text-slate-500">{label}</div>
      <div className="mt-2 text-3xl font-black text-slate-950">{value}</div>
    </div>
  );
}

function Badge({
  children,
  tone,
}: {
  children: ReactNode;
  tone: "green" | "orange" | "red" | "sky" | "slate";
}) {
  const toneClass = {
    green: "bg-emerald-50 text-emerald-700",
    orange: "bg-orange-50 text-orange-700",
    red: "bg-rose-50 text-rose-700",
    sky: "bg-sky-50 text-sky-700",
    slate: "bg-slate-100 text-slate-600",
  }[tone];

  return <span className={`rounded-full px-3 py-1 ${toneClass}`}>{children}</span>;
}

function AccessDenied({ configured }: { configured: boolean }) {
  return (
    <section className="mx-auto max-w-3xl px-5 py-20 lg:px-8">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-black uppercase tracking-normal text-sky-700">
          Draft Review
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
