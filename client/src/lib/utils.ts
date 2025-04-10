import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(date);
}

export function formatTime(timeString: string): string {
  try {
    const [hours, minutes] = timeString.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    const hour = hours % 12 || 12;
    return `${hour}:${minutes.toString().padStart(2, '0')} ${period}`;
  } catch (e) {
    return timeString;
  }
}

export function getScrollAnimation(delay: number = 0) {
  return {
    hidden: { 
      y: 30,
      opacity: 0 
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        delay: delay
      }
    }
  };
}

export function truncateText(text: string, maxLength: number = 150): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

export function getImageUrl(path: string | null | undefined): string {
  if (!path) return 'https://via.placeholder.com/400x300?text=Devine+Senior+Living';
  if (path.startsWith('http')) return path;
  return `https://via.placeholder.com/400x300?text=${encodeURIComponent(path)}`;
}
