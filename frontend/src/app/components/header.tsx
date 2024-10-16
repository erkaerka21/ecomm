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
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { IoSettingsOutline } from "react-icons/io5";
import { VscSignOut } from "react-icons/vsc";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

const Header = () => {
  // const router = useRouter();
  // const { toast } = useToast();
  const { user, signOut } = useUser();
  console.log("nevtersen useriig harah --- header dotor bga:", user);
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
        <Link href={`/shoppingcart/${user?._id}`}>
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
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-transparent">
                  <FaRegUser className="text-white text-xl" />
                </Button>
              </DialogTrigger>
              <DialogContent className="w-1/4">
                <Table>
                  <TableBody className="">
                    <TableRow className="">
                      <TableCell className="font-bold">
                        {user.firstname}
                      </TableCell>
                      <TableCell className="flex flex-col items-center">
                        <img
                          src={user.profile_image}
                          className="rounded-full w-[3vw]"
                        />
                      </TableCell>
                    </TableRow>

                    <TableRow className="">
                      <TableCell>Хэрэглэгчийн мэдээлэл засах</TableCell>
                      <TableCell className="flex flex-col items-center">
                        <IoSettingsOutline />
                      </TableCell>
                    </TableRow>
                    <TableRow className="" onClick={signOut}>
                      <TableCell>Системээс гарах</TableCell>
                      <TableCell className="flex flex-col items-center">
                        <VscSignOut />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </DialogContent>
            </Dialog>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
