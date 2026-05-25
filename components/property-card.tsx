"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, BedDouble, ChevronLeft, ChevronRight, ImageOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export interface PropertyData {
  id: string;
  title: string;
  price: number;
  locality: string;
  bhkCount: number;
  imageUrls: string[];
  listingType: string;
}

export function PropertyCard({ property }: { property: PropertyData }) {
  const [currentImageIdx, setCurrentImageIdx] = useState(0);
  const [imgError, setImgError] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumSignificantDigits: 3
    }).format(price);
  };

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    if (property.imageUrls.length > 0) {
      setCurrentImageIdx((prev) => (prev + 1) % property.imageUrls.length);
    }
  };

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    if (property.imageUrls.length > 0) {
      setCurrentImageIdx((prev) => (prev - 1 + property.imageUrls.length) % property.imageUrls.length);
    }
  };

  return (
    <Link 
      href={`/property/${property.id}`}
      className="block w-full"
    >
      <motion.div
        whileHover={{ scale: 1.015, y: -2 }}
        transition={{ type: "spring", stiffness: 380, damping: 30 }}
        className="group rounded-xl overflow-hidden bg-white dark:bg-zinc-900 border border-stone-200/60 dark:border-zinc-800/50 shadow-sm hover:shadow-xl dark:hover:shadow-black/50 transition-all duration-300"
      >
        <div className="relative aspect-[4/3] w-full bg-stone-100 dark:bg-zinc-800 overflow-hidden">
          {property.imageUrls.length > 0 && !imgError ? (
            <Image
              src={property.imageUrls[currentImageIdx]}
              alt={property.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              onError={() => setImgError(true)}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-zinc-500 dark:text-zinc-600 bg-stone-100/50 dark:bg-zinc-900/50">
              <ImageOff className="w-8 h-8 mb-2" />
              <span className="text-xs font-medium">Image unavailable</span>
            </div>
          )}
          
          <div className="absolute top-3 left-3 flex gap-2">
            <span className="px-2.5 py-1 text-xs font-semibold bg-stone-900/70 dark:bg-zinc-950/80 backdrop-blur-md text-stone-50 dark:text-zinc-100 rounded-md">
              {property.listingType}
            </span>
          </div>

          {property.imageUrls.length > 1 && !imgError && (
            <div className="absolute inset-0 flex items-center justify-between p-2 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-200">
              <button onClick={prevImage} aria-label="Previous image" className="p-1.5 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full bg-stone-900/50 dark:bg-zinc-950/60 text-stone-50 dark:text-zinc-100 backdrop-blur-md hover:bg-stone-900/70 dark:hover:bg-zinc-950/80 transition-colors duration-200">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button onClick={nextImage} aria-label="Next image" className="p-1.5 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full bg-stone-900/50 dark:bg-zinc-950/60 text-stone-50 dark:text-zinc-100 backdrop-blur-md hover:bg-stone-900/70 dark:hover:bg-zinc-950/80 transition-colors duration-200">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
          
          {property.imageUrls.length > 1 && !imgError && (
            <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-10">
              {property.imageUrls.map((_, idx) => (
                <div 
                  key={idx} 
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-200 shadow-sm",
                    idx === currentImageIdx ? "w-4 bg-white dark:bg-zinc-100" : "w-1.5 bg-white/60 dark:bg-zinc-100/60"
                  )}
                />
              ))}
            </div>
          )}
        </div>

        <div className="p-5 flex flex-col gap-3">
          <div className="flex justify-between items-start gap-2">
            <h3 className="font-serif text-lg font-medium text-zinc-900 dark:text-zinc-100 line-clamp-1">
              {property.title}
            </h3>
            <p className="font-serif font-semibold text-amber-600 dark:text-amber-500 whitespace-nowrap">
              {formatPrice(property.price)}
            </p>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-zinc-600 dark:text-zinc-400 font-sans font-medium tracking-wide">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-emerald-700 dark:text-emerald-600" />
              <span className="truncate">{property.locality}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <BedDouble className="w-4 h-4 text-emerald-700 dark:text-emerald-600" />
              <span>{property.bhkCount} BHK</span>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

export function PropertyCardSkeleton() {
  return (
    <div className="rounded-xl overflow-hidden bg-white dark:bg-zinc-900 border border-stone-200/60 dark:border-zinc-800/50 animate-pulse">
      <div className="aspect-[4/3] w-full bg-stone-100 dark:bg-zinc-800" />
      <div className="p-5 flex flex-col gap-4">
        <div className="flex justify-between items-center gap-4">
          <div className="h-5 bg-stone-200 dark:bg-zinc-800 rounded w-2/3" />
          <div className="h-5 bg-stone-200 dark:bg-zinc-800 rounded w-1/4" />
        </div>
        <div className="flex gap-4">
          <div className="h-4 bg-stone-200 dark:bg-zinc-800 rounded w-1/3" />
          <div className="h-4 bg-stone-200 dark:bg-zinc-800 rounded w-1/4" />
        </div>
      </div>
    </div>
  );
}
