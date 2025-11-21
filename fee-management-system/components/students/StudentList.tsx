"use client";

import React, { useState, useMemo } from "react";
import { StudentWithFees, Program } from "@/lib/@types/prisma";
import { Table } from "@/components/ui/table/Table";
import Badge from "@/components/ui/badges/Badges";
import { Eye, Phone, Search, Filter, Pencil, Trash2, X } from "lucide-react";
import Link from "next/link";
import { studentHeaders } from "@/lib/constants";
import { Modal } from "@/components/ui/modal/Modal";
import { useToast } from "@/components/ui/toast";
import { useQuery } from "@tanstack/react-query";

interface StudentListProps {
  initialStudents: StudentWithFees[];
  onRefetch: () => void;
}

const StudentList: React.FC<StudentListProps> = ({
  initialStudents,
  onRefetch,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] =
    useState<StudentWithFees | null>(null);
  const [editFormData, setEditFormData] = useState({
    name: "",
    email: "",
    programId: "",
    semester: 1,
    phone: "",
    address: "",
  });
  const itemsPerPage = 10;
  const { notify } = useToast();

  // Fetch programs for edit form
  const { data: programs } = useQuery<Program[]>({
    queryKey: ["programs"],
    queryFn: async () => {
      const res = await fetch("/api/programs");
      if (!res.ok) throw new Error("Failed to fetch programs");
      return res.json();
    },
  });

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

  const handleEdit = (student: StudentWithFees) => {
    setSelectedStudent(student);
    setEditFormData({
      name: student.name,
      email: student.email,
      programId: student.programId,
      semester: student.semester,
      phone: student.phone,
      address: student.address,
    });
    setIsEditModalOpen(true);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStudent) return;

    try {
      const res = await fetch(`/api/students/${selectedStudent.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editFormData),
      });

      const responseData = await res.json();

      if (!res.ok) {
        throw new Error(responseData.error || "Failed to update student");
      }

      notify({
        title: "Success",
        description: "Student updated successfully",
        type: "success",
      });
      setIsEditModalOpen(false);
      onRefetch();
    } catch (error: any) {
      notify({
        title: "Error",
        description: error.message || "Failed to update student",
        type: "error",
      });
    }
  };

  const handleDeleteClick = (student: StudentWithFees) => {
    setSelectedStudent(student);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedStudent) return;

    try {
      const res = await fetch(`/api/students/${selectedStudent.id}`, {
        method: "DELETE",
      });

      const responseData = await res.json();

      if (!res.ok) {
        throw new Error(responseData.error || "Failed to delete student");
      }

      notify({
        title: "Success",
        description: "Student deleted successfully",
        type: "success",
      });
      setIsDeleteDialogOpen(false);
      onRefetch();
    } catch (error: any) {
      notify({
        title: "Error",
        description: error.message || "Failed to delete student",
        type: "error",
      });
    }
  };

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({
      ...prev,
      [name]: name === "semester" ? Number(value) : value,
    }));
  };

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
                      <div className="flex gap-3 items-center">
                        <Link href={`/students/${student.id}`}>
                          <Eye className="w-4 h-4 cursor-pointer hover:text-primary transition-colors" />
                        </Link>
                        <Pencil
                          className="w-4 h-4 cursor-pointer hover:text-blue-600 transition-colors"
                          onClick={() => handleEdit(student)}
                        />
                        <Trash2
                          className="w-4 h-4 cursor-pointer hover:text-red-600 transition-colors"
                          onClick={() => handleDeleteClick(student)}
                        />
                      </div>
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table>
        )}
      </div>

      {/* Edit Modal */}
      <Modal defaultOpen={isEditModalOpen}>
        {isEditModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-background rounded-lg shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center p-6 border-b">
                <h2 className="text-lg font-bold">Edit Student</h2>
                <button
                  onClick={() => setIsEditModalOpen(false)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <form onSubmit={handleEditSubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Name *
                  </label>
                  <input
                    name="name"
                    value={editFormData.name}
                    onChange={handleFormChange}
                    className="w-full p-2 border rounded-md bg-background"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={editFormData.email}
                    onChange={handleFormChange}
                    className="w-full p-2 border rounded-md bg-background"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Program *
                  </label>
                  <select
                    name="programId"
                    value={editFormData.programId}
                    onChange={handleFormChange}
                    className="w-full p-2 border rounded-md bg-background"
                    required
                  >
                    <option value="">Select program</option>
                    {programs?.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Semester *
                  </label>
                  <input
                    type="number"
                    name="semester"
                    min={1}
                    value={editFormData.semester}
                    onChange={handleFormChange}
                    className="w-full p-2 border rounded-md bg-background"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Phone
                  </label>
                  <input
                    name="phone"
                    value={editFormData.phone}
                    onChange={handleFormChange}
                    className="w-full p-2 border rounded-md bg-background"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Address
                  </label>
                  <input
                    name="address"
                    value={editFormData.address}
                    onChange={handleFormChange}
                    className="w-full p-2 border rounded-md bg-background"
                  />
                </div>
                <div className="flex gap-3 justify-end pt-4">
                  <button
                    type="button"
                    onClick={() => setIsEditModalOpen(false)}
                    className="px-4 py-2 border rounded-md hover:bg-accent"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </Modal>

      {/* Delete Confirmation Dialog */}
      <Modal defaultOpen={isDeleteDialogOpen}>
        {isDeleteDialogOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-background rounded-lg shadow-lg w-full max-w-md p-6">
              <h2 className="text-lg font-bold mb-4">Confirm Delete</h2>
              <p className="text-muted-foreground mb-6">
                Are you sure you want to delete student{" "}
                <strong>{selectedStudent?.name}</strong>? This action cannot be
                undone.
              </p>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setIsDeleteDialogOpen(false)}
                  className="px-4 py-2 border rounded-md hover:bg-accent"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteConfirm}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default StudentList;
