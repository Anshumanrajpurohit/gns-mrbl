import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { MapPin, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { ImageUpload } from "@/components/admin/ImageUpload";
import { ReviewInput } from "@/components/admin/ReviewInput";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { createWork, deleteWork, fetchWorks, updateWork } from "@/services/adminApi";
import type { AdminImage, PublishStatus, WorkCategory, WorkPayload, WorkRecord, WorkReview } from "@/types/admin";
import { publishStatuses, workCategories } from "@/types/admin";
import { applyImageFallback, getImageUrl } from "@/utils/getImageUrl";

interface WorkFormValues extends WorkPayload {
  existingCoverImage: string | null;
  existingImages: AdminImage[];
}

const inputClassName =
  "flex h-11 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

const emptyForm = (): WorkFormValues => ({
  title: "",
  location: "",
  category: "Flooring",
  description: "",
  status: "draft",
  featured: false,
  order: 0,
  image: null,
  existingCoverImage: null,
  galleryImages: [],
  existingImages: [],
  reviews: [],
});

const mapRecordToForm = (item: WorkRecord): WorkFormValues => ({
  title: item.title,
  location: item.location,
  category: item.category,
  description: item.description,
  status: item.status,
  featured: item.featured,
  order: item.order,
  image: null,
  existingCoverImage: item.image,
  galleryImages: [],
  existingImages: item.images,
  reviews: item.reviews.map((review) => ({
    id: review.id,
    name: review.name,
    rating: review.rating,
    comment: review.comment,
    created_at: review.created_at,
  })),
});

export const WorkManager = () => {
  const queryClient = useQueryClient();
  const [editingItem, setEditingItem] = useState<WorkRecord | null>(null);
  const [form, setForm] = useState<WorkFormValues>(emptyForm());

  const worksQuery = useQuery({
    queryKey: ["admin", "work"],
    queryFn: fetchWorks,
  });

  const saveMutation = useMutation({
    mutationFn: async (values: WorkFormValues) => {
      const payload: WorkPayload = {
        title: values.title.trim(),
        location: values.location.trim(),
        category: values.category,
        description: values.description.trim(),
        status: values.status,
        featured: values.featured,
        order: values.order,
        image: values.image,
        galleryImages: values.galleryImages,
        keepImageIds: values.existingImages.map((image) => image.id),
        reviews: values.reviews
          .map((review) => ({
            name: review.name.trim(),
            rating: review.rating,
            comment: review.comment.trim(),
          }))
          .filter((review) => review.name && review.comment),
      };

      if (editingItem) {
        return updateWork(editingItem.id, payload);
      }

      return createWork(payload);
    },
    onSuccess: () => {
      toast.success(editingItem ? "Project updated" : "Project created");
      setEditingItem(null);
      setForm(emptyForm());
      queryClient.invalidateQueries({ queryKey: ["admin", "work"] });
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : "Unable to save project");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteWork,
    onSuccess: () => {
      toast.success("Project deleted");
      if (editingItem) {
        setEditingItem(null);
        setForm(emptyForm());
      }
      queryClient.invalidateQueries({ queryKey: ["admin", "work"] });
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : "Unable to delete project");
    },
  });

  const publishedCount = useMemo(
    () => (worksQuery.data ?? []).filter((item) => item.status === "published").length,
    [worksQuery.data],
  );

  const updateField = <K extends keyof WorkFormValues>(field: K, value: WorkFormValues[K]) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
      <form
        className="space-y-6 rounded-[1.75rem] border border-border/70 bg-card p-6 shadow-lifted"
        onSubmit={(event) => {
          event.preventDefault();
          saveMutation.mutate(form);
        }}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-gold">Work portfolio</p>
            <h2 className="font-display text-3xl text-foreground">{editingItem ? "Edit project" : "Create project"}</h2>
          </div>
          {editingItem ? (
            <Button
              type="button"
              variant="ghost"
              onClick={() => {
                setEditingItem(null);
                setForm(emptyForm());
              }}
            >
              Cancel
            </Button>
          ) : null}
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="work-title">Title</Label>
            <Input
              id="work-title"
              value={form.title}
              onChange={(event) => updateField("title", event.target.value)}
              placeholder="Villa foyer inlaid marble"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="work-location">Location</Label>
            <Input
              id="work-location"
              value={form.location}
              onChange={(event) => updateField("location", event.target.value)}
              placeholder="Candolim, Goa"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="work-description">Description</Label>
          <Textarea
            id="work-description"
            value={form.description}
            onChange={(event) => updateField("description", event.target.value)}
            placeholder="Capture the design brief, material choices, and finish quality."
            className="min-h-28"
          />
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          <div className="space-y-2">
            <Label htmlFor="work-category">Category</Label>
            <select
              id="work-category"
              value={form.category}
              onChange={(event) => updateField("category", event.target.value as WorkCategory)}
              className={inputClassName}
            >
              {workCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="work-status">Status</Label>
            <select
              id="work-status"
              value={form.status}
              onChange={(event) => updateField("status", event.target.value as PublishStatus)}
              className={inputClassName}
            >
              {publishStatuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="work-order">Display order</Label>
            <Input
              id="work-order"
              type="number"
              value={form.order}
              onChange={(event) => updateField("order", Number(event.target.value))}
            />
          </div>
          <div className="flex items-end">
            <div className="flex w-full items-center justify-between rounded-2xl border border-border/70 bg-secondary/30 px-4 py-3">
              <div>
                <p className="text-sm font-medium text-foreground">Featured</p>
                <p className="text-xs text-muted-foreground">Highlight in portfolio sections.</p>
              </div>
              <Switch checked={form.featured} onCheckedChange={(checked) => updateField("featured", checked)} />
            </div>
          </div>
        </div>

        <ImageUpload
          label="Cover image"
          helperText="Primary thumbnail used in cards and project listings."
          files={form.image ? [form.image] : []}
          onFilesChange={(files) => updateField("image", files[0] ?? null)}
          existingImages={form.existingCoverImage ? [{ id: -1, image: form.existingCoverImage }] : []}
          multiple={false}
          allowRemoveExisting={false}
        />

        <ImageUpload
          label="Project gallery"
          helperText="Upload multiple progress or finish images for the work detail view."
          files={form.galleryImages ?? []}
          onFilesChange={(files) => updateField("galleryImages", files)}
          existingImages={form.existingImages}
          onRemoveExisting={(id) =>
            updateField(
              "existingImages",
              form.existingImages.filter((image) => image.id !== id),
            )
          }
          multiple
        />

        <ReviewInput reviews={form.reviews as WorkReview[]} onChange={(reviews) => updateField("reviews", reviews)} />

        <Button type="submit" variant="warm" disabled={saveMutation.isPending}>
          {saveMutation.isPending ? "Saving..." : editingItem ? "Update project" : "Create project"}
        </Button>
      </form>

      <section className="space-y-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-[1.5rem] border border-border/70 bg-card p-5 shadow-soft">
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Projects</p>
            <p className="mt-3 font-display text-4xl text-foreground">{worksQuery.data?.length ?? 0}</p>
          </div>
          <div className="rounded-[1.5rem] border border-border/70 bg-card p-5 shadow-soft">
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Published</p>
            <p className="mt-3 font-display text-4xl text-gold">{publishedCount}</p>
          </div>
        </div>

        <div className="space-y-4">
          {worksQuery.isLoading ? (
            <div className="rounded-[1.5rem] border border-border/70 bg-card px-5 py-8 text-center text-muted-foreground shadow-soft">
              Loading projects...
            </div>
          ) : worksQuery.error ? (
            <div className="rounded-[1.5rem] border border-border/70 bg-card px-5 py-8 text-center text-destructive shadow-soft">
              {worksQuery.error instanceof Error ? worksQuery.error.message : "Unable to load projects"}
            </div>
          ) : (
            worksQuery.data?.map((item) => (
              <article key={item.id} className="overflow-hidden rounded-[1.5rem] border border-border/70 bg-card shadow-soft">
                <div className="h-44 w-full bg-secondary/40">
                  {item.image ? (
                    <img
                      src={getImageUrl(item.image)}
                      alt={item.title}
                      onError={applyImageFallback}
                      className="h-full w-full object-cover"
                    />
                  ) : null}
                </div>
                <div className="space-y-4 p-5">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-display text-2xl text-foreground">{item.title}</h3>
                        <Badge
                          className={
                            item.status === "published"
                              ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100"
                              : "bg-amber-100 text-amber-700 hover:bg-amber-100"
                          }
                        >
                          {item.status}
                        </Badge>
                      </div>
                      <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4 text-gold" />
                        {item.location}
                      </div>
                    </div>
                    <Badge variant="outline" className="border-gold/40 bg-gold/5 text-foreground">
                      {item.category}
                    </Badge>
                  </div>

                  <p className="line-clamp-3 text-sm text-muted-foreground">{item.description}</p>

                  <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                    <span>{item.images.length} gallery image{item.images.length === 1 ? "" : "s"}</span>
                    <span>{item.reviews.length} review{item.reviews.length === 1 ? "" : "s"}</span>
                    <span>{format(new Date(item.created_at), "dd MMM yyyy")}</span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant="elegant"
                      size="sm"
                      onClick={() => {
                        setEditingItem(item);
                        setForm(mapRecordToForm(item));
                      }}
                    >
                      <Pencil className="h-4 w-4" />
                      Edit
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        if (window.confirm(`Delete "${item.title}"?`)) {
                          deleteMutation.mutate(item.id);
                        }
                      }}
                      disabled={deleteMutation.isPending}
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </Button>
                  </div>
                </div>
              </article>
            ))
          )}
        </div>
      </section>
    </div>
  );
};
