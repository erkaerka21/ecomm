"use client";
import React from "react";
import { Heart } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Link from "next/link";

const ProductCart = ({
  name,
  price,
  images,
}: {
  name: string;
  price: number;
  images: [string];
}) => {
  return (
    <div>
      <Link href="">
        <Card className="border-gray-400 border">
          <CardContent className="relative">
            <Heart className="absolute top-[2vh] right-[1.5vw]" />
            <img src={images[0]} className="rounded-lg h-[60vh] object-cover" />
          </CardContent>
          <CardFooter className="flex flex-col">
            <h1>{name}</h1>
            <h1>{price}</h1>
          </CardFooter>
        </Card>
      </Link>
    </div>
  );
};

export default ProductCart;
