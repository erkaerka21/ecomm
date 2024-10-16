"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CiCirclePlus } from "react-icons/ci";
import { CiCircleMinus } from "react-icons/ci";
import { useMyCard } from "../provider/card-provider";
import axios from "axios";
import { useUser } from "../provider/user-provider";
import { useToast } from "@/hooks/use-toast";
import { MdDeleteForever } from "react-icons/md";

const CardsCart = ({
  image,
  productName,
  productPrice,
  productQuantity,
  perTotalPrice,
}: {
  image: string;
  productName: string;
  productPrice: number;
  productQuantity: number;
  perTotalPrice: number;
}) => {
  const { toast } = useToast();
  const { myCard, setMyCard, deleteProductFromCart } = useMyCard();
  const { user } = useUser();
  const changeQuantity = async (
    user: any,
    productId: string,
    quantity: number
  ) => {
    setMyCard((previousMyCard: any) =>
      previousMyCard.map((oneItem: any) =>
        oneItem.product._id === productId ? { ...oneItem, quantity } : oneItem
      )
    );
    try {
      const response = await axios.put(
        "http://localhost:9000/api/v1/cart/change-quantity",
        { user: user._id, productId, quantity: quantity }
      );
      if (response.status === 200) {
        toast({ description: "Тус барааны ширхэгийг амжилттай өөрчиллөө" });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast({
        variant: "destructive",
        description:
          "Тус барааны тоо ширхэгийг өөрчилөхөд ямар нэгэн алдаа гарлаа",
      });
    }
  };
  return (
    <div className=" rounded-2xl w-[90%] mb-8">
      <Card className="flex flex-row justify-between items-center rounded-2xl bg-white border border-gray-400 h-[20vh] ">
        <CardHeader className="flex flex-row items-center w-1/5 h-4/5">
          <img
            src={image}
            className="rounded-2xl max-h-fit min-w-full object-cover"
          />
        </CardHeader>
        <CardContent className="flex flex-col justify-center items-center gap-y-2">
          <CardTitle className="text-2xl">{productName}</CardTitle>
          <div className="flex flex-row items-center text-xl">
            <CiCircleMinus
            // onClick={() => {
            //   changeQuantity();
            // }}
            />
            <p>{productQuantity}</p>
            <CiCirclePlus />
          </div>
          <p className="text-lg font-medium">{perTotalPrice}₮</p>
        </CardContent>
        <CardFooter className="w-1/5  flex flex-row justify-center items-center">
          <MdDeleteForever
            className="text-4xl text-red-500"
            onClick={deleteProductFromCart}
          />
        </CardFooter>
      </Card>
    </div>
  );
};
export default CardsCart;
