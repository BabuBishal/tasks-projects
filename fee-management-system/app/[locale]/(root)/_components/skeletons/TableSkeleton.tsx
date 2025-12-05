import { Skeleton } from '@/shared/ui/skeleton'
import { Table } from '@/shared/ui/table/Table'
import { Card, CardContent, CardHeader } from '@/shared/ui/card/Card'

interface TableSkeletonProps {
  columnCount?: number
  rowCount?: number
  showHeader?: boolean
}

export function TableSkeleton({
  columnCount = 5,
  rowCount = 10,
  showHeader = true,
}: TableSkeletonProps) {
  return (
    <Card>
      {showHeader && (
        <CardHeader>
          <div className="flex items-center justify-between">
            <Skeleton className="h-8 w-[200px]" />
            <div className="flex gap-2">
              <Skeleton className="h-9 w-[100px]" />
              <Skeleton className="h-9 w-[100px]" />
            </div>
          </div>
        </CardHeader>
      )}
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <Table.Header>
              <Table.Row>
                {Array.from({ length: columnCount }).map((_, i) => (
                  <Table.Head key={i}>
                    <Skeleton className="h-4 w-[100px]" />
                  </Table.Head>
                ))}
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {Array.from({ length: rowCount }).map((_, i) => (
                <Table.Row key={i}>
                  {Array.from({ length: columnCount }).map((_, j) => (
                    <Table.Cell key={j}>
                      <Skeleton className="h-4 w-full" />
                    </Table.Cell>
                  ))}
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
          <Skeleton className="h-8 w-[100px]" />
          <Skeleton className="h-8 w-[70px]" />
        </div>
      </CardContent>
    </Card>
  )
}
