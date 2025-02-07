'use client';
import { useState } from 'react';
import { Menu, X, Crown, Gamepad2, Car as Cards, Dice1 as Dice, Tv, Table2, Gamepad, Target, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { AuthModals } from './auth/auth-modals';
import { BottomNavigation } from './bottom-navigation';

const quickAccess = [
  { emoji: '🎮', icon: Gamepad, label: 'Popular Games', gradient: 'from-purple-500 to-indigo-500' },
  { emoji: '🎯', icon: Target, label: 'Hacked Games', gradient: 'from-pink-500 to-rose-500' },
  { emoji: '❓', icon: HelpCircle, label: 'FAQ', gradient: 'from-amber-400 to-orange-500' },
];

const categories = [
  { icon: Gamepad2, label: 'Slots' },
  { icon: Cards, label: 'Poker' },
  { icon: Table2, label: 'Blackjack' },
  { icon: Dice, label: 'Crash Games' },
  { icon: Tv, label: 'Live Casino' },
  { icon: Table2, label: 'Table Games' },
];

export default function Navigation({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  return (
    <div className="min-h-screen">
      <AuthModals
        isLoginOpen={isLoginOpen}
        isRegisterOpen={isRegisterOpen}
        onLoginClose={() => setIsLoginOpen(false)}
        onRegisterClose={() => setIsRegisterOpen(false)}
        onSwitchToRegister={() => {
          setIsLoginOpen(false);
          setIsRegisterOpen(true);
        }}
        onSwitchToLogin={() => {
          setIsRegisterOpen(false);
          setIsLoginOpen(true);
        }}
      />

      {/* Top Navigation */}
      <header className="h-[60px] border-b border-[#FFD700]/20 bg-[#1A1A1A] fixed top-0 left-0 right-0 z-50">
        <div className="flex items-center justify-between h-full px-4">

          <div className="flex items-center gap-2">
            <Crown className="h-8 w-8 text-[#FFD700]" />
            <span className="text-xl font-bold text-[#FFD700]">Golden Crown</span>
          </div>
          <div className="flex items-center gap-2">
            {isLoggedIn ? (
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            ) : (
              <div className="hidden md:flex gap-2">
                <Button
                  variant="ghost"
                  className="text-[#FFD700]"
                  onClick={() => setIsLoginOpen(true)}
                >
                  Login
                </Button>
                <Button
                  className="bg-[#FFD700] text-black hover:bg-[#FFD700]/90"
                  onClick={() => setIsRegisterOpen(true)}
                >
                  Register
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Sidebar Navigation */}
      <aside
        className={cn(
          "fixed left-0 top-[60px] h-[calc(100vh-60px)] w-64 bg-[#1A1A1A] border-r border-[#FFD700]/20 transition-transform duration-300 z-30",
          !isOpen && "transform -translate-x-full md:translate-x-0"
        )}
      >
        <ScrollArea className="h-full pb-20 md:pb-0">
        {/* Quick Access Section */}
        <div className="p-4 space-y-4">
          <h2 className="text-sm font-semibold text-[#FFD700] uppercase tracking-wider mb-3">
            Quick Access
          </h2>
          <div className="grid gap-3">
            {quickAccess.map((item) => (
              <button
                key={item.label}
                className={cn(
                  "relative w-full h-16 rounded-2xl bg-gradient-to-br",
                  item.gradient,
                  "transform transition-all duration-200 hover:scale-[1.02] hover:shadow-lg",
                  "overflow-hidden group"
                )}
              >
                {/* Ripple effect container */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-200" />
        
                <div className="relative h-full flex items-center justify-between px-4">
                  <span className="text-2xl">{item.emoji}</span>
                  <span
                    className="text-sm font-medium"
                    style={{
                      color: "rgba(255, 255, 255, 0.93)", // Texto branco com opacidade reduzida
                      textShadow: `
                        -1px -1px 1px rgba(0, 0, 0, 0.5),
                         1px -1px 1px rgba(0, 0, 0, 0.5),
                        -1px  1px 1px rgba(0, 0, 0, 0.5),
                         1px  1px 1px rgba(0, 0, 0, 0.5),
                        -1px  0px 1px rgba(0, 0, 0, 0.5),
                         1px  0px 1px rgba(0, 0, 0, 0.5),
                         0px -1px 1px rgba(0, 0, 0, 0.5),
                         0px  1px 1px rgba(0, 0, 0, 0.5)
                      `, // Contorno externo com sombra suave e semi-transparente
                    }}
                  >
                    {item.label}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

          {/* Categories Section */}
          <div className="p-4">
            <h2 className="text-sm font-semibold text-[#FFD700] uppercase tracking-wider mb-3">
              Categories
            </h2>
            <nav className="space-y-1">
              {categories.map((category) => (
                <Button
                  key={category.label}
                  variant="ghost"
                  className={cn(
                    "w-full justify-start gap-2 rounded-lg transition-all duration-200",
                    "hover:bg-white/10",
                    activeCategory === category.label && "bg-white/10 text-[#FFD700]",
                    "group relative overflow-hidden"
                  )}
                  onClick={() => setActiveCategory(category.label)}
                >
                  {/* Active indicator */}
                  {activeCategory === category.label && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#FFD700] rounded-r" />
                  )}
                  
                  <category.icon className={cn(
                    "h-5 w-5 transition-colors duration-200",
                    activeCategory === category.label ? "text-[#FFD700]" : "text-white/70 group-hover:text-white"
                  )} />
                  <span className={cn(
                    "font-medium transition-colors duration-200",
                    activeCategory === category.label ? "text-[#FFD700]" : "text-white/70 group-hover:text-white"
                  )}>
                    {category.label}
                  </span>
                </Button>
              ))}
            </nav>
          </div>
        </ScrollArea>
      </aside>

      {/* Bottom Navigation */}
      <BottomNavigation
        isOpen={isOpen}
        onMenuClick={() => setIsOpen(!isOpen)}
        onLoginClick={() => setIsLoginOpen(true)}
        isLoggedIn={isLoggedIn}
      />

      {/* Main Content */}
      <main className={cn(
        "pt-[60px] pb-20 md:pb-0 transition-all duration-300",
        "md:pl-64"
      )}>
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
}