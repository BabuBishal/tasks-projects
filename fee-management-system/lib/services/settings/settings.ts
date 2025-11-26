import { API_ROUTES } from "@/lib/config/api-routes";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getSettings = async () => {
  const res = await fetch(`${baseUrl}${API_ROUTES.settings}`);
  if (!res.ok) {
    throw new Error("Failed to fetch settings");
  }
  return res.json();
};


export const updateSettings = async (data: unknown) => {
  const res = await fetch(`${baseUrl}${API_ROUTES.settings}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Failed to update settings");
  }

  return res.json();
};