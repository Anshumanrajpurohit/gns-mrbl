import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { ArrowRight, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

import { EmptyState } from "@/components/content/EmptyState";
import { LoadingState } from "@/components/content/LoadingState";
import { Button } from "@/components/ui/button";
import { fetchPublicWorks } from "@/services/publicContentApi";

const Work = () => {
  const workQuery = useQuery({
    queryKey: ["public", "work"],
    queryFn: fetchPublicWorks,
    staleTime: 60_000,
    refetchOnWindowFocus: false,
  });

  return (
    <div className="bg-background">
      <Helmet>
        <title>Work | Ganpati Marble Goa</title>
        <meta
          name="description"
          content="Browse completed work published by Ganpati Marble Goa, then open each project for galleries, reviews, and finish details."
        />
      </Helmet>

      <section className="bg-secondary py-24 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-gold">Work</p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground">
              Published Projects<br />
              <span className="text-gold">Across Goa</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Explore live project listings from the backend and open any card to view its gallery, review set, and project details.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24">
        <div className="container mx-auto px-4">
          {workQuery.isLoading ? (
            <LoadingState label="Loading projects..." />
          ) : workQuery.error ? (
            <div className="rounded-3xl border border-border/60 bg-card px-6 py-12 text-center text-destructive shadow-soft">
              {workQuery.error instanceof Error ? workQuery.error.message : "Unable to load work"}
            </div>
          ) : (workQuery.data ?? []).length === 0 ? (
            <EmptyState title="No data available" description="No published projects are available yet." />
          ) : (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {(workQuery.data ?? []).map((item) => (
                <article
                  key={item.id}
                  className="overflow-hidden rounded-3xl border border-border/60 bg-card shadow-soft transition duration-500 hover:-translate-y-1 hover:shadow-lifted"
                >
                  <div className="aspect-[4/3] bg-secondary/50">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.title}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover transition duration-700 hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                        No image
                      </div>
                    )}
                  </div>
                  <div className="space-y-4 p-6">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-xs uppercase tracking-[0.28em] text-gold">{item.category}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <MapPin className="h-3.5 w-3.5" />
                        {item.location}
                      </div>
                    </div>
                    <div>
                      <h2 className="font-display text-3xl text-foreground">{item.title}</h2>
                      <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{item.description}</p>
                    </div>
                    <Button variant="elegant" asChild>
                      <Link to={`/work/${item.slug}`}>
                        View project
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Work;
