import { Breadcrumb } from '@/shared/ui/breadcrumb/Breadcrumb'
import BulkOperations from './_components/BulkOperations'
import { Suspense } from 'react'

const BulkOperationsPage = () => {
  return (
    <div className="flex h-full w-full flex-col gap-6">
      <Breadcrumb
        items={[
          { label: 'Students', href: '/students' },
          { label: 'Bulk Operations', href: '/students/bulk' },
        ]}
      />

      <div>
        <h1 className="text-primary text-2xl font-bold">Bulk Operations</h1>
        <p className="text-muted text-sm">Import and export student data</p>
      </div>

      <Suspense fallback={<div>Loading...</div>}>
        <BulkOperations />
      </Suspense>
    </div>
  )
}

export default BulkOperationsPage
