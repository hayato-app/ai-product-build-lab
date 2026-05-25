import { BeginnerGuide } from "@/components/home/BeginnerGuide";
import { FeaturedArticles } from "@/components/home/FeaturedArticles";
import { HomeContentGrid } from "@/components/home/HomeContentGrid";
import { HomeHero } from "@/components/home/HomeHero";
import { Newsletter } from "@/components/home/Newsletter";
import { AnnouncementBar } from "@/components/site/AnnouncementBar";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { getAllArticles, getAllCategories } from "@/lib/articles";

export default function Home() {
  const articles = getAllArticles();
  const categories = getAllCategories();

  return (
    <div className="min-h-screen bg-white text-slate-950">
      <AnnouncementBar />
      <SiteHeader />
      <main>
        <HomeHero />
        <FeaturedArticles articles={articles} />
        <HomeContentGrid categories={categories} latestArticles={articles} />
        <BeginnerGuide />
        <Newsletter />
      </main>
      <SiteFooter />
    </div>
  );
}
