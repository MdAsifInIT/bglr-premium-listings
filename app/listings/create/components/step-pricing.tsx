"use client";

import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";

export function StepPricing() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider mb-2" htmlFor="listingType">
          Listing Type
        </label>
        <select
          id="listingType"
          className="w-full bg-white dark:bg-zinc-950 border border-stone-200 dark:border-zinc-800 rounded-lg px-4 py-2.5 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-emerald-600 dark:focus:ring-emerald-800 focus:border-transparent transition-all"
          {...register("listingType")}
        >
          <option value="Sale">For Sale</option>
          <option value="Rent">For Rent</option>
        </select>
        {errors.listingType && (
          <p className="text-xs text-red-500 mt-1">{String(errors.listingType.message)}</p>
        )}
      </div>

      <div>
        <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider mb-2" htmlFor="price">
          Price (INR)
        </label>
        <Input
          id="price"
          type="number"
          className="w-full bg-white dark:bg-zinc-950 border border-stone-200 dark:border-zinc-800 rounded-lg px-4 py-2.5 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-emerald-600 dark:focus:ring-emerald-800 focus:border-transparent transition-all"
          placeholder="e.g. 25000000"
          {...register("price", { valueAsNumber: true })}
        />
        {errors.price && (
          <p className="text-xs text-red-500 mt-1">{String(errors.price.message)}</p>
        )}
      </div>
    </div>
  );
}
