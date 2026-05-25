import Link from "next/link";
import { ApiCostEstimator } from "@/components/tools/ApiCostEstimator";
import { PageHero } from "@/components/site/PageHero";
import { SiteShell } from "@/components/site/SiteShell";

export const metadata = {
  title: "AI API Cost Estimator | AIプロダクト構築ラボ",
  description:
    "AI APIの入力トークン、出力トークン、実行回数から概算コストを計算できる無料ツールです。",
};

export default function AiApiCostEstimatorPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Free Tool"
        title="AI API Cost Estimator"
        description="入力トークン数、出力トークン数、実行回数から、1回・1日・1か月・1年あたりのAI APIコストを概算できます。"
      >
        <Link
          href="/tools"
          className="inline-flex rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 shadow-sm hover:border-blue-200 hover:text-blue-700"
        >
          無料ツール一覧へ
        </Link>
      </PageHero>

      <section className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
        <ApiCostEstimator />

        <section className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            {
              title: "何が分かるか",
              body: "1回あたりのAI API利用コストだけでなく、日次・月次・年次の概算費用を確認できます。",
            },
            {
              title: "主な用途",
              body: "チャットボット、RAG、AIエージェント、AI SaaSなど、生成AIアプリ全般の初期見積もりに使えます。",
            },
            {
              title: "注意点",
              body: "実際の料金はモデル、キャッシュ、バッチ処理、割引、為替などによって変わります。最終確認は各AI APIの公式料金ページで行ってください。",
            },
          ].map((item) => (
            <div key={item.title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-black text-slate-950">{item.title}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">{item.body}</p>
            </div>
          ))}
        </section>
      </section>
    </SiteShell>
  );
}
