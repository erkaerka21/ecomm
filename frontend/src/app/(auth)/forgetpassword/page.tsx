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
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import axios from "axios";
import { uRL_AUTH_api } from "@/utils/util";
const ForgetPassword = () => {
  const { toast } = useToast();
  const [userDataForgetPass, setUserDataForgetPass] = useState({ email: "" });
  const router = useRouter();
  const forgetPass = async () => {
    const { email } = userDataForgetPass;
    try {
      const response = await axios.post(`${uRL_AUTH_api}/forgetpassword`, {
        email,
      });
      if (response.status === 200) {
        toast({ description: "Цахим шуудан руу нэг удаагийн кодыг илгээлээ" });
        router.push("/otpcode");
      }
    } catch (error) {
      console.error(
        "Цахим шуудан руу нэг удаагийн код илгээхэд алдаа гарлаа",
        error
      );
      toast({
        variant: "destructive",
        description: "Нэг удаагийн код илгээхэд алдаа гарлаа",
      });
    }
  };
  return (
    <div className="flex justify-center">
      <div className="w-[30vw] my-[18vh]">
        <Card className="justify-center">
          <CardHeader className="items-center">
            <CardTitle className="">Нууц үг сэргээх</CardTitle>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid grid-rows-1 w-full gap-y-4">
                <Input
                  className="bg-gray-300 placeholder:text-gray-800"
                  value={userDataForgetPass.email}
                  id="email"
                  placeholder="Цахим шуудангийн хаяг оруулах"
                  onChange={(e) =>
                    setUserDataForgetPass({
                      ...userDataForgetPass,
                      email: e.target.value,
                    })
                  }
                />
                <span className="hidden"></span>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex-col space-y-5">
            <Button
              className=" bg-blue-600 rounded-2xl w-full"
              onClick={forgetPass}
            >
              Нэг удаагийн код илгээх
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default ForgetPassword;
