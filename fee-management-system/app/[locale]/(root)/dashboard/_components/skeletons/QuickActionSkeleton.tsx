import { Card, CardContent, CardHeader } from "@/components/ui/card/Card";
import { Skeleton } from "@/components/ui/skeleton";

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
  );
}
