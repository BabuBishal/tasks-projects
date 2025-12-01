import { Skeleton } from '@/shared/ui/skeleton'
import { Card, CardContent, CardHeader } from '@/shared/ui/card/Card'

export function StudentDetailsSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div className="space-y-2">
          <Skeleton className="h-8 w-[250px]" />
          <Skeleton className="h-4 w-[350px]" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-10 w-[100px]" />
          <Skeleton className="h-10 w-[100px]" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardHeader>
            <Skeleton className="h-6 w-[150px]" />
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col items-center p-4 text-center">
              <Skeleton className="mb-4 h-24 w-24 rounded-full" />
              <Skeleton className="mb-2 h-6 w-[180px]" />
              <Skeleton className="h-4 w-[120px]" />
            </div>
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex justify-between">
                  <Skeleton className="h-4 w-[100px]" />
                  <Skeleton className="h-4 w-[150px]" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6 lg:col-span-2">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[...Array(3)].map((_, i) => (
              <Card key={i}>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-[80px]" />
                      <Skeleton className="h-6 w-[100px]" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="h-[400px]">
            <CardHeader>
              <div className="flex gap-4">
                <Skeleton className="h-10 w-[120px]" />
                <Skeleton className="h-10 w-[120px]" />
                <Skeleton className="h-10 w-[120px]" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Skeleton className="h-10 w-full" />
                {[...Array(3)].map((_, i) => (
                  <Skeleton key={i} className="h-16 w-full" />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
