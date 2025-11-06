import StatsOverview from "@/components/layout/StatsOverview";
import { Button } from "@/components/ui/Button/Button";
import Table from "@/components/ui/Table/Table";
import { Plus, Search, User } from "lucide-react";

const Students = async () => {
  const res = await fetch("http://localhost:4000/students");
  const data = res.json();

  return (
    <div className="w-full h-full flex flex-col gap-10">
      <div className="flex justify-between items-end g-5 ">
        <div>
          {" "}
          <h1 className="text-primary text-2xl font-bold">Students Panel</h1>
          <h4 className="text-muted text-sm">Manage students, fees, ...</h4>
        </div>
        <div>
          <Button variant="primary" size="sm">
            <Plus className="w-4 h-4" /> Add Student
          </Button>
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
        <div className="">
          <Table>
            <Table.Header>
              <Table.HeaderCell>""</Table.HeaderCell>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.Cell>""</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </div>
      </div>{" "}
    </div>
  );
};

export default Students;
