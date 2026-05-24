import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "AIプロダクト構築ラボ | AI Product Build Lab",
    template: "%s | AIプロダクト構築ラボ",
  },
  description:
    "生成AIアプリ、AI SaaS、AIエージェントを構築するための実装ガイド・開発ノウハウ・無料ツールを提供する開発者向けメディアです。",
  keywords: [
    "AIプロダクト開発",
    "生成AIアプリ",
    "AI SaaS",
    "AIエージェント",
    "RAG",
    "Next.js",
    "OpenAI API",
  ],
  authors: [{ name: "AIプロダクト構築ラボ" }],
  creator: "AIプロダクト構築ラボ",
  openGraph: {
    title: "AIプロダクト構築ラボ",
    description:
      "生成AIアプリ、AI SaaS、AIエージェントを構築するための実装ガイド。",
    type: "website",
    locale: "ja_JP",
    siteName: "AIプロダクト構築ラボ",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
