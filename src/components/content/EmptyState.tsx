import { memo } from "react";
import { DatabaseZap } from "lucide-react";

interface EmptyStateProps {
  title?: string;
  description?: string;
}

const EmptyStateComponent = ({
  title = "No data available",
  description = "There is nothing to show here yet.",
}: EmptyStateProps) => (
  <div className="rounded-3xl border border-dashed border-border/70 bg-card px-6 py-14 text-center shadow-soft">
    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary text-gold">
      <DatabaseZap className="h-6 w-6" />
    </div>
    <h2 className="mt-5 font-display text-3xl text-foreground">{title}</h2>
    <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-muted-foreground">{description}</p>
  </div>
);

export const EmptyState = memo(EmptyStateComponent);
