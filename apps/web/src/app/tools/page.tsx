import Link from "next/link";
import { PageHero } from "@/components/site/PageHero";
import { SiteShell } from "@/components/site/SiteShell";

export const metadata = {
  title: "無料ツール | AIプロダクト構築ラボ",
  description:
    "AIプロダクト開発に役立つ無料ツールを公開しています。APIコスト見積もりなど、実装前の検討に使えます。",
};

const tools = [
  {
    title: "AI API Cost Estimator",
    description:
      "入力トークン数、出力トークン数、実行回数からAI APIの概算コストを計算できます。",
    href: "/tools/ai-api-cost-estimator",
    status: "公開中",
  },
  {
    title: "RAG Checklist",
    description: "RAG構築時の設計・評価項目を確認するチェックリストを準備中です。",
    href: "#",
    status: "準備中",
  },
  {
    title: "AI SaaS Planner",
    description: "AI SaaSの最小構成と運用コストを整理するプランナーを準備中です。",
    href: "#",
    status: "準備中",
  },
];

export default function ToolsPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Tools"
        title="無料ツール"
        description="AIプロダクト開発の検討や運用に役立つ小さなツールを、記事とあわせて使える形で公開しています。"
      />

      <section className="mx-auto grid max-w-7xl gap-6 px-5 py-12 md:grid-cols-3 lg:px-8">
        {tools.map((tool) => {
          const isReady = tool.href !== "#";

          const card = (
            <div className="h-full rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-100">
              <div className="mb-5 inline-flex rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
                {tool.status}
              </div>
              <h2 className="text-xl font-black text-slate-950">{tool.title}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">{tool.description}</p>
            </div>
          );

          return isReady ? (
            <Link key={tool.title} href={tool.href}>
              {card}
            </Link>
          ) : (
            <div key={tool.title} className="opacity-70">
              {card}
            </div>
          );
        })}
      </section>
    </SiteShell>
  );
}
