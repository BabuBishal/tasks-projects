import { Card, CardContent, CardHeader } from '@/shared/ui/card/Card'
import { Skeleton } from '@/shared/ui/skeleton'

export function QuickStatsSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-[100px]" />
      </CardHeader>
      <CardContent className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-4 w-[80px]" />
            <Skeleton className="h-8 w-[60px]" />
            <Skeleton className="h-2 w-full" />
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
