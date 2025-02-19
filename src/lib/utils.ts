import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export type Bases = "default" | "custom"
export type Variants = "default" | "secondary" | "outline" | "ghost" | "information" | "success" | "destructive" | "warning" | "link"
export type Sizes = "default" | "sm" | "lg" | "wd" | "icon"


export function classNames(...classes: (string | boolean | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function throttle(mainFunction:  any, delay: number | undefined) {
  let timerFlag: ReturnType<typeof setTimeout>|null = null; // Variable to keep track of the timer

  // Returning a throttled version
  return (...args: any) => {
    if (timerFlag === null) { // If there is no timer currently running
      mainFunction(...args as [any]); // Execute the main function
      timerFlag = setTimeout(() => { // Set a timer to clear the timerFlag after the specified delay
        timerFlag = null; // Clear the timerFlag to allow the main function to be executed again
      }, delay);
    }
  };
}


export function arrayDedupe<T>(array: T[], b: T, key: keyof T) {
  let items: T[] = array.filter((c: T) => c[key] !== b[key]);
   return [...items, b].reverse();

}

export function arrayRemove<T>(array: T[], b: T, key: keyof T) {
  let items: T[] = array.filter((c: T) => c[key] !== b[key]);
  return items;

}