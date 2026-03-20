import type { AdminImage, CollectionType, WorkCategory, WorkReview } from "@/types/admin";

export interface PublicCollection {
  id: number;
  name: string;
  slug: string;
  type: CollectionType;
  image: string | null;
  description: string;
  tag: string;
  price_range: string;
  featured: boolean;
  order: number;
  created_at: string;
}

export interface PublicCraftFeature {
  id: number;
  point: string;
}

export interface PublicCraftsmanship {
  id: number;
  title: string;
  image: string | null;
  description: string;
  features: PublicCraftFeature[];
  featured: boolean;
  order: number;
  created_at: string;
}

export interface PublicWorkSummary {
  id: number;
  title: string;
  slug: string;
  image: string | null;
  location: string;
  category: WorkCategory;
  description: string;
  featured: boolean;
  order: number;
  created_at: string;
}

export interface PublicWorkDetail extends PublicWorkSummary {
  images: AdminImage[];
  reviews: WorkReview[];
}
