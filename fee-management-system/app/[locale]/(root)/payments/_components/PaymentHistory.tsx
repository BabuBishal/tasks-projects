import Badge from "@/components/ui/badges/Badges";
import { Button } from "@/components/ui/button/Button";
import { Modal } from "@/components/ui/modal";
import { Table } from "@/components/ui/table";
import { paymentHeaders } from "@/lib/constants/constants";
import { PaymentHistoryItem } from "@/lib/types";
import { getMethodIcon } from "@/lib/utils/get-payment-method-icons";
import { handleDownloadReceipt } from "@/lib/utils/payment-receipt-download";
import { formatCurrency, formatDate } from "@/lib/utils/utils";
import { Download, Filter } from "lucide-react";

const PaymentHistory = ({
  initialPayments,
  paginatedPayments,
  filteredTotal,
  setCurrentPage,
  itemsPerPage,
}: {
  initialPayments: PaymentHistoryItem[];
  paginatedPayments: PaymentHistoryItem[];
  filteredTotal: number;
  setCurrentPage: (page: number) => void;
  itemsPerPage: number;
}) => {
  console.log(initialPayments);
  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-between items-center">
        <div className="text-md font-semibold text-secondary">
          Payment History ({initialPayments?.length})
        </div>
        <div className="text-xs text-muted">
          Showing {paginatedPayments?.length ?? "-"} of {filteredTotal ?? "-"}{" "}
          transactions
        </div>
      </div>

      {paginatedPayments?.length > 0 ? (
        <Table
          className="rounded-md text-xs text-secondary"
          pagination={{
            pageSize: itemsPerPage,
            total: filteredTotal,
            onPageChange: setCurrentPage,
          }}
        >
          <Table.Header>
            <Table.Row>
              {paymentHeaders?.map((head, index) => (
                <Table.Head key={index}>{head}</Table.Head>
              ))}
              <Table.Head>Actions</Table.Head>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {paginatedPayments?.map((payment) => (
              <Table.Row key={payment.id}>
                <Table.Cell dataLabel="PaymentID">{payment.id}</Table.Cell>
                <Table.Cell dataLabel="Student">
                  {payment.studentName}
                </Table.Cell>
                <Table.Cell dataLabel="Program">{payment.program}</Table.Cell>
                <Table.Cell dataLabel="Amount">
                  {formatCurrency(payment.amount)}
                </Table.Cell>
                <Table.Cell dataLabel="Date">
                  {new Date(payment.date).toLocaleDateString()}
                </Table.Cell>
                <Table.Cell dataLabel="Method">
                  <span className="flex items-center px-2 py-1 bg-background rounded text-xs border border-border w-fit">
                    {getMethodIcon(payment.method)}
                    <span className="capitalize">{payment.method}</span>
                  </span>
                </Table.Cell>
                <Table.Cell dataLabel="Status">
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
                <Table.Cell dataLabel="Actions">
                  <Modal>
                    <Modal.Trigger asChild>
                      <Button variant="ghost" size="sm">
                        <Download className="w-4 h-4   text-blue-500" />
                      </Button>
                    </Modal.Trigger>
                    <Modal.Content>
                      <Modal.CloseIcon />
                      <Modal.Header>
                        <h2 className="text-xl font-bold text-primary">
                          Payment Receipt
                        </h2>
                      </Modal.Header>
                      <Modal.Body>
                        <div className="space-y-3">
                          <div className="flex justify-between py-2 border-b border-border">
                            <span className="text-muted font-medium">
                              Receipt No:
                            </span>
                            <span className="text-primary font-semibold">
                              {payment.id}
                            </span>
                          </div>
                          <div className="flex justify-between py-2 border-b border-border">
                            <span className="text-muted font-medium">
                              Date:
                            </span>
                            <span className="text-primary">
                              {formatDate(payment.date)}
                            </span>
                          </div>
                          <div className="flex justify-between py-2 border-b border-border">
                            <span className="text-muted font-medium">
                              Student Name:
                            </span>
                            <span className="text-primary">
                              {payment.studentName}
                            </span>
                          </div>
                          <div className="flex justify-between py-2 border-b border-border">
                            <span className="text-muted font-medium">
                              Program:
                            </span>
                            <span className="text-primary">
                              {payment.program}
                            </span>
                          </div>
                          <div className="flex justify-between py-2 border-b border-border">
                            <span className="text-muted font-medium">
                              Payment Method:
                            </span>
                            <span className="text-primary capitalize">
                              {payment.method}
                            </span>
                          </div>
                          <div className="flex justify-between py-2 ">
                            <span className="text-muted font-medium">
                              Status:
                            </span>
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
                              {payment.status}
                            </Badge>
                          </div>
                          <div className="flex justify-between py-3 border-t-2 border-primary mt-4">
                            <span className="text-primary font-bold text-lg">
                              Amount Paid:
                            </span>
                            <span className="text-primary font-bold text-lg">
                              Rs {payment.amount.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </Modal.Body>
                      <Modal.Footer>
                        <div className="flex gap-3">
                          <Modal.Close>Close</Modal.Close>
                          <Button
                            variant="primary"
                            className="flex-1"
                            onClick={() => handleDownloadReceipt(payment)}
                          >
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </Button>
                        </div>
                      </Modal.Footer>
                    </Modal.Content>
                  </Modal>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Filter className="w-12 h-12 text-muted mb-3" />
          <p className="text-muted text-sm mb-2">No payments found</p>
          <p className="text-xs text-muted">
            Try adjusting your search or filters
          </p>
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;
