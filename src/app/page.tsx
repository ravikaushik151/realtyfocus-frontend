import RootLayout from '@/components/layout/RootLayout';
import HeroSection from '@/components/home/HeroSection';
import RecommendedSection from '@/components/home/RecommendedSection';
import FeaturedProjects from '@/components/home/FeaturedProjects';
import TrendingProjects from '@/components/home/TrendingProjects';

export default function Home() {
  return (

    <RootLayout>
      <HeroSection />
      <RecommendedSection />
      <FeaturedProjects />
      <TrendingProjects />
    </RootLayout>
  );
}
