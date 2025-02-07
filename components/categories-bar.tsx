'use client';

import { useState, useRef } from 'react';
import { cn } from '@/lib/utils';
import { 
  Spade, // Inicio de Categories
  ChartLine, 
  Bomb, 
  PawPrint, 
  Dices, 
  TvMinimalPlay, 
  Club, 
  Bot, // Final de Categories
  ChevronLeft, // Inicio das Arrow
  ChevronRight // Final das Arrow
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const categories = [
  { icon: Spade, label: 'Cartas' },
  { icon: ChartLine, label: 'Crash' },
  { icon: Bomb, label: 'Mines' },
  { icon: PawPrint, label: 'Fortune Tiger' },
  { icon: Dices, label: 'Dados' },
  { icon: TvMinimalPlay, label: 'Ao Vivo' },
  { icon: Club, label: 'Cartas Ao vivo' },
  { icon: Bot, label: 'Slot Games' },
];

export default function CategoriesBar() {
  const [activeCategory, setActiveCategory] = useState('Ação');
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setShowLeftArrow(scrollLeft > 0);
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
  };

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    
    const scrollAmount = 300;
    const container = scrollContainerRef.current;
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
    <div className="w-full mb-12 relative group">
      <style jsx global>{`
        .hide-scrollbar {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      {showLeftArrow && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-black/20 hover:bg-black/40 text-white rounded-full transition-all duration-200 backdrop-blur-sm opacity-0 group-hover:opacity-100"
          onClick={() => scroll('left')}
          aria-label="Scroll left"
        >
          <ChevronLeft className="h-8 w-8" />
        </Button>
      )}

      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="w-full overflow-x-scroll hide-scrollbar"
      >
        <div className="flex gap-4 px-4">
          {categories.map(({ icon: Icon, label }) => (
            <button
              key={label}
              onClick={() => setActiveCategory(label)}
              className={cn(
                "flex-none flex flex-col items-center justify-center w-24 h-20 rounded-xl transition-all duration-200",
                "bg-black/50 border border-[#FFD700]/20 shadow-lg",
                "hover:border-[#FFD700]/50 hover:bg-black/70",
                activeCategory === label && [
                  "border-[#FFD700] bg-[#FFD700]/10",
                  "before:absolute before:inset-0 before:bg-[#FFD700]/5 before:rounded-xl before:animate-pulse"
                ],
                "relative group"
              )}
            >
              <Icon className={cn(
                "h-6 w-6 mb-2 transition-colors duration-200",
                activeCategory === label ? "text-[#FFD700]" : "text-white/70 group-hover:text-white"
              )} />
              <span className={cn(
                "text-sm font-medium transition-colors duration-200",
                activeCategory === label ? "text-[#FFD700]" : "text-white/70 group-hover:text-white"
              )}>
                {label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {showRightArrow && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-black/20 hover:bg-black/40 text-white rounded-full transition-all duration-200 backdrop-blur-sm opacity-0 group-hover:opacity-100"
          onClick={() => scroll('right')}
          aria-label="Scroll right"
        >
          <ChevronRight className="h-8 w-8" />
        </Button>
      )}
    </div>
  );
}