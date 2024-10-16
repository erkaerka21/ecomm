"use client";

import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useUser } from "./user-provider";
import { useParams } from "next/navigation";

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
}

export const CardContext = createContext<ContextCard>({
  myCard: null,
  setMyCard: () => {},
  fetchCard: async () => {},
  deleteProductFromCart: async () => {},
});

const CardProvider = ({ children }: { children: React.ReactNode }) => {
  const [myCard, setMyCard] = useState<CardMy | null>(null);
  const [token, setToken] = useState("");
  const { user } = useUser();
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
  const deleteProductFromCart = async () => {
    try {
      const response = await axios.delete(
        "http://localhost:9000/api/v1/cart/delete-product",
        {
          user: user?._id,
          productId: myCard?.products.map((oneItem) => oneItem.product._id),
        }
      );
    } catch {}
  };
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
