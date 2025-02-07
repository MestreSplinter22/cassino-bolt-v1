'use client';

import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import useEmblaCarousel from 'embla-carousel-react';

const banners = [
  {
    id: 1,
    title: '',
    image: 'https://imagedelivery.net/BgH9d8bzsn4n0yijn4h7IQ/6b8fa979-ffe3-4e65-0535-8474cced3b00/w=1200',
    description: '',
  },
  {
    id: 2,
    title: '',
    image: 'https://imagedelivery.net/BgH9d8bzsn4n0yijn4h7IQ/89e90b60-bd28-4cdc-3dd4-8c3491804f00/w=1200',
    description: '',
  },
  {
    id: 3,
    title: '',
    image: 'https://imagedelivery.net/BgH9d8bzsn4n0yijn4h7IQ/2efd07b7-9d73-4442-5fd8-a33b970c6300/w=1200',
    description: '',
  },
];

export default function BannerCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [isPaused, setIsPaused] = useState(false);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);

    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (!emblaApi || isPaused) return;

    const intervalId = setInterval(() => {
      emblaApi.scrollNext();
    }, 15000);

    return () => clearInterval(intervalId);
  }, [emblaApi, isPaused]);

  return (
    <div 
      className="relative overflow-hidden rounded-lg mb-8"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent z-10 pointer-events-none" />
      
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex touch-pan-y">
          {banners.map((banner) => (
            <div
              key={banner.id}
              className="relative flex-[0_0_100%] min-w-0"
            >
              <div className="relative aspect-[2.4/1] md:aspect-[3.2/1]">
                <img
                  src={banner.image}
                  alt={banner.title}
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16 z-20">
                  <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
                    {banner.title}
                  </h2>
                  <p className="text-lg md:text-xl text-white/90 max-w-md drop-shadow">
                    {banner.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/20 hover:bg-black/40 text-white rounded-full transition-all duration-200 backdrop-blur-sm"
        onClick={scrollPrev}
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-8 w-8" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/20 hover:bg-black/40 text-white rounded-full transition-all duration-200 backdrop-blur-sm"
        onClick={scrollNext}
        aria-label="Next slide"
      >
        <ChevronRight className="h-8 w-8" />
      </Button>

      {/* Pagination Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {scrollSnaps.map((_, index) => (
          <button
            key={index}
            className={cn(
              "w-2 h-2 rounded-full transition-all duration-200",
              selectedIndex === index
                ? "bg-white w-6"
                : "bg-white/50 hover:bg-white/75"
            )}
            onClick={() => scrollTo(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}