"use client";

import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useUser } from "./user-provider";
import { useParams } from "next/navigation";

interface CardMy {
  _id: string;
  user: string;
  products: [{ product: string; quantity: number }];
  totalAmount: number;
}
interface ContextCard {
  myCard: CardMy | null;
  setMyCard: React.Dispatch<React.SetStateAction<CardMy | null>>;
  fetchCard: () => Promise<void>;
}

export const CardContext = createContext<ContextCard>({
  myCard: null,
  setMyCard: () => {},
  fetchCard: async () => {},
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
        setMyCard(response.data.getMyCard);
        console.log("my cardiin datag harah", response.data.getMyCard);
      }
    } catch (error) {
      console.error("something wrong in fetching mycard", error);
    }
  };
  useEffect(() => {
    fetchCard();
  }, [token]);
  return (
    <CardContext.Provider value={{ myCard, setMyCard, fetchCard }}>
      {children}
    </CardContext.Provider>
  );
};

export const useMyCard = () => {
  return useContext(CardContext);
};
export default CardProvider;
