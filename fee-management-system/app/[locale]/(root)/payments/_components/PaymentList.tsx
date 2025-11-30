"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button/Button";
import { Download, Plus } from "lucide-react";
import Link from "next/link";

import { useGetPaymentsQuery } from "@/hooks/query-hooks/payments";
import { TableSkeleton } from "@/app/[locale]/(root)/_components/skeletons/TableSkeleton";
import { handleExportPayments } from "@/lib/utils/export-payments";
import PaymentSearch from "./PaymentSearch";
import PaymentHistory from "./PaymentHistory";

const PaymentList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [methodFilter, setMethodFilter] = useState<string>("");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { data, isLoading, error } = useGetPaymentsQuery({
    params: { search: searchQuery, status: statusFilter, method: methodFilter },
  });

  const initialPayments = data?.payments;

  // if (isLoading) return <TableSkeleton />;

  if (error) return null;

  const filteredPayments = (() => {
    if (!initialPayments) return [];

    return initialPayments.filter((payment) => {
      const studentNameMatches = payment.studentName
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const idMatches = payment.id
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesSearch = studentNameMatches || idMatches;

      const matchesStatus = statusFilter
        ? payment.status.toLowerCase() === statusFilter.toLowerCase()
        : true;

      const matchesMethod = methodFilter
        ? payment.method.toLowerCase() === methodFilter.toLowerCase()
        : true;

      return matchesSearch && matchesStatus && matchesMethod;
    });
  })();
  const filteredTotal = filteredPayments.length;

  const paginatedPayments = (() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredPayments.slice(startIndex, endIndex);
  })();

  return (
    <div className="w-full flex flex-col gap-5 p-6 border border-border rounded-lg bg-card">
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
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleExportPayments(filteredPayments)}
          >
            <Download className="w-4 h-4" /> Export
          </Button>
          <Link href={"/payments/add"}>
            <Button variant="primary" size="sm">
              <Plus className="w-4 h-4" /> New Payment
            </Button>
          </Link>
        </div>
      </div>

      <PaymentSearch
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        methodFilter={methodFilter}
        setMethodFilter={setMethodFilter}
        setCurrentPage={setCurrentPage}
      />

      {/* Payment Table */}
      {!isLoading && initialPayments && initialPayments?.length > 0 ? (
        <PaymentHistory
          initialPayments={initialPayments}
          paginatedPayments={paginatedPayments}
          filteredTotal={filteredTotal}
          setCurrentPage={setCurrentPage}
          itemsPerPage={itemsPerPage}
        />
      ) : (
        <TableSkeleton />
      )}
    </div>
  );
};

export default PaymentList;
