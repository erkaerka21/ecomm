"use client";

import CardsCart from "@/app/components/card-cart";
import { useMyCard } from "@/app/provider/card-provider";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const ShoppingCart = () => {
  const { myCard }: any = useMyCard();
  console.log("mycard iig harah", myCard);
  const quantities = myCard?.products.map((pro: any) => pro.quantity);
  console.log("quantitynuudiig harah", quantities);
  const prices = myCard?.products.map((pro: any) => pro.product.price);
  console.log("priceuudiig harah", prices);
  return (
    <div className="flex flex-row justify-center">
      <Card className="w-1/2">
        <CardHeader className="text-center my-3">
          <CardTitle>1.Миний сагс()</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          {myCard?.products.map((product: any) => (
            <CardsCart
              image={product.product.images[0]}
              productName={product.product.name}
              productPrice={product.product.price}
              productQuantity={product.quantity}
            />
          ))}
        </CardContent>
        <CardFooter className=" flex flex-col justify-center">
          <CardContent className="w-[90%] flex flex-row justify-between">
            <p className="text-xl font-semibold">Нийт төлөх дүн : </p>
            <p>{}₮</p>
          </CardContent>
          <Button className="bg-blue-600 rounded-3xl">Худалдан авах</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ShoppingCart;
