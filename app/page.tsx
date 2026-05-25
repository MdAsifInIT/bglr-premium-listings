import { PropertyFeed } from "@/components/property-feed";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Premium Real Estate in Bengaluru | BGLRPremium",
  description: "Discover curated luxury homes, villas, and apartments in Bengaluru's most exclusive neighborhoods: Indiranagar, Koramangala, Whitefield, and HSR Layout.",
  keywords: ["luxury homes bengaluru", "premium real estate bangalore", "villas in whitefield", "apartments in indiranagar", "high-end properties bangalore"],
};

export default function HomePage() {
  return (
    <div className="flex flex-col flex-1">
      <section className="relative py-24 lg:py-32 px-6 flex flex-col items-center justify-center text-center border-b border-stone-200 dark:border-zinc-800/50 bg-gradient-to-b from-stone-100/50 to-stone-50 dark:from-zinc-900/50 dark:to-zinc-950 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-stone-200/50 via-stone-50 to-stone-50 dark:from-zinc-800/20 dark:via-zinc-950 dark:to-zinc-950 pointer-events-none"></div>
        <div className="max-w-4xl mx-auto z-10 relative">
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight leading-[1.1] mb-6">
            Curated Luxury Living in <br className="hidden md:block" />
            <span className="text-amber-600 dark:text-amber-500 italic">Bengaluru</span>
          </h1>
          <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 font-sans max-w-2xl mx-auto mb-10 leading-relaxed font-light">
            Discover an exclusive collection of premium homes, villas, and penthouses in the city's most coveted neighborhoods.
          </p>
        </div>
      </section>

      <section className="flex-1 py-16 px-6 bg-stone-50 dark:bg-zinc-950">
        <div className="container mx-auto max-w-7xl">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="font-serif text-2xl md:text-3xl font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
                Exclusive Properties
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm md:text-base font-light">
                Explore handpicked listings meeting our rigorous luxury standards.
              </p>
            </div>
          </div>
          
          <PropertyFeed />
        </div>
      </section>
    </div>
  );
}
