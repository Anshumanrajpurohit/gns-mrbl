const rawApiBaseUrl = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api/";

export const API_BASE_URL = rawApiBaseUrl.replace(/\/+$/, "");

if (import.meta.env.DEV) {
  console.log("API BASE URL:", API_BASE_URL);
}
