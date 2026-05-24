"use client";

import Link from "next/link";

const neighborhoods = ["Indiranagar", "HSR Layout", "Koramangala", "Whitefield"];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-zinc-950/80 border-b border-zinc-800/50">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-10">
          <Link href="/" className="font-serif text-2xl tracking-tight text-zinc-100 font-bold">
            BGLR<span className="text-amber-500">Premium</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            {neighborhoods.map((n) => (
              <Link 
                key={n} 
                href={`/search?locality=${encodeURIComponent(n)}`}
                className="text-sm font-medium tracking-wide text-zinc-400 hover:text-zinc-100 transition-colors duration-200"
              >
                {n}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-6">
          <Link 
            href="/auth/login" 
            className="text-sm font-medium text-zinc-400 hover:text-zinc-100 transition-colors duration-200 hidden sm:block"
          >
            Sign In
          </Link>
          <Link 
            href="/listings/create"
            className="inline-flex h-10 items-center justify-center rounded-lg bg-emerald-950 px-6 text-sm font-medium text-zinc-100 transition-all duration-200 hover:bg-emerald-900 border border-emerald-900/50 hover:scale-[1.02]"
          >
            Post Property
          </Link>
        </div>
      </div>
    </header>
  );
}
