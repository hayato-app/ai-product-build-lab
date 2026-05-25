type Props = {
  contentHtml: string;
};

export function MarkdownBody({ contentHtml }: Props) {
  return (
    <div
      className="max-w-none overflow-x-auto rounded-3xl border border-slate-200 bg-white p-6 text-slate-700 shadow-sm md:p-10 [&_.mermaid]:my-8 [&_.mermaid]:overflow-x-auto [&_.mermaid]:rounded-2xl [&_.mermaid]:border [&_.mermaid]:border-slate-200 [&_.mermaid]:bg-slate-50 [&_.mermaid]:p-5 [&_a]:font-semibold [&_a]:text-blue-700 [&_blockquote]:border-l-4 [&_blockquote]:border-blue-200 [&_blockquote]:bg-blue-50 [&_blockquote]:px-5 [&_blockquote]:py-3 [&_blockquote]:text-slate-600 [&_code]:rounded-md [&_code]:bg-slate-100 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-sm [&_h2]:mt-10 [&_h2]:text-2xl [&_h2]:font-black [&_h2]:text-slate-950 [&_h3]:mt-8 [&_h3]:text-xl [&_h3]:font-black [&_h3]:text-slate-950 [&_li]:my-2 [&_ol]:my-5 [&_ol]:list-decimal [&_ol]:pl-6 [&_p]:my-5 [&_p]:leading-8 [&_pre]:overflow-x-auto [&_pre]:rounded-2xl [&_pre]:bg-slate-950 [&_pre]:p-5 [&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_pre_code]:text-slate-100 [&_table]:my-8 [&_table]:w-full [&_table]:min-w-[720px] [&_table]:border-collapse [&_table]:overflow-hidden [&_table]:rounded-2xl [&_tbody_tr]:border-b [&_tbody_tr]:border-slate-100 [&_td]:border [&_td]:border-slate-200 [&_td]:p-3 [&_td]:align-top [&_th]:border [&_th]:border-slate-200 [&_th]:bg-slate-100 [&_th]:p-3 [&_th]:text-left [&_th]:font-black [&_th]:text-slate-950 [&_ul]:my-5 [&_ul]:list-disc [&_ul]:pl-6"
      dangerouslySetInnerHTML={{ __html: contentHtml }}
    />
  );
}
