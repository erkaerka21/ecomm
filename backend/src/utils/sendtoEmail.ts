import React from "react";
import nodemailer from "nodemailer";
import GenerateEmail from "./generateEmail";
const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for port 465, false for other ports
  auth: {
    user: process.env.SEND_FROM_EMAIL,
    pass: process.env.SEND_FROM_EMAIL_PASS,
  },
});
const SendToEmail = async (
  email: string,
  randomOTPcode: string
): Promise<void> => {
  await transporter.sendMail({
    from: process.env.SEND_FROM_EMAIL, // sender address
    to: "erka_pro21@yahoo.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: GenerateEmail(randomOTPcode), // html body
  });
};

export default SendToEmail;
