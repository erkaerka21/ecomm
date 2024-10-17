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
import _ from "lodash";
import { useEffect } from "react";
export const getDiscountedPrice = (price: number, discount: number) => {
  return price - (price * discount) / 100;
};
const perTotalPrice = (quantity: number, perPrice: number) => {
  return quantity * perPrice;
};
const ShoppingCart = () => {
  const { myCard }: any = useMyCard();
  console.log("shopping cart dotorh mycardiig harah", myCard);
  // console.log("mycard iig harah", myCard);
  // const quantities = myCard?.products.map((pro: any) => pro.quantity);
  // console.log("quantitynuudiig harah", quantities);

  const perTotalPrices: number[] = myCard?.map((pro: any) =>
    perTotalPrice(
      pro.quantity,
      getDiscountedPrice(pro.product.price, pro.product.discount)
    )
  );

  const totalPrice = _.sum(perTotalPrices);

  // useEffect(() => {
  //   deleteProductFromCart;
  // }, [myCard]);
  return (
    <div className="flex flex-row justify-center">
      <Card className="w-1/2">
        <CardHeader className="text-center my-3">
          <CardTitle>1.Миний сагс()</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          {myCard?.map((product: any) => (
            <CardsCart
              image={product.product.images[0]}
              productName={product.product.name}
              productPrice={getDiscountedPrice(
                product.product.price,
                product.product.discount
              )}
              productQuantity={product.quantity}
              perTotalPrice={perTotalPrice(
                product.quantity,
                getDiscountedPrice(
                  product.product.price,
                  product.product.discount
                )
              )}
              productId={product.product._id}
            />
          ))}
        </CardContent>
        <CardFooter className=" flex flex-col justify-center">
          <CardContent className="w-[90%] flex flex-row justify-between">
            <p className="text-xl font-semibold">Нийт төлөх дүн : </p>
            <p className="text-2xl font-bold">{totalPrice}₮</p>
          </CardContent>
          <Button className="bg-blue-600 rounded-3xl">Худалдан авах</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ShoppingCart;
