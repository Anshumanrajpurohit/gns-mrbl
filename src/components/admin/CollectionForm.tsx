import { useEffect, useState } from "react";

import { ImageUpload } from "@/components/admin/ImageUpload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import type { AdminImage, CollectionPayload, CollectionType, PublishStatus } from "@/types/admin";
import { collectionTypes, publishStatuses } from "@/types/admin";

export interface CollectionFormValues extends CollectionPayload {
  existingCoverImage: string | null;
  existingImages: AdminImage[];
}

interface CollectionFormProps {
  initialValues: CollectionFormValues;
  mode: "create" | "edit";
  submitting: boolean;
  onSubmit: (values: CollectionFormValues) => Promise<void> | void;
  onCancel: () => void;
}

const inputClassName =
  "flex h-11 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

export const CollectionForm = ({ initialValues, mode, submitting, onSubmit, onCancel }: CollectionFormProps) => {
  const [form, setForm] = useState(initialValues);

  useEffect(() => {
    setForm(initialValues);
  }, [initialValues]);

  const updateField = <K extends keyof CollectionFormValues>(field: K, value: CollectionFormValues[K]) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  return (
    <form
      className="space-y-6 rounded-[1.75rem] border border-border/70 bg-card p-6 shadow-lifted"
      onSubmit={async (event) => {
        event.preventDefault();
        await onSubmit(form);
      }}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-gold">Collections</p>
          <h2 className="font-display text-3xl text-foreground">{mode === "create" ? "Add collection" : "Edit collection"}</h2>
        </div>
        {mode === "edit" ? (
          <Button type="button" variant="ghost" onClick={onCancel}>
            Cancel
          </Button>
        ) : null}
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="collection-name">Name</Label>
          <Input
            id="collection-name"
            value={form.name}
            onChange={(event) => updateField("name", event.target.value)}
            placeholder="Makrana White"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="collection-type">Type</Label>
          <select
            id="collection-type"
            value={form.type}
            onChange={(event) => updateField("type", event.target.value as CollectionType)}
            className={inputClassName}
          >
            {collectionTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="collection-description">Description</Label>
        <Textarea
          id="collection-description"
          value={form.description}
          onChange={(event) => updateField("description", event.target.value)}
          placeholder="Describe the finish, use case, and material character."
          className="min-h-28"
        />
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <div className="space-y-2">
          <Label htmlFor="collection-tag">Tag</Label>
          <Input
            id="collection-tag"
            value={form.tag}
            onChange={(event) => updateField("tag", event.target.value)}
            placeholder="Luxury floors"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="collection-price">Price range</Label>
          <Input
            id="collection-price"
            value={form.price_range}
            onChange={(event) => updateField("price_range", event.target.value)}
            placeholder="Premium"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="collection-order">Display order</Label>
          <Input
            id="collection-order"
            type="number"
            value={form.order}
            onChange={(event) => updateField("order", Number(event.target.value))}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="collection-status">Status</Label>
          <select
            id="collection-status"
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
      </div>

      <div className="flex items-center justify-between rounded-2xl border border-border/70 bg-secondary/30 px-4 py-3">
        <div>
          <p className="text-sm font-medium text-foreground">Featured collection</p>
          <p className="text-xs text-muted-foreground">Highlight this item in curated sections across the site.</p>
        </div>
        <Switch checked={form.featured} onCheckedChange={(checked) => updateField("featured", checked)} />
      </div>

      <ImageUpload
        label="Primary image"
        helperText="Used for the main collection card and hero preview."
        files={form.image ? [form.image] : []}
        onFilesChange={(files) => updateField("image", files[0] ?? null)}
        existingImages={form.existingCoverImage ? [{ id: -1, image: form.existingCoverImage }] : []}
        multiple={false}
        allowRemoveExisting={false}
      />

      <ImageUpload
        label="Gallery images"
        helperText="Optional supporting images for richer collection detail views."
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

      <div className="flex flex-wrap gap-3">
        <Button type="submit" variant="warm" disabled={submitting}>
          {submitting ? "Saving..." : mode === "create" ? "Create collection" : "Update collection"}
        </Button>
        {mode === "edit" ? (
          <Button type="button" variant="elegant" onClick={onCancel}>
            Reset
          </Button>
        ) : null}
      </div>
    </form>
  );
};
