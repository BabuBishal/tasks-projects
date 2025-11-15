import ProgressBar from "@/components/ui/progress-bar/ProgressBar";
import { CheckCircle, CircleAlert, CircleAlertIcon, Clock } from "lucide-react";
type PaymentStatus = {
  paid: number | undefined;
  overdue: number | undefined;
  pending: number | undefined;
  total: number | undefined;
};
const PaymentStatusOverview = ({
  paymentStatus,
}: {
  paymentStatus: PaymentStatus;
}) => {
  const { paid, overdue, pending, total } = paymentStatus;
  const paidPercent = paid && total && Math.floor((paid / total) * 100);
  const overduePercent =
    overdue && total && Math.floor((overdue / total) * 100);
  const pendingPercent =
    pending && total && Math.floor((pending / total) * 100);

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
            <span className="text-secondary">{`${paid ?? "-"} payments`}</span>
          </div>
          <ProgressBar progress={paidPercent as number}></ProgressBar>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex gap-2 justify-between items-center">
            <span className="flex gap-2 items-center justify-start ">
              <Clock className="w-4 h-4 text-amber-500" />
              <span className="text-secondary text-md ">Pending</span>
            </span>
            <span className="text-secondary">{`${
              pending ?? "-"
            } payments`}</span>
          </div>{" "}
          <ProgressBar progress={pendingPercent} />
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex gap-2 justify-between items-center">
            <span className="flex gap-2 items-center justify-start">
              <CircleAlertIcon className="w-4 h-4 text-red-500" />
              <span className="text-secondary text-md ">Overdue</span>
            </span>
            <span className="text-secondary">{`${
              overdue ?? "-"
            } payments`}</span>
          </div>{" "}
          <ProgressBar progress={overduePercent} />
        </div>
      </div>
      <div className="flex gap-2 justify-between items-center">
        <span className="text-secondary text-md font-semibold">
          Total Payments
        </span>
        <span className="text-primary text-lg font-bold">{total ?? "-"}</span>
      </div>
    </div>
  );
};

export default PaymentStatusOverview;
