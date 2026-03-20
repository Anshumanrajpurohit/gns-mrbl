import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import { EmptyState } from "@/components/content/EmptyState";
import { LoadingState } from "@/components/content/LoadingState";
import { Button } from "@/components/ui/button";
import { fetchPublicCollections } from "@/services/publicContentApi";
import type { PublicCollection } from "@/types/publicContent";
import { applyImageFallback, getImageUrl } from "@/utils/getImageUrl";

const collectionFilters = [
  { label: "All", value: "all" },
  { label: "Marble", value: "Marble" },
  { label: "Granite", value: "Granite" },
] as const;

const Collections = () => {
  const [selectedType, setSelectedType] = useState<(typeof collectionFilters)[number]["value"]>("all");

  const collectionsQuery = useQuery({
    queryKey: ["public", "collections"],
    queryFn: fetchPublicCollections,
    staleTime: 60_000,
    refetchOnWindowFocus: false,
  });

  const filteredCollections = useMemo(() => {
    const items = collectionsQuery.data ?? [];
    if (selectedType === "all") {
      return items;
    }
    return items.filter((item) => item.type === selectedType);
  }, [collectionsQuery.data, selectedType]);

  const renderState = (items: PublicCollection[]) => {
    if (collectionsQuery.isLoading) {
      return <LoadingState label="Loading collections..." />;
    }

    if (collectionsQuery.error) {
      return (
        <div className="rounded-3xl border border-border/60 bg-card px-6 py-12 text-center text-destructive shadow-soft">
          {collectionsQuery.error instanceof Error ? collectionsQuery.error.message : "Unable to load collections"}
        </div>
      );
    }

    if (items.length === 0) {
      return (
        <EmptyState title="No data available" description="No collections are available for this filter yet." />
      );
    }

    return (
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {items.map((collection) => (
          <article key={collection.id} className="overflow-hidden rounded-3xl border border-border/60 bg-card shadow-soft transition duration-500 hover:-translate-y-1 hover:shadow-lifted">
            <div className="aspect-[4/3] overflow-hidden bg-secondary/50">
              {collection.image ? (
                <img
                  src={getImageUrl(collection.image)}
                  alt={collection.name}
                  loading="lazy"
                  decoding="async"
                  onError={applyImageFallback}
                  className="h-full w-full object-cover transition duration-700 hover:scale-105"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-sm text-muted-foreground">No image</div>
              )}
            </div>
            <div className="space-y-4 p-6">
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs uppercase tracking-[0.28em] text-gold">{collection.type}</p>
                {collection.tag ? <span className="rounded-full bg-secondary px-3 py-1 text-xs text-muted-foreground">{collection.tag}</span> : null}
              </div>
              <div>
                <h2 className="font-display text-3xl text-foreground">{collection.name}</h2>
                <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{collection.description}</p>
              </div>
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-medium text-foreground">{collection.price_range || "Price on request"}</p>
                <Button variant="elegant" size="sm" asChild>
                  <Link to={`/contact?service=${encodeURIComponent(collection.name)}`}>
                    Enquire
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </article>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-background">
      <Helmet>
        <title>Explore Marble & Granite Collections | Ganpati Marble Goa</title>
        <meta
          name="description"
          content="Explore Marble & Granite Collections from Ganpati Marble Goa, with live pricing bands, tags, and published finishes from the website backend."
        />
      </Helmet>

      <section className="bg-secondary py-24 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-gold">Collections</p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground">
              Curated Marble &<br />
              <span className="text-gold">Granite Surfaces</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Explore live collection data from the yard. Filter by material type and enquire directly on the finish that matches your project.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-10 flex flex-wrap gap-3">
            {collectionFilters.map((filter) => (
              <button
                key={filter.value}
                type="button"
                onClick={() => setSelectedType(filter.value)}
                className={`rounded-full px-6 py-2.5 text-sm font-medium transition-all duration-300 ${
                  selectedType === filter.value
                    ? "bg-gold text-gold-foreground shadow-soft"
                    : "border border-border/60 bg-card text-muted-foreground hover:border-gold/50 hover:text-foreground"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          {renderState(filteredCollections)}
        </div>
      </section>
    </div>
  );
};

export default Collections;
