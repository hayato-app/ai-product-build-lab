import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 md:grid-cols-[1.5fr_1fr] lg:px-8">
        <div>
          <div className="mb-3 flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-600 text-sm font-black text-white">
              AI
            </span>
            <div>
              <p className="font-bold text-slate-950">AIプロダクト構築ラボ</p>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                AI Product Build Lab
              </p>
            </div>
          </div>
          <p className="max-w-xl text-sm leading-7 text-slate-600">
            AIアプリケーション、OpenAI API、RAG、AIエージェント、Next.jsを使った開発を実装ベースで学ぶためのメディアです。
          </p>
        </div>

        <nav className="flex flex-wrap items-start gap-3 text-sm font-semibold text-slate-600 md:justify-end">
          <Link href="/articles" className="rounded-full border border-slate-200 px-4 py-2 hover:border-blue-300 hover:text-blue-600">
            記事一覧
          </Link>
          <Link href="/categories" className="rounded-full border border-slate-200 px-4 py-2 hover:border-blue-300 hover:text-blue-600">
            カテゴリ
          </Link>
          <Link href="/tools" className="rounded-full border border-slate-200 px-4 py-2 hover:border-blue-300 hover:text-blue-600">
            無料ツール
          </Link>
        </nav>
      </div>
    </footer>
  );
}
