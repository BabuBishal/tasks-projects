'use client'
import { useState, type ReactNode, forwardRef } from 'react'
import './table.css'
import { cn } from '@/lib/utils/utils'
import { TableProps } from './table.types'

export const Table = ({ children, className, striped = false, pagination }: TableProps) => {
  const [page, setPage] = useState(1)

  const totalPages = pagination ? Math.ceil(pagination.total / pagination.pageSize) : 1

  const goToPage = (newPage: number) => {
    setPage(newPage)
    pagination?.onPageChange?.(newPage)
  }

  return (
    <div className={cn('table-wrapper', striped && 'striped', className)}>
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
  )
}

/* Header */
const Header = ({ children, className }: { children: ReactNode; className?: string }) => (
  <thead className={cn('ui-table-header', className)}>{children}</thead>
)

/* Body */
const Body = ({
  children,
  className,
  style,
}: {
  children: ReactNode
  className?: string
  style?: React.CSSProperties
}) => (
  <tbody className={cn('ui-table-body', className)} style={style}>
    {children}
  </tbody>
)

/* Row */
// const Row = ({
//   children,
//   className,
//   ref,
// }: {
//   children: ReactNode
//   className?: string
//   ref?: React.RefObject<HTMLTableRowElement>
// }) => (
//   <tr className={cn('ui-table-row', className)} ref={ref}>
//     {children}
//   </tr>
// )

const Row = forwardRef<
  HTMLTableRowElement,
  {
    children: ReactNode
    className?: string
    style?: React.CSSProperties
    'data-index'?: number
  }
>(({ children, className, style, ...props }, ref) => {
  return (
    <tr className={cn('ui-table-row', className)} ref={ref} style={style} {...props}>
      {children}
    </tr>
  )
})

Row.displayName = 'Row'

/* Head Cell */
const Head = ({ children, className }: { children: ReactNode; className?: string }) => (
  <th scope="col" className={cn('ui-table-head', className)}>
    {children}
  </th>
)

/* Data Cell */
const Cell = ({
  children,
  dataLabel,
  className,
}: {
  children: ReactNode
  dataLabel?: string
  className?: string
}) => (
  <td className={cn('ui-table-cell', className)} data-label={dataLabel}>
    {children}
  </td>
)

Table.Header = Header
Table.Body = Body
Table.Row = Row
Table.Head = Head
Table.Cell = Cell
