"use client";
import { DashboardData } from "@/lib/@types/prisma";
import { use, useMemo } from "react";

async function fetchDashboardData(): Promise<DashboardData> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
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
