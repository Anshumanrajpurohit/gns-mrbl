import { useEffect, useMemo } from "react";
import { ImagePlus, Trash2, Upload } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { AdminImage } from "@/types/admin";
import { applyImageFallback, getImageUrl } from "@/utils/getImageUrl";

interface ImageUploadProps {
  label: string;
  files: File[];
  onFilesChange: (files: File[]) => void;
  existingImages?: AdminImage[];
  onRemoveExisting?: (id: number) => void;
  multiple?: boolean;
  helperText?: string;
  allowRemoveExisting?: boolean;
}

export const ImageUpload = ({
  label,
  files,
  onFilesChange,
  existingImages = [],
  onRemoveExisting,
  multiple = false,
  helperText,
  allowRemoveExisting = true,
}: ImageUploadProps) => {
  const previews = useMemo(
    () => files.map((file) => ({ name: file.name, url: URL.createObjectURL(file) })),
    [files],
  );

  useEffect(() => {
    return () => {
      previews.forEach((preview) => URL.revokeObjectURL(preview.url));
    };
  }, [previews]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files ?? []);
    onFilesChange(multiple ? [...files, ...selectedFiles] : selectedFiles.slice(0, 1));
    event.target.value = "";
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-foreground">{label}</p>
          {helperText ? <p className="text-xs text-muted-foreground">{helperText}</p> : null}
        </div>
        <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-border/70 bg-background px-4 py-2 text-sm font-medium text-foreground transition hover:border-gold/70 hover:bg-secondary/70">
          <Upload className="h-4 w-4 text-gold" />
          {multiple ? "Add images" : "Choose image"}
          <input className="hidden" type="file" accept="image/*" multiple={multiple} onChange={handleInputChange} />
        </label>
      </div>

      {existingImages.length === 0 && previews.length === 0 ? (
        <div className="flex min-h-32 items-center justify-center rounded-2xl border border-dashed border-border/80 bg-secondary/30 text-sm text-muted-foreground">
          <div className="flex flex-col items-center gap-2">
            <ImagePlus className="h-5 w-5 text-gold" />
            <span>No images selected yet</span>
          </div>
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {existingImages.map((image) => (
            <div key={`existing-${image.id}`} className="overflow-hidden rounded-2xl border border-border/70 bg-card shadow-soft">
              <img src={getImageUrl(image.image)} alt="" onError={applyImageFallback} className="h-32 w-full object-cover" />
              <div className="flex items-center justify-between gap-2 px-3 py-3">
                <p className="truncate text-xs text-muted-foreground">Saved image</p>
                {allowRemoveExisting && onRemoveExisting ? (
                  <Button size="sm" variant="ghost" type="button" onClick={() => onRemoveExisting(image.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                ) : null}
              </div>
            </div>
          ))}
          {previews.map((preview, index) => (
            <div key={`${preview.name}-${index}`} className="overflow-hidden rounded-2xl border border-border/70 bg-card shadow-soft">
              <img src={preview.url} alt="" className="h-32 w-full object-cover" />
              <div className="flex items-center justify-between gap-2 px-3 py-3">
                <p className="truncate text-xs text-muted-foreground">{preview.name}</p>
                <Button
                  size="sm"
                  variant="ghost"
                  type="button"
                  onClick={() => onFilesChange(files.filter((_, fileIndex) => fileIndex !== index))}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
