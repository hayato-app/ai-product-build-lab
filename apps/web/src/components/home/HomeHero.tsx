import Link from "next/link";

export function HomeHero() {
  return (
    <section className="overflow-hidden border-b border-slate-200 bg-gradient-to-b from-blue-50 via-white to-slate-50">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-8 lg:py-20">
        <div>
          <p className="mb-5 inline-flex rounded-full border border-blue-200 bg-white px-4 py-2 text-sm font-bold text-blue-700 shadow-sm">
            実装で学ぶAIプロダクト開発メディア
          </p>
          <h1 className="max-w-3xl text-4xl font-black leading-tight tracking-normal text-slate-950 sm:text-5xl lg:text-6xl">
            AIプロダクト開発を
            <br />
            実装ベースで学ぶ。
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
            アイデアを、動くプロダクトへ。AIプロダクトの企画・開発・運用まで、実践的なノウハウをわかりやすく発信するメディアです。
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/articles"
              className="rounded-full bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700"
            >
              最新記事を読む
            </Link>
            <Link
              href="#beginner-guide"
              className="rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-bold text-slate-700 transition hover:border-blue-300 hover:text-blue-700"
            >
              初めての方へ
            </Link>
          </div>
        </div>

        <div className="relative min-h-[360px] rounded-[2rem] border border-blue-100 bg-white p-5 shadow-xl shadow-blue-100/70">
          <div className="absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle_at_20%_20%,#dbeafe_0,transparent_34%),radial-gradient(circle_at_80%_0%,#eff6ff_0,transparent_30%)]" />
          <div className="relative grid h-full gap-4">
            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-sm font-bold text-slate-900">AI Product Sprint</span>
                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
                  Live
                </span>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                {["企画", "実装", "改善"].map((label, index) => (
                  <div key={label} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <div className="mb-3 h-2 rounded-full bg-blue-100">
                      <div
                        className="h-2 rounded-full bg-blue-600"
                        style={{ width: `${68 + index * 10}%` }}
                      />
                    </div>
                    <p className="text-sm font-bold text-slate-800">{label}</p>
                    <p className="mt-1 text-xs text-slate-500">Workflow</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-[0.95fr_1.05fr]">
              <div className="rounded-3xl border border-blue-100 bg-blue-50 p-5">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-700">
                  Topics
                </p>
                <div className="mt-4 space-y-3">
                  {["OpenAI API", "RAG", "AI Agents", "Next.js"].map((item) => (
                    <div key={item} className="rounded-2xl bg-white px-4 py-3 text-sm font-bold text-slate-700 shadow-sm">
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                <p className="mb-4 text-sm font-bold text-slate-900">月間コスト見積もり</p>
                <div className="flex h-36 items-end gap-3">
                  {[42, 70, 56, 88, 64].map((height, index) => (
                    <div key={index} className="flex flex-1 items-end rounded-t-2xl bg-slate-100">
                      <div className="w-full rounded-t-2xl bg-blue-500" style={{ height: `${height}%` }} />
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-xs leading-6 text-slate-500">
                  API利用量と改善ポイントを、記事とツールで確認できます。
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
