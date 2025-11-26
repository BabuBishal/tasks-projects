import { API_ROUTES } from "@/lib/config/api-routes";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getPrograms = async () => {
  const res = await fetch(`${baseUrl}${API_ROUTES.programs}`, {
    next: { revalidate: 600 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch programs");
  }

  return res.json();
};

export const getProgramsById = async (id: string) => {
  const res = await fetch(`${baseUrl}${API_ROUTES.programWithId(id)}`);

  if (!res.ok) {
    throw new Error("Failed to fetch program");
  }

  return res.json();
};

export const createProgram = async (data: {
  name: string;
  duration: number;
}) => {
  const res = await fetch(`${baseUrl}${API_ROUTES.programs}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Failed to create program");
  }

  return res.json();
};

export const updateProgram = async ({
  id,
  data,
}: {
  id: string;
  data: { name: string; duration: number };
}) => {
  const res = await fetch(`${baseUrl}${API_ROUTES.programWithId(id)}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Failed to update program");
  }

  return res.json();
};

export const deleteProgram = async (id: string) => {
  const res = await fetch(`${baseUrl}${API_ROUTES.programWithId(id)}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Failed to delete program");
  }

  return res.json();
};
