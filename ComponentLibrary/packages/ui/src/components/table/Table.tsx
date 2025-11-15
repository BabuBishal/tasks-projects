import { useState, type ReactNode } from "react";
import "./table.css";
import { cn } from "../../utils/cn";
import { TableProps } from "./table.types";

export const Table = ({
  children,
  className,
  striped = false,
  pagination,
}: TableProps) => {
  const [page, setPage] = useState(1);

  const totalPages = pagination
    ? Math.ceil(pagination.total / pagination.pageSize)
    : 1;

  const goToPage = (newPage: number) => {
    setPage(newPage);
    pagination?.onPageChange?.(newPage);
  };

  return (
    <div className={cn("table-wrapper", striped && "striped", className)}>
      <table className="ui-table">{children}</table>

      {/* Pagination UI */}
      {pagination && (
        <div className="table-pagination">
          <button
            onClick={() => goToPage(page - 1)}
            disabled={page === 1}
            className="pagination-btn"
          >
            Prev
          </button>

          <span className="pagination-info">
            Page {page} / {totalPages}
          </span>

          <button
            onClick={() => goToPage(page + 1)}
            disabled={page === totalPages}
            className="pagination-btn"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

/* Header */
const Header = ({ children }: { children: ReactNode }) => (
  <thead className="ui-table-header">{children}</thead>
);

/* Body */
const Body = ({ children }: { children: ReactNode }) => (
  <tbody className="ui-table-body">{children}</tbody>
);

/* Row */
const Row = ({ children }: { children: ReactNode }) => (
  <tr className="ui-table-row">{children}</tr>
);

/* Head Cell */
const Head = ({ children }: { children: ReactNode }) => (
  <th scope="col" className="ui-table-head">
    {children}
  </th>
);

/* Data Cell */
const Cell = ({
  children,
  dataLabel,
}: {
  children: ReactNode;
  dataLabel?: string;
}) => (
  <td className="ui-table-cell" data-label={dataLabel}>
    {children}
  </td>
);

Table.Header = Header;
Table.Body = Body;
Table.Row = Row;
Table.Head = Head;
Table.Cell = Cell;
