"use client";

import { useListPendingProperties, useApproveProperty } from "@/src/dataconnect-generated/react";
import { dataConnectClient } from "@/lib/firebase";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2, CheckCircle } from "lucide-react";

export default function AdminPage() {
  const { data, isLoading, error } = useListPendingProperties(dataConnectClient);
  const { mutateAsync: approveProperty, isPending: approving } = useApproveProperty(dataConnectClient);
  const queryClient = useQueryClient();

  const handleApprove = async (id: string) => {
    try {
      await approveProperty({ id });
      queryClient.invalidateQueries({ queryKey: ["ListPendingProperties"] });
    } catch (err: any) {
      alert(err.message || "Failed to approve listing.");
    }
  };

  const properties = data?.properties || [];

  return (
    <div className="flex-1 bg-zinc-950 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="font-serif text-2xl font-semibold text-zinc-100">Admin Moderation Queue</h1>
          <p className="text-zinc-400 text-xs mt-1">Review and approve pending premium property listings</p>
        </div>

        {error && (
          <div className="bg-red-950/50 border border-red-900/50 text-red-400 p-4 rounded-lg text-sm mb-6">
            Failed to fetch pending listings: {error.message}
          </div>
        )}

        {isLoading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
          </div>
        ) : properties.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 bg-zinc-900/20 rounded-xl border border-dashed border-zinc-800/50 text-center">
            <CheckCircle className="h-10 w-10 text-emerald-600 mb-3" />
            <p className="text-sm font-medium text-zinc-300">All clear — no pending listings to review.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {properties.map((prop) => (
              <div key={prop.id} className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-zinc-100 truncate">{prop.title}</h3>
                  <div className="flex items-center gap-3 mt-1 text-xs text-zinc-400">
                    <span>{prop.locality}</span>
                    <span>·</span>
                    <span>{prop.propertyType}</span>
                    <span>·</span>
                    <span>{prop.listingType}</span>
                    <span>·</span>
                    <span className="text-emerald-400 font-medium">₹{prop.price.toLocaleString("en-IN")}</span>
                  </div>
                  <p className="text-xs text-zinc-500 mt-1">Submitted by {prop.owner.fullName}</p>
                </div>
                <button
                  onClick={() => handleApprove(prop.id)}
                  disabled={approving}
                  className="shrink-0 bg-emerald-800 hover:bg-emerald-700 active:bg-emerald-900 text-zinc-100 font-semibold text-sm px-5 py-2 rounded-lg transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {approving ? "Approving..." : "Approve Listing"}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
