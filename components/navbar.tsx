"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const neighborhoods = ["Indiranagar", "HSR Layout", "Koramangala", "Whitefield"];

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-stone-50/60 dark:bg-zinc-950/50 border-b border-stone-200/60 dark:border-zinc-800/50 transition-colors duration-300">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-10">
          <Link href="/" className="font-serif text-2xl tracking-tight text-zinc-900 dark:text-zinc-100 font-bold min-h-[44px] flex items-center">
            BGLR<span className="text-amber-600 dark:text-amber-500">Premium</span>
          </Link>
          <nav className="hidden md:flex items-center gap-4">
            {neighborhoods.map((n) => (
              <Link 
                key={n} 
                href={`/search?locality=${encodeURIComponent(n)}`}
                className="text-sm font-medium tracking-wide text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors duration-200 min-h-[44px] min-w-[44px] flex items-center px-2"
              >
                {n}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="relative min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full bg-stone-200/50 dark:bg-zinc-800/50 hover:bg-stone-300/50 dark:hover:bg-zinc-700/50 transition-colors duration-200"
              aria-label="Toggle theme"
            >
              <motion.div
                initial={false}
                animate={{
                  rotate: theme === "dark" ? 0 : 180,
                  scale: theme === "dark" ? 1 : 0,
                }}
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <Moon className="w-5 h-5 text-zinc-100" />
              </motion.div>
              <motion.div
                initial={false}
                animate={{
                  rotate: theme === "light" ? 0 : -180,
                  scale: theme === "light" ? 1 : 0,
                }}
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <Sun className="w-5 h-5 text-zinc-900" />
              </motion.div>
            </button>
          )}

          <Link 
            href="/auth/login" 
            className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors duration-200 hidden sm:flex items-center min-h-[44px] px-2"
          >
            Sign In
          </Link>
          <Link 
            href="/listings/create"
            className="inline-flex min-h-[44px] items-center justify-center rounded-lg bg-emerald-900 dark:bg-emerald-950 px-6 text-sm font-medium text-white dark:text-zinc-100 transition-all duration-200 hover:bg-emerald-800 dark:hover:bg-emerald-900 border border-emerald-800/50 dark:border-emerald-900/50 hover:scale-[1.02]"
          >
            Post Property
          </Link>
        </div>
      </div>
    </header>
  );
}
