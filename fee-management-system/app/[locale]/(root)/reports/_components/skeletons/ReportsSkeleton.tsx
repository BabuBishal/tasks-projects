import { Skeleton } from '@/shared/ui/skeleton'
import { Card, CardContent, CardHeader } from '@/shared/ui/card/Card'

export function ReportsSkeleton() {
  return (
    <div className="flex h-full w-full flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div className="space-y-2">
          <Skeleton className="h-8 w-[200px]" />
          <Skeleton className="h-4 w-[300px]" />
        </div>
        <div className="flex gap-3">
          <Skeleton className="h-10 w-[140px]" />
          <Skeleton className="h-10 w-[180px]" />
        </div>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <Skeleton className="h-5 w-5" />
            <Skeleton className="h-6 w-[250px]" />
          </div>
          <Skeleton className="h-10 w-[140px]" />
        </CardHeader>
        <CardContent>
          {/* Program Stats */}
          <div className="mb-8">
            <Skeleton className="mb-4 h-5 w-[180px]" />
            <div className="space-y-2">
              <Skeleton className="h-10 w-full" />
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          </div>

          {/* Semester Stats */}
          <div className="mb-8">
            <Skeleton className="mb-4 h-5 w-[180px]" />
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="space-y-2 rounded-lg border p-4">
                  <Skeleton className="h-3 w-[80px]" />
                  <Skeleton className="h-6 w-[40px]" />
                  <Skeleton className="h-3 w-[100px]" />
                </div>
              ))}
            </div>
          </div>

          {/* Method Stats */}
          <div>
            <Skeleton className="mb-4 h-5 w-[180px]" />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="space-y-2 rounded-lg border p-4">
                  <div className="flex justify-between">
                    <Skeleton className="h-5 w-[100px]" />
                    <Skeleton className="h-6 w-[30px]" />
                  </div>
                  <Skeleton className="h-4 w-[120px]" />
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
