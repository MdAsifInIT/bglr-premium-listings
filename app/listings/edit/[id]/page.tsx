"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { auth, dataConnectClient } from "@/lib/firebase";
import { useGetPropertyById, useUpdateProperty } from "@/src/dataconnect-generated/react";
import type { GetPropertyByIdData } from "@/src/dataconnect-generated";
import { Loader2, ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { onAuthStateChanged, type User } from "firebase/auth";

interface EditListingPageProps {
  params: Promise<{ id: string }>;
}

type EditableProperty = NonNullable<GetPropertyByIdData["property"]>;

interface EditFormState {
  title: string;
  description: string;
  price: string;
  bhkCount: string;
  propertyType: string;
  listingType: string;
  locality: string;
  latitude: string;
  longitude: string;
  imageUrls: string;
}

function getInitialFormData(property: EditableProperty): EditFormState {
  return {
    title: property.title,
    description: property.description,
    price: String(property.price),
    bhkCount: String(property.bhkCount),
    propertyType: property.propertyType,
    listingType: property.listingType,
    locality: property.locality,
    latitude: String(property.latitude),
    longitude: String(property.longitude),
    imageUrls: property.imageUrls.join(", "),
  };
}

function EditListingForm({ id, property }: { id: string; property: EditableProperty }) {
  const router = useRouter();
  const { mutateAsync: updateProperty } = useUpdateProperty(dataConnectClient);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [formData, setFormData] = useState<EditFormState>(() => getInitialFormData(property));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaveError(null);

    const price = Number.parseInt(formData.price, 10);
    const bhkCount = Number.parseInt(formData.bhkCount, 10);
    const latitude = Number.parseFloat(formData.latitude);
    const longitude = Number.parseFloat(formData.longitude);
    const imageUrls = formData.imageUrls.split(",").map((u) => u.trim()).filter(Boolean);

    if (!Number.isFinite(price) || !Number.isFinite(bhkCount) || !Number.isFinite(latitude) || !Number.isFinite(longitude) || imageUrls.length === 0) {
      setSaveError("Please provide valid price, BHK, coordinates, and at least one image URL.");
      setSaving(false);
      return;
    }

    try {
      await updateProperty({
        id,
        title: formData.title.trim(),
        description: formData.description.trim(),
        price,
        bhkCount,
        propertyType: formData.propertyType,
        listingType: formData.listingType,
        locality: formData.locality,
        latitude,
        longitude,
        imageUrls,
      });
      router.push("/listings/manage");
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : "Failed to update property listings database record.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="flex-1 bg-stone-50 dark:bg-zinc-950 p-6 min-h-screen">
      <div className="max-w-3xl mx-auto">
        <Link href="/listings/manage" className="inline-flex items-center text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
        </Link>

        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="font-serif text-3xl font-semibold text-zinc-900 dark:text-zinc-100">Edit Listing</h1>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm mt-1 font-light">
              Make changes to your premium property listing. This will submit it for re-moderation.
            </p>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/60 dark:bg-zinc-900/60 backdrop-blur-2xl border border-stone-200/50 dark:border-zinc-800/50 rounded-3xl p-8 shadow-sm"
        >
          {saveError && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/30 text-red-600 dark:text-red-400 text-sm rounded-xl">
              {saveError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 ml-1">Title</label>
                <input name="title" value={formData.title} onChange={handleChange} required className="w-full h-12 px-4 rounded-xl bg-stone-100/50 dark:bg-zinc-950/50 border border-stone-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-emerald-500/50 outline-none transition-all" />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 ml-1">Price (INR)</label>
                <input type="number" name="price" value={formData.price} onChange={handleChange} required className="w-full h-12 px-4 rounded-xl bg-stone-100/50 dark:bg-zinc-950/50 border border-stone-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-emerald-500/50 outline-none transition-all" />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 ml-1">BHK Count</label>
                <input type="number" name="bhkCount" value={formData.bhkCount} onChange={handleChange} required className="w-full h-12 px-4 rounded-xl bg-stone-100/50 dark:bg-zinc-950/50 border border-stone-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-emerald-500/50 outline-none transition-all" />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 ml-1">Locality</label>
                <select name="locality" value={formData.locality} onChange={handleChange} className="w-full h-12 px-4 rounded-xl bg-stone-100/50 dark:bg-zinc-950/50 border border-stone-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-emerald-500/50 outline-none transition-all">
                  <option>Indiranagar</option>
                  <option>HSR Layout</option>
                  <option>Koramangala</option>
                  <option>Whitefield</option>
                  <option>Sadashivanagar</option>
                  <option>Vittal Mallya Road</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 ml-1">Property Type</label>
                <select name="propertyType" value={formData.propertyType} onChange={handleChange} className="w-full h-12 px-4 rounded-xl bg-stone-100/50 dark:bg-zinc-950/50 border border-stone-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-emerald-500/50 outline-none transition-all">
                  <option>Apartment</option>
                  <option>Villa</option>
                  <option>Penthouse</option>
                  <option>Plot</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 ml-1">Listing Type</label>
                <select name="listingType" value={formData.listingType} onChange={handleChange} className="w-full h-12 px-4 rounded-xl bg-stone-100/50 dark:bg-zinc-950/50 border border-stone-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-emerald-500/50 outline-none transition-all">
                  <option>Sale</option>
                  <option>Rent</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 ml-1">Latitude</label>
                <input type="number" step="any" name="latitude" value={formData.latitude} onChange={handleChange} required className="w-full h-12 px-4 rounded-xl bg-stone-100/50 dark:bg-zinc-950/50 border border-stone-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-emerald-500/50 outline-none transition-all" />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 ml-1">Longitude</label>
                <input type="number" step="any" name="longitude" value={formData.longitude} onChange={handleChange} required className="w-full h-12 px-4 rounded-xl bg-stone-100/50 dark:bg-zinc-950/50 border border-stone-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-emerald-500/50 outline-none transition-all" />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 ml-1">Description</label>
              <textarea name="description" value={formData.description} onChange={handleChange} required rows={4} className="w-full p-4 rounded-xl bg-stone-100/50 dark:bg-zinc-950/50 border border-stone-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-emerald-500/50 outline-none resize-none transition-all" />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 ml-1">Image URLs (comma separated)</label>
              <textarea name="imageUrls" value={formData.imageUrls} onChange={handleChange} required rows={2} className="w-full p-4 rounded-xl bg-stone-100/50 dark:bg-zinc-950/50 border border-stone-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-emerald-500/50 outline-none resize-none transition-all" />
            </div>

            <div className="flex justify-end pt-6">
              <button type="submit" disabled={saving} className="h-12 px-8 bg-emerald-900 dark:bg-emerald-950 hover:bg-emerald-800 dark:hover:bg-emerald-900 text-white rounded-xl font-medium flex items-center transition-colors disabled:opacity-70 shadow-sm">
                {saving ? <Loader2 className="w-5 h-5 mr-2 animate-spin" /> : <Save className="w-5 h-5 mr-2" />}
                Save Changes
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </main>
  );
}

export default function EditListingPage({ params }: EditListingPageProps) {
  const router = useRouter();
  const { id } = use(params);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push(`/auth/login?redirect=/listings/edit/${id}`);
      } else {
        setCurrentUser(user);
      }
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, [router, id]);

  const { data, isLoading: queryLoading, error: queryError } = useGetPropertyById(
    dataConnectClient,
    { id },
    { enabled: !!currentUser }
  );

  const isLoading = authLoading || queryLoading;

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-stone-50 dark:bg-zinc-950 min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-600 dark:text-emerald-500" />
      </div>
    );
  }

  if (queryError || (data && !data.property)) {
    return (
      <div className="flex-1 flex items-center justify-center p-6 bg-stone-50 dark:bg-zinc-950 min-h-screen">
        <div className="text-center bg-white dark:bg-zinc-900 border border-stone-200 dark:border-zinc-800 p-8 rounded-3xl max-w-md w-full shadow-lg">
          <p className="text-red-500 font-semibold mb-4">Listing not found</p>
          <p className="text-zinc-600 dark:text-zinc-400 text-sm mb-6">
            {queryError?.message || "The property details page could not be accessed or you lack authorization."}
          </p>
          <Link href="/listings/manage" className="px-5 py-2.5 bg-stone-900 dark:bg-zinc-100 text-stone-50 dark:text-zinc-900 rounded-xl text-sm font-medium">
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  if (!data?.property) return null;

  return <EditListingForm key={id} id={id} property={data.property} />;
}
