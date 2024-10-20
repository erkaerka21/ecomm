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
  length: number;
}
interface ContextCard {
  myCard: CardMy | null;
  setMyCard: React.Dispatch<React.SetStateAction<CardMy | null>>;
  fetchCard: () => Promise<void>;
  deleteProductFromCart: (productId: string) => Promise<void>;
  changeCartsProductsQuantity: (
    productId: string,
    quantity: number
  ) => Promise<void>;
}

export const CardContext = createContext<ContextCard>({
  myCard: null,
  setMyCard: () => {},
  fetchCard: async () => {},
  deleteProductFromCart: async (productId) => {},
  changeCartsProductsQuantity: async (productId, quantity) => {},
});

const CardProvider = ({ children }: { children: React.ReactNode }) => {
  const [myCard, setMyCard] = useState<CardMy | null>(null);
  const [token, setToken] = useState("");

  const fetchCard = async () => {
    try {
      const token = localStorage.getItem("token");
      setToken(token || "");
      const response = await axios.get(
        `http://localhost:9000/api/v1/cart/usercart`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.status === 200) {
        setMyCard(response.data.getMyCard.products);
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
        `http://localhost:9000/api/v1/cart/delete-from-cart/${productId}`,
        { headers: { Authorization: `Bearer ${usertoken}` } }
      );
      if (response.status === 200) {
        console.log("cart dotorh productuudiig ustgasan");
        toast({
          description: "тус бүтээгдэхүүнийг сагснаас амжилттай устгалаа.",
        });
        await fetchCard();
      }
    } catch (error) {
      console.error("something wrong in delete product from my card", error);
      toast({
        variant: "destructive",
        description: "утс бүтээгдэхүүнийг утсгахад ямар нэгэн алдаа гарлаа.",
      });
    }
  };
  const changeCartsProductsQuantity = async (
    productId: string,
    quantity: number
  ) => {
    setMyCard((previousMyCard: any) =>
      previousMyCard?.map((oneItem: any) =>
        oneItem.product._id === productId ? { ...oneItem, quantity } : oneItem
      )
    );
    try {
      const dtoken = localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:9000/api/v1/cart/change-quantity/${productId}`,
        { productId, quantity },
        { headers: { Authorization: `Bearer ${dtoken}` } }
      );
      if (response.status === 200) {
        console.log("cart dotorh productuudiin toog uurchilsun.");
        toast({
          description: "сагс доторхи тус бүтээгдэхүүний тоог өөрчилсөн.",
        });
      }
    } catch (error) {
      console.error(
        "бүтээгдэхүүний тоог өөрчилөхөд ямар нэгэн алдаа гарлаа",
        error
      );
      toast({
        variant: "destructive",
        description: "бүтээгдэхүүний тоог өөрчилөхөд ямар нэгэн алдаа гарлаа.",
      });
    }
  };
  useEffect(() => {
    fetchCard();
  }, [token]);

  return (
    <CardContext.Provider
      value={{
        myCard,
        setMyCard,
        fetchCard,
        deleteProductFromCart,
        changeCartsProductsQuantity,
      }}
    >
      {children}
    </CardContext.Provider>
  );
};

export const useMyCard = () => {
  return useContext(CardContext);
};
export default CardProvider;
