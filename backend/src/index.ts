import express, { Request, Response } from "express";
import dotenv from "dotenv";
import authRouter from "./routes/auth-route";
import connectDatabase from "./config/database";
import cors from "cors";
import { logger } from "./middlewares/logger";
import GenerateEmail from "./utils/generateEmail";
import nodemailer from "nodemailer";
import productRouter from "./routes/product-route";
import categoryRouter from "./routes/category-route";
import cartRouter from "./routes/cart-route";
import reviewRouter from "./routes/review-route";
dotenv.config();
const PORT = process.env.PORT;
const mongoUrl = process.env.URL || "";
const app = express(); //express function ajillaad app gdg object uusgej bn
app.use(express.json());

app.use(cors());
app.use(logger());
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/category", categoryRouter);
app.use("/api/v1/cart", cartRouter);
app.use("/api/v1/review", reviewRouter);

const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for port 465, false for other ports
  auth: {
    user: "eegiibaagii597@gmail.com",
    pass: "gaisctkjxsyvqnwn",
  },
});
app.get("/", async (req: Request, res: Response) => {
  try {
    const randomOTPcode = Math.floor(Math.random() * 10_000)
      .toString()
      .padStart(4, "0");
    const info = await transporter.sendMail({
      from: "eegiibaagii@597@gmail.com", // sender address
      to: "erka_pro21@yahoo.com", // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: GenerateEmail(randomOTPcode), // html body
    });

    console.log("Message sent: %s", info.messageId);
    res.status(200).json({ message: "welcome to api" });
  } catch (error) {
    res.status(400).json({ message: "ямар нэгэн алдаа гарлаа" });
  }
});

connectDatabase(mongoUrl);
app.listen(PORT, () => {
  console.log(`сервер localhost: ${PORT} дээр ажиллаж байна.`);
});
