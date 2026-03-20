import {
  API_BASE,
  type CollectionPayload,
  type CollectionRecord,
  type CraftsmanshipPayload,
  type CraftsmanshipRecord,
  type WorkPayload,
  type WorkRecord,
} from "@/types/admin";

const ADMIN_HEADERS = {
  "X-Admin-Mode": "true",
};

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

const appendBoolean = (formData: FormData, key: string, value: boolean) => {
  formData.append(key, value ? "true" : "false");
};

const appendOptionalFile = (formData: FormData, key: string, file?: File | null) => {
  if (file) {
    formData.append(key, file);
  }
};

const buildCollectionFormData = (payload: CollectionPayload) => {
  const formData = new FormData();

  formData.append("name", payload.name);
  formData.append("type", payload.type);
  formData.append("description", payload.description);
  formData.append("tag", payload.tag);
  formData.append("price_range", payload.price_range);
  formData.append("status", payload.status);
  formData.append("order", String(payload.order));
  appendBoolean(formData, "featured", payload.featured);
  appendOptionalFile(formData, "image", payload.image);
  formData.append("keep_image_ids_payload", JSON.stringify(payload.keepImageIds ?? []));
  (payload.galleryImages ?? []).forEach((file) => formData.append("gallery_images", file));

  return formData;
};

const buildCraftsmanshipFormData = (payload: CraftsmanshipPayload) => {
  const formData = new FormData();

  formData.append("title", payload.title);
  formData.append("description", payload.description);
  formData.append("status", payload.status);
  formData.append("order", String(payload.order));
  appendBoolean(formData, "featured", payload.featured);
  appendOptionalFile(formData, "image", payload.image);
  formData.append("features_payload", JSON.stringify(payload.features));

  return formData;
};

const buildWorkFormData = (payload: WorkPayload) => {
  const formData = new FormData();

  formData.append("title", payload.title);
  formData.append("location", payload.location);
  formData.append("category", payload.category);
  formData.append("description", payload.description);
  formData.append("status", payload.status);
  formData.append("order", String(payload.order));
  appendBoolean(formData, "featured", payload.featured);
  appendOptionalFile(formData, "image", payload.image);
  formData.append("keep_image_ids_payload", JSON.stringify(payload.keepImageIds ?? []));
  formData.append("reviews_payload", JSON.stringify(payload.reviews));
  (payload.galleryImages ?? []).forEach((file) => formData.append("gallery_images", file));

  return formData;
};

export const fetchCollections = async () => {
  const response = await fetch(`${API_BASE}/collections/`, {
    headers: ADMIN_HEADERS,
  });

  return handleResponse<CollectionRecord[]>(response);
};

export const createCollection = async (payload: CollectionPayload) => {
  const response = await fetch(`${API_BASE}/collections/`, {
    method: "POST",
    headers: ADMIN_HEADERS,
    body: buildCollectionFormData(payload),
  });

  return handleResponse<CollectionRecord>(response);
};

export const updateCollection = async (id: number, payload: CollectionPayload) => {
  const response = await fetch(`${API_BASE}/collections/${id}/`, {
    method: "PUT",
    headers: ADMIN_HEADERS,
    body: buildCollectionFormData(payload),
  });

  return handleResponse<CollectionRecord>(response);
};

export const deleteCollection = async (id: number) => {
  const response = await fetch(`${API_BASE}/collections/${id}/`, {
    method: "DELETE",
    headers: ADMIN_HEADERS,
  });

  return handleResponse<null>(response);
};

export const fetchCraftsmanship = async () => {
  const response = await fetch(`${API_BASE}/craftsmanship/`, {
    headers: ADMIN_HEADERS,
  });

  return handleResponse<CraftsmanshipRecord[]>(response);
};

export const createCraftsmanship = async (payload: CraftsmanshipPayload) => {
  const response = await fetch(`${API_BASE}/craftsmanship/`, {
    method: "POST",
    headers: ADMIN_HEADERS,
    body: buildCraftsmanshipFormData(payload),
  });

  return handleResponse<CraftsmanshipRecord>(response);
};

export const updateCraftsmanship = async (id: number, payload: CraftsmanshipPayload) => {
  const response = await fetch(`${API_BASE}/craftsmanship/${id}/`, {
    method: "PUT",
    headers: ADMIN_HEADERS,
    body: buildCraftsmanshipFormData(payload),
  });

  return handleResponse<CraftsmanshipRecord>(response);
};

export const deleteCraftsmanship = async (id: number) => {
  const response = await fetch(`${API_BASE}/craftsmanship/${id}/`, {
    method: "DELETE",
    headers: ADMIN_HEADERS,
  });

  return handleResponse<null>(response);
};

export const fetchWorks = async () => {
  const response = await fetch(`${API_BASE}/work/`, {
    headers: ADMIN_HEADERS,
  });

  return handleResponse<WorkRecord[]>(response);
};

export const createWork = async (payload: WorkPayload) => {
  const response = await fetch(`${API_BASE}/work/`, {
    method: "POST",
    headers: ADMIN_HEADERS,
    body: buildWorkFormData(payload),
  });

  return handleResponse<WorkRecord>(response);
};

export const updateWork = async (id: number, payload: WorkPayload) => {
  const response = await fetch(`${API_BASE}/work/${id}/`, {
    method: "PUT",
    headers: ADMIN_HEADERS,
    body: buildWorkFormData(payload),
  });

  return handleResponse<WorkRecord>(response);
};

export const deleteWork = async (id: number) => {
  const response = await fetch(`${API_BASE}/work/${id}/`, {
    method: "DELETE",
    headers: ADMIN_HEADERS,
  });

  return handleResponse<null>(response);
};
