import styles from "./Table.module.css";
import type {
  TableBodyProps,
  TableCellProps,
  TableHeaderProps,
  TableRootProps,
  TableRowProps,
} from "./Table.types";

const TableRoot = ({ children, className }: TableRootProps) => {
  return (
    <table className={`${styles.table} ${className ?? ""}`}>{children}</table>
  );
};

const TableHeader = ({ children }: TableHeaderProps) => {
  return (
    <thead className={styles.tableHeader}>
      <tr className={styles.tableRow}>{children}</tr>
    </thead>
  );
};

const TableBody = ({ children }: TableBodyProps) => {
  return <tbody className={styles.tableBody}>{children}</tbody>;
};

const TableRow = ({ children }: TableRowProps) => {
  return <tr className={styles.tr}>{children}</tr>;
};

const TableHeaderCell = ({ children }: TableCellProps) => {
  return <th className={styles.th}>{children}</th>;
};

const TableCell = ({ children }: TableCellProps) => {
  return <td className={styles.td}>{children}</td>;
};

export const Table = Object.assign(TableRoot, {
  Header: TableHeader,
  HeaderCell: TableHeaderCell,
  Body: TableBody,
  Row: TableRow,
  Cell: TableCell,
});

export default Table;
