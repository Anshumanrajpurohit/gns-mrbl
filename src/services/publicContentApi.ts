import { API_BASE } from "@/types/admin";
import type {
  PublicCollection,
  PublicCraftsmanship,
  PublicWorkDetail,
  PublicWorkSummary,
} from "@/types/publicContent";

const handleResponse = async <T>(response: Response): Promise<T> => {
  const raw = await response.text();
  const data = raw ? (JSON.parse(raw) as T & { detail?: string; message?: string }) : null;

  if (!response.ok) {
    const message =
      (data && typeof data === "object" && ("detail" in data || "message" in data)
        ? data.detail || data.message
        : null) || "Request failed";
    throw new Error(message);
  }

  return data as T;
};

export const fetchPublicCollections = async () => {
  const response = await fetch(`${API_BASE}/collections/`);
  return handleResponse<PublicCollection[]>(response);
};

export const fetchPublicCraftsmanship = async () => {
  const response = await fetch(`${API_BASE}/craftsmanship/`);
  return handleResponse<PublicCraftsmanship[]>(response);
};

export const fetchPublicWorks = async () => {
  const response = await fetch(`${API_BASE}/work/`);
  return handleResponse<PublicWorkSummary[]>(response);
};

export const fetchPublicWorkDetail = async (slug: string) => {
  const response = await fetch(`${API_BASE}/work/${slug}/`);
  return handleResponse<PublicWorkDetail>(response);
};
