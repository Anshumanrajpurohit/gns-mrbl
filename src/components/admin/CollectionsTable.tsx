import { format } from "date-fns";
import { Pencil, Trash2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import type { CollectionRecord, PublishStatus } from "@/types/admin";
import { applyImageFallback, getImageUrl } from "@/utils/getImageUrl";

interface CollectionsTableProps {
  collections: CollectionRecord[];
  loading: boolean;
  error?: string | null;
  busyId?: number | null;
  onEdit: (collection: CollectionRecord) => void;
  onDelete: (collection: CollectionRecord) => void;
  onToggleStatus: (collection: CollectionRecord, status: PublishStatus) => void;
}

export const CollectionsTable = ({
  collections,
  loading,
  error,
  busyId,
  onEdit,
  onDelete,
  onToggleStatus,
}: CollectionsTableProps) => {
  return (
    <div className="overflow-hidden rounded-[1.75rem] border border-border/70 bg-card shadow-lifted">
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-secondary/70 text-xs uppercase tracking-[0.25em] text-muted-foreground">
            <tr>
              <th className="px-5 py-4">Collection</th>
              <th className="px-5 py-4">Type</th>
              <th className="px-5 py-4">Status</th>
              <th className="px-5 py-4">Order</th>
              <th className="px-5 py-4">Updated</th>
              <th className="px-5 py-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="px-5 py-10 text-center text-muted-foreground">
                  Loading collections...
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={6} className="px-5 py-10 text-center text-destructive">
                  {error}
                </td>
              </tr>
            ) : collections.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-5 py-10 text-center text-muted-foreground">
                  No collections added yet.
                </td>
              </tr>
            ) : (
              collections.map((collection) => (
                <tr key={collection.id} className="border-t border-border/60 align-top">
                  <td className="px-5 py-4">
                    <div className="flex min-w-56 items-start gap-4">
                      <div className="h-14 w-14 overflow-hidden rounded-2xl border border-border/60 bg-secondary/50">
                        {collection.image ? (
                          <img
                            src={getImageUrl(collection.image)}
                            alt={collection.name}
                            onError={applyImageFallback}
                            className="h-full w-full object-cover"
                          />
                        ) : null}
                      </div>
                      <div className="space-y-1">
                        <p className="font-medium text-foreground">{collection.name}</p>
                        <p className="line-clamp-2 text-xs text-muted-foreground">{collection.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {collection.tag ? (
                            <Badge variant="outline" className="border-gold/40 bg-gold/5 text-foreground">
                              {collection.tag}
                            </Badge>
                          ) : null}
                          {collection.featured ? (
                            <Badge className="bg-copper text-copper-foreground">Featured</Badge>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-muted-foreground">{collection.type}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <Switch
                        checked={collection.status === "published"}
                        onCheckedChange={(checked) => onToggleStatus(collection, checked ? "published" : "draft")}
                        disabled={busyId === collection.id}
                      />
                      <Badge
                        className={
                          collection.status === "published"
                            ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100"
                            : "bg-amber-100 text-amber-700 hover:bg-amber-100"
                        }
                      >
                        {collection.status}
                      </Badge>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-muted-foreground">{collection.order}</td>
                  <td className="px-5 py-4 text-muted-foreground">{format(new Date(collection.created_at), "dd MMM yyyy")}</td>
                  <td className="px-5 py-4">
                    <div className="flex flex-wrap gap-2">
                      <Button variant="elegant" size="sm" onClick={() => onEdit(collection)}>
                        <Pencil className="h-4 w-4" />
                        Edit
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => onDelete(collection)} disabled={busyId === collection.id}>
                        <Trash2 className="h-4 w-4" />
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
