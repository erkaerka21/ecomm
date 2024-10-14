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
  productQuantity,
}: {
  image: string;
  productName: string;
  productPrice: string;
  productQuantity: number;
}) => {
  return (
    <div className=" rounded-2xl w-[90%] mb-8">
      <Card className="flex flex-row rounded-2xl bg-white border border-gray-400 h-[20vh] ">
        <CardHeader className="flex flex-row items-center">
          <img
            src={image}
            className="rounded-2xl h-[90%] w-full object-cover"
          />
        </CardHeader>
        <CardContent>
          <CardTitle>{productName}</CardTitle>
          <p>{productQuantity}</p>
        </CardContent>
        <CardFooter>{productPrice}₮</CardFooter>
      </Card>
    </div>
  );
};
export default CardsCart;
