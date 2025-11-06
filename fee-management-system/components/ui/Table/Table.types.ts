import type { ReactNode } from "react";

export interface TableProps {
  rowData: string[][];
  colData: string[];
  className?: string;
}

export type TableRootProps = {
  children: ReactNode;
  className?: string;
};

export type TableHeaderProps = {
  children: ReactNode;
};

export type TableBodyProps = {
  children: ReactNode;
};

export type TableRowProps = {
  children: ReactNode;
};

export type TableCellProps = {
  children: ReactNode;
};

