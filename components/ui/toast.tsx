"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { CheckCircle2, Info, X, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type ToastVariant = "success" | "error" | "info";

interface ToastInput {
  title: string;
  description?: string;
  variant?: ToastVariant;
}

interface Toast extends ToastInput {
  id: number;
  variant: ToastVariant;
}

interface ToastContextValue {
  toast: (input: ToastInput) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

const icons = {
  success: CheckCircle2,
  error: XCircle,
  info: Info,
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const remove = useCallback((id: number) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const toast = useCallback((input: ToastInput) => {
    const id = Date.now() + Math.random();
    const nextToast: Toast = {
      ...input,
      id,
      variant: input.variant ?? "info",
    };

    setToasts((current) => [...current, nextToast].slice(-4));
    window.setTimeout(() => remove(id), 4500);
  }, [remove]);

  const value = useMemo(() => ({ toast }), [toast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed right-4 top-4 z-[100] flex w-[calc(100vw-2rem)] max-w-sm flex-col gap-3">
        {toasts.map((item) => {
          const Icon = icons[item.variant];

          return (
            <div
              key={item.id}
              role="status"
              className={cn(
                "flex items-start gap-3 rounded-xl border bg-white p-4 shadow-xl shadow-stone-900/10 dark:bg-zinc-950 dark:shadow-black/30",
                item.variant === "success" && "border-emerald-200 dark:border-emerald-900/50",
                item.variant === "error" && "border-red-200 dark:border-red-900/50",
                item.variant === "info" && "border-stone-200 dark:border-zinc-800"
              )}
            >
              <Icon
                className={cn(
                  "mt-0.5 h-5 w-5 shrink-0",
                  item.variant === "success" && "text-emerald-600 dark:text-emerald-400",
                  item.variant === "error" && "text-red-600 dark:text-red-400",
                  item.variant === "info" && "text-zinc-500 dark:text-zinc-400"
                )}
              />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{item.title}</p>
                {item.description && (
                  <p className="mt-1 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">{item.description}</p>
                )}
              </div>
              <button
                type="button"
                onClick={() => remove(item.id)}
                aria-label="Dismiss notification"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-zinc-500 transition-colors hover:bg-stone-100 hover:text-zinc-900 dark:hover:bg-zinc-900 dark:hover:text-zinc-100"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }

  return context;
}
