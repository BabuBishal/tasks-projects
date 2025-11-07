// import StatsOverview from "@/components/layout/StatsOverview";
import { Button } from "@/components/ui/Button/Button";
import Table from "@/components/ui/Table/Table";
import { Eye, Phone, Plus, Search, User } from "lucide-react";
import { studentHeaders } from "@/lib/constants";
import { Student } from "@/lib/@types/types";
import Link from "next/link";
import Badge from "@/components/ui/Badges/Badges";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const Students = async () => {
  const res = await fetch(`${baseUrl}/api/students`);
  const data = await res.json();
  // console.log("data", data);

  return (
    <div className="w-full h-full flex flex-col gap-10">
      <div className="flex justify-between items-end g-5 ">
        <div>
          {" "}
          <h1 className="text-primary text-2xl font-bold">Students Panel</h1>
          <h4 className="text-muted text-sm">Manage students, fees, ...</h4>
        </div>
        <div>
          <Link href={"/students/add"}>
            <Button variant="primary" size="sm">
              <Plus className="w-4 h-4" /> Add Student
            </Button>
          </Link>
        </div>
      </div>
      <div className="w-full flex flex-col gap-5 p-4 border border-border rounded-lg">
        <div className="flex justify-between items-center">
          <div className="flex flex-col ">
            <span className="text-secondary text-sm">Student Management</span>
            <span className="text-xs text-muted">
              Manage and view all student records
            </span>
          </div>
          <div className="flex gap-2 items-center border border-border rounded-md px-2 py-1">
            <label htmlFor="student-search">
              <Search className="w-4 h-4 text-muted" />
            </label>
            <input
              type="search"
              name="student-search"
              id="student-search"
              placeholder="Search students..."
              className="text-xs text-secondary outline-none caret-secondary"
            />
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="text-md font-semibold text-secondary">
            All Students
          </div>
          <Table className="rounded-md text-xs text-secondary">
            <Table.Header>
              {studentHeaders?.map((head, index: number) => (
                <Table.HeaderCell key={index}>{head}</Table.HeaderCell>
              ))}
            </Table.Header>
            <Table.Body>
              {data?.map((student: Student) => (
                <Table.Row key={student.id}>
                  <Table.Cell>{student.name}</Table.Cell>
                  <Table.Cell>{student.rollNo}</Table.Cell>
                  <Table.Cell>{student.program}</Table.Cell>
                  <Table.Cell>{student.semester}</Table.Cell>
                  <Table.Cell>
                    <div className="flex gap-2 items-center">
                      {" "}
                      <Phone className="w-4 h-4" /> {student.phone}
                    </div>{" "}
                  </Table.Cell>
                  <Table.Cell>$ {student.fees.balance}</Table.Cell>

                  <Table.Cell>
                    <Badge
                      size="small"
                      variant={
                        student?.fees?.status === "Partial"
                          ? "info"
                          : student?.fees.status === "Overdue"
                          ? "danger"
                          : "success"
                      }
                    >
                      {student.fees.status ?? "-"}
                    </Badge>
                  </Table.Cell>
                  <Table.Cell>
                    <Link href={`/students/${student.id}`}>
                      <Eye className="w-4 h-4 " />
                    </Link>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Students;
