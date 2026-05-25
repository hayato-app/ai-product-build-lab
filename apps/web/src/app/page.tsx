import { BeginnerGuide } from "@/components/home/BeginnerGuide";
import { FeaturedArticles } from "@/components/home/FeaturedArticles";
import { HomeContentGrid } from "@/components/home/HomeContentGrid";
import { HomeHero } from "@/components/home/HomeHero";
import { Newsletter } from "@/components/home/Newsletter";
import { SiteShell } from "@/components/site/SiteShell";
import { getAllArticles, getAllCategories } from "@/lib/articles";

export default function Home() {
  const articles = getAllArticles();
  const categories = getAllCategories();

  return (
    <SiteShell>
      <HomeHero />
      <FeaturedArticles articles={articles} />
      <HomeContentGrid categories={categories} latestArticles={articles} />
      <BeginnerGuide />
      <Newsletter />
    </SiteShell>
  );
}
