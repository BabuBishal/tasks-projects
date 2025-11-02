import React from "react";

const QuickActions = () => {
  return (
    <div className="w-full  h-72 flex flex-col gap-4 p-4 rounded-lg border border-border">
      <div>
        <h5>Payment Status Overview</h5>
        <h6>Current status of all fee payments</h6>{" "}
      </div>
      <div className="flex flex-col gap-5 pb-4 border-b border-border ">
        <div>
          <div>Paid</div>
        </div>
        <div>
          <div>Pending</div>
        </div>
        <div>
          <div>Overdue</div>
        </div>
      </div>{" "}
    </div>
  );
};

export default QuickActions;
