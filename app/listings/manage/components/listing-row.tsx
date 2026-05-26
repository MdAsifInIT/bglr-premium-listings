"use client";

import { useState } from "react";
import Image from "next/image";
import { useQueryClient } from "@tanstack/react-query";
import { useDeleteProperty, useUpdatePropertyStatus } from "@/src/dataconnect-generated/react";
import { dataConnectClient } from "@/lib/firebase";
import { Trash2, Pause, Play, MapPin, Tag, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

interface ListingRowProps {
  property: {
    id: string;
    title: string;
    price: number;
    locality: string;
    propertyType: string;
    listingType: string;
    isApproved: boolean;
    imageUrls: string[];
  };
}

export function ListingRow({ property }: ListingRowProps) {
  const queryClient = useQueryClient();
  const { mutateAsync: deleteProp, isPending: isDeleting } = useDeleteProperty(dataConnectClient);
  const { mutateAsync: updateStatus, isPending: isToggling } = useUpdatePropertyStatus(dataConnectClient);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this listing permanently?")) return;
    setError(null);
    try {
      await deleteProp({ id: property.id });
      queryClient.invalidateQueries({ queryKey: ["ListUserProperties"] });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to delete listing");
    }
  };

  const handleToggleStatus = async () => {
    setError(null);
    try {
      await updateStatus({ id: property.id, isApproved: !property.isApproved });
      queryClient.invalidateQueries({ queryKey: ["ListUserProperties"] });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to update listing status");
    }
  };

  const imageSrc = property.imageUrls?.[0] || "/placeholder.jpg";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      className="p-4 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-md border border-stone-200/50 dark:border-zinc-800/50 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center gap-4 shadow-sm"
    >
      <div className="relative w-full sm:w-24 h-24 rounded-xl overflow-hidden shrink-0 bg-stone-100 dark:bg-zinc-800">
        <Image
          src={imageSrc}
          alt={property.title}
          fill
          sizes="(max-width: 640px) 100vw, 96px"
          className="object-cover"
        />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1 flex-wrap">
          <span className={`text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full ${
            property.isApproved
              ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-400"
              : "bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-400"
          }`}>
            {property.isApproved ? "Active" : "Paused"}
          </span>
          <span className="text-[10px] bg-stone-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 px-2 py-0.5 rounded-full font-medium">
            {property.propertyType}
          </span>
        </div>
        <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 truncate mb-1">
          {property.title}
        </h4>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-zinc-500 dark:text-zinc-400">
          <span className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5" />
            {property.locality}
          </span>
          <span className="flex items-center gap-1">
            <Tag className="w-3.5 h-3.5" />
            For {property.listingType}
          </span>
          <span className="font-semibold text-amber-700 dark:text-amber-500">
            ₹{property.price.toLocaleString("en-IN")}
          </span>
        </div>
        {error && <p className="text-[10px] text-red-500 mt-1">{error}</p>}
      </div>

      <div className="flex items-center gap-2 w-full sm:w-auto justify-end sm:justify-start pt-2 sm:pt-0 border-t sm:border-t-0 border-stone-200/50 dark:border-zinc-800/50">
        <button
          onClick={handleToggleStatus}
          disabled={isToggling}
          aria-label={property.isApproved ? "Pause Listing" : "Activate Listing"}
          className="min-h-[44px] min-w-[44px] flex items-center justify-center p-2 rounded-xl bg-stone-100 hover:bg-stone-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 transition-colors disabled:opacity-50"
        >
          {isToggling ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : property.isApproved ? (
            <Pause className="w-4 h-4" />
          ) : (
            <Play className="w-4 h-4" />
          )}
        </button>

        <button
          onClick={handleDelete}
          disabled={isDeleting}
          aria-label="Delete Listing"
          className="min-h-[44px] min-w-[44px] flex items-center justify-center p-2 rounded-xl bg-red-50 hover:bg-red-100 dark:bg-red-950/20 dark:hover:bg-red-950/40 text-red-600 dark:text-red-400 transition-colors disabled:opacity-50"
        >
          {isDeleting ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Trash2 className="w-4 h-4" />
          )}
        </button>
      </div>
    </motion.div>
  );
}
