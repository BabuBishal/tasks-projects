import { Breadcrumb } from "@/components/ui/breadcrumb/Breadcrumb";

// ... imports

export default function OverduePaymentsPage() {
  // ... query logic

  if (!data) return null;

  return (
    <div className="p-6 space-y-6">
      <Breadcrumb
        items={[
          { label: "Payments", href: "/payments" },
          { label: "Overdue", href: "/payments/overdue" },
        ]}
      />
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Overdue Payments</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-destructive" />
            Overdue Payments
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <Table.Header>
              <Table.Row>
                <Table.Head>Student</Table.Head>
                <Table.Head>Program</Table.Head>
                <Table.Head>Balance</Table.Head>
                <Table.Head>Due Date</Table.Head>
                <Table.Head>Overdue By</Table.Head>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {data.overdueFees.map((fee) => (
                <Table.Row key={fee.id}>
                  <Table.Cell>
                    <div className="font-medium">{fee.studentName}</div>
                    <div className="text-xs text-muted-foreground">
                      {fee.studentRollNo}
                    </div>
                  </Table.Cell>
                  <Table.Cell>{fee.program}</Table.Cell>
                  <Table.Cell className="text-destructive font-medium">
                    {formatCurrency(fee.balance)}
                  </Table.Cell>
                  <Table.Cell>
                    {new Date(fee.dueDate).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    <Badge variant="danger" size="small">
                      {fee.daysOverdue} days
                    </Badge>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
