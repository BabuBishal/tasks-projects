import ProgressBar from "@/components/ui/progress-bar/ProgressBar";
import { CheckCircle, CircleAlert, CircleAlertIcon, Clock } from "lucide-react";

const PaymentStatusOverview = ({ paymentStatus }: any) => {
  return (
    <div className="w-full   h-76 flex flex-col gap-4 p-4 rounded-lg border border-border">
      <div>
        <h5 className="text-secondary text-md font-semibold">
          Payment Status Overview
        </h5>
        <h6 className="text-sm text-muted font-normal">
          Current status of all fee payments
        </h6>{" "}
      </div>
      <div className="flex flex-col gap-5 pb-4 border-b border-border ">
        <div className="flex flex-col gap-1">
          <div className="flex gap-2 justify-between items-center">
            <span className="flex gap-2 items-center justify-start">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="text-secondary text-md ">Paid</span>
            </span>
            <span className="text-secondary">{`${7} payments`}</span>
          </div>
          <ProgressBar progress={35} />
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex gap-2 justify-between items-center">
            <span className="flex gap-2 items-center justify-start ">
              <Clock className="w-4 h-4 text-amber-500" />
              <span className="text-secondary text-md ">Pending</span>
            </span>
            <span className="text-secondary">{`${10} payments`}</span>
          </div>{" "}
          <ProgressBar progress={50} />
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex gap-2 justify-between items-center">
            <span className="flex gap-2 items-center justify-start">
              <CircleAlertIcon className="w-4 h-4 text-red-500" />
              <span className="text-secondary text-md ">Overdue</span>
            </span>
            <span className="text-secondary">{`${3} payments`}</span>
          </div>{" "}
          <ProgressBar progress={15} />
        </div>
      </div>
      <div className="flex gap-2 justify-between items-center">
        <span className="text-secondary text-md font-semibold">
          Total Payments
        </span>
        <span className="text-primary text-lg font-bold">{20}</span>
      </div>
    </div>
  );
};

export default PaymentStatusOverview;
