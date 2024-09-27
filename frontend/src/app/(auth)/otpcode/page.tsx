"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
const Optcode = () => {
  return (
    <div className="flex justify-center">
      <div className="w-[30vw] my-[18vh]">
        <Card className="justify-center">
          <CardHeader className="items-center">
            <img src="mailzurag.png" className="h-[12vh]" />
            <CardTitle className="">Баталгаажуулах</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <form>
              <div className="grid grid-rows-2 w-full gap-y-4"></div>
            </form>
            <InputOTP maxLength={4}>
              <InputOTPGroup>
                <InputOTPSlot index={0}></InputOTPSlot>
                <InputOTPSlot index={1}></InputOTPSlot>
                <InputOTPSlot index={2}></InputOTPSlot>
                <InputOTPSlot index={3}></InputOTPSlot>
              </InputOTPGroup>
            </InputOTP>
          </CardContent>

          <CardFooter className="flex-col space-y-5">
            <p className="text-gray-500 underline">Дахин илгээх</p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Optcode;
