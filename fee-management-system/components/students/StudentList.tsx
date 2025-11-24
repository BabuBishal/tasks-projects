"use client";

import React, { useState, useMemo } from "react";
import { StudentWithFees, Program } from "@/lib/@types/prisma";
import { Table } from "@/components/ui/table/Table";
import Badge from "@/components/ui/badges/Badges";
import {
  Eye,
  Phone,
  Search,
  Filter,
  Pencil,
  Trash2,
  X,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { studentHeaders } from "@/lib/constants";
import { Modal } from "@/components/ui/modal/Modal";
import { useToast } from "@/components/ui/toast";
import { useQuery } from "@tanstack/react-query";
import { calculateStudentStatus } from "@/lib/status-utils";

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
  const [programFilter, setProgramFilter] = useState<string>("all");
  const [semesterFilter, setSemesterFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] =
    useState<StudentWithFees | null>(null);
  const [selectedStudentIds, setSelectedStudentIds] = useState<string[]>([]);
  const [isBulkDeleteOpen, setIsBulkDeleteOpen] = useState(false);
  const [isBulkPromoteOpen, setIsBulkPromoteOpen] = useState(false);
  const [isEditLoading, setIsEditLoading] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [isBulkDeleteLoading, setIsBulkDeleteLoading] = useState(false);
  const [isBulkPromoteLoading, setIsBulkPromoteLoading] = useState(false);
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

      const matchesProgram =
        programFilter === "all" || student.programId === programFilter;
      const matchesSemester =
        semesterFilter === "all" ||
        student.semester.toString() === semesterFilter;

      if (statusFilter === "All")
        return matchesSearch && matchesProgram && matchesSemester;

      // Use centralized status calculation, but override if graduated
      const feeStatus =
        student.status === "Graduated"
          ? "Graduated"
          : calculateStudentStatus(student.fees);

      return (
        matchesSearch &&
        matchesProgram &&
        matchesSemester &&
        feeStatus === statusFilter
      );
    });
  }, [
    initialStudents,
    searchQuery,
    statusFilter,
    programFilter,
    semesterFilter,
  ]);

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

    setIsEditLoading(true);
    notify({
      title: "Processing",
      description: "Updating student information...",
      type: "info",
    });

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
    } catch (error: unknown) {
      notify({
        title: "Error",
        description: (error as Error).message || "Failed to update student",
        type: "error",
      });
    } finally {
      setIsEditLoading(false);
    }
  };

  const handleDeleteClick = (student: StudentWithFees) => {
    setSelectedStudent(student);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedStudent) return;

    setIsDeleteLoading(true);
    notify({
      title: "Processing",
      description: "Deleting student...",
      type: "info",
    });

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
    } catch (error: unknown) {
      notify({
        title: "Error",
        description: (error as Error).message || "Failed to delete student",
        type: "error",
      });
    } finally {
      setIsDeleteLoading(false);
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

  // Bulk action handlers
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedStudentIds(paginatedStudents.map((s) => s.id));
    } else {
      setSelectedStudentIds([]);
    }
  };

  const handleSelectStudent = (studentId: string, checked: boolean) => {
    if (checked) {
      setSelectedStudentIds((prev) => [...prev, studentId]);
    } else {
      setSelectedStudentIds((prev) => prev.filter((id) => id !== studentId));
    }
  };

  const handleBulkDelete = async () => {
    if (selectedStudentIds.length === 0) return;

    setIsBulkDeleteLoading(true);
    notify({
      title: "Processing",
      description: `Deleting ${selectedStudentIds.length} students...`,
      type: "info",
    });

    try {
      const res = await fetch("/api/students/bulk-delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentIds: selectedStudentIds }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to delete students");
      }

      notify({
        title: "Success",
        description: `Deleted ${data.deleted} students successfully`,
        type: "success",
      });
      setIsBulkDeleteOpen(false);
      setSelectedStudentIds([]);
      onRefetch();
    } catch (error: unknown) {
      notify({
        title: "Error",
        description: (error as Error).message || "Failed to delete students",
        type: "error",
      });
    } finally {
      setIsBulkDeleteLoading(false);
    }
  };

  const handleBulkPromote = async () => {
    if (selectedStudentIds.length === 0) return;

    setIsBulkPromoteLoading(true);
    notify({
      title: "Processing",
      description: `Promoting ${selectedStudentIds.length} students...`,
      type: "info",
    });

    try {
      const res = await fetch("/api/students/promote-semester", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentIds: selectedStudentIds }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to promote students");
      }

      const successCount = data.results.success.length;
      const graduatedCount = data.results.success.filter(
        (s: any) => s.isGraduated
      ).length;
      const promotedCount = successCount - graduatedCount;
      const failedCount = data.results.failed.length;

      let description = "";
      if (promotedCount > 0)
        description += `Promoted ${promotedCount} students. `;
      if (graduatedCount > 0)
        description += `Graduated ${graduatedCount} students. `;
      if (failedCount > 0)
        description += `Failed to process ${failedCount} students.`;

      notify({
        title: "Operation Completed",
        description: description.trim(),
        type: failedCount > 0 ? "warning" : "success",
      });
      setIsBulkPromoteOpen(false);
      setSelectedStudentIds([]);
      onRefetch();
    } catch (error: unknown) {
      notify({
        title: "Error",
        description: (error as Error).message || "Failed to promote students",
        type: "error",
      });
    } finally {
      setIsBulkPromoteLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Toolbar */}
      <div className="flex flex-col gap-3 bg-accent p-4 rounded-lg ">
        <div className="flex flex-col sm:flex-row gap-3 items-center">
          <div className="relative w-full sm:flex-1">
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
              <option value="Graduated">Graduated</option>
            </select>
            <select
              value={programFilter}
              onChange={(e) => {
                setProgramFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="px-3 py-2 text-sm border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary bg-background cursor-pointer"
            >
              <option value="all">All Programs</option>
              {programs?.map((program) => (
                <option key={program.id} value={program.id}>
                  {program.name}
                </option>
              ))}
            </select>
            <select
              value={semesterFilter}
              onChange={(e) => {
                setSemesterFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="px-3 py-2 text-sm border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary bg-background cursor-pointer"
            >
              <option value="all">All Semesters</option>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                <option key={sem} value={sem.toString()}>
                  Sem {sem}
                </option>
              ))}
            </select>
          </div>
        </div>
        {(programFilter !== "all" || semesterFilter !== "all") && (
          <button
            onClick={() => {
              setProgramFilter("all");
              setSemesterFilter("all");
            }}
            className="text-sm text-primary hover:underline self-start"
          >
            Clear Program/Semester Filters
          </button>
        )}
      </div>

      {/* Bulk Actions Toolbar */}
      {selectedStudentIds.length > 0 && (
        <div className="flex gap-3 items-center bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-4 rounded-lg">
          <span className="text-sm font-medium">
            {selectedStudentIds.length} student
            {selectedStudentIds.length > 1 ? "s" : ""} selected
          </span>
          <button
            onClick={() => setIsBulkDeleteOpen(true)}
            className="px-3 py-1.5 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition-colors flex items-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            Delete Selected
          </button>
          <button
            onClick={() => setIsBulkPromoteOpen(true)}
            className="px-3 py-1.5 text-sm bg-primary text-white rounded hover:bg-primary/90 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={selectedStudentIds.some((id) => {
              const student = initialStudents.find((s) => s.id === id);
              return student?.status === "Graduated";
            })}
            title={
              selectedStudentIds.some((id) => {
                const student = initialStudents.find((s) => s.id === id);
                return student?.status === "Graduated";
              })
                ? "Cannot promote graduated students"
                : "Promote selected students"
            }
          >
            <ArrowRight className="w-4 h-4" />
            Promote Semester
          </button>
          <button
            onClick={() => setSelectedStudentIds([])}
            className="ml-auto px-3 py-1.5 text-sm border border-border rounded hover:bg-muted transition-colors"
          >
            Clear Selection
          </button>
        </div>
      )}

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
                <Table.Head>
                  <input
                    type="checkbox"
                    checked={
                      selectedStudentIds.length === paginatedStudents.length &&
                      paginatedStudents.length > 0
                    }
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    className="cursor-pointer"
                  />
                </Table.Head>
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

                // Use centralized status calculation, but override if graduated
                const feeStatus =
                  student.status === "Graduated"
                    ? "Graduated"
                    : calculateStudentStatus(student.fees);

                return (
                  <Table.Row key={student.id}>
                    <Table.Cell dataLabel="">
                      <input
                        type="checkbox"
                        checked={selectedStudentIds.includes(student.id)}
                        onChange={(e) =>
                          handleSelectStudent(student.id, e.target.checked)
                        }
                        className="cursor-pointer"
                      />
                    </Table.Cell>
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
                            : feeStatus === "Graduated"
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
                          <Eye className="w-4 h-4 cursor-pointer text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors" />
                        </Link>
                        <Pencil
                          className="w-4 h-4 cursor-pointer text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 transition-colors"
                          onClick={() => handleEdit(student)}
                        />
                        <Trash2
                          className="w-4 h-4 cursor-pointer text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors"
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
                    disabled={isEditLoading}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    disabled={isEditLoading}
                  >
                    {isEditLoading && (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    )}
                    {isEditLoading ? "Saving..." : "Save Changes"}
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
                  disabled={isDeleteLoading}
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteConfirm}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  disabled={isDeleteLoading}
                >
                  {isDeleteLoading && (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  )}
                  {isDeleteLoading ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Bulk Delete Confirmation Modal */}
      <Modal defaultOpen={isBulkDeleteOpen}>
        {isBulkDeleteOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-background p-6 rounded-lg max-w-md w-full mx-4">
              <h3 className="text-lg font-semibold mb-4">
                Confirm Bulk Delete
              </h3>
              <p className="text-muted mb-6">
                Are you sure you want to delete {selectedStudentIds.length}{" "}
                student{selectedStudentIds.length > 1 ? "s" : ""}? This action
                cannot be undone and will also delete all associated fees and
                payments.
              </p>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setIsBulkDeleteOpen(false)}
                  className="px-4 py-2 border rounded-md hover:bg-accent"
                  disabled={isBulkDeleteLoading}
                >
                  Cancel
                </button>
                <button
                  onClick={handleBulkDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  disabled={isBulkDeleteLoading}
                >
                  {isBulkDeleteLoading && (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  )}
                  {isBulkDeleteLoading ? "Deleting..." : "Delete All"}
                </button>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Bulk Promote Semester Confirmation Modal */}
      <Modal defaultOpen={isBulkPromoteOpen}>
        {isBulkPromoteOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-background p-6 rounded-lg max-w-md w-full mx-4">
              <h3 className="text-lg font-semibold mb-4">
                Confirm Semester Promotion
              </h3>
              <p className="text-muted mb-6">
                Are you sure you want to promote {selectedStudentIds.length}{" "}
                student{selectedStudentIds.length > 1 ? "s" : ""} to the next
                semester? This will automatically assign fees for the new
                semester.
              </p>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setIsBulkPromoteOpen(false)}
                  className="px-4 py-2 border rounded-md hover:bg-accent"
                  disabled={isBulkPromoteLoading}
                >
                  Cancel
                </button>
                <button
                  onClick={handleBulkPromote}
                  className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  disabled={isBulkPromoteLoading}
                >
                  {isBulkPromoteLoading && (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  )}
                  {isBulkPromoteLoading ? "Promoting..." : "Promote All"}
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
