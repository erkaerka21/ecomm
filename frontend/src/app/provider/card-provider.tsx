"use client";

import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useUser } from "./user-provider";
import { useParams } from "next/navigation";
import { toast } from "@/hooks/use-toast";

interface CardMy {
  _id: string;
  user: string;
  products: [{ product: string; quantity: number; price: number }];
  totalAmount: number;
}
interface ContextCard {
  myCard: CardMy | null;
  setMyCard: React.Dispatch<React.SetStateAction<CardMy | null>>;
  fetchCard: () => Promise<void>;
  deleteProductFromCart: () => Promise<void>;
  changeCartsProductsQuantity: () => Promise<void>;
}

export const CardContext = createContext<ContextCard>({
  myCard: null,
  setMyCard: () => {},
  fetchCard: async () => {},
  deleteProductFromCart: async () => {},
  changeCartsProductsQuantity: async () => {},
});

const CardProvider = ({ children }: { children: React.ReactNode }) => {
  const [myCard, setMyCard] = useState<CardMy | null>(null);
  const [token, setToken] = useState("");
  const { user } = useUser();
  const params = useParams();
  const fetchCard = async () => {
    try {
      const token = localStorage.getItem("token");
      setToken(token || "");
      const response = await axios.get(
        `http://localhost:9000/api/v1/cart/usercart`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.status === 200) {
        setMyCard(response.data.getMyCard);
        console.log("my cardiin datag harah", response.data.getMyCard);
      }
    } catch (error) {
      console.error("something wrong in fetching mycard", error);
    }
  };
  const deleteProductFromCart = async (productId: string) => {
    const usertoken = localStorage.getItem("token");
    try {
      const response = await axios.delete(
        `http://localhost:9000/api/v1/cart/delete-from-cart/${params.productId}`,
        { headers: { Authorization: `Bearer ${usertoken}` } }
      );
      if (response.status === 200) {
        console.log("cart dotorh productuudiig ustgasan");
        toast({
          description: "тус бүтээгдэхүүнийг сагснаас амжилттай устгалаа.",
        });
      }
    } catch (error) {
      console.error("something wrong in delete product from my card", error);
      toast({
        variant: "destructive",
        description: "утс бүтээгдэхүүнийг утсгахад ямар нэгэн алдаа гарлаа.",
      });
    }
  };
  // const changeCartsProductsQuantity = async (
  //   id: any,
  //   productId: string,
  //   quantity: number
  // ) => {
  //   setMyCard((previousMyCard: any) =>
  //     previousMyCard.map((oneItem: any) =>
  //       oneItem.product._id === productId ? { ...oneItem, quantity } : oneItem
  //     )
  //   );
  //   try {
  //     const token = localStorage.getItem("token");
  //     const response = await axios.put(
  //       "http://localhost:9000/api/v1/cart/change-quantity/${params.productId}",
  //       {},
  //       { headers: { Authorization: `Bearer ${token}` } }
  //     );
  //     if (response.status === 200) {
  //       console.log("cart dotorh productuudiin toog uurchilsun.");
  //       toast({
  //         description: "сагс дахь тус бүтээгдэхүүний тоог өөрчилсөн.",
  //       });
  //     }
  //   } catch(error) {
  //     console.error("бүтээгдэхүүний тоог өөрчилөхөд ямар нэгэн алдаа гарлаа", error);
  //     toast({
  //       variant: "destructive",
  //       description: "бүтээгдэхүүний тоог өөрчилөхөд ямар нэгэн алдаа гарлаа.",
  //     });
  //   }}
  // };
  useEffect(() => {
    fetchCard();
  }, [token]);
  return (
    <CardContext.Provider
      value={{ myCard, setMyCard, fetchCard, deleteProductFromCart }}
    >
      {children}
    </CardContext.Provider>
  );
};

export const useMyCard = () => {
  return useContext(CardContext);
};
export default CardProvider;
