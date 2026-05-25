import Link from "next/link";

export const metadata = {
  title: "無料ツール | AIプロダクト構築ラボ",
  description:
    "AIプロダクト開発に役立つ無料ツールを順次公開しています。",
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
    description:
      "RAG構築時の設計チェックリストを準備中です。",
    href: "#",
    status: "準備中",
  },
  {
    title: "AI SaaS Planner",
    description:
      "AI SaaSの最小構成を整理するツールを準備中です。",
    href: "#",
    status: "準備中",
  },
];

export default function ToolsPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-white">
      <section className="mx-auto max-w-5xl">
        <p className="mb-3 text-sm font-semibold tracking-[0.3em] text-cyan-400">
          TOOLS
        </p>
        <h1 className="mb-6 text-4xl font-bold">無料ツール</h1>
        <p className="mb-10 max-w-2xl text-slate-300">
          AIアプリケーション開発やAI SaaS構築に役立つ小さなWebツールを順次公開します。
        </p>

        <div className="grid gap-6 md:grid-cols-3">
          {tools.map((tool) => {
            const isReady = tool.href !== "#";

            const card = (
              <div className="h-full rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:border-cyan-500">
                <div className="mb-4 inline-flex rounded-full border border-cyan-500/40 px-3 py-1 text-xs text-cyan-300">
                  {tool.status}
                </div>
                <h2 className="mb-2 text-xl font-semibold">{tool.title}</h2>
                <p className="text-sm leading-6 text-slate-400">{tool.description}</p>
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
        </div>
      </section>
    </main>
  );
}
