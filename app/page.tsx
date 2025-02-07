import ParticleBackground from '@/components/particle-background';
import GameCategories from '@/components/game-categories';
import BannerCarousel from '@/components/banner-carousel';
import SearchBar from '@/components/search-bar';
import CategoriesBar from '@/components/categories-bar';

export default function Home() {
  return (
    <div className="relative min-h-screen">
      <ParticleBackground />
      
      <section className="relative z-10">
        <BannerCarousel />
        <SearchBar />
        <CategoriesBar />
        <h1 className="text-4xl font-bold mb-8 text-[#FFD700] px-4">Featured Games</h1>
        <GameCategories />
      </section>
    </div>
  );
}