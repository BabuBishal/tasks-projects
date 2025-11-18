// app/students/page.tsx
import { Button } from "@/components/ui/Button/Button";
import Table from "@/components/ui/Table/Table";
import { Eye, Phone, Plus } from "lucide-react";
import { studentHeaders } from "@/lib/constants";
import Link from "next/link";
import Badge from "@/components/ui/Badges/Badges";
// import {Badge} from "l3ui";
import type { StudentWithFees } from "@/lib/@types/prisma";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

const Students = async () => {
  try {
    const res = await fetch(`${baseUrl}/api/students`, {
      cache: "no-store", // Disable caching for fresh data
    });

    if (!res.ok) {
      throw new Error("Failed to fetch students");
    }

    const students: StudentWithFees[] = await res.json();

    return (
      <div className="w-full h-full flex flex-col gap-10">
        <div className="flex justify-between items-end g-5">
          <div>
            <h1 className="text-primary text-2xl font-bold">Students Panel</h1>
            <h4 className="text-muted text-sm">Manage students, fees, etc</h4>
          </div>
          <div>
            <Link href="/students/add">
              <Button variant="primary" size="sm">
                <Plus className="w-4 h-4" /> Add Student
              </Button>
            </Link>
          </div>
        </div>

        <div className="w-full flex flex-col gap-5 p-4 border border-border rounded-lg">
          <div className="flex justify-between items-center">
            <div className="flex flex-col">
              <span className="text-secondary text-sm">Student Management</span>
              <span className="text-xs text-muted">
                Manage and view all student records
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="text-md font-semibold text-secondary">
              All Students ({students.length})
            </div>

            {students.length === 0 ? (
              <div className="text-center py-10 text-muted">
                <p>No students found.</p>
                <Link href="/students/add">
                  <Button variant="primary" size="sm" className="mt-4">
                    <Plus className="w-4 h-4" /> Add Your First Student
                  </Button>
                </Link>
              </div>
            ) : (
              <Table className="rounded-md text-xs text-secondary">
                <Table.Header>
                  {studentHeaders?.map((head, index: number) => (
                    <Table.HeaderCell key={index}>{head}</Table.HeaderCell>
                  ))}
                </Table.Header>
                <Table.Body>
                  {students.map((student) => {
                    // Calculate total balance from all fees
                    const totalBalance = student.fees.reduce(
                      (sum, fee) => sum + fee.balance,
                      0
                    );

                    // Get latest fee status
                    const latestFee =
                      student.fees.length > 0
                        ? student.fees.reduce((latest, fee) =>
                            new Date(fee.createdAt) > new Date(latest.createdAt)
                              ? fee
                              : latest
                          )
                        : null;

                    const feeStatus = latestFee?.status || "No Fees";

                    return (
                      <Table.Row key={student.id}>
                        <Table.Cell>{student.name}</Table.Cell>
                        <Table.Cell>{student.rollNo}</Table.Cell>
                        <Table.Cell>{student.program.name}</Table.Cell>
                        <Table.Cell>{student.semester}</Table.Cell>
                        <Table.Cell>
                          <div className="flex gap-2 items-center">
                            <Phone className="w-4 h-4" /> {student.phone}
                          </div>
                        </Table.Cell>
                        <Table.Cell>
                          Rs {totalBalance.toLocaleString()}
                        </Table.Cell>
                        <Table.Cell>
                          <Badge
                            size="small"
                            variant={
                              feeStatus === "Partial"
                                ? "info"
                                : feeStatus === "Overdue"
                                ? "danger"
                                : feeStatus === "Paid"
                                ? "success"
                                : ""
                            }
                          >
                            {feeStatus}
                          </Badge>
                        </Table.Cell>
                        <Table.Cell>
                          <Link href={`/students/${student.id}`}>
                            <Eye className="w-4 h-4 cursor-pointer hover:text-primary" />
                          </Link>
                        </Table.Cell>
                      </Table.Row>
                    );
                  })}
                </Table.Body>
              </Table>
            )}
          </div>
        </div>
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
