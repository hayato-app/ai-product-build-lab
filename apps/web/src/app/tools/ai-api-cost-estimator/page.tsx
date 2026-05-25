import Link from "next/link";
import { ApiCostEstimator } from "@/components/tools/ApiCostEstimator";

export const metadata = {
  title: "AI API Cost Estimator | AIプロダクト構築ラボ",
  description:
    "AI APIの入力トークン・出力トークン・実行回数から、1回・1日・1か月・1年あたりの概算コストを計算できる無料ツールです。",
};

export default function AiApiCostEstimatorPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-white">
      <section className="mx-auto max-w-6xl">
        <Link href="/tools" className="text-sm text-cyan-400 hover:text-cyan-300">
          ← 無料ツール一覧へ戻る
        </Link>

        <div className="mb-10 mt-8">
          <p className="mb-3 text-sm font-semibold tracking-[0.3em] text-cyan-400">
            FREE TOOL
          </p>
          <h1 className="mb-6 text-4xl font-bold md:text-5xl">
            AI API Cost Estimator
          </h1>
          <p className="max-w-3xl text-lg leading-8 text-slate-300">
            AI APIの入力トークン数、出力トークン数、実行回数から、
            1回・1日・1か月・1年あたりの概算コストを計算できます。
            AI SaaSやAIアプリを公開する前の費用見積もりに使えます。
          </p>
        </div>

        <ApiCostEstimator />

        <section className="mt-14 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="mb-3 text-xl font-bold">何が分かる？</h2>
            <p className="text-sm leading-6 text-slate-300">
              1回あたりのAI API利用コストだけでなく、日次・月次・年次の概算費用を確認できます。
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="mb-3 text-xl font-bold">どんな用途向け？</h2>
            <p className="text-sm leading-6 text-slate-300">
              チャットボット、RAG、AIエージェント、AI SaaSなど、生成AIアプリ全般の初期見積もりに使えます。
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="mb-3 text-xl font-bold">注意点</h2>
            <p className="text-sm leading-6 text-slate-300">
              実際の料金はモデル・キャッシュ・バッチ処理・割引・為替などによって変わります。
              最終確認は各AI APIの公式料金ページで行ってください。
            </p>
          </div>
        </section>
      </section>
    </main>
  );
}
