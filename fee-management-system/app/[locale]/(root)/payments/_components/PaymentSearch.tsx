"use client";
import { useDebounce } from "@/hooks/useDebounce";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";

const PaymentSearch = ({
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
  methodFilter,
  setMethodFilter,
  setCurrentPage,
}: {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  statusFilter: string;
  setStatusFilter: (filter: string) => void;
  methodFilter: string;
  setMethodFilter: (filter: string) => void;
  setCurrentPage: (page: number) => void;
}) => {
  const [searchText, setSearchText] = useState(searchQuery);

  const debouncedSearchText = useDebounce(searchText, 400);

  useEffect(() => {
    setSearchQuery(debouncedSearchText);
    setCurrentPage(1);
  }, [debouncedSearchText, setSearchQuery, setCurrentPage]);

  return (
    <div className="flex flex-col md:flex-row gap-3">
      <div className="flex-1 relative">
        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
        <input
          type="text"
          placeholder="Search by student name, ID..."
          className="w-full pl-10 pr-4 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-background"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
        />
      </div>
      <div className="flex gap-2">
        <select
          className="px-4 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-background"
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="">All Status</option>
          <option value="completed">Fully Paid</option>
          <option value="partial">Partially Paid</option>
          {/* <option value="Overdue">Overdue</option> */}
        </select>
        <select
          className="px-4 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-background"
          value={methodFilter}
          onChange={(e) => {
            setMethodFilter(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="">All Methods</option>
          <option value="cash">Cash</option>
          <option value="bank">Bank </option>
          <option value="online">Online</option>
        </select>
      </div>
    </div>
  );
};

export default PaymentSearch;
