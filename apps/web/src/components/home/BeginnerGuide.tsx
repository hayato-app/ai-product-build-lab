import Link from "next/link";

const steps = [
  {
    title: "AIアプリの全体像をつかむ",
    body: "企画、UI、API、データ、運用まで、まずは小さく動く構成から理解します。",
  },
  {
    title: "APIコストを見積もる",
    body: "公開前に利用量と料金の見通しを立て、継続できる設計に近づけます。",
  },
  {
    title: "改善しながら育てる",
    body: "ログ、利用回数、回答品質を見ながら、記事とツールで改善ポイントを整理します。",
  },
];

export function BeginnerGuide() {
  return (
    <section id="beginner-guide" className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
      <div className="grid gap-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
            Beginner Guide
          </p>
          <h2 className="mt-2 text-3xl font-black text-slate-950">初めての方へ</h2>
          <p className="mt-4 text-sm leading-7 text-slate-600">
            AIプロダクト開発を、記事を読みながら段階的に進められる入口を用意しています。
          </p>
          <Link href="/articles" className="mt-6 inline-flex rounded-full bg-slate-950 px-5 py-3 text-sm font-bold text-white hover:bg-blue-700">
            記事一覧へ
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {steps.map((step, index) => (
            <div key={step.title} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-sm font-black text-white">
                {index + 1}
              </span>
              <h3 className="mt-4 text-base font-black leading-7 text-slate-950">{step.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{step.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
