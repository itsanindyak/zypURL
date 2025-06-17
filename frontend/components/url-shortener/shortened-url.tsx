"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Check, Copy, ExternalLink } from 'lucide-react';
import { ShortenedUrlType } from '@/hooks/use-url-history';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface ShortenedUrlProps {
  url: ShortenedUrlType;
}

export function ShortenedUrl({ url }: ShortenedUrlProps) {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();
  const link = process.env.NEXT_PUBLIC_URL;
  const urlLink:string =  `${link}/g/${url.shortUrl}`

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(urlLink);
      setCopied(true);
      
      toast({
        title: "Copied!",
        description: "URL copied to clipboard",
      });
      
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy URL",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="overflow-hidden border-2 border-primary/20 animate-in fade-in-0 zoom-in-95 duration-300">
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">Original URL</h3>
            <p className="text-sm truncate" title={url.originalUrl}>
              {url.originalUrl}
            </p>
          </div>
          
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-muted-foreground">Shortened URL</h3>
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className="relative w-full group">
                <div className="h-12 flex items-center px-4 border rounded-md bg-muted/50 w-full overflow-hidden">
                  <a 
                    href={urlLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary font-medium truncate hover:underline flex-1"
                  >
                    {urlLink}
                  </a>
                  <ExternalLink 
                    className="h-4 w-4 text-muted-foreground flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" 
                  />
                </div>
              </div>
              
              <Button
                onClick={copyToClipboard}
                variant="outline"
                size="icon"
                className={cn(
                  "h-12 w-12 sm:w-auto sm:px-4 transition-all duration-300",
                  copied ? "bg-green-500/10 border-green-500 text-green-500" : ""
                )}
              >
                {copied ? (
                  <Check className="h-4 w-4 sm:mr-2" />
                ) : (
                  <Copy className="h-4 w-4 sm:mr-2" />
                )}
                <span className="hidden sm:inline">{copied ? "Copied" : "Copy"}</span>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}