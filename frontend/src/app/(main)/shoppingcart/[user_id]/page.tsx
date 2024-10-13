"use client";

import { useMyCard } from "@/app/provider/card-provider";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const ShoppingCart = () => {
  const { myCard } = useMyCard();
  console.log("mycard iig harah", myCard);

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>1.Миний сагс()</CardTitle>
        </CardHeader>
        <CardContent></CardContent>
        <CardFooter></CardFooter>
      </Card>
    </div>
  );
};

export default ShoppingCart;
