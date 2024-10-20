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
import { IoSettingsOutline } from "react-icons/io5";
import { VscSignOut } from "react-icons/vsc";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { useMyCard } from "../provider/card-provider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FaCartArrowDown } from "react-icons/fa6";
import { FaUserCog } from "react-icons/fa";

const Header = () => {
  // const router = useRouter();
  // const { toast } = useToast();
  const { user, signOut } = useUser();
  const { myCard } = useMyCard();
  console.log("nevtersen useriig harah --- header dotor bga:", user, myCard);
  // const signOut = async () => {
  //   localStorage.removeItem("token");

  //   toast({ description: "Хэрэглэгч та системээс амжилттай гарлаа." });
  //   router.push("/");
  // };
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
        <Link href={"/shoppingcart"}>
          {!myCard ? (
            <FaShoppingCart className="text-white" />
          ) : (
            <div className="relative">
              <FaShoppingCart className="text-white" />
              <p className=" h-4 w-4 absolute text-white bottom-2 left-3 bg-red-400 border border-red-400 rounded-full flex flex-row items-center justify-center text-xs font-semibold">
                {myCard?.length}
              </p>
            </div>
          )}
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="bg-transparent">
                <FaRegUser className="text-white text-xl" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel className="flex flex-row justify-between items-center">
                <p className="font-bold">{user.firstname}</p>
                <img
                  src={user.profile_image}
                  className="rounded-full w-[3vw]"
                />
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem className="flex flex-row justify-between items-center">
                  <p>Хэрэглэгчийн мэдээлэл</p>
                  <FaUserCog />
                </DropdownMenuItem>
                <DropdownMenuItem className="flex flex-row justify-between items-center">
                  <p>Захиалгын түүх</p>
                  <FaCartArrowDown />
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={signOut}
                className="flex flex-row justify-between items-center"
              >
                <p>Системээс гарах</p>
                <VscSignOut />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
};

export default Header;
