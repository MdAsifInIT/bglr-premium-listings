"use client";

import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";

export function StepCoords() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="space-y-4">
      <p className="text-sm text-zinc-400">
        Enter precise geographic coordinates to show this luxury property on the search discovery map.
      </p>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2" htmlFor="latitude">
            Latitude
          </label>
          <Input
            id="latitude"
            type="number"
            step="any"
            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-emerald-800 focus:border-transparent transition-all"
            placeholder="e.g. 12.9716"
            {...register("latitude", { valueAsNumber: true })}
          />
          {errors.latitude && (
            <p className="text-xs text-red-500 mt-1">{String(errors.latitude.message)}</p>
          )}
        </div>

        <div>
          <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2" htmlFor="longitude">
            Longitude
          </label>
          <Input
            id="longitude"
            type="number"
            step="any"
            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-emerald-800 focus:border-transparent transition-all"
            placeholder="e.g. 77.5946"
            {...register("longitude", { valueAsNumber: true })}
          />
          {errors.longitude && (
            <p className="text-xs text-red-500 mt-1">{String(errors.longitude.message)}</p>
          )}
        </div>
      </div>
    </div>
  );
}
