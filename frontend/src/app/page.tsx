"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState } from "react";
import Products from "./(main)/products/page";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <Products />
    </div>
  );
}
