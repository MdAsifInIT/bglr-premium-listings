"use client";

import { Loader2 } from "lucide-react";

interface SearchStatusBarProps {
  count: number;
  isLoading: boolean;
}

export function SearchStatusBar({ count, isLoading }: SearchStatusBarProps) {
  return (
    <div className="flex items-center justify-between text-xs font-medium text-zinc-500 dark:text-zinc-400 bg-stone-100/50 dark:bg-zinc-900/50 px-3 py-2 rounded-lg border border-stone-200/50 dark:border-zinc-800/50 mb-4">
      <div className="flex items-center gap-2">
        <span>{count} premium {count === 1 ? "listing" : "listings"} in view</span>
      </div>
      {isLoading && (
        <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-500">
          <Loader2 className="w-3 h-3 animate-spin" />
          <span>Searching area...</span>
        </div>
      )}
      {!isLoading && count === 0 && (
        <span className="text-zinc-400 dark:text-zinc-500 italic font-normal">Drag map to explore</span>
      )}
    </div>
  );
}
