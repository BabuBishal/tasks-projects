"use client";

import React, { useState, useMemo } from "react";
import { StudentWithFees } from "@/lib/@types/prisma";
import { Table } from "@/components/ui/table/Table";
import Badge from "@/components/ui/badges/Badges";
import { Eye, Phone, Search, Filter } from "lucide-react";
import Link from "next/link";
import { studentHeaders } from "@/lib/constants";

interface StudentListProps {
  initialStudents: StudentWithFees[];
}

const StudentList: React.FC<StudentListProps> = ({ initialStudents }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredStudents = useMemo(() => {
    return initialStudents.filter((student) => {
      const matchesSearch =
        student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.rollNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.phone?.includes(searchQuery);

      if (statusFilter === "All") return matchesSearch;

      // Calculate latest fee status
      const latestFee =
        student.fees.length > 0
          ? student.fees.reduce((latest, fee) =>
              new Date(fee.createdAt) > new Date(latest.createdAt)
                ? fee
                : latest
            )
          : null;
      const feeStatus = latestFee?.status || "No Fees";

      return matchesSearch && feeStatus === statusFilter;
    });
  }, [initialStudents, searchQuery, statusFilter]);

  const paginatedStudents = filteredStudents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="flex flex-col gap-4">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-background p-4 rounded-lg border border-border">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by name, roll no..."
            className="w-full pl-9 pr-4 py-2 text-sm border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary bg-background"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
        <div className="flex gap-2 w-full sm:w-auto items-center">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <select
            className="px-3 py-2 text-sm border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary bg-background cursor-pointer"
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="All">All Status</option>
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
            <option value="Overdue">Overdue</option>
            <option value="No Fees">No Fees</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="w-full flex flex-col gap-5 p-4 border border-border rounded-lg bg-background">
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <span className="text-secondary text-sm">Student List</span>
            <span className="text-xs text-muted">
              Showing {paginatedStudents.length} of {filteredStudents.length}{" "}
              students
            </span>
          </div>
        </div>

        {paginatedStudents.length === 0 ? (
          <div className="text-center py-10 text-muted">
            <p>No students found matching your criteria.</p>
          </div>
        ) : (
          <Table
            key={`${searchQuery}-${statusFilter}`} // Reset table state on filter change
            className="rounded-md text-xs text-secondary"
            pagination={{
              pageSize: itemsPerPage,
              total: filteredStudents.length,
              onPageChange: setCurrentPage,
            }}
          >
            <Table.Header>
              <Table.Row>
                {studentHeaders?.map((head, index: number) => (
                  <Table.Head key={index}>{head}</Table.Head>
                ))}
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {paginatedStudents.map((student) => {
                const totalBalance = student.fees.reduce(
                  (sum, fee) => sum + fee.balance,
                  0
                );

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
                    <Table.Cell dataLabel="Name">{student.name}</Table.Cell>
                    <Table.Cell dataLabel="Roll No">
                      {student.rollNo}
                    </Table.Cell>
                    <Table.Cell dataLabel="Program">
                      {student.program.name}
                    </Table.Cell>
                    <Table.Cell dataLabel="Semester">
                      {student.semester}
                    </Table.Cell>
                    <Table.Cell dataLabel="Phone">
                      <div className="flex gap-2 items-center">
                        <Phone className="w-4 h-4" /> {student.phone}
                      </div>
                    </Table.Cell>
                    <Table.Cell dataLabel="Balance">
                      Rs {totalBalance.toLocaleString()}
                    </Table.Cell>
                    <Table.Cell dataLabel="Status">
                      <Badge
                        size="small"
                        variant={
                          feeStatus === "Partial"
                            ? "info"
                            : feeStatus === "Overdue"
                            ? "danger"
                            : feeStatus === "Paid"
                            ? "success"
                            : "warning"
                        }
                      >
                        {feeStatus}
                      </Badge>
                    </Table.Cell>
                    <Table.Cell dataLabel="Actions">
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
  );
};

export default StudentList;
