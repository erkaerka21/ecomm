"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
const Passwordrecovery = () => {
  const { toast } = useToast();
  const param = useSearchParams();
  const [password, setPassword] = useState("");
  const [repassword, setRePassword] = useState("");
  const verifyNewPassword = async () => {
    if (!(password === repassword)) {
      console.log("nuuts uguud tohirohgui baina");
      toast({
        variant: "destructive",
        description: "Таны оруулсан нууц үгүүд хоорондоо тохирохгүй байна.",
      });
      return;
    }
    const response = await axios.post(
      "http://localhost:9000/api/v1/auth/recreate-password",
      {
        password,
      }
    );
    if (response.status === 200) {
      toast({ description: "Хэрэглэгчийн нууц үгийг амжилттай шинэчлэлээ." });
    }
    console.log("reseted token", param.get("resetTokenCode"));
    console.log("emailiig harah", param.get("email"));
  };
  return (
    <div className="flex justify-center">
      <div className="w-[35vw] my-[18vh]">
        <Card className="justify-center  px-10 pb-5">
          <CardHeader className="items-center">
            <CardTitle className="">Нууц үг сэргээх</CardTitle>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid grid-rows-2 w-full gap-y-4">
                <Input
                  className="bg-gray-300 placeholder:text-gray-800"
                  type="password"
                  id="password"
                  placeholder="Шинэ нууц үг"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span className="hidden"></span>
                <Input
                  className="bg-gray-300 placeholder:text-gray-800"
                  type="password"
                  id="repassword"
                  placeholder="Шинэ нууц үг давтах"
                  onChange={(e) => setRePassword(e.target.value)}
                />
                <span className="hidden"></span>
              </div>
            </form>
            <div className="mt-4">
              <ul className="list-disc pl-8">
                <li>Том үсэг орсон байх</li>
                <li>Жижиг үсэг орсон байх</li>
                <li>Тоо орсон байх</li>
                <li>Тэмдэгт орсон байх</li>
              </ul>
            </div>
          </CardContent>

          <CardFooter className="flex-col space-y-5">
            <Button
              className="bg-blue-600 rounded-2xl w-full text-lg"
              onClick={verifyNewPassword}
            >
              нууц үг үүсгэх
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Passwordrecovery;
