import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diffInMilliseconds = now.getTime() - date.getTime();
  const diffInSeconds = Math.floor(diffInMilliseconds / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInDays > 30) {
    return date.toLocaleDateString();
  } else if (diffInDays > 1) {
    return `${diffInDays} days ago`;
  } else if (diffInDays === 1) {
    return "yesterday";
  } else if (diffInHours > 1) {
    return `${diffInHours} hours ago`;
  } else if (diffInHours === 1) {
    return "1 hour ago";
  } else if (diffInMinutes > 1) {
    return `${diffInMinutes} minutes ago`;
  } else if (diffInMinutes === 1) {
    return "1 minute ago";
  } else {
    return "just now";
  }
}
