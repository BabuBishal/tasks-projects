import { Skeleton } from '@/shared/ui/skeleton'
import { Card, CardContent } from '@/shared/ui/card/Card'

export function ProgramListSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <Card key={i} className="h-full">
          <CardContent className="p-6">
            <div className="mb-4 flex items-start justify-between">
              <Skeleton className="h-10 w-10 rounded-lg" />
              <div className="flex gap-1">
                <Skeleton className="h-8 w-8 rounded-md" />
                <Skeleton className="h-8 w-8 rounded-md" />
              </div>
            </div>

            <Skeleton className="mb-2 h-6 w-3/4" />

            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-4 rounded-full" />
                <Skeleton className="h-4 w-1/2" />
              </div>
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-4 rounded-full" />
                <Skeleton className="h-4 w-1/3" />
              </div>
            </div>

            <div className="border-border mt-6 border-t pt-4">
              <Skeleton className="h-9 w-full rounded-md" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
