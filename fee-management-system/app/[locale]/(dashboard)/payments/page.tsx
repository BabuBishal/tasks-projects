import Badge from "@/components/ui/Badges/Badges";
import { Button } from "@/components/ui/Button/Button";
import Table from "@/components/ui/Table/Table";
import { PaymentHistory } from "@/lib/@types/types";
import { paymentHeaders } from "@/lib/constants";
import { Plus } from "lucide-react";
import Link from "next/link";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const page = async () => {
  const res = await fetch(`${baseUrl}/api/payment/history`);
  const data = await res.json();
  // console.log("pay", data);
  return (
    <div>
      <div className="w-full flex flex-col gap-5 p-4 border border-border rounded-lg">
        <div className="flex justify-between items-center">
          <div className="flex flex-col ">
            <span className="text-secondary text-sm">Payment Management</span>
            <span className="text-xs text-muted">
              Manage and view all payment records
            </span>
          </div>
          <div>
            <Link href={"/payments/add"}>
              <Button variant="primary" size="sm">
                <Plus className="w-4 h-4" /> New Payment
              </Button>
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="text-md font-semibold text-secondary">
            Payment History
          </div>
          {data.length > 0 ? (
            <Table className="rounded-md text-xs text-secondary">
              <Table.Header>
                {paymentHeaders?.map((head, index) => (
                  <Table.HeaderCell key={index}>{head}</Table.HeaderCell>
                ))}
              </Table.Header>
              <Table.Body>
                {data.map((payment: PaymentHistory) => (
                  <Table.Row key={payment.id}>
                    <Table.Cell>{payment.id}</Table.Cell>
                    <Table.Cell>{payment.studentName}</Table.Cell>
                    <Table.Cell>{payment.program}</Table.Cell>
                    <Table.Cell>$ {payment.amount}</Table.Cell>
                    <Table.Cell>{payment.date}</Table.Cell>
                    <Table.Cell>{payment.method}</Table.Cell>

                    <Table.Cell>
                      <Badge
                        size="small"
                        variant={
                          payment.status === "Partial" ? "info" : "success"
                        }
                      >
                        {payment.status ?? "-"}
                      </Badge>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          ) : (
            <p>No payment history found</p>
          )}
        </div>
      </div>
    </div>
  );
  ("hello");
};

export default page;
