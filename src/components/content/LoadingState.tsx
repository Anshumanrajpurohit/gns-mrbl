import { memo } from "react";
import { LoaderCircle } from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";

interface LoadingStateProps {
  label?: string;
  variant?: "grid" | "detail";
}

const LoadingStateComponent = ({ label = "Loading...", variant = "grid" }: LoadingStateProps) => {
  if (variant === "detail") {
    return (
      <div className="rounded-3xl border border-border/60 bg-card p-6 shadow-soft md:p-8">
        <div className="mb-6 flex items-center justify-center gap-3 text-sm text-muted-foreground">
          <LoaderCircle className="h-4 w-4 animate-spin text-gold" />
          <span>{label}</span>
        </div>
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <Skeleton className="aspect-[4/3] w-full rounded-3xl" />
          <div className="space-y-4">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-12 w-3/4" />
            <Skeleton className="h-5 w-1/2" />
            <Skeleton className="h-24 w-full" />
            <div className="grid gap-3 sm:grid-cols-2">
              <Skeleton className="h-20 rounded-2xl" />
              <Skeleton className="h-20 rounded-2xl" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-center gap-3 py-2 text-sm text-muted-foreground">
        <LoaderCircle className="h-4 w-4 animate-spin text-gold" />
        <span>{label}</span>
      </div>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="overflow-hidden rounded-3xl border border-border/60 bg-card p-0 shadow-soft">
            <Skeleton className="aspect-[4/3] w-full rounded-none" />
            <div className="space-y-4 p-6">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-10 w-3/4" />
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-10 w-1/3" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const LoadingState = memo(LoadingStateComponent);
