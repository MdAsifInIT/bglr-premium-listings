"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCreateFavorite, useDeleteFavorite, useListUserFavorites } from "@/src/dataconnect-generated/react";
import { auth, dataConnectClient } from "@/lib/firebase";
import { Heart, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

interface FavoriteButtonProps {
  propertyId: string;
}

export function FavoriteButton({ propertyId }: FavoriteButtonProps) {
  const router = useRouter();
  const [optimisticFavorite, setOptimisticFavorite] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);

  const { data, refetch } = useListUserFavorites(dataConnectClient, {
    enabled: !!auth.currentUser,
  });

  const { mutateAsync: createFavorite } = useCreateFavorite(dataConnectClient);
  const { mutateAsync: deleteFavorite } = useDeleteFavorite(dataConnectClient);

  const isFavorited = optimisticFavorite !== null
    ? optimisticFavorite
    : (data?.favorites?.some((f) => f.property.id === propertyId) ?? false);

  const handleToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!auth.currentUser) {
      router.push(`/auth/login?redirect=${encodeURIComponent(window.location.pathname)}`);
      return;
    }

    setLoading(true);
    const nextState = !isFavorited;
    setOptimisticFavorite(nextState);

    try {
      if (isFavorited) {
        await deleteFavorite({ propertyId });
      } else {
        await createFavorite({ propertyId });
      }
      await refetch();
      setOptimisticFavorite(null);
    } catch {
      setOptimisticFavorite(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      onClick={handleToggle}
      disabled={loading}
      aria-label={isFavorited ? "Remove from shortlist" : "Save to shortlist"}
      className="w-10 h-10 rounded-full flex items-center justify-center bg-white/70 dark:bg-zinc-900/70 backdrop-blur-md border border-white/60 dark:border-zinc-800/60 shadow-md hover:bg-white dark:hover:bg-zinc-900 transition-colors min-h-[44px] min-w-[44px]"
    >
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin text-zinc-500" />
      ) : (
        <Heart
          className={`w-4 h-4 transition-colors ${
            isFavorited
              ? "fill-red-500 text-red-500"
              : "text-zinc-700 dark:text-zinc-300"
          }`}
        />
      )}
    </motion.button>
  );
}
