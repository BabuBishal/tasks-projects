import {
  AlertCircle,
  Briefcase,
  Receipt,
  Users,
  WalletCardsIcon,
} from "lucide-react";
import Link from "next/link";
import { memo } from "react";

const QuickActions = () => {
  return (
    <div className="w-full flex flex-col gap-4 p-4 rounded-lg border border-border">
      <div>
        <h5 className="text-secondary text-md font-semibold">Quick Actions</h5>
        <h6 className="text-sm text-muted font-normal">
          Frequently used actions
        </h6>{" "}
      </div>
      <div className="flex flex-col gap-5 pb-4  ">
        <Link
          href={"/payments/add"}
          className="flex  gap-2 justify-start items-center border border-border hover:bg-accent rounded-md p-1.5 transition duration-200 cursor-pointer"
        >
          <WalletCardsIcon className="w-4 h-4" />
          <span className="text-secondary text-sm ">Make Payment</span>
        </Link>
        <Link
          href="/reports"
          className="flex  gap-2 justify-start items-center border border-border hover:bg-accent rounded-md p-1.5 transition duration-200 cursor-pointer"
        >
          <Receipt className="w-4 h-4" />
          <span className="text-secondary text-sm ">Generate Report</span>
        </Link>
        <Link
          href="/students"
          className="flex  gap-2 justify-start items-center border border-border hover:bg-accent rounded-md p-1.5 transition duration-200 cursor-pointer"
        >
          <Users className="w-4 h-4" />
          <span className="text-secondary text-sm ">View all Students</span>
        </Link>
        {/* <Link
          href="/payments/overdue"
          className="flex  gap-2 justify-start items-center border border-border hover:bg-accent rounded-md p-1.5 transition duration-200 cursor-pointer"
        >
          <AlertCircle className="w-4 h-4" />
          <span className="text-secondary text-sm ">View Overdue Payments</span>
        </Link> */}
        {/* <Link
          href="/programs"
          className="flex  gap-2 justify-start items-center border border-border hover:bg-accent rounded-md p-1.5 transition duration-200 cursor-pointer"
        >
          <Briefcase className="w-4 h-4" />
          <span className="text-secondary text-sm ">Manage Programs</span>
        </Link> */}
      </div>
    </div>
  );
};

export default memo(QuickActions);
