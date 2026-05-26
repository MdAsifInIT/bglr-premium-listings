"use client";

import { useListApprovedProperties } from "@/src/dataconnect-generated/react";
import { dataConnectClient } from "@/lib/firebase";
import { PropertyCard, PropertyData } from "./property-card";
import { PropertyCardSkeleton } from "./property-card-skeleton";
import { motion, Variants } from "framer-motion";

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
};

export function PropertyFeed() {
  const { data, isLoading, error } = useListApprovedProperties(dataConnectClient, {
    minLat: -90,
    maxLat: 90,
    minLng: -180,
    maxLng: 180,
  });

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-zinc-600 dark:text-zinc-400 bg-stone-100/50 dark:bg-zinc-900/50 rounded-xl border border-red-900/20 dark:border-red-900/50">
        <p className="text-sm font-medium text-red-600 dark:text-red-500">Failed to load properties.</p>
        <p className="text-xs mt-2">{error.message}</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <PropertyCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  const properties = data?.properties || [];

  if (properties.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-16 bg-stone-100/30 dark:bg-zinc-900/20 rounded-xl border border-stone-200 dark:border-zinc-800/50 border-dashed">
        <h3 className="font-serif text-xl font-medium text-zinc-900 dark:text-zinc-100 mb-2">No Premium Listings Found</h3>
        <p className="text-zinc-500 dark:text-zinc-400 text-sm">There are currently no active listings available.</p>
      </div>
    );
  }


  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {properties.map((property) => (
        <motion.div key={property.id} variants={item}>
          <PropertyCard property={property as PropertyData} />
        </motion.div>
      ))}
    </motion.div>
  );
}
