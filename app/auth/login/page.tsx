import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import { LoginForm } from "./components/login-form";

export default function LoginPage() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center p-6 bg-stone-50 dark:bg-zinc-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-stone-200/50 via-stone-50 to-stone-50 dark:from-zinc-800/20 dark:via-zinc-950 dark:to-zinc-950 pointer-events-none"></div>
      
      <div className="w-full max-w-md bg-white/60 dark:bg-zinc-900/60 backdrop-blur-2xl border border-stone-200/50 dark:border-zinc-800/50 p-8 rounded-3xl shadow-xl z-10">
        <div className="text-center mb-8">
          <h1 className="font-serif text-3xl font-semibold text-zinc-900 dark:text-zinc-100">Administrator Login</h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-2 font-light">Secure access to Namma Living moderation</p>
        </div>

        <Suspense fallback={<div className="flex justify-center p-4"><Loader2 className="w-6 h-6 animate-spin text-emerald-500" /></div>}>
          <LoginForm />
        </Suspense>
      </div>
    </main>
  );
}
