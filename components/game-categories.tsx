'use client';

import { useRef, useState } from 'react';
import GameCard from '@/components/game-card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Game {
  id: number;
  title: string;
  image: string;
  category: string;
  provider?: string;
  rtp?: string;
}

interface Category {
  title: string;
  games: Game[];
}

const categories: Category[] = [
  {
    title: "Slots",
    games: [
      {
        id: 1,
        title: "Golden Dragon",
        image: "https://images.unsplash.com/photo-1634443686889-d0e9726ba84a?w=800&q=80",
        category: "Slots",
        provider: "NetEnt",
        rtp: "96.5%"
      },
      {
        id: 2,
        title: "Fortune Tiger",
        image: "https://images.unsplash.com/photo-1585435421671-0c16764628ce?w=800&q=80",
        category: "Slots",
        provider: "Pragmatic Play",
        rtp: "97.2%"
      },
      {
        id: 3,
        title: "Mystic Forest",
        image: "https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?w=800&q=80",
        category: "Slots",
        provider: "Microgaming",
        rtp: "95.8%"
      }
    ]
  },
  {
    title: "Poker",
    games: [
      {
        id: 4,
        title: "Texas Hold'em",
        image: "https://images.unsplash.com/photo-1511193311914-0346f16efe90?w=800&q=80",
        category: "Poker",
        provider: "Evolution Gaming"
      },
      {
        id: 5,
        title: "Caribbean Stud",
        image: "https://images.unsplash.com/photo-1544698310-74ea9d1c8258?w=800&q=80",
        category: "Poker",
        provider: "Playtech"
      }
    ]
  },
  {
    title: "Crash Games",
    games: [
      {
        id: 6,
        title: "Aviator",
        image: "https://images.unsplash.com/photo-1568607689150-17e625c1586e?w=800&q=80",
        category: "Crash Games",
        provider: "Spribe"
      },
      {
        id: 7,
        title: "Spaceman",
        image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800&q=80",
        category: "Crash Games",
        provider: "Pragmatic Play"
      }
    ]
  },
  {
    title: "Live Casino",
    games: [
      {
        id: 8,
        title: "Lightning Roulette",
        image: "https://images.unsplash.com/photo-1606167668584-78701c57f13d?w=800&q=80",
        category: "Live Casino",
        provider: "Evolution Gaming"
      },
      {
        id: 9,
        title: "Blackjack VIP",
        image: "https://images.unsplash.com/photo-1509009082772-593008ff9d77?w=800&q=80",
        category: "Live Casino",
        provider: "Pragmatic Play Live"
      }
    ]
  }
];

const GameCategories = () => {
  const [scrollStates, setScrollStates] = useState<{ [key: string]: { left: boolean; right: boolean } }>(
    Object.fromEntries(categories.map(cat => [cat.title, { left: false, right: true }]))
  );
  
  const scrollContainers = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const handleScroll = (category: string) => {
    const container = scrollContainers.current[category];
    if (!container) return;

    const { scrollLeft, scrollWidth, clientWidth } = container;
    setScrollStates(prev => ({
      ...prev,
      [category]: {
        left: scrollLeft > 0,
        right: scrollLeft < scrollWidth - clientWidth - 10
      }
    }));
  };

  const scroll = (category: string, direction: 'left' | 'right') => {
    const container = scrollContainers.current[category];
    if (!container) return;

    const scrollAmount = 600;
    const start = container.scrollLeft;
    const target = direction === 'left'
      ? Math.max(0, start - scrollAmount)
      : Math.min(container.scrollWidth - container.clientWidth, start + scrollAmount);

    container.scrollTo({
      left: target,
      behavior: 'smooth'
    });
  };

  return (
    <div className="space-y-12">
      <style jsx global>{`
        .hide-scrollbar {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      {categories.map((category) => (
        <section key={category.title} className="space-y-4">
          <div className="flex items-center justify-between px-4">
            <h2 className="text-2xl font-bold text-[#FFD700]">{category.title}</h2>
            <button className="text-sm text-[#FFD700]/80 hover:text-[#FFD700] transition-colors">
              View All
            </button>
          </div>

          <div className="relative group">
            {scrollStates[category.title].left && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-black/20 hover:bg-black/40 text-white rounded-full transition-all duration-200 backdrop-blur-sm opacity-0 group-hover:opacity-100"
                onClick={() => scroll(category.title, 'left')}
                aria-label="Scroll left"
              >
                <ChevronLeft className="h-8 w-8" />
              </Button>
            )}

            <div
              ref={el => scrollContainers.current[category.title] = el}
              onScroll={() => handleScroll(category.title)}
              className="w-full overflow-x-scroll hide-scrollbar"
            >
              <div className="flex gap-4 px-4 py-4">
                {category.games.map((game) => (
                  <div key={game.id} className="w-[300px] flex-none">
                    <GameCard {...game} />
                  </div>
                ))}
              </div>
            </div>

            {scrollStates[category.title].right && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-black/20 hover:bg-black/40 text-white rounded-full transition-all duration-200 backdrop-blur-sm opacity-0 group-hover:opacity-100"
                onClick={() => scroll(category.title, 'right')}
                aria-label="Scroll right"
              >
                <ChevronRight className="h-8 w-8" />
              </Button>
            )}
          </div>
        </section>
      ))}
    </div>
  );
};

export default GameCategories;