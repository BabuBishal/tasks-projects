// app/students/page.tsx
import { Button } from "@/components/ui/button/Button";
import { Plus, Users, Wallet, AlertCircle } from "lucide-react";
import Link from "next/link";
import type { StudentWithFees } from "@/lib/@types/prisma";
import StatsCard from "@/components/ui/stats-card/StatsCard";
import StudentList from "@/components/students/StudentList";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

const Students = async () => {
  try {
    const res = await fetch(`${baseUrl}/api/students`, { cache: "no-store" });

    if (!res.ok) {
      throw new Error("Failed to fetch students");
    }

    const students: StudentWithFees[] = await res.json();

    // Calculate statistics
    const totalStudents = students.length;
    const paidStudents = students.filter((s) => {
      const latestFee =
        s.fees.length > 0
          ? s.fees.reduce((latest, fee) =>
              new Date(fee.createdAt) > new Date(latest.createdAt)
                ? fee
                : latest
            )
          : null;
      return latestFee?.status === "Paid";
    }).length;

    const overdueStudents = students.filter((s) => {
      const latestFee =
        s.fees.length > 0
          ? s.fees.reduce((latest, fee) =>
              new Date(fee.createdAt) > new Date(latest.createdAt)
                ? fee
                : latest
            )
          : null;
      return latestFee?.status === "Overdue";
    }).length;

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
        <StudentList initialStudents={students} />
      </div>
    );
  } catch (error) {
    console.error("Error fetching students:", error);
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
};

export default Students;
