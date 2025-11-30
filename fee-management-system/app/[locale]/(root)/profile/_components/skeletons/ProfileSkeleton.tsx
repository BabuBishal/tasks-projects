import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card/Card";

export function ProfileSkeleton() {
  return (
    <div className="w-full h-full flex flex-col gap-8 pb-8">
      {/* Header */}
      <div className="space-y-2">
        <Skeleton className="h-10 w-[200px]" />
        <Skeleton className="h-4 w-[300px]" />
      </div>

      {/* Profile Summary Card */}
      <Card>
        <CardContent className="p-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <Skeleton className="w-28 h-28 rounded-full" />
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
          <Skeleton className="h-7 w-[200px] mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex items-start gap-4">
                <Skeleton className="w-12 h-12 rounded-xl" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-4 w-[100px]" />
                  <Skeleton className="h-6 w-[200px]" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
