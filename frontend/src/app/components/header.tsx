import { Input } from "@/components/ui/input";
import React from "react";
import { IoSearch } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Header = () => {
  return (
    <div className="bg-black flex flex-row justify-between items-center px-6 py-3">
      <div className="text-white flex flex-row gap-x-7">
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

      <label className="relative">
        <IoSearch className="h-[4vh] text-white absolute left-2 bottom-[0.005px]"></IoSearch>
        <Input
          className="placeholder-gray-200 bg-gray-700"
          placeholder="Бүтээгдэхүүн хайх"
        />
      </label>

      <div className="flex flex-row items-center gap-x-5">
        <FaHeart className="text-white" />
        <FaShoppingCart className="text-white" />
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
      </div>
    </div>
  );
};

export default Header;
