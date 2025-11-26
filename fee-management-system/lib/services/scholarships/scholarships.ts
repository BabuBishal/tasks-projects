import { API_ROUTES } from "@/lib/config/api-routes";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getScholarships = async () => {
  const res = await fetch(`${baseUrl}${API_ROUTES.scholarships}`, {
    next: { revalidate: 600 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch scholarships");
  }

  return res.json();
};
