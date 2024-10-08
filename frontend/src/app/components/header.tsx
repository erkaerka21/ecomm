"use client";
import { Input } from "@/components/ui/input";
import React from "react";
import { IoSearch } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useUser } from "../provider/user-provider";
import { FaRegUser } from "react-icons/fa";

const Header = () => {
  const { user } = useUser();
  console.log("nevtersen useriig harah:", user);
  return (
    <div className="bg-black flex flex-row justify-between items-center px-6 py-3">
      <div className="text-white flex flex-row gap-x-7 items-center">
        <Link href="/">
          <div className="flex flex-row items-center gap-x-1">
            <img src="/pinelogo.png" className="h-[4vh]" />
            <h1 className="font-bold">ECOMMERCE</h1>
          </div>
        </Link>
        <Link href="/categories">
          <h2 className="text-gray-400">Ангилал</h2>
        </Link>
      </div>

      <label className="relative flex flex-row items-center">
        <IoSearch className="h-[4vh] text-white absolute left-2"></IoSearch>
        <Input
          className="placeholder-gray-200 bg-gray-700 text-white"
          placeholder="Бүтээгдэхүүн хайх"
        />
      </label>

      <div className="flex flex-row items-center gap-x-5">
        <FaHeart className="text-white" />
        <Link href={`/shoppingcart/`}>
          <FaShoppingCart className="text-white" />
        </Link>
        {!user && (
          <div className="flex flex-row gap-x-2">
            <Link href="/signup">
              <Button className=" h-8 rounded-2xl bg-transparent border-2 border-blue-600">
                Бүртгүүлэх
              </Button>
            </Link>
            <Link href="/signin">
              <Button className="bg-blue-600 h-8 rounded-2xl">Нэвтрэх</Button>
            </Link>
          </div>
        )}
        {user && (
          <div className="flex flex-row gap-x-2">
            <FaRegUser className="text-white text-xl" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
