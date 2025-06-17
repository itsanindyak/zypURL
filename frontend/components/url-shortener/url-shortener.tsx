"use client";

import { useState, useEffect } from 'react';
import { UrlForm } from './url-form';
import { ShortenedUrl } from './shortened-url';
import { RecentUrls } from './recent-urls';
import { ShortenedUrlType, useUrlHistory } from '@/hooks/use-url-history';
import { useToast } from '@/hooks/use-toast';
import { shortenUrl } from '@/lib/url-service';

export function UrlShortener() {
  const [isLoading, setIsLoading] = useState(false);
  const [currentUrl, setCurrentUrl] = useState<ShortenedUrlType | null>(null);
  const { urlHistory, addUrl, clearHistory } = useUrlHistory();
  const { toast } = useToast();

  const handleShortenUrl = async (originalUrl: string) => {
    if (!originalUrl.trim()) {
      toast({
        title: "Error",
        description: "Please enter a valid URL",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const result = await shortenUrl(originalUrl);
      
      const newUrl: ShortenedUrlType = {
        id: Date.now().toString(),
        originalUrl,
        shortUrl: result.shortUrl,
        createdAt: new Date().toISOString(),
      };
      
      setCurrentUrl(newUrl);
      addUrl(newUrl);
      
      toast({
        title: "Success!",
        description: "Your URL has been shortened",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to shorten URL",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <UrlForm onShortenUrl={handleShortenUrl} isLoading={isLoading} />
      
      {currentUrl && (
        <ShortenedUrl url={currentUrl} />
      )}
      
      {urlHistory.length > 0 && (
        <RecentUrls 
          urls={urlHistory} 
          onSelect={setCurrentUrl}
          onClear={clearHistory}
        />
      )}
    </div>
  );
}