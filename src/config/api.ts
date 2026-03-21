const defaultApiBaseUrl = import.meta.env.DEV
  ? "http://127.0.0.1:8000/api/"
  : "https://gns-mrbl.onrender.com/api/";

const rawApiBaseUrl = import.meta.env.VITE_API_URL?.trim() || defaultApiBaseUrl;

export const API_BASE_URL = rawApiBaseUrl.replace(/\/+$/, "");

if (import.meta.env.DEV) {
  console.log("API BASE URL:", API_BASE_URL);
}

