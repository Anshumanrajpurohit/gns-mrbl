import { Plus, Star, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { WorkReview } from "@/types/admin";

interface ReviewInputProps {
  reviews: WorkReview[];
  onChange: (reviews: WorkReview[]) => void;
}

const defaultReview = (): WorkReview => ({
  name: "",
  rating: 5,
  comment: "",
});

export const ReviewInput = ({ reviews, onChange }: ReviewInputProps) => {
  const updateReview = (index: number, field: keyof WorkReview, value: string | number) => {
    onChange(
      reviews.map((review, reviewIndex) =>
        reviewIndex === index
          ? {
              ...review,
              [field]: value,
            }
          : review,
      ),
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-foreground">Reviews</p>
          <p className="text-xs text-muted-foreground">Build testimonial-ready project feedback directly from the admin panel.</p>
        </div>
        <Button type="button" variant="elegant" onClick={() => onChange([...reviews, defaultReview()])}>
          <Plus className="h-4 w-4" />
          Add review
        </Button>
      </div>

      {reviews.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border/80 bg-secondary/30 px-4 py-6 text-sm text-muted-foreground">
          No reviews yet. Add at least one to highlight client feedback.
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map((review, index) => (
            <div key={`review-${index}`} className="rounded-2xl border border-border/70 bg-card p-4 shadow-soft">
              <div className="mb-4 flex items-center justify-between gap-3">
                <p className="text-sm font-medium text-foreground">Review {index + 1}</p>
                <Button type="button" variant="ghost" size="sm" onClick={() => onChange(reviews.filter((_, reviewIndex) => reviewIndex !== index))}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor={`review-name-${index}`}>Reviewer name</Label>
                  <Input
                    id={`review-name-${index}`}
                    value={review.name}
                    onChange={(event) => updateReview(index, "name", event.target.value)}
                    placeholder="Client name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`review-rating-${index}`}>Rating</Label>
                  <div className="flex items-center gap-3">
                    <select
                      id={`review-rating-${index}`}
                      value={review.rating}
                      onChange={(event) => updateReview(index, "rating", Number(event.target.value))}
                      className="flex h-11 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                      {[5, 4, 3, 2, 1].map((rating) => (
                        <option key={rating} value={rating}>
                          {rating} star{rating > 1 ? "s" : ""}
                        </option>
                      ))}
                    </select>
                    <div className="flex items-center gap-1 text-gold">
                      {Array.from({ length: review.rating }).map((_, starIndex) => (
                        <Star key={starIndex} className="h-4 w-4 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <Label htmlFor={`review-comment-${index}`}>Comment</Label>
                <Textarea
                  id={`review-comment-${index}`}
                  value={review.comment}
                  onChange={(event) => updateReview(index, "comment", event.target.value)}
                  placeholder="What did the client say about the project?"
                  className="min-h-24"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
