"use client";

import { useState } from "react";
import { useListPendingProperties, useCreateProperty } from "@/src/dataconnect-generated/react";
import { dataConnectClient } from "@/lib/firebase";
import { Loader2, CheckCircle, Plus, DatabaseZap } from "lucide-react";
import { AdminGuard } from "./components/admin-guard";
import { ModerationCard } from "./components/moderation-card";
import { AnimatePresence } from "framer-motion";
import Link from "next/link";

const mockListings = [
  {
    title: "Ultra Luxury Penthouse in UB City",
    description: "Experience unparalleled luxury with sweeping 360-degree views of the Bengaluru skyline. Features a private pool, smart home integration, and private elevator access.",
    price: 350000000,
    bhkCount: 5,
    propertyType: "Penthouse",
    listingType: "Sale",
    locality: "Vittal Mallya Road",
    latitude: 12.9715,
    longitude: 77.5945,
    imageUrls: ["https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1600", "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1600"]
  },
  {
    title: "Architectural Masterpiece Villa",
    description: "A serene escape in the heart of Indiranagar. Designed by award-winning architects, featuring a courtyard garden, double-height living spaces, and premium Italian marble.",
    price: 280000000,
    bhkCount: 4,
    propertyType: "Villa",
    listingType: "Sale",
    locality: "Indiranagar",
    latitude: 12.9784,
    longitude: 77.6408,
    imageUrls: ["https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1600"]
  },
  {
    title: "Premium Lakeview Apartment",
    description: "Wake up to stunning views of the Agara Lake. This fully furnished premium apartment offers bespoke interiors, a gourmet kitchen, and access to a world-class clubhouse.",
    price: 85000000,
    bhkCount: 3,
    propertyType: "Apartment",
    listingType: "Sale",
    locality: "HSR Layout",
    latitude: 12.9121,
    longitude: 77.6446,
    imageUrls: ["https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=1600"]
  }
];

export default function AdminPage() {
  const { data, isLoading, error, refetch } = useListPendingProperties(dataConnectClient);
  const [createProperty] = useCreateProperty(dataConnectClient);
  const properties = data?.properties || [];
  
  const [isSeeding, setIsSeeding] = useState(false);

  const handleSeed = async () => {
    if (!confirm("This will insert mock premium listings into the database. Continue?")) return;
    setIsSeeding(true);
    try {
      for (const listing of mockListings) {
        await createProperty(listing);
      }
      alert("Mock listings seeded successfully! They are now in the pending queue.");
      refetch();
    } catch (err) {
      console.error("Seeding failed", err);
      alert("Seeding failed. Check console.");
    } finally {
      setIsSeeding(false);
    }
  };

  return (
    <AdminGuard>
      <main className="flex-1 bg-stone-50 dark:bg-zinc-950 p-6 min-h-screen">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
            <div>
              <h1 className="font-serif text-3xl font-semibold text-zinc-900 dark:text-zinc-100">Moderation Queue</h1>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm mt-1">Review, approve, or reject pending premium property listings.</p>
            </div>
            
            <div className="flex items-center gap-3">
              <button 
                onClick={handleSeed}
                disabled={isSeeding}
                className="px-4 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-400 font-medium text-sm flex items-center transition-colors hover:bg-amber-200 dark:hover:bg-amber-900/50 disabled:opacity-50"
              >
                {isSeeding ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <DatabaseZap className="w-4 h-4 mr-2" />}
                Seed Showcase
              </button>
              
              <Link 
                href="/admin/add"
                className="px-4 h-10 rounded-xl bg-emerald-900 dark:bg-emerald-950 text-white font-medium text-sm flex items-center transition-colors hover:bg-emerald-800 dark:hover:bg-emerald-900"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Listing
              </Link>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 p-4 rounded-xl text-sm mb-6 shadow-sm">
              Failed to fetch pending listings: {error.message}
            </div>
          )}

          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-emerald-600 dark:text-emerald-500" />
            </div>
          ) : properties.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 bg-white/40 dark:bg-zinc-900/40 backdrop-blur-2xl rounded-3xl border border-stone-200/50 dark:border-zinc-800/50 text-center shadow-sm">
              <div className="w-16 h-16 bg-emerald-50 dark:bg-emerald-950/30 rounded-2xl flex items-center justify-center mb-4">
                <CheckCircle className="h-8 w-8 text-emerald-600 dark:text-emerald-500" />
              </div>
              <p className="text-base font-semibold text-zinc-800 dark:text-zinc-200 mb-1">Queue is Clear</p>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">All pending listings have been reviewed.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <AnimatePresence mode="popLayout">
                {properties.map((prop) => (
                  <ModerationCard key={prop.id} property={prop} />
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </main>
    </AdminGuard>
  );
}
