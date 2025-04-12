import { Card, Skeleton } from "@heroui/react";

export default function SkeletonCard() {
  return (
    <Card className="h-full space-y-4 p-4 rounded-lg shadow-md">
      <Skeleton className="rounded-lg">
        <div className="h-40 rounded-lg bg-default-300" />
      </Skeleton>
      <div className="space-y-3">
        <Skeleton className="w-3/5 rounded-lg">
          <div className="h-4 bg-default-200" />
        </Skeleton>
        <Skeleton className="w-4/5 rounded-lg">
          <div className="h-4 bg-default-200" />
        </Skeleton>
        <Skeleton className="w-2/5 rounded-lg">
          <div className="h-4 bg-default-300" />
        </Skeleton>
      </div>
    </Card>
  );
}

  