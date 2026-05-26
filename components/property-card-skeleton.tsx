"use client";

export function PropertyCardSkeleton() {
  return (
    <div className="rounded-xl overflow-hidden bg-white dark:bg-zinc-900 border border-stone-200/60 dark:border-zinc-800/50 animate-pulse">
      <div className="aspect-[4/3] w-full bg-stone-100 dark:bg-zinc-800" />
      <div className="p-5 flex flex-col gap-4">
        <div className="flex justify-between items-center gap-4">
          <div className="h-5 bg-stone-200 dark:bg-zinc-800 rounded w-2/3" />
          <div className="h-5 bg-stone-200 dark:bg-zinc-800 rounded w-1/4" />
        </div>
        <div className="flex gap-4">
          <div className="h-4 bg-stone-200 dark:bg-zinc-800 rounded w-1/3" />
          <div className="h-4 bg-stone-200 dark:bg-zinc-800 rounded w-1/4" />
        </div>
      </div>
    </div>
  );
}
