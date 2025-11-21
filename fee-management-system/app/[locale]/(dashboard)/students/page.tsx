"use client";

import { Button } from "@/components/ui/button/Button";
import { Plus, Users, Wallet, AlertCircle } from "lucide-react";
import Link from "next/link";
import type { StudentWithFees } from "@/lib/@types/prisma";
import StatsCard from "@/components/ui/stats-card/StatsCard";
import StudentList from "@/components/students/StudentList";
import { useQuery } from "@tanstack/react-query";

const Students = () => {
  const {
    data: students,
    isLoading,
    error,
    refetch,
  } = useQuery<StudentWithFees[]>({
    queryKey: ["students"],
    queryFn: async () => {
      const res = await fetch("/api/students", { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to fetch students");
      return res.json();
    },
  });

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-red-600 mb-2">
            Error Loading Students
          </h2>
          <p className="text-muted">
            Failed to fetch student data. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  // Calculate statistics
  const totalStudents = students?.length || 0;
  const paidStudents =
    students?.filter((s) => {
      const latestFee =
        s.fees.length > 0
          ? s.fees.reduce((latest, fee) =>
              new Date(fee.createdAt) > new Date(latest.createdAt)
                ? fee
                : latest
            )
          : null;
      return latestFee?.status === "Paid";
    }).length || 0;

  const overdueStudents =
    students?.filter((s) => {
      const latestFee =
        s.fees.length > 0
          ? s.fees.reduce((latest, fee) =>
              new Date(fee.createdAt) > new Date(latest.createdAt)
                ? fee
                : latest
            )
          : null;
      return latestFee?.status === "Overdue";
    }).length || 0;

  return (
    <div className="w-full h-full flex flex-col gap-8">
      {/* Header */}
      <div className="flex justify-between items-end gap-5">
        <div>
          <h1 className="text-primary text-2xl font-bold">Students Panel</h1>
          <h4 className="text-muted text-sm">
            Manage students, fees, and academic records
          </h4>
        </div>
        <div>
          <Link href="/students/add">
            <Button variant="primary" size="sm">
              <Plus className="w-4 h-4" /> Add Student
            </Button>
          </Link>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatsCard
          title="Total Students"
          value={totalStudents}
          icon={Users}
          description="Active students in the system"
          trend={{ value: 12, label: "vs last month", positive: true }}
        />
        <StatsCard
          title="Paid Fees"
          value={paidStudents}
          icon={Wallet}
          description="Students with fully paid fees"
          trend={{ value: 5, label: "vs last month", positive: true }}
          variant="success"
        />
        <StatsCard
          title="Overdue Fees"
          value={overdueStudents}
          icon={AlertCircle}
          description="Students with outstanding payments"
          trend={{ value: 2, label: "vs last month", positive: false }}
          variant="danger"
        />
      </div>

      {/* Student List */}
      <StudentList initialStudents={students || []} onRefetch={refetch} />
    </div>
  );
};

export default Students;
