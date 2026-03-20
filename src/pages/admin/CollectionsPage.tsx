import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { toast } from "sonner";

import { CollectionForm, type CollectionFormValues } from "@/components/admin/CollectionForm";
import { CollectionsTable } from "@/components/admin/CollectionsTable";
import { Badge } from "@/components/ui/badge";
import {
  createCollection,
  deleteCollection,
  fetchCollections,
  updateCollection,
} from "@/services/adminApi";
import type { CollectionPayload, CollectionRecord, PublishStatus } from "@/types/admin";

const emptyForm = (): CollectionFormValues => ({
  name: "",
  type: "Marble",
  description: "",
  tag: "",
  price_range: "",
  status: "draft",
  featured: false,
  order: 0,
  image: null,
  galleryImages: [],
  keepImageIds: [],
  existingCoverImage: null,
  existingImages: [],
});

const mapRecordToForm = (collection: CollectionRecord): CollectionFormValues => ({
  name: collection.name,
  type: collection.type,
  description: collection.description,
  tag: collection.tag,
  price_range: collection.price_range,
  status: collection.status,
  featured: collection.featured,
  order: collection.order,
  image: null,
  galleryImages: [],
  keepImageIds: collection.images.map((image) => image.id),
  existingCoverImage: collection.image,
  existingImages: collection.images,
});

const buildPayload = (values: CollectionFormValues): CollectionPayload => ({
  name: values.name.trim(),
  type: values.type,
  description: values.description.trim(),
  tag: values.tag.trim(),
  price_range: values.price_range.trim(),
  status: values.status,
  featured: values.featured,
  order: values.order,
  image: values.image,
  galleryImages: values.galleryImages,
  keepImageIds: values.existingImages.map((image) => image.id),
});

const CollectionsPage = () => {
  const queryClient = useQueryClient();
  const [editingCollection, setEditingCollection] = useState<CollectionRecord | null>(null);
  const [busyId, setBusyId] = useState<number | null>(null);

  const collectionsQuery = useQuery({
    queryKey: ["admin", "collections"],
    queryFn: fetchCollections,
  });

  const saveMutation = useMutation({
    mutationFn: async (values: CollectionFormValues) => {
      const payload = buildPayload(values);

      if (editingCollection) {
        return updateCollection(editingCollection.id, payload);
      }

      return createCollection(payload);
    },
    onSuccess: () => {
      toast.success(editingCollection ? "Collection updated" : "Collection created");
      setEditingCollection(null);
      queryClient.invalidateQueries({ queryKey: ["admin", "collections"] });
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : "Unable to save collection");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteCollection,
    onSuccess: () => {
      toast.success("Collection deleted");
      setEditingCollection(null);
      queryClient.invalidateQueries({ queryKey: ["admin", "collections"] });
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : "Unable to delete collection");
    },
  });

  const statusMutation = useMutation({
    mutationFn: async ({ collection, status }: { collection: CollectionRecord; status: PublishStatus }) => {
      setBusyId(collection.id);

      return updateCollection(collection.id, {
        name: collection.name,
        type: collection.type,
        description: collection.description,
        tag: collection.tag,
        price_range: collection.price_range,
        status,
        featured: collection.featured,
        order: collection.order,
        keepImageIds: collection.images.map((image) => image.id),
      });
    },
    onSuccess: () => {
      toast.success("Collection status updated");
      queryClient.invalidateQueries({ queryKey: ["admin", "collections"] });
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : "Unable to update status");
    },
    onSettled: () => {
      setBusyId(null);
    },
  });

  const collections = collectionsQuery.data ?? [];
  const publishedCount = useMemo(
    () => collections.filter((collection) => collection.status === "published").length,
    [collections],
  );

  return (
    <>
      <Helmet>
        <title>Collections Admin | Ganpati Marble Goa</title>
      </Helmet>

      <section className="space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-gold">Admin route</p>
            <h2 className="font-display text-4xl text-foreground">Collections management</h2>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
              Full CRUD for collection cards, publish state, gallery images, and ordering. This replaces any need for Django admin.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Badge variant="outline" className="rounded-full border-gold/40 bg-gold/5 px-4 py-2 text-sm text-foreground">
              {collections.length} total
            </Badge>
            <Badge className="rounded-full bg-copper px-4 py-2 text-sm text-copper-foreground">{publishedCount} published</Badge>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
          <CollectionForm
            initialValues={editingCollection ? mapRecordToForm(editingCollection) : emptyForm()}
            mode={editingCollection ? "edit" : "create"}
            submitting={saveMutation.isPending}
            onSubmit={async (values) => {
              await saveMutation.mutateAsync(values);
            }}
            onCancel={() => setEditingCollection(null)}
          />

          <CollectionsTable
            collections={collections}
            loading={collectionsQuery.isLoading}
            error={collectionsQuery.error instanceof Error ? collectionsQuery.error.message : null}
            busyId={busyId}
            onEdit={(collection) => setEditingCollection(collection)}
            onDelete={(collection) => {
              if (window.confirm(`Delete "${collection.name}"?`)) {
                deleteMutation.mutate(collection.id);
              }
            }}
            onToggleStatus={(collection, status) => statusMutation.mutate({ collection, status })}
          />
        </div>
      </section>
    </>
  );
};

export default CollectionsPage;
