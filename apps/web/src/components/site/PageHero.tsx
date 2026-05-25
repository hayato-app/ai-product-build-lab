import type { ReactNode } from "react";

type Props = {
  eyebrow: string;
  title: string;
  description?: string;
  children?: ReactNode;
};

export function PageHero({ eyebrow, title, description, children }: Props) {
  return (
    <section className="border-b border-slate-200 bg-gradient-to-b from-blue-50 via-white to-slate-50">
      <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8 lg:py-16">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
          {eyebrow}
        </p>
        <div className="mt-3 grid gap-6 lg:grid-cols-[1fr_0.42fr] lg:items-end">
          <div>
            <h1 className="text-4xl font-black leading-tight tracking-normal text-slate-950 md:text-5xl">
              {title}
            </h1>
            {description ? (
              <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600 md:text-lg">
                {description}
              </p>
            ) : null}
          </div>
          {children ? <div className="lg:justify-self-end">{children}</div> : null}
        </div>
      </div>
    </section>
  );
}
