import { getPropertyById } from "@/src/dataconnect-generated";
import { dataConnectClient } from "@/lib/firebase";
import { MapPin, Bed, Tag, Phone, User } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface PropertyPageProps {
  params: Promise<{ id: string }>;
}

import { LeadForm } from "./components/lead-form";

export default async function PropertyPage({ params }: PropertyPageProps) {
  const { id } = await params;

  let property;
  try {
    const result = await getPropertyById(dataConnectClient, { id });
    property = result.data.property;
  } catch {
    return (
      <div className="flex-1 flex items-center justify-center p-12 bg-stone-50 dark:bg-zinc-950">
        <div className="text-center">
          <h1 className="font-serif text-2xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3">Property Not Found</h1>
          <p className="text-zinc-600 dark:text-zinc-400 text-sm mb-6">This listing may have been removed or is unavailable.</p>
          <Link href="/" className="bg-emerald-700 dark:bg-emerald-800 hover:bg-emerald-600 dark:hover:bg-emerald-700 text-white dark:text-zinc-100 px-6 py-2.5 rounded-lg font-medium transition-colors text-sm">Return Home</Link>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="flex-1 flex items-center justify-center p-12 bg-stone-50 dark:bg-zinc-950">
        <div className="text-center">
          <h1 className="font-serif text-2xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3">Listing Unavailable</h1>
          <div className="text-zinc-600 dark:text-zinc-400">We couldn&apos;t find the property you&apos;re looking for.</div>
          <Link href="/" className="bg-emerald-700 dark:bg-emerald-800 hover:bg-emerald-600 dark:hover:bg-emerald-700 text-white dark:text-zinc-100 px-6 py-2.5 rounded-lg font-medium transition-colors text-sm">Return Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-stone-50 dark:bg-zinc-950 p-6 pb-24 md:pb-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <div className="flex-1 min-w-0">
            {/* Image Gallery */}
            {property.imageUrls.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {property.imageUrls.map((url: string, i: number) => (
                  <div key={i} className={`relative aspect-video bg-stone-200 dark:bg-zinc-900 rounded-xl overflow-hidden border border-stone-200 dark:border-zinc-800 ${i === 0 ? "md:col-span-2" : ""}`}>
                    <Image src={url} alt={`${property.title} — Image ${i + 1}`} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover" />
                  </div>
                ))}
              </div>
            )}

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-8">
              <div>
                <h1 className="font-serif text-3xl font-semibold text-zinc-900 dark:text-zinc-100">{property.title}</h1>
                <div className="flex items-center gap-3 mt-2 text-zinc-600 dark:text-zinc-400 text-sm">
                  <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{property.locality}</span>
                  <span className="flex items-center gap-1"><Bed className="h-3.5 w-3.5" />{property.bhkCount} BHK {property.propertyType}</span>
                  <span className="flex items-center gap-1"><Tag className="h-3.5 w-3.5" />{property.listingType}</span>
                </div>
              </div>
              <div className="bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-900/50 px-6 py-3 rounded-xl text-right shrink-0">
                <p className="text-xs text-emerald-700 dark:text-emerald-400 uppercase tracking-wider font-semibold">Price</p>
                <p className="text-2xl font-semibold text-emerald-600 dark:text-emerald-300">₹{property.price.toLocaleString("en-IN")}</p>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white dark:bg-zinc-900 border border-stone-200/60 dark:border-zinc-800/50 rounded-xl p-6 mb-8 shadow-sm">
              <h2 className="font-serif text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-3">About This Property</h2>
              <p className="text-zinc-700 dark:text-zinc-300 text-sm leading-relaxed whitespace-pre-wrap">{property.description}</p>
            </div>

            {/* Owner Contact */}
            <div className="bg-white dark:bg-zinc-900 border border-stone-200/60 dark:border-zinc-800/50 rounded-xl p-6 shadow-sm">
              <h2 className="font-serif text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-3">Listed By</h2>
              <div className="flex items-center gap-4 text-sm text-zinc-700 dark:text-zinc-300">
                <span className="flex items-center gap-1.5"><User className="h-4 w-4 text-zinc-400 dark:text-zinc-500" />{property.owner.fullName}</span>
                <span className="flex items-center gap-1.5"><Phone className="h-4 w-4 text-zinc-400 dark:text-zinc-500" />{property.owner.phoneNumber}</span>
              </div>
            </div>
          </div>

          <div className="shrink-0 w-full lg:w-auto">
            <LeadForm
              propertyId={property.id}
              propertyTitle={property.title}
              agentPhone={property.owner.phoneNumber}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
