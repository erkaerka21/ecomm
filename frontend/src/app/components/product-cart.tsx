"use client";
import React from "react";
import { Heart } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

const ProductCart = ({
  name,
  price,
  image,
}: {
  name: string;
  price: number;
  image: string;
}) => {
  return (
    <div>
      <Card className="border-gray-400 border-2">
        <CardContent>
          <Heart />
          <img src={image} className="" />
        </CardContent>
        <CardFooter className="flex flex-col">
          <h1>{name}</h1>
          <h1>{price}</h1>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProductCart;
