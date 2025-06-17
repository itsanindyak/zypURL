"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Scissors, Loader2 } from 'lucide-react';
import { isValidUrl } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface UrlFormProps {
  onShortenUrl: (url: string) => void;
  isLoading: boolean;
}

export function UrlForm({ onShortenUrl, isLoading }: UrlFormProps) {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url.trim()) {
      setError('Please enter a URL');
      return;
    }
    
    // Basic URL validation
    if (!isValidUrl(url)) {
      setError('Please enter a valid URL');
      toast({
        title: "Invalid URL",
        description: "Please enter a valid URL including http:// or https://",
        variant: "destructive",
      });
      return;
    }
    
    setError('');
    onShortenUrl(url);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="relative">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Input
              type="url"
              placeholder="Paste your long URL here"
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
                if (error) setError('');
              }}
              className={`pr-10 h-12 text-base ${error ? 'border-destructive focus-visible:ring-destructive' : ''}`}
            />
          </div>
          <Button 
            type="submit" 
            size="lg"
            disabled={isLoading}
            className="h-12 px-5 transition-all duration-200 transform active:scale-95"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Shortening
              </>
            ) : (
              <>
                <Scissors className="mr-2 h-4 w-4" />
                Shorten URL
              </>
            )}
          </Button>
        </div>
        {error && (
          <p className="text-destructive text-sm mt-1">{error}</p>
        )}
      </div>
      
      <p className="text-xs text-muted-foreground text-center">
        By using our service, you agree to our Terms of Service and Privacy Policy
      </p>
    </form>
  );
}