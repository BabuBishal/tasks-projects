"use client";
import { DashboardData } from "@/lib/types/api";
import { use, useMemo } from "react";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

async function fetchDashboardData(): Promise<DashboardData> {
  const response = await fetch(`${baseUrl}/api/dashboard-stats`, {
    cache: "no-store",
  });
  if (!response.ok) throw new Error("Failed to fetch dashboard data");
  return response.json();
}

export function useDashboardData() {
  const promise = useMemo(() => fetchDashboardData(), []);
  return use(promise);
}
