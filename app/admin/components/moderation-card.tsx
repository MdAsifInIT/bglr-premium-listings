"use client";

import { useState } from "react";
import Image from "next/image";
import { useQueryClient } from "@tanstack/react-query";
import { useApproveProperty, useRejectProperty } from "@/src/dataconnect-generated/react";
import { dataConnectClient } from "@/lib/firebase";
import { MapPin, Tag, User, Loader2, Check, X, ImageOff } from "lucide-react";
import { motion } from "framer-motion";

interface ModerationCardProps {
  property: {
    id: string;
    title: string;
    price: number;
    locality: string;
    propertyType: string;
    listingType: string;
    owner: {
      fullName: string;
    };
    imageUrls?: string[];
  };
}

export function ModerationCard({ property }: ModerationCardProps) {
  const queryClient = useQueryClient();
  const { mutateAsync: approveProperty, isPending: isApproving } = useApproveProperty(dataConnectClient);
  const { mutateAsync: rejectProperty, isPending: isRejecting } = useRejectProperty(dataConnectClient);
  const [error, setError] = useState<string | null>(null);

  const handleApprove = async () => {
    setError(null);
    try {
      await approveProperty({ id: property.id });
      queryClient.invalidateQueries({ queryKey: ["ListPendingProperties"] });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to approve listing");
    }
  };

  const handleReject = async () => {
    if (!confirm("Are you sure you want to permanently reject and delete this listing?")) return;
    setError(null);
    try {
      await rejectProperty({ id: property.id });
      queryClient.invalidateQueries({ queryKey: ["ListPendingProperties"] });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to reject listing");
    }
  };

  const imageSrc = property.imageUrls?.[0];
  const isLoading = isApproving || isRejecting;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12, scale: 0.98 }}
      className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border border-stone-200/60 dark:border-zinc-800/60 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row gap-5 shadow-sm"
    >
      <div className="relative w-full sm:w-32 h-32 sm:h-auto rounded-xl overflow-hidden shrink-0 bg-stone-100 dark:bg-zinc-800">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={property.title}
            fill
            sizes="(max-width: 640px) 100vw, 128px"
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-zinc-500 dark:text-zinc-600">
            <ImageOff className="w-6 h-6 mb-1" />
            <span className="text-[10px] font-medium">No image</span>
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0 flex flex-col justify-center">
        <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100 truncate mb-1.5">{property.title}</h3>
        
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-zinc-600 dark:text-zinc-400 mb-2.5">
          <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-zinc-400" />{property.locality}</span>
          <span className="flex items-center gap-1.5"><Tag className="w-3.5 h-3.5 text-zinc-400" />{property.propertyType} · {property.listingType}</span>
          <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5 text-zinc-400" />{property.owner.fullName}</span>
        </div>
        
        <p className="text-sm font-semibold text-amber-700 dark:text-amber-500">₹{property.price.toLocaleString("en-IN")}</p>
        
        {error && <p className="text-[10px] text-red-500 mt-2">{error}</p>}
      </div>

      <div className="flex flex-row sm:flex-col items-center gap-2 shrink-0 pt-3 sm:pt-0 border-t sm:border-t-0 border-stone-200/50 dark:border-zinc-800/50 sm:pl-4 sm:border-l">
        <button
          onClick={handleApprove}
          disabled={isLoading}
          className="flex-1 sm:flex-none min-h-[44px] min-w-[44px] flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/30 dark:hover:bg-emerald-900/50 text-emerald-700 dark:text-emerald-400 font-medium text-sm transition-colors disabled:opacity-50"
        >
          {isApproving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
          <span className="sm:hidden">Approve</span>
        </button>
        <button
          onClick={handleReject}
          disabled={isLoading}
          className="flex-1 sm:flex-none min-h-[44px] min-w-[44px] flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-red-50 hover:bg-red-100 dark:bg-red-950/20 dark:hover:bg-red-950/40 text-red-600 dark:text-red-500 font-medium text-sm transition-colors disabled:opacity-50"
        >
          {isRejecting ? <Loader2 className="w-4 h-4 animate-spin" /> : <X className="w-4 h-4" />}
          <span className="sm:hidden">Reject</span>
        </button>
      </div>
    </motion.div>
  );
}
