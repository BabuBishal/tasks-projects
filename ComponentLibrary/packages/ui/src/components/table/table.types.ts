import { ReactNode } from "react";

export type PaginationProps = {
  pageSize: number;
  total: number;
  onPageChange?: (page: number) => void;
};

export type TableProps = {
  children: ReactNode;
  className?: string;
  striped?: boolean;
  pagination?: PaginationProps;
};