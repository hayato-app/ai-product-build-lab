export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-6 text-center">
        <p className="mb-4 text-sm font-semibold tracking-[0.3em] text-cyan-400">
          AI PRODUCT BUILD LAB
        </p>

        <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-6xl">
          AIプロダクト構築ラボ
        </h1>

        <p className="mb-8 max-w-2xl text-lg leading-8 text-slate-300">
          生成AIアプリ、AI SaaS、AIエージェントを構築するための実装ガイド・開発ノウハウ・無料ツールを提供する開発者向けメディアです。
        </p>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <h2 className="mb-2 font-semibold">AIアプリ開発</h2>
            <p className="text-sm text-slate-400">
              OpenAI API、RAG、AI Agentの実装手順を解説します。
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <h2 className="mb-2 font-semibold">無料ツール</h2>
            <p className="text-sm text-slate-400">
              AI開発に使える小さなWebツールを順次公開します。
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <h2 className="mb-2 font-semibold">SaaS構築</h2>
            <p className="text-sm text-slate-400">
              小さなAIプロダクトを収益化する流れを検証します。
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
