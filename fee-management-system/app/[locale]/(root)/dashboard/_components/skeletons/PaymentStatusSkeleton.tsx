import { Card, CardContent, CardHeader } from "@/components/ui/card/Card";
import { Skeleton } from "@/components/ui/skeleton";

export function PaymentStatusSkeleton() {
  return (
    <Card className="h-full">
      <CardHeader>
        <Skeleton className="h-6 w-[150px]" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Skeleton className="h-3 w-3 rounded-full" />
                <Skeleton className="h-4 w-[100px]" />
              </div>
              <Skeleton className="h-4 w-[50px]" />
            </div>
          ))}
          <Skeleton className="h-2 w-full mt-4" />
        </div>
      </CardContent>
    </Card>
  );
}
