"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useCreateLead } from "@/src/dataconnect-generated/react";
import { dataConnectClient } from "@/lib/firebase";
import { MessageSquare, Phone, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MobileDrawer } from "./mobile-drawer";

const leadSchema = z.object({
  clientName: z.string().min(2, "Name is required"),
  clientPhone: z.string().regex(/^[6-9]\d{9}$/, "Valid 10-digit Indian mobile required"),
  clientMessage: z.string().optional(),
});

type LeadFormValues = z.infer<typeof leadSchema>;

interface LeadFormProps {
  propertyId: string;
  propertyTitle: string;
  agentPhone: string;
}

export function LeadForm({ propertyId, propertyTitle, agentPhone }: LeadFormProps) {
  const [loading, setLoading] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { mutateAsync: createLead } = useCreateLead(dataConnectClient);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LeadFormValues>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      clientName: "",
      clientPhone: "",
      clientMessage: `Namaste, I am interested in viewing your listing: "${propertyTitle}" on Namma Living.`,
    },
  });

  const onSubmit = async (data: LeadFormValues) => {
    setLoading(true);
    try {
      await createLead({
        propertyId,
        agentPhone,
        clientName: data.clientName,
        clientPhone: data.clientPhone,
        clientMessage: data.clientMessage || "",
      });

      const message = `${data.clientMessage || ""}\n\nMy name is ${data.clientName}. Let's connect.`;
      const encodedText = encodeURIComponent(message);
      const cleanPhone = agentPhone.replace(/\D/g, "");
      const formattedPhone = cleanPhone.startsWith("91") ? cleanPhone : `91${cleanPhone}`;
      const url = `https://wa.me/${formattedPhone}?text=${encodedText}`;

      window.open(url, "_blank", "noopener,noreferrer");
      reset();
      setMobileOpen(false);
    } catch {
      alert("Error submitting inquiry. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const formContent = (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div>
        <label className="block text-[10px] font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1">
          Your Name
        </label>
        <Input type="text" placeholder="e.g. Aarav Sharma" disabled={loading} {...register("clientName")} />
        {errors.clientName && <p className="text-[10px] text-red-500 mt-1">{errors.clientName.message}</p>}
      </div>

      <div>
        <label className="block text-[10px] font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1">
          Phone Number
        </label>
        <Input type="tel" placeholder="e.g. 9876543210" disabled={loading} {...register("clientPhone")} />
        {errors.clientPhone && <p className="text-[10px] text-red-500 mt-1">{errors.clientPhone.message}</p>}
      </div>

      <div>
        <label className="block text-[10px] font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1">
          Message
        </label>
        <Textarea placeholder="Enter your message..." disabled={loading} className="h-16" {...register("clientMessage")} />
      </div>

      <Button type="submit" disabled={loading} className="w-full bg-emerald-700 dark:bg-emerald-800 text-white min-h-[44px]">
        {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <MessageSquare className="w-4 h-4 mr-2" />}
        Connect on WhatsApp
      </Button>
    </form>
  );

  return (
    <>
      <div className="hidden md:block w-80 bg-white/40 dark:bg-zinc-900/40 backdrop-blur-2xl border border-white/60 dark:border-zinc-800/60 p-6 rounded-3xl shadow-xl shadow-stone-200/50 dark:shadow-black/20">
        <h3 className="font-serif italic text-lg font-medium text-zinc-900 dark:text-zinc-100 mb-2">Inquire About Property</h3>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-6 leading-relaxed">
          Submit your details to start a conversation with the listing owner/agent on WhatsApp.
        </p>
        {formContent}
      </div>

      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border-t border-stone-200/80 dark:border-zinc-850 p-4 flex items-center justify-between gap-4 shadow-2xl">
        <div className="flex-1 min-w-0 text-left">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Agent Hotline</p>
          <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 truncate">{agentPhone}</p>
        </div>
        <Button onClick={() => setMobileOpen(true)} className="bg-emerald-700 dark:bg-emerald-800 text-white min-h-[44px]">
          <Phone className="w-4 h-4 mr-2" />
          Inquire Now
        </Button>
      </div>

      <MobileDrawer isOpen={mobileOpen} onClose={() => setMobileOpen(false)} title="Inquire About Property">
        {formContent}
      </MobileDrawer>
    </>
  );
}
