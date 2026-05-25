export function Newsletter() {
  return (
    <section id="operation-guide" className="bg-white px-5 py-16 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-6 rounded-3xl border border-blue-100 bg-blue-50 p-6 md:grid-cols-[1fr_0.9fr] md:p-8">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
            Newsletter
          </p>
          <h2 className="mt-2 text-3xl font-black text-slate-950">更新情報を受け取る</h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600">
            AI開発の実装メモ、記事更新、無料ツールの追加情報を届けるためのニュースレターUIです。
          </p>
        </div>

        <form className="flex flex-col gap-3 self-center sm:flex-row">
          <label className="sr-only" htmlFor="newsletter-email">
            メールアドレス
          </label>
          <input
            id="newsletter-email"
            type="email"
            placeholder="メールアドレスを入力"
            className="min-h-12 flex-1 rounded-full border border-blue-100 bg-white px-5 text-sm text-slate-900 outline-none ring-blue-200 placeholder:text-slate-400 focus:ring-4"
          />
          <button
            type="button"
            className="min-h-12 rounded-full bg-blue-600 px-6 text-sm font-black text-white transition hover:bg-blue-700"
          >
            登録する（無料）
          </button>
        </form>
      </div>
    </section>
  );
}
