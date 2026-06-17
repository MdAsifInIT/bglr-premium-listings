"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth, dataConnectClient } from "@/lib/firebase";
import { useGetCurrentUser } from "@/src/dataconnect-generated/react";
import { Loader2, ShieldAlert } from "lucide-react";
import Link from "next/link";

interface AdminGuardProps {
  children: React.ReactNode;
}

export function AdminGuard({ children }: AdminGuardProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push("/auth/login?redirect=/admin");
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      setIsAuthenticated(true);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  const {
    data,
    isLoading: profileLoading,
    error,
  } = useGetCurrentUser(dataConnectClient, {
    enabled: isAuthenticated,
    retry: false,
  });

  const isAdmin = data?.user?.isAdmin === true;

  if (loading || (isAuthenticated && profileLoading)) {
    return (
      <div className="flex-1 flex items-center justify-center p-12">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-12">
        <div className="bg-white dark:bg-zinc-900 border border-red-200 dark:border-red-900/50 p-8 rounded-3xl max-w-md w-full text-center shadow-xl shadow-red-500/5">
          <ShieldAlert className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="font-serif text-2xl font-semibold text-zinc-900 dark:text-zinc-100 mb-2">Access Denied</h2>
          <p className="text-zinc-600 dark:text-zinc-400 text-sm mb-6">
            {error?.message || "You do not have administrator privileges to access the moderation console."}
          </p>
          <Link href="/" className="px-6 py-2.5 bg-stone-900 dark:bg-zinc-100 text-stone-50 dark:text-zinc-900 rounded-xl text-sm font-medium transition-colors">Return Home</Link>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
