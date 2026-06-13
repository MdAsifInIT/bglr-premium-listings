"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AdminGuard } from "../components/admin-guard";
import { useCreateProperty } from "@/src/dataconnect-generated/react";
import { dataConnectClient } from "@/lib/firebase";
import { Loader2, Plus, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function AddPropertyPage() {
  const router = useRouter();
  const { mutateAsync: createProperty, isPending, error } = useCreateProperty(dataConnectClient);
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    bhkCount: "",
    propertyType: "Apartment",
    listingType: "Sale",
    locality: "Indiranagar",
    latitude: "12.9784",
    longitude: "77.6408",
    imageUrls: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80"
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createProperty({
        title: formData.title,
        description: formData.description,
        price: parseInt(formData.price),
        bhkCount: parseInt(formData.bhkCount),
        propertyType: formData.propertyType,
        listingType: formData.listingType,
        locality: formData.locality,
        latitude: parseFloat(formData.latitude),
        longitude: parseFloat(formData.longitude),
        imageUrls: formData.imageUrls.split(',').map(u => u.trim())
      });
      router.push("/admin");
    } catch (err) {
      console.error("Failed to create property:", err);
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
            {error && (
              <div className="mb-6 p-4 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/30 text-red-600 dark:text-red-400 text-sm rounded-xl">
                {error.message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 ml-1">Title</label>
                  <input name="title" value={formData.title} onChange={handleChange} required className="w-full h-12 px-4 rounded-xl bg-stone-100/50 dark:bg-zinc-950/50 border border-stone-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-emerald-500/50 outline-none transition-all" placeholder="e.g. Ultra Luxury Villa" />
                </div>
                
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 ml-1">Price (INR)</label>
                  <input type="number" name="price" value={formData.price} onChange={handleChange} required className="w-full h-12 px-4 rounded-xl bg-stone-100/50 dark:bg-zinc-950/50 border border-stone-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-emerald-500/50 outline-none transition-all" placeholder="25000000" />
                </div>
                
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 ml-1">BHK Count</label>
                  <input type="number" name="bhkCount" value={formData.bhkCount} onChange={handleChange} required className="w-full h-12 px-4 rounded-xl bg-stone-100/50 dark:bg-zinc-950/50 border border-stone-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-emerald-500/50 outline-none transition-all" placeholder="4" />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 ml-1">Locality</label>
                  <select name="locality" value={formData.locality} onChange={handleChange} className="w-full h-12 px-4 rounded-xl bg-stone-100/50 dark:bg-zinc-950/50 border border-stone-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-emerald-500/50 outline-none transition-all">
                    <option>Indiranagar</option>
                    <option>HSR Layout</option>
                    <option>Koramangala</option>
                    <option>Whitefield</option>
                    <option>Sadashivanagar</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 ml-1">Property Type</label>
                  <select name="propertyType" value={formData.propertyType} onChange={handleChange} className="w-full h-12 px-4 rounded-xl bg-stone-100/50 dark:bg-zinc-950/50 border border-stone-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-emerald-500/50 outline-none transition-all">
                    <option>Apartment</option>
                    <option>Villa</option>
                    <option>Penthouse</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 ml-1">Listing Type</label>
                  <select name="listingType" value={formData.listingType} onChange={handleChange} className="w-full h-12 px-4 rounded-xl bg-stone-100/50 dark:bg-zinc-950/50 border border-stone-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-emerald-500/50 outline-none transition-all">
                    <option>Sale</option>
                    <option>Rent</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 ml-1">Description</label>
                <textarea name="description" value={formData.description} onChange={handleChange} required rows={4} className="w-full p-4 rounded-xl bg-stone-100/50 dark:bg-zinc-950/50 border border-stone-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-emerald-500/50 outline-none resize-none transition-all" placeholder="Enter luxurious property details..." />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 ml-1">Image URLs (comma separated)</label>
                <textarea name="imageUrls" value={formData.imageUrls} onChange={handleChange} required rows={2} className="w-full p-4 rounded-xl bg-stone-100/50 dark:bg-zinc-950/50 border border-stone-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-emerald-500/50 outline-none resize-none transition-all" placeholder="https://..." />
              </div>

              <div className="flex justify-end pt-6">
                <button type="submit" disabled={isPending} className="h-12 px-8 bg-emerald-900 dark:bg-emerald-950 hover:bg-emerald-800 dark:hover:bg-emerald-900 text-white rounded-xl font-medium flex items-center transition-colors disabled:opacity-70 shadow-sm">
                  {isPending ? <Loader2 className="w-5 h-5 mr-2 animate-spin" /> : <Plus className="w-5 h-5 mr-2" />}
                  Publish Listing
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </main>
    </AdminGuard>
  );
}
