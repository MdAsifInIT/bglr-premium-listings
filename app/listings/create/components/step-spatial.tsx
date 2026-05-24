"use client";

import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function StepSpatial() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5" htmlFor="title">
          Listing Title
        </label>
        <Input
          id="title"
          className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-emerald-800 focus:border-transparent transition-all"
          placeholder="e.g. Ultra Luxury 4BHK Penthouse"
          {...register("title")}
        />
        {errors.title && (
          <p className="text-xs text-red-500 mt-1">{String(errors.title.message)}</p>
        )}
      </div>

      <div>
        <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5" htmlFor="description">
          Description
        </label>
        <Textarea
          id="description"
          rows={3}
          className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-emerald-800 focus:border-transparent transition-all resize-none"
          placeholder="Detailed breakdown of luxury amenities..."
          {...register("description")}
        />
        {errors.description && (
          <p className="text-xs text-red-500 mt-1">{String(errors.description.message)}</p>
        )}
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5" htmlFor="bhkCount">
            BHKs
          </label>
          <Input
            id="bhkCount"
            type="number"
            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-emerald-800 focus:border-transparent transition-all"
            placeholder="3"
            {...register("bhkCount", { valueAsNumber: true })}
          />
          {errors.bhkCount && (
            <p className="text-xs text-red-500 mt-1">{String(errors.bhkCount.message)}</p>
          )}
        </div>

        <div>
          <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5" htmlFor="propertyType">
            Type
          </label>
          <select
            id="propertyType"
            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-800 focus:border-transparent transition-all"
            {...register("propertyType")}
          >
            <option value="Apartment">Apartment</option>
            <option value="Villa">Villa</option>
            <option value="Penthouse">Penthouse</option>
            <option value="Plot">Plot</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5" htmlFor="locality">
            Locality
          </label>
          <select
            id="locality"
            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-800 focus:border-transparent transition-all"
            {...register("locality")}
          >
            <option value="Indiranagar">Indiranagar</option>
            <option value="HSR Layout">HSR Layout</option>
            <option value="Koramangala">Koramangala</option>
            <option value="Whitefield">Whitefield</option>
          </select>
        </div>
      </div>
    </div>
  );
}
