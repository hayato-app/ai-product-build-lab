import type { ReactNode } from "react";
import { AnnouncementBar } from "@/components/site/AnnouncementBar";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";

type Props = {
  children: ReactNode;
};

export function SiteShell({ children }: Props) {
  return (
    <div className="min-h-screen bg-white text-slate-950">
      <AnnouncementBar />
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
    </div>
  );
}
