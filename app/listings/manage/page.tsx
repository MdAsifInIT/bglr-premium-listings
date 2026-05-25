import Link from "next/link";
import { ArrowLeft, Clock } from "lucide-react";

export default function ManageListingsPage() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 bg-stone-50 dark:bg-zinc-950 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 dark:bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="relative z-10 max-w-md w-full bg-white/40 dark:bg-zinc-900/40 backdrop-blur-2xl border border-white/60 dark:border-zinc-800/60 rounded-3xl p-10 text-center shadow-xl shadow-stone-200/50 dark:shadow-black/20">
        <div className="w-16 h-16 bg-stone-100 dark:bg-zinc-800 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-inner border border-stone-200/50 dark:border-zinc-700/50">
          <Clock className="w-8 h-8 text-emerald-700 dark:text-emerald-500" />
        </div>
        
        <h1 className="font-serif italic text-3xl font-medium text-zinc-900 dark:text-zinc-100 mb-3">
          Coming Soon
        </h1>
        
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-8 leading-relaxed">
          The property management portal is currently under development. Soon, you will be able to edit, pause, and track analytics for your premium listings directly from this dashboard.
        </p>
        
        <Link 
          href="/"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-stone-900 dark:bg-zinc-100 text-stone-50 dark:text-zinc-900 text-sm font-medium rounded-xl hover:scale-105 transition-transform duration-200 shadow-md"
        >
          <ArrowLeft className="w-4 h-4" />
          Return to Discovery
        </Link>
      </div>
    </div>
  );
}
