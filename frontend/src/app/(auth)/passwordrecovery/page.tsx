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
const Passwordrecovery = () => {
  return (
    <div className="flex justify-center">
      <div className="w-[30vw] my-[18vh]">
        <Card className="justify-center">
          <CardHeader className="items-center">
            <CardTitle className="">Нууц үг сэргээх</CardTitle>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid grid-rows-2 w-full gap-y-4">
                <Input
                  className="bg-gray-300 placeholder:text-gray-800"
                  id="password"
                  placeholder="Шинэ нууц үг"
                />
                <span className="hidden"></span>
                <Input
                  className="bg-gray-300 placeholder:text-gray-800"
                  id="repassword"
                  placeholder="Шинэ нууц үг давтах"
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
            <Button className="bg-blue-600 rounded-2xl w-full text-lg">
              нууц үг үүсгэх
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Passwordrecovery;
