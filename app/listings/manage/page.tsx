"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth, dataConnectClient } from "@/lib/firebase";
import { useListUserProperties } from "@/src/dataconnect-generated/react";
import { DashboardHeader } from "./components/dashboard-header";
import { ListingRow } from "./components/listing-row";
import { Loader2, Plus, Building2, ChevronLeft } from "lucide-react";
import { AnimatePresence } from "framer-motion";

export default function ManageListingsPage() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/auth/login?redirect=/listings/manage");
      } else {
        setCurrentUser(user);
      }
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, [router]);

  const { data, isLoading: queryLoading, error } = useListUserProperties(
    dataConnectClient,
    { enabled: !!currentUser }
  );

  const isLoading = authLoading || queryLoading;

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-stone-50 dark:bg-zinc-950">
        <Loader2 className="w-8 h-8 animate-spin text-amber-600 dark:text-amber-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 flex items-center justify-center p-6 bg-stone-50 dark:bg-zinc-950">
        <div className="text-center bg-white dark:bg-zinc-900 border border-stone-200 dark:border-zinc-800 p-8 rounded-3xl max-w-md w-full shadow-lg">
          <p className="text-red-500 font-semibold mb-4">Error loading properties</p>
          <p className="text-zinc-600 dark:text-zinc-400 text-sm mb-6">{error.message}</p>
          <button onClick={() => router.refresh()} className="px-5 py-2.5 bg-stone-900 dark:bg-zinc-100 text-stone-50 dark:text-zinc-900 rounded-xl text-sm font-medium">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const properties = data?.properties || [];

  return (
    <main className="flex-1 bg-stone-50 dark:bg-zinc-950 p-6 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <Link href="/" className="inline-flex items-center gap-1 text-xs text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 mb-2 transition-colors">
              <ChevronLeft className="w-3.5 h-3.5" />
              Back to Home
            </Link>
            <h1 className="font-serif text-3xl font-semibold text-zinc-900 dark:text-zinc-100">
              Manage Your Listings
            </h1>
            <p className="text-zinc-600 dark:text-zinc-400 text-xs mt-1">
              Create, toggle status, or remove your premium listings.
            </p>
          </div>
          <Link href="/listings/create" className="inline-flex items-center gap-2 px-5 py-3 bg-emerald-700 hover:bg-emerald-600 dark:bg-emerald-800 dark:hover:bg-emerald-700 text-white rounded-xl text-sm font-semibold transition-all shadow-md self-start sm:self-auto min-h-[44px]">
            <Plus className="w-4 h-4" />
            Add Property
          </Link>
        </div>

        <DashboardHeader properties={properties} />

        {properties.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white/40 dark:bg-zinc-900/40 backdrop-blur-2xl border border-white/60 dark:border-zinc-800/60 rounded-3xl text-center p-8">
            <div className="w-16 h-16 bg-stone-100 dark:bg-zinc-800 rounded-2xl flex items-center justify-center mb-4">
              <Building2 className="w-8 h-8 text-zinc-400" />
            </div>
            <p className="text-zinc-800 dark:text-zinc-200 font-semibold mb-2">
              No Listings Yet
            </p>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm max-w-sm mb-6 leading-relaxed">
              Start showcase your Bengaluru luxury premium real estate properties to active buyers and tenants.
            </p>
            <Link href="/listings/create" className="px-5 py-2.5 bg-stone-900 dark:bg-zinc-100 text-stone-50 dark:text-zinc-900 rounded-xl text-sm font-semibold">
              Create First Listing
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <AnimatePresence mode="popLayout">
              {properties.map((prop) => (
                <ListingRow key={prop.id} property={prop} />
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </main>
  );
}
