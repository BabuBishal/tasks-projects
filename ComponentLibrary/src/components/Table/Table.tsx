import type { TableProps } from "./Table.types";
import styles from "./Table.module.css";

const Table = ({ rowData, colData, className }: TableProps) => {
  return (
    <table className={className ? className : ""}>
      <thead className={styles.tableHeader}>
        <tr className={styles.tableRow}>
          {colData.map((col, index) => (
            <th className={styles.th} key={index}>{col}</th>
          ))}
        </tr>
      </thead>
      <tbody className={styles.tableBody}>
        {rowData.map((row, rowIndex) => (
          <tr className={styles.tr} key={rowIndex}>
            {row.map((cell, cellIndex) => (
              <td className={styles.td} key={cellIndex}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
