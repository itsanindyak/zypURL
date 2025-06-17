"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ModeToggle } from '../mode-toggle';
import { Scissors } from 'lucide-react';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`sticky px-8 py-4 flex justify-center top-0 z-50 w-full transition-all duration-200 ${
      isScrolled ? 'bg-background/80 backdrop-blur-md border-b' : 'bg-transparent'
    }`}>
      <div className="container h-16 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center space-x-2 transition-opacity duration-200 hover:opacity-80"
        >
          <Scissors className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">ZyP</span>
        </Link>
        
        <div className="flex items-center ">
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}