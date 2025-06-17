import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Validates if a string is a properly formatted URL
 */
export function isValidUrl(url: string): boolean {
  try {
    const parsedUrl = new URL(url);
    return parsedUrl.protocol === 'http:' || parsedUrl.protocol === 'https:';
  } catch (error) {
    return false;
  }
}

/**
 * Formats a date string into a human-readable format
 */
export function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    
    // If today, show time only
    const today = new Date();
    if (date.toDateString() === today.toDateString()) {
      return date.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
    }
    
    // Otherwise show date
    return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
  } catch (error) {
    return 'Invalid date';
  }
}