'use client';

import { useState, useEffect } from 'react';
import { Menu, Home, Wallet, HelpCircle, User, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface BottomNavigationProps {
  isOpen: boolean;
  onMenuClick: () => void;
  onLoginClick: () => void;
  isLoggedIn: boolean;
}

export function BottomNavigation({ isOpen, onMenuClick, onLoginClick, isLoggedIn }: BottomNavigationProps) {
  const [isScrollingUp, setIsScrollingUp] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activeItem, setActiveItem] = useState<string>('home');

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrollingUp(currentScrollY < lastScrollY);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <nav
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50 transition-transform duration-300 md:hidden",
        !isScrollingUp && "translate-y-full",
        "bg-black/80 backdrop-blur-lg border-t border-[#FFD700]/20",
        "safe-bottom pb-[env(safe-area-inset-bottom)]"
      )}
    >
      <div className="flex items-center justify-around h-16 px-4">
        <Button
          variant="ghost"
          size="icon"
          className="relative group"
          onClick={onMenuClick}
          aria-label="Menu"
        >
          {isOpen ? (
            <X className="h-6 w-6 text-[#FFD700] transition-transform duration-300 rotate-90 group-hover:rotate-180" />
          ) : (
            <Menu className="h-6 w-6 text-[#FFD700] transition-transform duration-300 group-hover:rotate-90" />
          )}
        </Button>

        {isLoggedIn ? (
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "relative group",
              activeItem === 'profile' && "after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-1 after:h-1 after:bg-[#FFD700] after:rounded-full"
            )}
            onClick={() => setActiveItem('profile')}
            aria-label="Profile"
          >
            <Avatar className="h-8 w-8 transition-transform duration-300 group-hover:scale-110">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </Button>
        ) : (
          <Button
            variant="ghost"
            size="icon"
            className="relative group"
            onClick={onLoginClick}
            aria-label="Login"
          >
            <User className="h-6 w-6 text-[#FFD700] transition-transform duration-300 group-hover:scale-110" />
          </Button>
        )}

        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "relative group scale-125",
            activeItem === 'home' && [
              "after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-1 after:h-1 after:bg-[#FFD700] after:rounded-full",
              "before:absolute before:inset-0 before:bg-[#FFD700]/5 before:rounded-full before:animate-pulse"
            ]
          )}
          onClick={() => setActiveItem('home')}
          aria-label="Home"
        >
          <Home className="h-6 w-6 text-[#FFD700] transition-transform duration-300 group-hover:scale-110" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "relative group",
            activeItem === 'deposit' && "after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-1 after:h-1 after:bg-[#FFD700] after:rounded-full"
          )}
          onClick={() => setActiveItem('deposit')}
          aria-label="Deposit"
        >
          <Wallet className="h-6 w-6 text-[#FFD700] transition-transform duration-300 group-hover:scale-110" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "relative group",
            activeItem === 'support' && "after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-1 after:h-1 after:bg-[#FFD700] after:rounded-full"
          )}
          onClick={() => setActiveItem('support')}
          aria-label="Support"
        >
          <HelpCircle className="h-6 w-6 text-[#FFD700] transition-transform duration-300 group-hover:scale-110" />
        </Button>
      </div>
    </nav>
  );
}