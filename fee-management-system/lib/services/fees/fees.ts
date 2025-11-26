import { API_ROUTES } from "@/lib/config/api-routes";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getFeeStructures = async () => {
  const res = await fetch(`${baseUrl}${API_ROUTES.feeStructures}`);

  if (!res.ok) {
    throw new Error("Failed to fetch fee structures");
  }

  return res.json();
};

export const createFeeStructure = async (data: unknown) => {
  const res = await fetch(`${baseUrl}${API_ROUTES.feeStructures}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Failed to create fee structure");
  }

  return res.json();
};

export const updateFeeStructure = async ({
  id,
  data,
}: {
  id: string;
  data: unknown;
}) => {
  const res = await fetch(`${baseUrl}${API_ROUTES.feeStructureWithId(id)}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Failed to update fee structure");
  }

  return res.json();
};

export const deleteFeeStructure = async (id: string) => {
  const res = await fetch(`${baseUrl}${API_ROUTES.feeStructureWithId(id)}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Failed to delete fee structure");
  }

  return res.json();
};
