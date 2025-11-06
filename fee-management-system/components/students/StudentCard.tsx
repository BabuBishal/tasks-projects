import { Book, Calendar, Mail, Phone } from "lucide-react";

const StudentCard = () => {
  return (
    <div className="w-1/2 flex flex-col gap-2 p-4 border border-border rounded-md">
      <div className="text-md text-secondary font-semibold">{"Name"}</div>
      <div className="text-sm text-muted ">{"rollNO"}</div>
      <div className="text-xs text-muted flex gap-5 justify-between min-w-52  ">
        <span className="flex gap-2 items-center flex-1  ">
          <Mail className="w-4 h-4" /> {"email"}
        </span>
        <span className="flex gap-2 items-center  flex-1">
          <Phone className="w-4 h-4" />
          {"phone"}
        </span>
      </div>
      <div className="text-xs text-muted flex gap-5 justify-between min-w-52 w-full ">
        <span className="flex gap-2 items-center  flex-1 ">
          <Book className="w-4 h-4" />
          {"Program"}
        </span>
        <span className="flex gap-2 items-center  flex-1 ">
          <Calendar className="w-4 h-4" />
          {"Semester"}
        </span>
      </div>
    </div>
  );
};

export default StudentCard;
