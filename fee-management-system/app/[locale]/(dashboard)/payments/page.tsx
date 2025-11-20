import Badge from "@/components/ui/badges/Badges";
import { Button } from "@/components/ui/button/Button";
import Table from "@/components/ui/table/Table";
import StatsCard from "@/components/shared/stats-card/StatsCard";
import { paymentHeaders } from "@/lib/constants";
import {
  Plus,
  Download,
  Filter,
  Search,
  CreditCard,
  TrendingUp,
  Calendar,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const page = async () => {
  const res = await fetch(`${baseUrl}/api/payment/history`);
  const data = await res.json();
  // console.log("data pay", data);
  // Calculate statistics
  const totalPayments = data.length;
  const totalAmount = data.reduce(
    (sum: number, payment: any) => sum + payment.amount,
    0
  );
  const completedPayments = data.filter((p: any) => p.status === "Paid").length;

  const todayPayments = data.filter((p: any) => {
    const paymentDate = new Date(p.date).toDateString();
    const today = new Date().toDateString();
    return paymentDate === today;
  }).length;

  const formatCurrency = (amount: number) => `Rs ${amount.toLocaleString()}`;

  return (
    <div className="space-y-6 p-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Collected"
          amount={formatCurrency(totalAmount)}
          desc="All time revenue"
        >
          <CreditCard className="w-6 h-6 text-green-500" />
        </StatsCard>
        <StatsCard
          title="Total Payments"
          amount={totalPayments.toString()}
          desc="All transactions"
        >
          <CheckCircle className="w-6 h-6 text-green-500" />
        </StatsCard>
        <StatsCard
          title="Today's Payments"
          amount={todayPayments.toString()}
          desc="Payments received today"
        >
          <Calendar className="w-6 h-6 text-blue-500" />
        </StatsCard>
        <StatsCard
          title="Average Payment"
          amount={formatCurrency(Math.round(totalAmount / totalPayments || 0))}
          desc="Per transaction"
        >
          <TrendingUp className="w-6 h-6 text-purple-500" />
        </StatsCard>
      </div>

      {/* Main Content */}
      <div className="w-full flex flex-col gap-5 p-6 border border-border rounded-lg bg-card">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <span className="text-secondary text-lg font-semibold">
              Payment Management
            </span>
            <span className="text-xs text-muted">
              Manage and view all payment records
            </span>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4" /> Export
            </Button>
            <Link href={"/payments/add"}>
              <Button variant="primary" size="sm">
                <Plus className="w-4 h-4" /> New Payment
              </Button>
            </Link>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
            <input
              type="text"
              placeholder="Search by student name, ID, or receipt..."
              className="w-full pl-10 pr-4 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex gap-2">
            <select className="px-4 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">All Status</option>
              <option value="completed">Completed</option>
              <option value="partial">Partial</option>
              <option value="pending">Pending</option>
            </select>
            <select className="px-4 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">All Methods</option>
              <option value="cash">Cash</option>
              <option value="bank">Bank Transfer</option>
              <option value="card">Card</option>
              <option value="online">Online</option>
            </select>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4" /> Filter
            </Button>
          </div>
        </div>

        {/* Quick Stats Summary */}
        {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-accent rounded-lg">
          <div className="text-center">
            <p className="text-xs text-muted mb-1">This Month</p>
            <p className="text-lg font-bold text-primary">
              {formatCurrency(totalAmount * 0.3)} 
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs text-muted mb-1">This Week</p>
            <p className="text-lg font-bold text-primary">
              {formatCurrency(totalAmount * 0.15)}
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs text-muted mb-1">Pending</p>
            <p className="text-lg font-bold text-orange-600">
              {data.filter((p: any) => p.status === "Partial").length}
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs text-muted mb-1">Failed</p>
            <p className="text-lg font-bold text-red-600">0</p>
          </div>
        </div> */}

        {/* Payment Table */}
        <div className="flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <div className="text-md font-semibold text-secondary">
              Payment History ({totalPayments})
            </div>
            <div className="text-xs text-muted">Showing all transactions</div>
          </div>

          {data.length > 0 ? (
            <div className="overflow-x-auto">
              <Table className="rounded-md text-xs text-secondary">
                <Table.Header>
                  {paymentHeaders?.map((head, index) => (
                    <Table.HeaderCell key={index}>{head}</Table.HeaderCell>
                  ))}
                  <Table.HeaderCell>Actions</Table.HeaderCell>
                </Table.Header>
                <Table.Body>
                  {data.map((payment: any) => (
                    <Table.Row key={payment.id}>
                      <Table.Cell>{payment.id}</Table.Cell>
                      <Table.Cell>{payment.studentName}</Table.Cell>
                      <Table.Cell>{payment.program}</Table.Cell>
                      <Table.Cell>{formatCurrency(payment.amount)}</Table.Cell>
                      <Table.Cell>{payment.date}</Table.Cell>
                      <Table.Cell>
                        <span className="px-2 py-1 bg-background rounded text-xs">
                          {payment.method}
                        </span>
                      </Table.Cell>
                      <Table.Cell>
                        <Badge
                          size="small"
                          variant={
                            payment.status === "Partial"
                              ? "info"
                              : payment.status === "Paid"
                              ? "success"
                              : "danger"
                          }
                        >
                          {payment.status ?? "-"}
                        </Badge>
                      </Table.Cell>
                      <Table.Cell>
                        <div className="flex gap-2">
                          <Button variant="secondary" size="sm">
                            View
                          </Button>
                          <Button variant="primary" size="sm">
                            Receipt
                          </Button>
                        </div>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <CreditCard className="w-12 h-12 text-muted mb-3" />
              <p className="text-muted text-sm mb-2">
                No payment history found
              </p>
              <p className="text-xs text-muted mb-4">
                Start by recording your first payment
              </p>
              <Link href={"/payments/add"}>
                <Button variant="primary" size="sm">
                  <Plus className="w-4 h-4" /> Add First Payment
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Pagination */}
        {data.length > 0 && (
          <div className="flex justify-between items-center pt-4 border-t border-border">
            <div className="text-xs text-muted">
              Showing 1 to {Math.min(10, data.length)} of {data.length} entries
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm">
                1
              </Button>
              <Button variant="outline" size="sm" disabled>
                Next
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default page;
