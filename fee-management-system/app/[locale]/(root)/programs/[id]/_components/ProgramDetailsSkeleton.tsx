import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card/Card";
import { Breadcrumb } from "@/components/ui/breadcrumb/Breadcrumb";

export function ProgramDetailsSkeleton() {
  return (
    <div className="w-full h-full flex flex-col gap-6">
      <Breadcrumb
        items={[
          { label: "Programs", href: "/programs" },
          { label: "Loading...", href: "#" },
        ]}
      />

      {/* Header Skeleton */}
      <div className="flex justify-between items-end gap-5">
        <div className="space-y-2">
          <Skeleton className="h-8 w-[250px]" />
          <Skeleton className="h-5 w-[350px]" />
        </div>
        <Skeleton className="h-10 w-[180px]" />
      </div>

      {/* Fee Structure List Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i} className="border-l-4 border-l-muted">
            <CardContent className="p-5 space-y-4">
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <Skeleton className="h-3 w-[100px]" />
                  <Skeleton className="h-6 w-[150px]" />
                </div>
                <Skeleton className="h-5 w-[60px] rounded-full" />
              </div>

              <div className="pt-4 border-t border-border/50 space-y-3">
                <div className="flex justify-between items-center">
                  <Skeleton className="h-4 w-[80px]" />
                  <Skeleton className="h-4 w-[60px]" />
                </div>

                <div className="flex justify-between items-center pt-2 border-t border-dashed border-border/50">
                  <Skeleton className="h-4 w-[70px]" />
                  <Skeleton className="h-6 w-[100px]" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
