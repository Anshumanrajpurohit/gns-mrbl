import type { SyntheticEvent } from "react";

import { API_BASE_URL } from "@/config/api";

const mediaOrigin = API_BASE_URL.replace(/\/api$/, "");

export const getImageUrl = (url?: string | null) => {
  if (!url) {
    return "";
  }

  const trimmedUrl = url.trim();
  if (!trimmedUrl) {
    return "";
  }

  if (/^https?:\/\//i.test(trimmedUrl)) {
    return trimmedUrl;
  }

  const normalizedPath = trimmedUrl.startsWith("/") ? trimmedUrl : `/${trimmedUrl}`;
  return `${mediaOrigin}${normalizedPath}`;
};

export const applyImageFallback = (event: SyntheticEvent<HTMLImageElement>) => {
  if (event.currentTarget.dataset.fallbackApplied === "true") {
    return;
  }

  event.currentTarget.dataset.fallbackApplied = "true";
  event.currentTarget.src = "/fallback.jpg";
};

