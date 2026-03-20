import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { ImageUpload } from "@/components/admin/ImageUpload";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  createCraftsmanship,
  deleteCraftsmanship,
  fetchCraftsmanship,
  updateCraftsmanship,
} from "@/services/adminApi";
import type { CraftsmanshipPayload, CraftsmanshipRecord, PublishStatus } from "@/types/admin";
import { publishStatuses } from "@/types/admin";
import { applyImageFallback, getImageUrl } from "@/utils/getImageUrl";

interface CraftFormValues extends CraftsmanshipPayload {
  existingImage: string | null;
}

const inputClassName =
  "flex h-11 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

const emptyForm = (): CraftFormValues => ({
  title: "",
  description: "",
  status: "draft",
  featured: false,
  order: 0,
  image: null,
  existingImage: null,
  features: [""],
});

const mapRecordToForm = (item: CraftsmanshipRecord): CraftFormValues => ({
  title: item.title,
  description: item.description,
  status: item.status,
  featured: item.featured,
  order: item.order,
  image: null,
  existingImage: item.image,
  features: item.features.length > 0 ? item.features.map((feature) => feature.point) : [""],
});

export const CraftsmanshipManager = () => {
  const queryClient = useQueryClient();
  const [editingItem, setEditingItem] = useState<CraftsmanshipRecord | null>(null);
  const [form, setForm] = useState<CraftFormValues>(emptyForm());

  const craftsmanshipQuery = useQuery({
    queryKey: ["admin", "craftsmanship"],
    queryFn: fetchCraftsmanship,
  });

  const saveMutation = useMutation({
    mutationFn: async (values: CraftFormValues) => {
      const payload: CraftsmanshipPayload = {
        title: values.title.trim(),
        description: values.description.trim(),
        status: values.status,
        featured: values.featured,
        order: values.order,
        image: values.image,
        features: values.features.map((feature) => feature.trim()).filter(Boolean),
      };

      if (editingItem) {
        return updateCraftsmanship(editingItem.id, payload);
      }

      return createCraftsmanship(payload);
    },
    onSuccess: () => {
      toast.success(editingItem ? "Craftsmanship section updated" : "Craftsmanship section created");
      setEditingItem(null);
      setForm(emptyForm());
      queryClient.invalidateQueries({ queryKey: ["admin", "craftsmanship"] });
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : "Unable to save craftsmanship section");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteCraftsmanship,
    onSuccess: () => {
      toast.success("Craftsmanship section deleted");
      if (editingItem) {
        setEditingItem(null);
        setForm(emptyForm());
      }
      queryClient.invalidateQueries({ queryKey: ["admin", "craftsmanship"] });
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : "Unable to delete craftsmanship section");
    },
  });

  const publishedCount = useMemo(
    () => (craftsmanshipQuery.data ?? []).filter((item) => item.status === "published").length,
    [craftsmanshipQuery.data],
  );

  const updateField = <K extends keyof CraftFormValues>(field: K, value: CraftFormValues[K]) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
      <form
        className="space-y-6 rounded-[1.75rem] border border-border/70 bg-card p-6 shadow-lifted"
        onSubmit={(event) => {
          event.preventDefault();
          saveMutation.mutate(form);
        }}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-gold">Craftsmanship</p>
            <h2 className="font-display text-3xl text-foreground">
              {editingItem ? "Refine craftsmanship story" : "Create craftsmanship section"}
            </h2>
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

        <div className="space-y-2">
          <Label htmlFor="craft-title">Title</Label>
          <Input
            id="craft-title"
            value={form.title}
            onChange={(event) => updateField("title", event.target.value)}
            placeholder="Traditional temple detailing"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="craft-description">Description</Label>
          <Textarea
            id="craft-description"
            value={form.description}
            onChange={(event) => updateField("description", event.target.value)}
            placeholder="Explain the section narrative and the craftsmanship angle."
            className="min-h-28"
          />
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="craft-status">Status</Label>
            <select
              id="craft-status"
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
            <Label htmlFor="craft-order">Display order</Label>
            <Input
              id="craft-order"
              type="number"
              value={form.order}
              onChange={(event) => updateField("order", Number(event.target.value))}
            />
          </div>
          <div className="flex items-end">
            <div className="flex w-full items-center justify-between rounded-2xl border border-border/70 bg-secondary/30 px-4 py-3">
              <div>
                <p className="text-sm font-medium text-foreground">Featured</p>
                <p className="text-xs text-muted-foreground">Surface this section first.</p>
              </div>
              <Switch checked={form.featured} onCheckedChange={(checked) => updateField("featured", checked)} />
            </div>
          </div>
        </div>

        <ImageUpload
          label="Section image"
          helperText="Used alongside the story block on the public site."
          files={form.image ? [form.image] : []}
          onFilesChange={(files) => updateField("image", files[0] ?? null)}
          existingImages={form.existingImage ? [{ id: -1, image: form.existingImage }] : []}
          multiple={false}
          allowRemoveExisting={false}
        />

        <div className="space-y-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-medium text-foreground">Features</p>
              <p className="text-xs text-muted-foreground">Add craftsmanship proof points one by one.</p>
            </div>
            <Button type="button" variant="elegant" onClick={() => updateField("features", [...form.features, ""])}>
              <Plus className="h-4 w-4" />
              Add feature
            </Button>
          </div>

          <div className="space-y-3">
            {form.features.map((feature, index) => (
              <div key={`feature-${index}`} className="flex gap-3">
                <Input
                  value={feature}
                  onChange={(event) =>
                    updateField(
                      "features",
                      form.features.map((value, featureIndex) => (featureIndex === index ? event.target.value : value)),
                    )
                  }
                  placeholder="Hand-finished edges"
                />
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => updateField("features", form.features.filter((_, featureIndex) => featureIndex !== index))}
                  disabled={form.features.length === 1}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        <Button type="submit" variant="warm" disabled={saveMutation.isPending}>
          {saveMutation.isPending ? "Saving..." : editingItem ? "Update section" : "Create section"}
        </Button>
      </form>

      <section className="space-y-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-[1.5rem] border border-border/70 bg-card p-5 shadow-soft">
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Total sections</p>
            <p className="mt-3 font-display text-4xl text-foreground">{craftsmanshipQuery.data?.length ?? 0}</p>
          </div>
          <div className="rounded-[1.5rem] border border-border/70 bg-card p-5 shadow-soft">
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Published</p>
            <p className="mt-3 font-display text-4xl text-gold">{publishedCount}</p>
          </div>
        </div>

        <div className="space-y-4">
          {craftsmanshipQuery.isLoading ? (
            <div className="rounded-[1.5rem] border border-border/70 bg-card px-5 py-8 text-center text-muted-foreground shadow-soft">
              Loading craftsmanship sections...
            </div>
          ) : craftsmanshipQuery.error ? (
            <div className="rounded-[1.5rem] border border-border/70 bg-card px-5 py-8 text-center text-destructive shadow-soft">
              {craftsmanshipQuery.error instanceof Error ? craftsmanshipQuery.error.message : "Unable to load craftsmanship sections"}
            </div>
          ) : (
            craftsmanshipQuery.data?.map((item) => (
              <article key={item.id} className="rounded-[1.5rem] border border-border/70 bg-card p-5 shadow-soft">
                <div className="flex items-start gap-4">
                  <div className="h-20 w-20 overflow-hidden rounded-2xl border border-border/60 bg-secondary/50">
                    {item.image ? (
                      <img
                        src={getImageUrl(item.image)}
                        alt={item.title}
                        onError={applyImageFallback}
                        className="h-full w-full object-cover"
                      />
                    ) : null}
                  </div>
                  <div className="min-w-0 flex-1">
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
                    <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{item.description}</p>
                    <p className="mt-3 text-xs text-muted-foreground">
                      {item.features.length} feature{item.features.length === 1 ? "" : "s"} • Updated {format(new Date(item.created_at), "dd MMM yyyy")}
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
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
              </article>
            ))
          )}
        </div>
      </section>
    </div>
  );
};
