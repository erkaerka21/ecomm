"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
const ForgetPassword = () => {
  const { toast } = useToast();
  const [step, setstep] = useState(1);
  const [email, setEmail] = useState("");
  const [randomOTPcodeV, setrandomOTPcodeV] = useState("");
  const [countdown, setCountdown] = useState(30);
  const router = useRouter();

  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const forgetPass = async () => {
    console.log("emailiig harah", email);
    try {
      const response = await axios.post(
        "http://localhost:9000/api/v1/auth/forgetpassword",
        {
          email: email,
        }
      );
      if (response.status === 200) {
        toast({
          description: `Нэг удаагийн код илгээлээ.`,
        });
        setstep(step + 1);
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

  const handleOtp = async (value: string) => {
    setrandomOTPcodeV(value);
    if (value.length === 4) {
      try {
        const respo = await axios.post(
          "http://localhost:9000/api/v1/auth/verify-rndmotpcode",
          { email, randomOTPcode: value }
        );
        if (respo.status === 200) {
          toast({
            description:
              "Таны бүртгэлтэй цахим шуудангийн хаяг руу хэрэглэгчийн нууц үг сэргээх холбоосыг илгээсэн.",
          });
          router.push("/signin");
        }
      } catch (error) {
        toast({
          variant: "destructive",
          description: "Нууц үг сэргээх холбоос илгээхэд алдаа гарлаа.",
        });
        console.error("холбоос илгээхэд алдаа гарлаа", error);
      }
    }
  };
  console.log("email bolon otp code iig harah", email, randomOTPcodeV);

  const resendOTPcode = () => {
    setCountdown(30);
  };
  useEffect(() => {
    if (countdown > 0) {
      const countdown = setInterval(() => {
        setCountdown((prevSeconds) => prevSeconds - 1);
      }, 1000);

      return () => clearInterval(countdown);
    }
  }, [countdown]);

  return (
    <div className="flex justify-center">
      {step === 1 && (
        <div className="w-[35vw] my-[18vh]">
          <Card className="justify-center  px-10 pb-5">
            <CardHeader className="items-center">
              <CardTitle className="">Нууц үг сэргээх</CardTitle>
            </CardHeader>
            <CardContent>
              <form>
                <div className="grid grid-rows-1 w-full gap-y-4">
                  <Input
                    className="bg-gray-300 placeholder:text-gray-800"
                    id="email"
                    placeholder="Цахим шуудангийн хаяг оруулах"
                    onChange={handleEmail}
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
      )}
      {step === 2 && (
        <div className="w-[45vw] my-[18vh]">
          <Card className="justify-center">
            <CardHeader className="items-center">
              {/* <img src="mailzurag.png" className="h-[12vh]" /> */}
              <CardTitle className="">Баталгаажуулах</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <p> цахим шуудангийн хаягт илгээсэн кодыг оруулна уу</p>
              <form>
                <div className="grid grid-rows-2 w-full gap-y-4"></div>
              </form>
              <InputOTP
                maxLength={4}
                value={randomOTPcodeV}
                onChange={handleOtp}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0}></InputOTPSlot>
                  <InputOTPSlot index={1}></InputOTPSlot>
                  <InputOTPSlot index={2}></InputOTPSlot>
                  <InputOTPSlot index={3}></InputOTPSlot>
                </InputOTPGroup>
              </InputOTP>
            </CardContent>

            <CardFooter className="flex-col space-y-5">
              <p className="text-gray-500 underline" onClick={resendOTPcode}>
                Дахин илгээх {countdown}
              </p>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ForgetPassword;
