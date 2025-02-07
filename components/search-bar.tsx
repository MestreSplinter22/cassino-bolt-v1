'use client';

import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function SearchBar() {
  return (
    <div className="relative w-full max-w-[800px] mx-auto px-4 mb-8">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Pesquise um jogo de cassino..."
          className="w-full pl-10 bg-black/50 border-[#FFD700]/20 focus:border-[#FFD700]/50 h-12 text-base"
        />
      </div>
    </div>
  );
}