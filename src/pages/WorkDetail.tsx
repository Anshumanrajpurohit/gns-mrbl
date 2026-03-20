import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, ChevronLeft, ChevronRight, MapPin, Star } from "lucide-react";
import { Link, useParams } from "react-router-dom";

import { EmptyState } from "@/components/content/EmptyState";
import { LoadingState } from "@/components/content/LoadingState";
import { Button } from "@/components/ui/button";
import { fetchPublicWorkDetail } from "@/services/publicContentApi";

const WorkDetail = () => {
  const { slug = "" } = useParams();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const workDetailQuery = useQuery({
    queryKey: ["public", "work", slug],
    queryFn: () => fetchPublicWorkDetail(slug),
    enabled: Boolean(slug),
    staleTime: 60_000,
    refetchOnWindowFocus: false,
  });

  const project = workDetailQuery.data;

  const galleryImages = useMemo(() => {
    if (!project) {
      return [];
    }

    const seen = new Set<string>();
    const urls = [project.image, ...project.images.map((image) => image.image)].filter((value): value is string => Boolean(value));

    return urls.filter((url) => {
      if (seen.has(url)) {
        return false;
      }
      seen.add(url);
      return true;
    });
  }, [project]);

  const activeImage = galleryImages[activeImageIndex] ?? project?.image ?? null;

  useEffect(() => {
    setActiveImageIndex(0);
  }, [slug]);

  useEffect(() => {
    if (activeImageIndex > galleryImages.length - 1) {
      setActiveImageIndex(0);
    }
  }, [activeImageIndex, galleryImages.length]);

  return (
    <div className="bg-background">
      <Helmet>
        <title>{project ? `${project.title} | Ganpati Marble Goa` : "Project | Ganpati Marble Goa"}</title>
        <meta
          name="description"
          content={
            project
              ? `${project.title} in ${project.location}. Explore project images, finish details, and customer reviews from Ganpati Marble Goa.`
              : "Explore project images, finish details, and customer reviews from Ganpati Marble Goa."
          }
        />
      </Helmet>

      <section className="bg-secondary py-20 md:py-24">
        <div className="container mx-auto px-4">
          <Button variant="elegant" asChild>
            <Link to="/work">
              <ArrowLeft className="h-4 w-4" />
              Back to work
            </Link>
          </Button>
        </div>
      </section>

      <section className="-mt-8 pb-20 md:pb-24">
        <div className="container mx-auto px-4">
          {workDetailQuery.isLoading ? (
            <LoadingState label="Loading project..." variant="detail" />
          ) : workDetailQuery.error ? (
            <div className="rounded-3xl border border-border/60 bg-card px-6 py-16 text-center text-destructive shadow-soft">
              {workDetailQuery.error instanceof Error ? workDetailQuery.error.message : "Unable to load project"}
            </div>
          ) : !project ? (
            <EmptyState title="No data available" description="This project could not be found." />
          ) : (
            <div className="space-y-10">
              <article className="overflow-hidden rounded-[2rem] border border-border/60 bg-card shadow-lifted">
                <div className="grid gap-8 p-6 lg:grid-cols-[1.08fr_0.92fr] lg:p-8">
                  <section className="space-y-4">
                    <div className="relative overflow-hidden rounded-3xl bg-secondary/50 shadow-soft">
                      {activeImage ? (
                        <img src={activeImage} alt={project.title} decoding="async" className="aspect-[4/3] w-full object-cover" />
                      ) : (
                        <div className="flex aspect-[4/3] items-center justify-center text-sm text-muted-foreground">No image</div>
                      )}

                      {galleryImages.length > 1 ? (
                        <>
                          <button
                            type="button"
                            onClick={() => setActiveImageIndex((current) => (current === 0 ? galleryImages.length - 1 : current - 1))}
                            className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-background/85 text-foreground shadow-soft transition hover:bg-background"
                            aria-label="Previous image"
                          >
                            <ChevronLeft className="h-5 w-5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => setActiveImageIndex((current) => (current === galleryImages.length - 1 ? 0 : current + 1))}
                            className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-background/85 text-foreground shadow-soft transition hover:bg-background"
                            aria-label="Next image"
                          >
                            <ChevronRight className="h-5 w-5" />
                          </button>
                        </>
                      ) : null}
                    </div>

                    {galleryImages.length > 1 ? (
                      <div className="flex snap-x gap-3 overflow-x-auto pb-2">
                        {galleryImages.map((image, index) => (
                          <button
                            key={`${image}-${index}`}
                            type="button"
                            onClick={() => setActiveImageIndex(index)}
                            className={`snap-start overflow-hidden rounded-2xl border transition ${
                              activeImageIndex === index ? "border-gold shadow-soft" : "border-border/60 opacity-80 hover:opacity-100"
                            }`}
                          >
                            <img
                              src={image}
                              alt={`${project.title} preview ${index + 1}`}
                              loading="lazy"
                              decoding="async"
                              className="h-20 w-24 object-cover sm:h-24 sm:w-32"
                            />
                          </button>
                        ))}
                      </div>
                    ) : null}
                  </section>

                  <section className="flex flex-col justify-center">
                    <p className="text-sm font-medium uppercase tracking-[0.3em] text-gold">{project.category}</p>
                    <h1 className="mt-3 font-display text-4xl md:text-5xl text-foreground">{project.title}</h1>
                    <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 text-gold" />
                      {project.location}
                    </div>
                    <p className="mt-6 text-base leading-7 text-muted-foreground">{project.description}</p>
                    <div className="mt-8 grid gap-3 sm:grid-cols-2">
                      <div className="rounded-2xl border border-border/60 bg-secondary/30 px-4 py-4">
                        <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Gallery</p>
                        <p className="mt-2 font-display text-3xl text-foreground">{galleryImages.length}</p>
                        <p className="text-sm text-muted-foreground">Curated project visuals</p>
                      </div>
                      <div className="rounded-2xl border border-border/60 bg-secondary/30 px-4 py-4">
                        <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Reviews</p>
                        <p className="mt-2 font-display text-3xl text-foreground">{project.reviews.length}</p>
                        <p className="text-sm text-muted-foreground">Client voices</p>
                      </div>
                    </div>
                  </section>
                </div>
              </article>

              <section className="rounded-[2rem] border border-border/60 bg-card p-6 shadow-soft md:p-8">
                <div className="mb-6">
                  <p className="text-sm font-medium uppercase tracking-[0.3em] text-gold">Gallery</p>
                  <h2 className="mt-2 font-display text-3xl text-foreground">Project imagery</h2>
                </div>
                {galleryImages.length === 0 ? (
                  <EmptyState title="No data available" description="No gallery images are available for this project yet." />
                ) : (
                  <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {galleryImages.map((image, index) => (
                      <div key={`${image}-grid-${index}`} className="overflow-hidden rounded-3xl border border-border/60 bg-secondary/40 shadow-soft">
                        <img
                          src={image}
                          alt={`${project.title} gallery ${index + 1}`}
                          loading="lazy"
                          decoding="async"
                          className="aspect-[4/3] w-full object-cover transition duration-500 hover:scale-[1.02]"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </section>

              <section className="rounded-[2rem] border border-border/60 bg-card p-6 shadow-soft md:p-8">
                <div className="mb-6">
                  <p className="text-sm font-medium uppercase tracking-[0.3em] text-gold">Reviews</p>
                  <h2 className="mt-2 font-display text-3xl text-foreground">Client feedback</h2>
                </div>
                {project.reviews.length === 0 ? (
                  <EmptyState title="No data available" description="No reviews are available for this project yet." />
                ) : (
                  <div className="grid gap-4 lg:grid-cols-2">
                    {project.reviews.map((review, index) => (
                      <article key={review.id ?? `${review.name}-${index}`} className="rounded-3xl border border-border/60 bg-secondary/20 p-6 shadow-soft">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <h3 className="font-display text-2xl text-foreground">{review.name}</h3>
                            <p className="mt-1 text-xs uppercase tracking-[0.22em] text-muted-foreground">Verified feedback</p>
                          </div>
                          <div className="flex items-center gap-1 text-gold">
                            {Array.from({ length: 5 }).map((_, starIndex) => (
                              <Star
                                key={starIndex}
                                className={`h-4 w-4 ${starIndex < review.rating ? "fill-current" : "text-border"}`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="mt-4 text-sm leading-7 text-muted-foreground">{review.comment}</p>
                      </article>
                    ))}
                  </div>
                )}
              </section>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default WorkDetail;
