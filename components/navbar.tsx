"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { Moon, Sun, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const neighborhoods = ["Indiranagar", "HSR Layout", "Koramangala", "Whitefield"];

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setTimeout(() => setMounted(true), 0);
  }, []);

  const toggleTheme = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const newTheme = theme === "dark" ? "light" : "dark";

    if (
      !("startViewTransition" in document) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setTheme(newTheme);
      return;
    }

    const x = e.clientX;
    const y = e.clientY;

    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const transition = (document as any).startViewTransition(() => {
      setTheme(newTheme);
    });

    await transition.ready;

    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${endRadius}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration: 450,
        easing: "cubic-bezier(0.4, 0, 0.2, 1)",
        pseudoElement: "::view-transition-new(root)",
      }
    );
  };

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-stone-50/60 dark:bg-zinc-950/50 border-b border-stone-200/60 dark:border-zinc-800/50 transition-colors duration-300">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-10">
          <Link href="/" className="flex items-center min-h-[44px] gap-0" aria-label="Namma Living — Home">
            <span className="font-sans font-bold tracking-widest text-xs md:text-sm text-zinc-900 dark:text-zinc-100 uppercase">
              NAMMA
            </span>
            <span className="font-serif italic text-base md:text-lg text-amber-600 dark:text-amber-500 ml-1">
              Living
            </span>
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
            <Link
              href="/shortlist"
              className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full bg-stone-200/50 dark:bg-zinc-800/50 hover:bg-stone-300/50 dark:hover:bg-zinc-700/50 text-zinc-700 dark:text-zinc-300 transition-colors duration-200"
              aria-label="View shortlist"
            >
              <Heart className="w-5 h-5" />
            </Link>
          )}

          {mounted && (
            <button
              onClick={toggleTheme}
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
