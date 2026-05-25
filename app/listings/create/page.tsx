"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { auth, dataConnectClient } from "@/lib/firebase";
import { useCreateProperty } from "@/src/dataconnect-generated/react";
import { StepPricing } from "./components/step-pricing";
import { StepSpatial } from "./components/step-spatial";
import { StepCoords } from "./components/step-coords";
import { UploadZone } from "@/components/upload-zone";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const propertySchema = z.object({
  price: z.number({ message: "Price must be a number" }).int().positive("Price must be positive"),
  listingType: z.enum(["Rent", "Sale"]),
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  bhkCount: z.number({ message: "BHK must be a number" }).int().positive("BHK must be positive"),
  propertyType: z.enum(["Apartment", "Villa", "Penthouse", "Plot"]),
  locality: z.enum(["Indiranagar", "HSR Layout", "Koramangala", "Whitefield"]),
  latitude: z.number({ message: "Latitude must be a number" }).min(-90).max(90, "Latitude between -90 and 90"),
  longitude: z.number({ message: "Longitude must be a number" }).min(-180).max(180, "Longitude between -180 and 180"),
  imageUrls: z.array(z.string().url()).min(1, "Please upload at least one image"),
});

type PropertyFormValues = z.infer<typeof propertySchema>;

export default function CreateListingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [user, setUser] = useState<any>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const { mutateAsync: createProperty } = useCreateProperty(dataConnectClient);

  useEffect(() => {
    return auth.onAuthStateChanged((u) => {
      setUser(u);
      setAuthLoading(false);
    });
  }, []);

  const methods = useForm<PropertyFormValues>({
    resolver: zodResolver(propertySchema),
    defaultValues: { listingType: "Sale", propertyType: "Apartment", locality: "Indiranagar", imageUrls: [] },
  });

  const { control, trigger, handleSubmit, formState: { errors } } = methods;

  const nextStep = async () => {
    let fields: Array<keyof PropertyFormValues> = [];
    if (step === 1) fields = ["price", "listingType"];
    else if (step === 2) fields = ["title", "description", "bhkCount", "propertyType", "locality"];
    else if (step === 3) fields = ["latitude", "longitude"];
    if (await trigger(fields)) setStep((s) => s + 1);
  };

  const onSubmit = async (data: PropertyFormValues) => {
    setError(null);
    setSubmitting(true);
    try {
      await createProperty(data);
      router.push("/");
    } catch (err: any) {
      setError(err.message || "Failed to commit listing to database.");
    } finally {
      setSubmitting(false);
    }
  };

  if (authLoading) return <div className="flex-1 flex items-center justify-center bg-stone-50 dark:bg-zinc-950 text-zinc-600 dark:text-zinc-400">Verifying session...</div>;
  if (!user) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 bg-stone-50 dark:bg-zinc-950 text-center">
        <h2 className="font-serif text-2xl font-semibold mb-3 text-zinc-900 dark:text-zinc-100">Access Restricted</h2>
        <p className="text-zinc-600 dark:text-zinc-400 mb-6">You must be logged in to create listing files.</p>
        <Link href="/auth/login" className="bg-emerald-700 dark:bg-emerald-800 hover:bg-emerald-600 dark:hover:bg-emerald-700 text-white dark:text-zinc-100 px-6 py-2.5 rounded-lg font-medium transition-colors">Sign In</Link>
      </div>
    );
  }

  return (
    <div className="flex-1 flex items-center justify-center p-6 bg-stone-50 dark:bg-zinc-950">
      <div className="bg-white dark:bg-zinc-900 border border-stone-200 dark:border-zinc-800 p-8 rounded-xl max-w-lg w-full shadow-xl dark:shadow-2xl">
        <div className="flex items-center justify-between border-b border-stone-200 dark:border-zinc-800 pb-4 mb-6">
          <h2 className="font-serif text-xl font-semibold text-zinc-900 dark:text-zinc-100">Create Premium Listing</h2>
          <span className="text-xs text-zinc-500 dark:text-zinc-400 font-mono">Step {step} of 4</span>
        </div>
        {error && <div className="bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 p-3 rounded-lg text-sm mb-6">{error}</div>}

        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {step === 1 && <StepPricing />}
            {step === 2 && <StepSpatial />}
            {step === 3 && <StepCoords />}
            {step === 4 && (
              <div className="space-y-4">
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider mb-2">Upload Assets</label>
                <Controller
                  name="imageUrls"
                  control={control}
                  render={({ field }) => <UploadZone value={field.value} onChange={field.onChange} />}
                />
                {errors.imageUrls && <p className="text-xs text-red-500">{String(errors.imageUrls.message)}</p>}
              </div>
            )}

            <div className="flex items-center justify-between pt-4 border-t border-stone-200 dark:border-zinc-800">
              {step > 1 ? (
                <Button type="button" variant="secondary" onClick={() => setStep((s) => s - 1)} disabled={submitting} className="px-4 py-2 border border-stone-300 dark:border-zinc-800 hover:bg-stone-200 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-lg text-sm transition-colors cursor-pointer disabled:opacity-50">Back</Button>
              ) : <div />}
              {step < 4 ? (
                <Button type="button" onClick={nextStep} className="bg-emerald-700 dark:bg-emerald-800 hover:bg-emerald-600 dark:hover:bg-emerald-700 text-white dark:text-zinc-100 font-semibold px-5 py-2 rounded-lg text-sm transition-colors cursor-pointer">Continue</Button>
              ) : (
                <Button type="submit" loading={submitting} className="bg-emerald-700 dark:bg-emerald-800 hover:bg-emerald-600 dark:hover:bg-emerald-700 active:bg-emerald-800 dark:active:bg-emerald-900 text-white dark:text-zinc-100 font-semibold px-5 py-2 rounded-lg text-sm transition-colors cursor-pointer disabled:opacity-50 flex items-center gap-2">Publish Listing</Button>
              )}
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
