import { Card, CardContent, CardHeader } from "@/components/ui/card/Card";
import { Skeleton } from "@/components/ui/skeleton";

export function AlertSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-[180px]" />
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="flex items-start gap-3 p-3 border rounded-lg"
            >
              <Skeleton className="h-10 w-10 rounded-lg" />
              <div className="flex-1 space-y-2">
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-[120px]" />
                  <Skeleton className="h-5 w-[80px]" />
                </div>
                <Skeleton className="h-3 w-[200px]" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
