"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCreateSavedSearch } from "@/src/dataconnect-generated/react";
import { auth, dataConnectClient } from "@/lib/firebase";
import { Bookmark, Loader2, Check } from "lucide-react";

interface SaveSearchButtonProps {
  bounds: {
    minLat: number;
    maxLat: number;
    minLng: number;
    maxLng: number;
  };
}

export function SaveSearchButton({ bounds }: SaveSearchButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [label, setLabel] = useState("");
  const [showInput, setShowInput] = useState(false);
  const { mutateAsync: createSavedSearch } = useCreateSavedSearch(dataConnectClient);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!auth.currentUser) {
      router.push(`/auth/login?redirect=${encodeURIComponent(window.location.pathname)}`);
      return;
    }

    setLoading(true);
    try {
      const searchLabel = label.trim() || `Discovery near Locality (${bounds.minLat.toFixed(2)})`;
      await createSavedSearch({
        filters: JSON.stringify(bounds),
        label: searchLabel,
      });
      setSuccess(true);
      setLabel("");
      setShowInput(false);
      setTimeout(() => setSuccess(false), 3000);
    } catch {
      alert("Failed to save search");
    } finally {
      setLoading(false);
    }
  };

  if (showInput) {
    return (
      <form onSubmit={handleSave} className="flex items-center gap-2 mt-2">
        <input
          type="text"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          placeholder="Name this search (e.g. Indiranagar)"
          required
          className="text-xs px-3 py-1.5 bg-white dark:bg-zinc-900 border border-stone-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-amber-500"
        />
        <button
          type="submit"
          disabled={loading}
          className="text-xs px-3 py-1.5 bg-amber-600 hover:bg-amber-500 text-white rounded-lg font-medium transition-colors flex items-center gap-1 disabled:opacity-50 min-h-[32px]"
        >
          {loading && <Loader2 className="w-3 h-3 animate-spin" />}
          Save
        </button>
        <button
          type="button"
          onClick={() => setShowInput(false)}
          className="text-xs px-2 py-1.5 text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors"
        >
          Cancel
        </button>
      </form>
    );
  }

  return (
    <button
      onClick={() => {
        if (!auth.currentUser) {
          router.push(`/auth/login?redirect=${encodeURIComponent(window.location.pathname)}`);
        } else {
          setShowInput(true);
        }
      }}
      className="inline-flex items-center gap-1.5 text-xs text-amber-700 hover:text-amber-600 dark:text-amber-500 dark:hover:text-amber-400 font-semibold mt-2 border border-amber-600/20 dark:border-amber-500/20 px-3 py-1.5 rounded-lg bg-amber-500/5 hover:bg-amber-500/10 transition-all min-h-[36px]"
    >
      {success ? (
        <>
          <Check className="w-3.5 h-3.5" />
          Saved!
        </>
      ) : (
        <>
          <Bookmark className="w-3.5 h-3.5" />
          Save This Search
        </>
      )}
    </button>
  );
}
