import Link from 'next/link';
import { Scissors } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full flex justify-center border-t py-6 md:py-8">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8">
        <div className="flex items-center gap-2">
          <Scissors className="h-5 w-5 text-primary" />
          <span className="text-lg font-semibold">ZyP</span>
        </div>
        
        <div className="text-center md:text-left text-sm text-muted-foreground">
          <p>
            &copy; {currentYear} itsanink. All rights reserved.
          </p>
        </div>
        
        
      </div>
    </footer>
  );
}