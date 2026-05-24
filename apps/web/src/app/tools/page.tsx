export const metadata = {
  title: "無料ツール | AIプロダクト構築ラボ",
  description:
    "AIプロダクト開発に役立つ無料ツールを順次公開しています。",
};

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
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="mb-2 font-semibold">Prompt Cost Estimator</h2>
            <p className="text-sm text-slate-400">
              AI APIの概算コストを計算するツールを準備中です。
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="mb-2 font-semibold">RAG Checklist</h2>
            <p className="text-sm text-slate-400">
              RAG構築時の設計チェックリストを準備中です。
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="mb-2 font-semibold">AI SaaS Planner</h2>
            <p className="text-sm text-slate-400">
              AI SaaSの最小構成を整理するツールを準備中です。
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
