import { Request, Response } from "express";
import User from "../models/user.model";
import bcrypt from "bcrypt";
import jsonWebToken from "jsonwebtoken";
import GenerateEmail from "../utils/generateEmail";
import nodemailer from "nodemailer";
import { generateToken } from "../utils/jsonwebtoken";
import SendToEmail from "../utils/sendtoEmail";

export const signUp = async (req: Request, res: Response) => {
  const { firstname, lastname, email, password, phoneNumber } = req.body;
  try {
    if (!firstname || !lastname || !email || !password || !phoneNumber) {
      return res.status(400).json({ message: "Хоосон утга байж болохгүй." });
    }
    //hashsync hiihguigeer await hash hiij bolno. hashed password iig model ruu oruulsan
    const signUpUser = await User.create({
      firstname,
      lastname,
      email,
      password,
      phoneNumber,
    });
    res
      .status(201)
      .json({ message: "Хэрэглэгчийг амжилттай бүртгэлээ", signUpUser });
  } catch (error) {
    console.error("Хэрэглэгчийг бүртгэхэд алдаа гарсан", error);
  }
};

export const signIn = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  console.log(req.body);
  try {
    if (!email || !password) {
      return res.status(400).json({ message: "hooson yum bhgui" });
    }
    const signInUser = await User.findOne({
      email,
    });
    console.log("signIn useriig harah : ", signInUser);
    if (!signInUser) {
      return res
        .status(404)
        .json({ message: "Бүртгэлгүй хэрэглэгч байна, бүртгүүлнэ үү" });
    } else {
      const isCheckUser = bcrypt.compareSync(
        password,
        signInUser?.password.toString()
      );
      if (!isCheckUser) {
        return res
          .status(400)
          .json({ message: "нэвтрэх цахим шуудан эсвэл нууц үг буруу байна." });
      } else {
        const token = generateToken({ id: signInUser._id });
        res.status(200).json({ message: "Та амжилттай нэвтэрч байна", token });
      }
    }
  } catch (error) {
    res
      .status(400)
      .json({ message: "Нэвтрэх үйл явцад тодорхойгүй алдаа гарлаа" });
  }
};

export const CurrentUser = async (req: Request, res: Response) => {
  const { id } = req.user;
  const findCurrentU = await User.findById(id);
  res
    .status(200)
    .json({ message: "current useriig oloh amjilttai", user: findCurrentU });
};

export const forgetPassword = async (req: Request, res: Response) => {
  const { email } = req.body;
  try {
    if (!email) {
      return res
        .status(400)
        .json({ message: "цахим шуудангийн хаягыг заавал оруулна уу" });
    }
    const forgetUserPassword = await User.findOne({ email: email });
    if (!forgetUserPassword) {
      return res
        .status(400)
        .json({ message: "бүртгэлтэй цахим шуудангийн хаяг олдсонгүй." });
    } else {
      const randomOTPcode = Math.floor(Math.random() * 10_000)
        .toString()
        .padStart(4, "0");
      forgetUserPassword.randomOTPcode = randomOTPcode;
      await forgetUserPassword.save();
      await SendToEmail("erka_pro21@yahoo.com", randomOTPcode);

      res.send("Бүртгэлтэй цахим шуудан руу кодыг амжилттай илгээлээ.");
    }
  } catch (error) {
    res.status(400).json({
      message: "Цахим шуудан руу код илгээхэд ямар нэгэн алдаа гарлаа",
    });
  }
};
