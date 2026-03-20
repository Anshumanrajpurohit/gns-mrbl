export const API_BASE = "http://127.0.0.1:8000/api";

export const publishStatuses = ["draft", "published"] as const;
export const collectionTypes = ["Marble", "Granite"] as const;
export const workCategories = [
  "Flooring",
  "Countertop",
  "Stairs",
  "Wall Cladding",
  "Pooja Room",
] as const;

export type PublishStatus = (typeof publishStatuses)[number];
export type CollectionType = (typeof collectionTypes)[number];
export type WorkCategory = (typeof workCategories)[number];

export interface AdminSession {
  username: string;
  loggedInAt: string;
}

export interface AdminCredentials {
  username: string;
  password: string;
}

export interface AdminImage {
  id: number;
  image: string;
}

export interface CraftFeature {
  id: number;
  point: string;
}

export interface WorkReview {
  id?: number;
  name: string;
  rating: number;
  comment: string;
  created_at?: string;
}

export interface CollectionRecord {
  id: number;
  name: string;
  slug: string;
  type: CollectionType;
  image: string | null;
  images: AdminImage[];
  description: string;
  tag: string;
  price_range: string;
  status: PublishStatus;
  featured: boolean;
  order: number;
  created_at: string;
}

export interface CraftsmanshipRecord {
  id: number;
  title: string;
  image: string | null;
  description: string;
  features: CraftFeature[];
  status: PublishStatus;
  featured: boolean;
  order: number;
  created_at: string;
}

export interface WorkRecord {
  id: number;
  title: string;
  slug: string;
  image: string | null;
  images: AdminImage[];
  location: string;
  category: WorkCategory;
  description: string;
  status: PublishStatus;
  featured: boolean;
  order: number;
  reviews: WorkReview[];
  created_at: string;
}

export interface CollectionPayload {
  name: string;
  type: CollectionType;
  description: string;
  tag: string;
  price_range: string;
  status: PublishStatus;
  featured: boolean;
  order: number;
  image?: File | null;
  galleryImages?: File[];
  keepImageIds?: number[];
}

export interface CraftsmanshipPayload {
  title: string;
  description: string;
  status: PublishStatus;
  featured: boolean;
  order: number;
  image?: File | null;
  features: string[];
}

export interface WorkPayload {
  title: string;
  location: string;
  category: WorkCategory;
  description: string;
  status: PublishStatus;
  featured: boolean;
  order: number;
  image?: File | null;
  galleryImages?: File[];
  keepImageIds?: number[];
  reviews: WorkReview[];
}
