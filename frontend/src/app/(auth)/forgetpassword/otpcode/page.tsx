"use client";

// import React, { useContext, useEffect, useState } from "react";
// import {
//   Card,
//   CardContent,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { useRouter } from "next/navigation";
// import {
//   InputOTP,
//   InputOTPGroup,
//   InputOTPSlot,
// } from "@/components/ui/input-otp";
// import axios from "axios";
// import { uRL_AUTH_api } from "@/utils/util";
// import { useToast } from "@/hooks/use-toast";
// const Optcode = () => {
//   const { toast } = useToast();
//   const router = useRouter();
//   const [randomOTPcodeV, setrandomOTPcodeV] = useState("");
//   const [countdown, setCountdown] = useState(30);

//   const resendOTPcode = () => {
//     setCountdown(30);
//   };
//   useEffect(() => {
//     if (countdown > 0) {
//       const countdown = setInterval(() => {
//         setCountdown((prevSeconds) => prevSeconds - 1);
//       }, 1000);

//       return () => clearInterval(countdown);
//     }
//   }, [countdown]);
//   const handleOtp = async (value: string) => {
//     setrandomOTPcodeV(value);
//     if (value.length === 4) {
//       router.push("/signin");
//     }
//   };
//   return (
//     <div className="flex justify-center">
//       <div className="w-[45vw] my-[18vh]">
//         <Card className="justify-center">
//           <CardHeader className="items-center">
//             <img src="mailzurag.png" className="h-[12vh]" />
//             <CardTitle className="">Баталгаажуулах</CardTitle>
//           </CardHeader>
//           <CardContent className="flex flex-col items-center">
//             <p>"dddddddd" цахим шуудангийн хаягт илгээсэн кодыг оруулна уу</p>
//             <form>
//               <div className="grid grid-rows-2 w-full gap-y-4"></div>
//             </form>
//             <InputOTP maxLength={4} value={randomOTPcodeV} onChange={handleOtp}>
//               <InputOTPGroup>
//                 <InputOTPSlot index={0}></InputOTPSlot>
//                 <InputOTPSlot index={1}></InputOTPSlot>
//                 <InputOTPSlot index={2}></InputOTPSlot>
//                 <InputOTPSlot index={3}></InputOTPSlot>
//               </InputOTPGroup>
//             </InputOTP>
//           </CardContent>

//           <CardFooter className="flex-col space-y-5">
//             <p className="text-gray-500 underline" onClick={resendOTPcode}>
//               Дахин илгээх {countdown}
//             </p>
//           </CardFooter>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default Optcode;
