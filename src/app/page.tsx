import RootLayout from '@/components/layout/RootLayout';
import HeroSection from '@/components/home/HeroSection';
import RecommendedSection from '@/components/home/RecommendedSection';
import FeaturedProjects from '@/components/home/FeaturedProjects';
import TrendingProjects from '@/components/home/TrendingProjects';
import ServicesSection from '@/components/home/ServiceSections';
import PopularToolsSection from '@/components/home/PopularToolsSection';
import ProjectOverview from '@/components/home/ProjectOverview';
import TopCities from '@/components/home/TopCities';

export default function Home() {
  return (

    <RootLayout>
      <HeroSection />
                  <ProjectOverview/>

      <RecommendedSection />
      <FeaturedProjects />
      <ServicesSection/>
      <TopCities/>
      <TrendingProjects />

          <PopularToolsSection/>

    </RootLayout>
  );
}
