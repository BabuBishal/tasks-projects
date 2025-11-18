import {
  AlertCircle,
  DollarSign,
  DollarSignIcon,
  Users,
  Wallet,
  WalletCardsIcon,
  WalletIcon,
  WalletMinimal,
} from "lucide-react";
import Link from "next/link";
import React from "react";

const QuickActions = () => {
  return (
    <div className="w-full  h-76 flex flex-col gap-4 p-4 rounded-lg border border-border">
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
          href="/students"
          className="flex  gap-2 justify-start items-center border border-border hover:bg-accent rounded-md p-1.5 transition duration-200 cursor-pointer"
        >
          <Users className="w-4 h-4" />
          <span className="text-secondary text-sm ">View all Students</span>
        </Link>
        {/* <div className="flex  gap-2 justify-start items-center border border-border hover:bg-accent rounded-md p-1.5 transition duration-200 cursor-pointer">
          <DollarSignIcon className="w-4 h-4" />
          <span className="text-secondary text-sm ">Generate Reports</span>
        </div>
        <div className="flex  gap-2 justify-start items-center border border-border hover:bg-accent rounded-md p-1.5 transition duration-200 cursor-pointer">
          <AlertCircle className="w-4 h-4" />
          <span className="text-secondary text-sm ">View Overdue Payments</span>
        </div> */}
      </div>
    </div>
  );
};

export default QuickActions;
