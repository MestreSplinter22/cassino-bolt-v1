'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Gamepad } from 'lucide-react';

interface GameCardProps {
  title: string;
  image: string;
  category: string;
  provider?: string;
  rtp?: string;
}

export default function GameCard({ title, image, category, provider, rtp }: GameCardProps) {
  return (
    <Card className="overflow-hidden bg-black/50 border-[#FFD700]/20 transition-all duration-300 hover:scale-105">
      <CardContent className="p-0">
        <div className="relative aspect-video">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
            loading="lazy"
          />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-2 p-4">
        <div className="w-full">
          <div className="flex justify-between items-center mb-1">
            <h3 className="font-semibold text-lg">{title}</h3>
            <span className="text-sm text-muted-foreground">{category}</span>
          </div>
          {(provider || rtp) && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
              {provider && <span>{provider}</span>}
              {rtp && <span>RTP: {rtp}</span>}
            </div>
          )}
        </div>
        <Button className="w-full bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black hover:opacity-90">
          <Gamepad className="mr-2 h-4 w-4" />
          Play Now
        </Button>
      </CardFooter>
    </Card>
  );
}