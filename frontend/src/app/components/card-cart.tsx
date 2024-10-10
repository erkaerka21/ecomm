"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
const CardsCart = ({
  image,
  productName,
  productPrice,
}: {
  image: string;
  productName: string;
  productPrice: string;
}) => {
  return (
    <div>
      <Card className="flex flex-row">
        <CardHeader>
          <img src={image} />
        </CardHeader>
        <CardContent>
          <CardTitle>{productName}</CardTitle>
        </CardContent>
        <CardFooter>{productPrice}</CardFooter>
      </Card>
    </div>
  );
};
export default CardsCart;
