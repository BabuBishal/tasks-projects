// interface Params {
//   locale: string;
//   id: string;
// }

import StudentCard from "@/components/students/StudentCard";

const StudentDetail = async ({ params }: { params: any }) => {
  console.log("Params:", params);
  const { id } = params;
  console.log("id", id);

  const res = await fetch(`http://localhost:3000/api/students/${id}`, {
    cache: "no-store",
  });
  const student = await res.json();
  console.log(student);
  if (!student || student.error) {
    return <p>Error fetching student details.</p>;
  }
  console.log("first", student);
  return (
    <div className="w-full h-full flex flex-col gap-10">
      <div className=" ">
        <h1 className="text-primary text-2xl font-bold">Student Details</h1>
        <h4 className="text-muted text-sm">View student details</h4>
      </div>
      <div>
        <StudentCard />
      </div>
    </div>
  );
};

export default StudentDetail;
