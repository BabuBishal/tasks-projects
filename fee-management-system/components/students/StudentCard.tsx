import { Student } from "@/lib/@types/types";
import { Book, Calendar, Mail, Phone } from "lucide-react";

const StudentCard = ({
  name,
  email = "N/A",
  phone = "N/A",
  year,
  program = "N/A",
  semester,
}: Partial<Student>) => {
  return (
    <div className="w-full flex flex-col gap-2 p-4 border border-border rounded-md">
      <div className="text-lg text-secondary font-bold">{name}</div>
      {/* <div className="text-sm text-muted font-semibold">{program}</div> */}
      <div className="text-xs text-muted flex gap-5 justify-between min-w-52  ">
        <span className="flex gap-2 items-center flex-1  ">
          <Mail className="w-4 h-4" /> {email}
        </span>
        <span className="flex gap-2 items-center  flex-1">
          <Phone className="w-4 h-4" />
          {phone}
        </span>
      </div>
      <div className="text-xs text-muted flex gap-5 justify-between min-w-52 w-full ">
        <span className="flex gap-2 items-center  flex-1 ">
          <Book className="w-4 h-4" />
          {typeof program === "object" ? program.name : program}
        </span>
        <span className="flex gap-2 items-center  flex-1 ">
          <Calendar className="w-4 h-4" />
          {year} - Semester {semester}
        </span>
      </div>
    </div>
  );
};

export default StudentCard;
