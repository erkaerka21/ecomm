"use client";
import React, { useState } from "react";
import { Heart } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Link from "next/link";

const ProductCart = ({
  name,
  price,
  image,
  id,
  discount,
  priceWithDiscount,
}: {
  name: string;
  price: number;
  image: string;
  id: string;
  discount: number;

  priceWithDiscount: number;
}) => {
  const [wishListiinToo, setWishListiinToo] = useState(0);
  const wishlist = () => {
    // localStorage.setItem("wishlist", wishlist);
    console.log("productiin id iig harah", wishListiinToo);
  };
  return (
    <div className="">
      <Card className="border-gray-400 border">
        <CardContent className="relative">
          <Heart
            className="absolute top-[2vh] right-[1.5vw] text-red-500"
            id={id}
            // onClick={() => {
            //   setWishListiinToo(id);
            // }}
          />
          <img
            src={image}
            className="rounded-lg h-[60vh] w-full object-cover"
          />
        </CardContent>
        <CardFooter className="flex flex-col">
          <h1 className="text-lg">{name}</h1>
          {discount === 0 && (
            <div>
              <h1 className="font-bold text-xl">{price}₮</h1>
            </div>
          )}
          {discount !== 0 && (
            <div className="flex flex-row gap-x-5 items-center">
              <h1 className="font-bold text-xl">{priceWithDiscount}₮</h1>
              <p className="text-gray-500 line-through">{price}₮</p>
              <h1 className="font-bold text-xl text-red-500">{discount}%</h1>
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProductCart;
