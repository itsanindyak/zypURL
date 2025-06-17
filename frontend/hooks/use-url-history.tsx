"use client";

import { useState, useEffect } from 'react';

export interface ShortenedUrlType {
  id: string;
  originalUrl: string;
  shortUrl: string;
  createdAt: string;
}

const STORAGE_KEY = 'url-shortener-history';
const MAX_HISTORY_ITEMS = 5;

export function useUrlHistory() {
  const [urlHistory, setUrlHistory] = useState<ShortenedUrlType[]>([]);
  
  // Load history from localStorage on initial render
  useEffect(() => {
    const savedHistory = localStorage.getItem(STORAGE_KEY);
    if (savedHistory) {
      try {
        setUrlHistory(JSON.parse(savedHistory));
      } catch (error) {
        console.error('Failed to parse URL history', error);
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);
  
  // Save history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(urlHistory));
  }, [urlHistory]);
  
  const addUrl = (url: ShortenedUrlType) => {
    setUrlHistory(prev => {
      // Remove duplicates based on originalUrl
      const filtered = prev.filter(item => item.originalUrl !== url.originalUrl);
      
      // Add new URL at the beginning and limit to MAX_HISTORY_ITEMS
      return [url, ...filtered].slice(0, MAX_HISTORY_ITEMS);
    });
  };
  
  const clearHistory = () => {
    setUrlHistory([]);
    localStorage.removeItem(STORAGE_KEY);
  };
  
  return {
    urlHistory,
    addUrl,
    clearHistory,
  };
}