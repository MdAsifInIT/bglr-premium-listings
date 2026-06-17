"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { AdminGuard } from "../components/admin-guard";
import { useCreateProperty } from "@/src/dataconnect-generated/react";
import { dataConnectClient } from "@/lib/firebase";
import { ArrowLeft, Plus } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { UploadZone } from "@/components/upload-zone";
import { useToast } from "@/components/ui/toast";

const propertySchema = z.object({
  title: z.string().trim().min(5, "Title must be at least 5 characters").max(120, "Title is too long"),
  description: z.string().trim().min(20, "Description must be at least 20 characters").max(3000, "Description is too long"),
  price: z.coerce.number({ message: "Price must be a number" }).int().positive("Price must be positive").max(1000000000, "Price is too high"),
  bhkCount: z.coerce.number({ message: "BHK must be a number" }).int().positive("BHK must be positive").max(12, "BHK count is too high"),
  propertyType: z.enum(["Apartment", "Villa", "Penthouse", "Plot"]),
  listingType: z.enum(["Rent", "Sale"]),
  locality: z.enum(["Indiranagar", "HSR Layout", "Koramangala", "Whitefield", "Sadashivanagar", "Vittal Mallya Road"]),
  latitude: z.coerce.number({ message: "Latitude must be a number" }).min(-90, "Latitude must be at least -90").max(90, "Latitude must be at most 90"),
  longitude: z.coerce.number({ message: "Longitude must be a number" }).min(-180, "Longitude must be at least -180").max(180, "Longitude must be at most 180"),
  imageUrls: z.array(z.string().url()).min(1, "Upload at least one property image").max(8, "Use up to 8 images"),
});

type PropertyFormInput = z.input<typeof propertySchema>;
type PropertyFormValues = z.output<typeof propertySchema>;

const inputClassName = "h-12 rounded-xl bg-stone-100/50 dark:bg-zinc-950/50 border-stone-200 dark:border-zinc-800";
const selectClassName = "w-full h-12 px-4 rounded-xl bg-stone-100/50 dark:bg-zinc-950/50 border border-stone-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-emerald-500/50 outline-none transition-all";

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="text-xs text-red-500 ml-1 mt-1">{message}</p>;
}

export default function AddPropertyPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { mutateAsync: createProperty } = useCreateProperty(dataConnectClient);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PropertyFormInput, unknown, PropertyFormValues>({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      title: "",
      description: "",
      price: 25000000,
      bhkCount: 3,
      propertyType: "Apartment",
      listingType: "Sale",
      locality: "Indiranagar",
      latitude: 12.9784,
      longitude: 77.6408,
      imageUrls: [],
    },
  });

  const onSubmit = async (data: PropertyFormValues) => {
    try {
      await createProperty(data);
      toast({
        variant: "success",
        title: "Listing submitted",
        description: "The property is now in the moderation queue.",
      });
      router.push("/admin");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to create property.";
      toast({
        variant: "error",
        title: "Could not publish listing",
        description: message,
      });
    }
  };

  return (
    <AdminGuard>
      <main className="flex-1 bg-stone-50 dark:bg-zinc-950 p-6 min-h-screen">
        <div className="max-w-3xl mx-auto">
          <Link href="/admin" className="inline-flex items-center text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
          </Link>

          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="font-serif text-3xl font-semibold text-zinc-900 dark:text-zinc-100">Add Premium Listing</h1>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm mt-1 font-light">Create a new luxury property listing.</p>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/60 dark:bg-zinc-900/60 backdrop-blur-2xl border border-stone-200/50 dark:border-zinc-800/50 rounded-3xl p-8 shadow-sm"
          >
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 ml-1">Title</label>
                  <Input {...register("title")} disabled={isSubmitting} className={inputClassName} placeholder="e.g. Ultra Luxury Villa" />
                  <FieldError message={errors.title?.message} />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 ml-1">Price (INR)</label>
                  <Input type="number" {...register("price")} disabled={isSubmitting} className={inputClassName} placeholder="25000000" />
                  <FieldError message={errors.price?.message} />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 ml-1">BHK Count</label>
                  <Input type="number" {...register("bhkCount")} disabled={isSubmitting} className={inputClassName} placeholder="4" />
                  <FieldError message={errors.bhkCount?.message} />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 ml-1">Locality</label>
                  <select {...register("locality")} disabled={isSubmitting} className={selectClassName}>
                    <option>Indiranagar</option>
                    <option>HSR Layout</option>
                    <option>Koramangala</option>
                    <option>Whitefield</option>
                    <option>Sadashivanagar</option>
                    <option>Vittal Mallya Road</option>
                  </select>
                  <FieldError message={errors.locality?.message} />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 ml-1">Property Type</label>
                  <select {...register("propertyType")} disabled={isSubmitting} className={selectClassName}>
                    <option>Apartment</option>
                    <option>Villa</option>
                    <option>Penthouse</option>
                    <option>Plot</option>
                  </select>
                  <FieldError message={errors.propertyType?.message} />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 ml-1">Listing Type</label>
                  <select {...register("listingType")} disabled={isSubmitting} className={selectClassName}>
                    <option>Sale</option>
                    <option>Rent</option>
                  </select>
                  <FieldError message={errors.listingType?.message} />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 ml-1">Latitude</label>
                  <Input type="number" step="any" {...register("latitude")} disabled={isSubmitting} className={inputClassName} />
                  <FieldError message={errors.latitude?.message} />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 ml-1">Longitude</label>
                  <Input type="number" step="any" {...register("longitude")} disabled={isSubmitting} className={inputClassName} />
                  <FieldError message={errors.longitude?.message} />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 ml-1">Description</label>
                <Textarea {...register("description")} disabled={isSubmitting} rows={5} className="rounded-xl bg-stone-100/50 dark:bg-zinc-950/50 border-stone-200 dark:border-zinc-800" placeholder="Enter property details, amenities, ownership notes, and viewing instructions." />
                <FieldError message={errors.description?.message} />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 ml-1">Property Images</label>
                <Controller
                  name="imageUrls"
                  control={control}
                  render={({ field }) => (
                    <UploadZone
                      value={field.value}
                      onChange={field.onChange}
                      disabled={isSubmitting}
                      onError={(message) => toast({ variant: "error", title: "Image upload failed", description: message })}
                    />
                  )}
                />
                <FieldError message={errors.imageUrls?.message} />
              </div>

              <div className="flex justify-end pt-6">
                <Button type="submit" loading={isSubmitting} className="h-12 px-8 bg-emerald-900 dark:bg-emerald-950 hover:bg-emerald-800 dark:hover:bg-emerald-900 text-white rounded-xl">
                  <Plus className="w-5 h-5 mr-2" />
                  Publish Listing
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      </main>
    </AdminGuard>
  );
}
