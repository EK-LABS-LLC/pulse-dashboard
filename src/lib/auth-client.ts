import { createAuthClient } from "better-auth/react";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  (typeof window !== "undefined"
    ? window.location.origin
    : "http://localhost:3000");

export const authClient = createAuthClient({
  baseURL: API_BASE_URL,
});
