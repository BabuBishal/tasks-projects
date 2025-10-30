import {
  GraduationCap,
  LayoutDashboard,
  Settings,
  User,
  Users,
  Wallet,
} from "lucide-react";

const index = () => {
  return (
    <aside className=" absolute max-sm:-left-58 left-0 top-0 h-full min-h-screen min-w-40 max-w-58 w-full flex  flex-col border-r border-border  flex-1 transition-transform ease duration-200">
      <div className="flex gap-2 justify-center items-center p-4 h-16 border-b border-border">
        <GraduationCap />
        <span className="font-semibold">Fee Payment System</span>
      </div>
      <div className=" flex flex-col gap-3 text-sm flex-1 p-5">
        <div className="p-2 flex gap-2 justify-start items-center  rounded-sm">
          <LayoutDashboard className="w-4 h-4" />
          <span>Dashboard</span>
        </div>
        <div className="p-2 flex gap-2 justify-start items-center  rounded-sm">
          <Users className="w-4 h-4" />
          <span>Student Details</span>
        </div>
        <div className="p-2 flex gap-2 justify-start items-center  rounded-sm">
          <Wallet className="w-4 h-4" />
          <span>Payments</span>
        </div>
      </div>
      <div className="h-16 flex gap-2 justify-start items-center p-4 border-t border-border">
        <Settings className="w-5 h-5" />
        <span className="font-medium">Settings</span>
      </div>
    </aside>
  );
};

export default index;
