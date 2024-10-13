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
  fetchCard: object;
}

export const CardContext = createContext<ContextCard>({
  myCard: null,
  setMyCard: () => {},
  fetchCard: () => {},
});

const CardProvider = ({ children }: { children: React.ReactNode }) => {
  const [myCard, setMyCard] = useState<CardMy | null>(null);
  const { user } = useUser();
  const fetchCard = async () => {
    try {
      const response = await axios.get(
        `http://localhost:9000/api/v1/card/${user?._id}`
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
  }, [myCard]);
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
