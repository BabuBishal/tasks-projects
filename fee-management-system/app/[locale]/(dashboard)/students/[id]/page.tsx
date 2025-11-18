// import StatsOverview from "@/components/layout/StatsOverview";
import Card from "@/components/shared/stats-card/StatsCard";
import StudentCard from "@/components/students/StudentCard";
import StudentStatus from "@/components/students/StudentStatus";
import ProgressBar from "@/components/ui/progress-bar/ProgressBar";
import { type StudentDetail } from "@/lib/@types/types";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

type Props = {
  params:
    | {
        locale: string;
        id: string;
      }
    | Promise<{
        locale: string;
        id: string;
      }>;
};
export const validate = 90;

const StudentDetail = async ({ params }: Props) => {
  // Ensure params is resolved if it's a promise
  const resolvedParams = await Promise.resolve(params);
  // console.log("Resolved Params:", resolvedParams);

  // If params is a string (JSON), parse it
  const finalParams =
    typeof resolvedParams === "string"
      ? JSON.parse(resolvedParams)
      : resolvedParams;

  const { id } = finalParams;

  try {
    const res = await fetch(`${baseUrl}/api/students/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("API response not ok:", res.status, res.statusText);
      throw new Error(`API returned ${res.status}: ${res.statusText}`);
    }

    const studentDetails: StudentDetail = await res.json();

    if (!studentDetails) {
      throw new Error("No student data received");
    }

    if ("error" in studentDetails) {
      throw new Error(studentDetails.error as string);
    }

    console.log("studentDetails", studentDetails);
    const { name, email, program, semester, phone, year } = studentDetails;
    console.log(name);

    // const progressBar = (
    //   <ProgressBar
    //     progress={studentDetails.fees.paid / studentDetails.fees.total / 100}
    //   />
    // );

    // const studentStats = [
    //   {
    //     title: "Total Paid",
    //     value: `$ ${studentDetails.fees.paid}`,
    //     desc: "Total fees paid",
    //     analysis: `${studentDetails.paymentHistory.length} payments`,
    //   },
    //   {
    //     title: "Current Due",
    //     value: `$ ${studentDetails.fees.balance}`,
    //     desc: "Due fees remaining",
    //     analysis: `Semester - ${studentDetails.semester} `,
    //   },
    // ];
    // console.log(studentStats);

    return (
      <div className="w-full h-full flex flex-col gap-10">
        <div className=" ">
          <h1 className="text-primary text-2xl font-bold">Student Details</h1>
          <h4 className="text-muted text-sm">View student details</h4>
          <h4 className="text-muted text-sm">{name}</h4>
        </div>
        <div>
          <StudentCard
            name={name}
            email={email}
            program={program}
            semester={semester}
            phone={phone}
            year={year}
          />
        </div>
        {/* <div><StudentStatus studentDetail={studentDetails} /></div> */}
        <div className="flex flex-row gap-4 flex-wrap ">
          {/* {studentStats?.map((stat) => (
            <Card
              key={stat.title + stat.value}
              title={stat.title}
              value={stat.value}
              analysis={stat.analysis}
              desc={stat.desc}
            />
          ))} */}
        </div>
      </div>
    );
  } catch (error: unknown) {
    console.error("Error fetching student:", error);
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return (
      <div className="w-full h-full flex flex-col gap-10">
        <div className="text-red-500">
          <h1 className="text-2xl font-bold">Error</h1>
          <p>Failed to fetch student details: {errorMessage}</p>
        </div>
      </div>
    );
  }
};
export default StudentDetail;
