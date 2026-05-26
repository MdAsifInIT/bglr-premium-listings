"use client";

import { useListPendingProperties } from "@/src/dataconnect-generated/react";
import { dataConnectClient } from "@/lib/firebase";
import { Loader2, CheckCircle } from "lucide-react";
import { AdminGuard } from "./components/admin-guard";
import { ModerationCard } from "./components/moderation-card";
import { AnimatePresence } from "framer-motion";

export default function AdminPage() {
  const { data, isLoading, error } = useListPendingProperties(dataConnectClient);
  const properties = data?.properties || [];

  return (
    <AdminGuard>
      <main className="flex-1 bg-stone-50 dark:bg-zinc-950 p-6 min-h-screen">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="font-serif text-3xl font-semibold text-zinc-900 dark:text-zinc-100">Moderation Queue</h1>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm mt-1">Review, approve, or reject pending premium property listings.</p>
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
