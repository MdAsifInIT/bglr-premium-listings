"use client";

import { Building2, CheckCircle2, Clock } from "lucide-react";

interface DashboardHeaderProps {
  properties: Array<{
    isApproved: boolean;
  }>;
}

export function DashboardHeader({ properties }: DashboardHeaderProps) {
  const total = properties.length;
  const active = properties.filter((p) => p.isApproved).length;
  const pending = total - active;

  const stats = [
    {
      label: "Total Listings",
      value: total,
      icon: Building2,
      color: "text-amber-600 dark:text-amber-500",
      bg: "bg-amber-500/10",
    },
    {
      label: "Active Listings",
      value: active,
      icon: CheckCircle2,
      color: "text-emerald-600 dark:text-emerald-500",
      bg: "bg-emerald-500/10",
    },
    {
      label: "Pending Review",
      value: pending,
      icon: Clock,
      color: "text-stone-600 dark:text-stone-400",
      bg: "bg-stone-500/10",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.label}
            className="p-6 bg-white/40 dark:bg-zinc-900/40 backdrop-blur-2xl border border-white/60 dark:border-zinc-800/60 rounded-3xl shadow-xl shadow-stone-200/20 dark:shadow-black/10 flex items-center justify-between"
          >
            <div>
              <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                {stat.label}
              </p>
              <h3 className="font-serif text-3xl font-semibold text-zinc-900 dark:text-zinc-100 mt-2">
                {stat.value}
              </h3>
            </div>
            <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color}`}>
              <Icon className="w-6 h-6" />
            </div>
          </div>
        );
      })}
    </div>
  );
}
