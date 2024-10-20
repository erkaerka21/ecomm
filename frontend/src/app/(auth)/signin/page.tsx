"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { useUser } from "@/app/provider/user-provider";

const Signin = () => {
  const { fetchUser } = useUser();
  const { toast } = useToast();
  const [userData, setUserData] = useState({ email: "", password: "" });
  const router = useRouter();
  const signIn = async () => {
    const { email, password } = userData;
    try {
      const response = await axios.post(
        "http://localhost:9000/api/v1/auth/signin",
        {
          email: email,
          password: password,
        }
      );
      if (response.status === 200) {
        toast({ description: "Та амжилттай нэвтэрлээ" });
        const { token } = response.data;
        console.log("login token iig harah", response.data);
        localStorage.setItem("token", token);
        await fetchUser();
        router.push("/categories");
      }
    } catch (error) {
      console.error(
        "хэрэглэгчийн цахим шуудангийн хаяг эсвэл нууц үг алдаатай байна.",
        error
      );
      toast({
        variant: "destructive",
        title: "Алдаатай хүсэлт",
        description:
          "хэрэглэгчийн цахим шуудангийн хаяг эсвэл нууц үг алдаатай байна.",
      });
    }
  };
  console.log("signinii user datanuudiig harah", userData);

  return (
    <div className="flex flex-row justify-center">
      <div className="w-[35vw] my-[18vh]">
        <Card className="justify-center px-10 pb-5">
          <CardHeader className="items-center">
            <CardTitle className="">Нэвтрэх</CardTitle>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid grid-rows-2 w-full gap-y-4">
                <Input
                  className="bg-gray-300 placeholder:text-gray-800"
                  id="email"
                  value={userData.email}
                  placeholder="Цахим шуудангийн хаяг"
                  onChange={(e) =>
                    setUserData({ ...userData, email: e.target.value })
                  }
                />
                <span className="hidden"></span>
                <Input
                  className="bg-gray-300 placeholder:text-gray-800"
                  type="password"
                  id="password"
                  value={userData.password}
                  placeholder="Нууц үг"
                  onChange={(e) =>
                    setUserData({ ...userData, password: e.target.value })
                  }
                />
                <span className="hidden"></span>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex-col space-y-2">
            <Button
              className=" bg-blue-600 rounded-2xl w-full"
              onClick={signIn}
            >
              Нэвтрэх
            </Button>
            <Link href="/forgetpassword/enter-email">
              <p className="text-gray-500 underline">Нууц үг мартсан</p>
            </Link>

            <Button
              variant="outline"
              className="text-blue-600 rounded-2xl border-blue-600 w-full"
            >
              Бүртгүүлэх
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Signin;
