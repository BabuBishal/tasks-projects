import Table from "../../../src/components/table/Table";
import CodeBlock from "../../components/codeBlock/CodeBlock";
import Container from "../../components/container/Container";

const TableCode = `<Table>
  <Table.Header>
    {column.map((col, i) => (
      <Table.HeaderCell key={i}>{col}</Table.HeaderCell>
    ))}
  </Table.Header>
  <Table.Body>
    {row.map((row, rowIndex) => (
      <Table.Row key={rowIndex}>
        {row.map((cell, cellIndex) => (
          <Table.Cell key={cellIndex}>{cell}</Table.Cell>
        ))}
      </Table.Row>
    ))}
  </Table.Body>
</Table>`;

const TablePage = ({ column, row }: any) => {
  return (
    <section id="tables" className="section table-section">
      <h2 className="section-heading">Tables</h2>
      <h4 className="section-desc">Table element for displaying content</h4>

      <Container
        title="Table"
        desc="Table component for displaying data"
        content={
          <Table>
            <Table.Header>
              {column.map((col: any, i: number) => (
                <Table.HeaderCell key={i}>{col}</Table.HeaderCell>
              ))}
            </Table.Header>
            <Table.Body>
              {row.map((row: any, rowIndex: number) => (
                <Table.Row key={rowIndex}>
                  {row.map((cell: any, cellIndex: number) => (
                    <Table.Cell key={cellIndex}>{cell}</Table.Cell>
                  ))}
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        }
        codeContent={<CodeBlock code={TableCode} />}
      />
    </section>
  );
};

export default TablePage;
