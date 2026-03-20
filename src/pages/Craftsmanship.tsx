import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";

import { EmptyState } from "@/components/content/EmptyState";
import { LoadingState } from "@/components/content/LoadingState";
import { fetchPublicCraftsmanship } from "@/services/publicContentApi";
import { applyImageFallback, getImageUrl } from "@/utils/getImageUrl";

const Craftsmanship = () => {
  const craftsmanshipQuery = useQuery({
    queryKey: ["public", "craftsmanship"],
    queryFn: fetchPublicCraftsmanship,
    staleTime: 60_000,
    refetchOnWindowFocus: false,
  });

  return (
    <div className="bg-background">
      <Helmet>
        <title>Craftsmanship | Ganpati Marble Goa</title>
        <meta
          name="description"
          content="See the craft stories, imagery, and finish details that define Ganpati Marble Goa's published workmanship."
        />
      </Helmet>

      <section className="bg-secondary py-24 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-gold">Craftsmanship</p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground">
              How We Shape Stone<br />
              <span className="text-gold">With Precision</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Every section below is loaded from the live backend, giving the public site a direct window into current craft stories and finish standards.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24">
        <div className="container mx-auto px-4">
          {craftsmanshipQuery.isLoading ? (
            <LoadingState label="Loading craftsmanship sections..." />
          ) : craftsmanshipQuery.error ? (
            <div className="rounded-3xl border border-border/60 bg-card px-6 py-12 text-center text-destructive shadow-soft">
              {craftsmanshipQuery.error instanceof Error ? craftsmanshipQuery.error.message : "Unable to load craftsmanship"}
            </div>
          ) : (craftsmanshipQuery.data ?? []).length === 0 ? (
            <EmptyState title="No data available" description="No craftsmanship stories are published yet." />
          ) : (
            <div className="space-y-12">
              {(craftsmanshipQuery.data ?? []).map((item, index) => (
                <article
                  key={item.id}
                  className={`grid gap-8 rounded-[2rem] border border-border/60 bg-card p-6 shadow-soft lg:grid-cols-2 lg:p-8 ${index % 2 === 1 ? "lg:[direction:rtl]" : ""}`}
                >
                  <div className={index % 2 === 1 ? "[direction:ltr]" : ""}>
                    <div className="overflow-hidden rounded-3xl bg-secondary/50">
                      {item.image ? (
                        <img
                          src={getImageUrl(item.image)}
                          alt={item.title}
                          loading="lazy"
                          decoding="async"
                          onError={applyImageFallback}
                          className="aspect-[4/3] w-full object-cover"
                        />
                      ) : (
                        <div className="flex aspect-[4/3] items-center justify-center text-sm text-muted-foreground">No image</div>
                      )}
                    </div>
                  </div>
                  <div className={`flex flex-col justify-center ${index % 2 === 1 ? "[direction:ltr]" : ""}`}>
                    <p className="mb-3 text-sm font-medium uppercase tracking-[0.28em] text-gold">Published section</p>
                    <h2 className="font-display text-3xl md:text-4xl text-foreground">{item.title}</h2>
                    <p className="mt-4 text-base leading-7 text-muted-foreground">{item.description}</p>
                    <ul className="mt-6 space-y-3">
                      {item.features.map((feature) => (
                        <li key={feature.id} className="flex items-start gap-3 text-sm text-foreground">
                          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-gold" />
                          <span>{feature.point}</span>
                        </li>
                      ))}
                    </ul>
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

export default Craftsmanship;
