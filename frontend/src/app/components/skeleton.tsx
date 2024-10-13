"use client";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonCard() {
  return (
    <div>
      <Card className="border-gray-400 border">
        <CardContent className="relative">
          <Skeleton />
        </CardContent>
        <CardFooter className="flex flex-col">
          <Skeleton />
          <Skeleton />
        </CardFooter>
      </Card>
    </div>
  );
}
