"use client";

import { useState } from "react";
import { useListApprovedProperties } from "@/src/dataconnect-generated/react";
import { dataConnectClient } from "@/lib/firebase";
import dynamic from "next/dynamic";
const MapWrapper = dynamic(() => import("@/components/map/map-wrapper").then(m => m.MapWrapper), { ssr: false });
import { PropertyCard, PropertyData } from "@/components/property-card";
import { Loader2 } from "lucide-react";
import { getSampleListingsWithinBounds } from "@/lib/sample-listings";
import type { PropertyMarker } from "@/components/map/map-wrapper";

import { SaveSearchButton } from "./components/save-search-button";
import { SearchStatusBar } from "./components/search-status-bar";

export default function SearchPage() {
  const [bounds, setBounds] = useState<{
    minLat: number;
    maxLat: number;
    minLng: number;
    maxLng: number;
  }>({
    minLat: 12.8,
    maxLat: 13.1,
    minLng: 77.4,
    maxLng: 77.8,
  });

  const { data, isLoading, error } = useListApprovedProperties(dataConnectClient, bounds);
  const databaseProperties = data?.properties || [];
  const properties = databaseProperties.length > 0 ? databaseProperties : getSampleListingsWithinBounds(bounds);

  return (
    <div className="flex-1 flex flex-col md:flex-row h-[calc(100vh-80px)] overflow-hidden bg-stone-50 dark:bg-zinc-950">
      {/* Left panel: Listings */}
      <div className="w-full md:w-1/2 h-[50vh] md:h-full overflow-y-auto p-6 flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h1 className="font-serif text-2xl font-semibold text-zinc-900 dark:text-zinc-100">Premium Discovery</h1>
            <p className="text-zinc-600 dark:text-zinc-400 text-xs mt-1">Explore verified luxury residences in Bangalore</p>
          </div>
          <div className="shrink-0">
            <SaveSearchButton bounds={bounds} />
          </div>
        </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 p-4 rounded-lg text-sm">
            Failed to query listings: {error.message}
          </div>
        )}

        <SearchStatusBar count={properties.length} isLoading={isLoading} />

        {isLoading ? (
          <div className="flex-1 flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
          </div>
        ) : properties.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center py-12 text-center border border-dashed border-stone-200 dark:border-zinc-800/50 rounded-xl bg-stone-100/50 dark:bg-zinc-900/10">
            <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">No premium listings found in this map area.</p>
            <p className="text-xs text-zinc-500 mt-1">Try panning or zooming out to see more properties</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pb-12">
            {properties.map((prop) => (
              <PropertyCard key={prop.id} property={prop as PropertyData} />
            ))}
          </div>
        )}
      </div>

      {/* Right panel: Map */}
      <div className="w-full md:w-1/2 h-[50vh] md:h-full border-t md:border-t-0 md:border-l border-stone-200 dark:border-zinc-900 relative">
        <MapWrapper properties={properties as PropertyMarker[]} onBoundsChange={setBounds} />
      </div>
    </div>
  );
}
