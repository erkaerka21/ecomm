import nodemailer from "nodemailer";
import GenerateEmail from "./generateEmail";
import dotenv from "dotenv";
dotenv.config();
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
  // email: string,
  randomOTPcode: string
): Promise<void> => {
  await transporter.sendMail({
    from: "eegiibaagii597@gmail.com", // sender address
    to: "erkapro11111@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: GenerateEmail(randomOTPcode), // html body
  });
};

export default SendToEmail;
