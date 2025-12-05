import { Card, CardContent, CardHeader } from '@/shared/ui/card/Card'
import { Skeleton } from '@/shared/ui/skeleton'

export function QuickActionsSkeleton() {
  return (
    <Card className="h-full">
      <CardHeader>
        <Skeleton className="h-6 w-[120px]" />
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-4">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-20 w-full rounded-lg" />
        ))}
      </CardContent>
    </Card>
  )
}
