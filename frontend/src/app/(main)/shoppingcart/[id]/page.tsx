"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axios from "axios";
import { useParams } from "next/navigation";
import { useState } from "react";

const ShoppingCart = () => {
  const params = useParams();
  type MyCard = any;
  const [myCard, setMyCard] = useState<MyCard>([]);
  const getMyCard = async () => {
    try {
      const response = await axios.get("");
    } catch {}
  };
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>1.Миний сагс()</CardTitle>
        </CardHeader>
        <CardContent></CardContent>
        <CardFooter></CardFooter>
      </Card>
    </div>
  );
};

export default ShoppingCart;
