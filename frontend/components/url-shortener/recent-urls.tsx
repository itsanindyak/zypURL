"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, Clock, Trash2, ExternalLink } from "lucide-react";
import { ShortenedUrlType } from "@/hooks/use-url-history";
import { formatDate } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface RecentUrlsProps {
  urls: ShortenedUrlType[];
  onSelect: (url: ShortenedUrlType) => void;
  onClear: () => void;
}

export function RecentUrls({ urls, onSelect, onClear }: RecentUrlsProps) {
  const { toast } = useToast();
  const link = process.env.NEXT_PUBLIC_URL;
 

  const copyUrl = async (url: ShortenedUrlType, e: React.MouseEvent) => {
    e.stopPropagation();

     const link = process.env.NEXT_PUBLIC_URL;
    const urlLink:string =  `${link}/g/${url.shortUrl}`

    try {
      await navigator.clipboard.writeText(urlLink);
      toast({
        title: "Copied!",
        description: "URL copied to clipboard",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy URL",
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center">
            <Clock className="mr-2 h-4 w-4" />
            Recent URLs
          </CardTitle>

          <Button
            variant="ghost"
            size="sm"
            onClick={onClear}
            className="text-muted-foreground hover:text-destructive"
          >
            <Trash2 className="h-4 w-4 mr-1" />
            Clear All
          </Button>
        </div>
      </CardHeader>

      <CardContent className="grid gap-3">
        {urls.map((url) => (
          <div
            key={url.id}
            className="grid grid-cols-1 md:grid-cols-[2fr_3fr_auto] gap-2 items-center p-2 hover:bg-accent rounded-md cursor-pointer transition-colors"
            onClick={() => onSelect(url)}
          >
            <div
              className="truncate text-sm text-muted-foreground"
              title={url.originalUrl}
            >
              {url.originalUrl}
            </div>

            <div className="flex items-center text-sm">
              <a
                href={`${link}/g/${url.shortUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline truncate mr-1"
                onClick={(e) => e.stopPropagation()}
              >
                {url.shortUrl}
              </a>
              <ExternalLink className="h-3 w-3 text-muted-foreground flex-shrink-0" />
            </div>

            <div className="flex items-center gap-2 justify-self-end">
              <span className="text-xs text-muted-foreground hidden md:inline">
                {formatDate(url.createdAt)}
              </span>

              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={(e) => copyUrl(url, e)}
              >
                <Copy className="h-3 w-3" />
                <span className="sr-only">Copy</span>
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
