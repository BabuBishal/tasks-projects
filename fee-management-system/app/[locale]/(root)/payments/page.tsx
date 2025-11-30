import Link from "next/link";
import { Button } from "@/components/ui/button/Button";
import { Plus } from "lucide-react";
import { Breadcrumb } from "@/components/ui/breadcrumb/Breadcrumb";

import RecentPayments from "./_components/RecentPayments";
import PaymentStats from "./_components/PaymentStats";
import Overdue from "../_components/Overdue";

export default function PaymentsPage() {
  return (
    <div className="w-full h-full flex flex-col gap-6">
      <Breadcrumb items={[{ label: "Payments", href: "/payments" }]} />

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Payment Management
          </h1>
          <p className="text-muted-foreground">
            Track and manage all payment transactions
          </p>
        </div>
        <Link href="/payments/add">
          <Button
            variant="primary"
            size="sm"
            className="flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Payment
          </Button>
        </Link>
      </div>

      <PaymentStats />

      <div className="grid grid-cols-1  gap-6">
        <RecentPayments />

        <Overdue />
      </div>
    </div>
  );
}
