import { Card, CardContent } from '@/shared/ui/card/Card'
import { Skeleton } from '@/shared/ui/skeleton'

export function ProfileSkeleton() {
  return (
    <div className="flex h-full w-full flex-col gap-8 pb-8">
      <Card>
        <CardContent className="p-8">
          <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
            <Skeleton className="h-28 w-28 rounded-full" />
            <div className="flex-1 space-y-3">
              <Skeleton className="h-8 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-4 w-[150px]" />
            </div>
            <div className="flex gap-3">
              <Skeleton className="h-10 w-[120px]" />
              <Skeleton className="h-10 w-[160px]" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Profile Information */}
      <Card>
        <CardContent className="p-8">
          <Skeleton className="mb-8 h-7 w-[200px]" />
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex items-start gap-4">
                <Skeleton className="h-12 w-12 rounded-xl" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-[100px]" />
                  <Skeleton className="h-6 w-[200px]" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
