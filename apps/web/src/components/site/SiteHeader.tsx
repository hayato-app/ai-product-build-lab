import Link from "next/link";

const navItems = [
  { href: "/articles", label: "記事一覧" },
  { href: "/categories", label: "カテゴリ" },
  { href: "/tools", label: "無料ツール" },
  { href: "#beginner-guide", label: "初めての方へ" },
  { href: "#operation-guide", label: "運用方針" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-4 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <Link href="/" className="flex min-w-0 items-center gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-base font-black text-white shadow-sm shadow-blue-200">
            AI
          </span>
          <span className="min-w-0">
            <span className="block truncate text-base font-bold text-slate-950 sm:text-lg">
              AIプロダクト構築ラボ
            </span>
            <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              AI Product Build Lab
            </span>
          </span>
        </Link>

        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <nav className="flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold text-slate-600">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-blue-600">
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex h-10 w-full items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 text-sm text-slate-400 lg:w-64">
            <span aria-hidden="true" className="text-slate-500">
              ⌕
            </span>
            <span>記事を検索...</span>
          </div>
        </div>
      </div>
    </header>
  );
}
