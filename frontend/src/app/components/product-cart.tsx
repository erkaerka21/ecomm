"use client";
import React from "react";
import { Heart } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Link from "next/link";

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
      <Card className="border-gray-400 border">
        <CardContent className="relative">
          <Heart className="absolute top-[2vh] right-[1.5vw] text-red-500" />
          <img
            src={image}
            className="rounded-lg h-[60vh] w-full object-cover"
          />
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
