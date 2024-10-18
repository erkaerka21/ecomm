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
import axios from "axios";
import { uRL_AUTH_api } from "@/utils/util";
import { useRouter } from "next/navigation";

const Signup = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [userData, setUserData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    rePassword: "",
    phoneNumber: "",
  });
  const signUp = async () => {
    const { firstname, lastname, email, password, rePassword, phoneNumber } =
      userData;
    if (password !== rePassword) {
      console.log("нууц үгүүд хоорондоо зөрсөн байна.");
      toast({
        variant: "destructive",
        title: "Бөглөсөн мэдээлэл алдаатай байна.",
        description: "Хэрэглэгчийн нууц үгүүд хоорондоо тохирохгүй байна.",
      });
    }
    try {
      const resp = await axios.post(
        "http://localhost:9000/api/v1/auth/signup",
        {
          firstname,
          lastname,
          email,
          password,
          phoneNumber,
        }
      );
      if (resp.status === 201) {
        toast({
          description: "Хэрэглэгчийг амжилттай бүртгэлээ.",
        });
        router.push("/signin");
      }
    } catch (error) {
      toast({
        variant: "destructive",

        description: "error алдаа гарлаа.",
      });
      console.error("aldaa garlaa", error);
    }
  };
  console.log("signup userdatagiin utguud", userData);

  return (
    <div className="flex justify-center">
      <div className="w-[30vw] my-[18vh]">
        <Card className="justify-center">
          <CardHeader className="items-center">
            <CardTitle className="">Бүртгүүлэх</CardTitle>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid grid-rows-4 w-full gap-y-4">
                <Input
                  className="bg-gray-300 placeholder:text-gray-800"
                  id="name"
                  placeholder="Нэр"
                  value={userData.firstname}
                  onChange={(e) =>
                    setUserData({ ...userData, firstname: e.target.value })
                  }
                />
                <span className="hidden"></span>
                <Input
                  className="bg-gray-300 placeholder:text-gray-800"
                  id="name"
                  placeholder="Овог"
                  value={userData.lastname}
                  onChange={(e) =>
                    setUserData({ ...userData, lastname: e.target.value })
                  }
                />
                <span className="hidden"></span>
                <Input
                  className="bg-gray-300 placeholder:text-gray-800"
                  id="email"
                  placeholder="Цахим шуудангийн хаяг"
                  value={userData.email}
                  onChange={(e) =>
                    setUserData({ ...userData, email: e.target.value })
                  }
                />
                <span className="hidden"></span>
                <Input
                  className="bg-gray-300 placeholder:text-gray-800"
                  type="password"
                  id="password"
                  placeholder="Нууц үг"
                  value={userData.password}
                  onChange={(e) =>
                    setUserData({ ...userData, password: e.target.value })
                  }
                />
                <span className="hidden"></span>
                <Input
                  className="bg-gray-300 placeholder:text-gray-800"
                  type="password"
                  id="rePassword"
                  placeholder="Нууц үг давтах"
                  value={userData.rePassword}
                  onChange={(e) =>
                    setUserData({ ...userData, rePassword: e.target.value })
                  }
                />
                <span className="hidden"></span>
                <Input
                  className="bg-gray-300 placeholder:text-gray-800"
                  id="phoneNumber"
                  placeholder="Утасны дугаар"
                  value={userData.phoneNumber}
                  onChange={(e) =>
                    setUserData({ ...userData, phoneNumber: e.target.value })
                  }
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
              onClick={signUp}
            >
              Бүртгүүлэх
            </Button>
            <Button
              variant="outline"
              className="text-blue-600 rounded-2xl border-blue-600 w-full text-lg"
            >
              Нэвтрэх
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};
export default Signup;
