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
