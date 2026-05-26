"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth, dataConnectClient } from "@/lib/firebase";
import { useListUserFavorites } from "@/src/dataconnect-generated/react";
import { PropertyCard, PropertyData } from "@/components/property-card";
import { PropertyCardSkeleton } from "@/components/property-card-skeleton";
import { Heart, ArrowLeft } from "lucide-react";

export default function ShortlistPage() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/auth/login?redirect=/shortlist");
      } else {
        setCurrentUser(user);
      }
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, [router]);

  const { data, isLoading: queryLoading, error } = useListUserFavorites(
    dataConnectClient,
    { enabled: !!currentUser }
  );

  const isLoading = authLoading || queryLoading;

  if (isLoading) {
    return (
      <main className="flex-1 bg-stone-50 dark:bg-zinc-950 p-6 min-h-screen">
        <div className="max-w-5xl mx-auto">
          <div className="h-6 bg-stone-200 dark:bg-zinc-800 rounded w-48 mb-8 animate-pulse" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <PropertyCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <div className="flex-1 flex items-center justify-center p-6 bg-stone-50 dark:bg-zinc-950 min-h-screen">
        <div className="text-center bg-white dark:bg-zinc-900 border border-stone-200 dark:border-zinc-800 p-8 rounded-3xl max-w-md w-full shadow-lg">
          <p className="text-red-500 font-semibold mb-4">Error loading shortlist</p>
          <p className="text-zinc-600 dark:text-zinc-400 text-sm mb-6">{error.message}</p>
          <button onClick={() => router.refresh()} className="px-5 py-2.5 bg-stone-900 dark:bg-zinc-100 text-stone-50 dark:text-zinc-900 rounded-xl text-sm font-medium">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const favorites = data?.favorites || [];

  return (
    <main className="flex-1 bg-stone-50 dark:bg-zinc-950 p-6 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center gap-1 text-xs text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 mb-2 transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Discovery
          </Link>
          <h1 className="font-serif text-3xl font-semibold text-zinc-900 dark:text-zinc-100">
            My Shortlist
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 text-xs mt-1">
            Your saved premium listings in Bengaluru.
          </p>
        </div>

        {favorites.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white/40 dark:bg-zinc-900/40 backdrop-blur-2xl border border-white/60 dark:border-zinc-800/60 rounded-3xl text-center p-8">
            <div className="w-16 h-16 bg-stone-100 dark:bg-zinc-800 rounded-2xl flex items-center justify-center mb-4">
              <Heart className="w-8 h-8 text-zinc-400" />
            </div>
            <p className="text-zinc-800 dark:text-zinc-200 font-semibold mb-2">
              No Saved Properties
            </p>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm max-w-sm mb-6 leading-relaxed">
              Explore our premium collection and save properties to view or compare them later.
            </p>
            <Link href="/" className="px-5 py-2.5 bg-stone-900 dark:bg-zinc-100 text-stone-50 dark:text-zinc-900 rounded-xl text-sm font-semibold">
              Start Exploring
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((fav) => (
              <PropertyCard key={fav.property.id} property={fav.property as PropertyData} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
