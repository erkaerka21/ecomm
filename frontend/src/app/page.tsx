"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [count, setCount] = useState<number>(0);
  const nemeh = () => {
    setCount(count + 1);
  };
  const hasah = () => {
    setCount(count - 1);
  };
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-4xl font-bold">welcome first typesc</h1>

      <div className="flex flex-row">
        <Button onClick={nemeh}>+</Button>
        <p className="text-4xl">{count}</p>
        <Button onClick={hasah}>-</Button>
      </div>
    </div>
  );
}
