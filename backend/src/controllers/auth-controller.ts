import { Request, Response } from "express";
import User from "../models/user.model";
import bcrypt from "bcrypt";
import jsonWebToken from "jsonwebtoken";

import { generateToken } from "../utils/jsonwebtoken";
import SendToEmail from "../utils/sendtoEmail";
import crypto from "crypto";
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
  console.log("email bolon password iig harah", req.body);
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
        console.log("signinii tokeniig harah", token);
        res.status(200).json({
          message: "Та амжилттай нэвтэрч байна",
          token,
        });
      }
    }
  } catch (error) {
    res
      .status(400)
      .json({ message: "Нэвтрэх үйл явцад тодорхойгүй алдаа гарлаа" });
  }
};

export const CurrentUser = async (req: Request, res: Response) => {
  // const { firstname, lastname, email } = req.body;
  const { id } = req.user;
  const findCurrentU = await User.findById(id);
  // const getCurrentUser = await User.findOne({});
  res.status(200).json({
    message: "current useriig oloh amjilttai",
    findCurrentU,
  });
};

export const forgetPassword = async (req: Request, res: Response) => {
  const { email } = req.body;
  console.log("emailiig harah:", req.body);
  if (!email) {
    return res
      .status(400)
      .json({ message: "Цахим шуудангийн хаягыг заавал бөглөнө үү" });
  }

  try {
    const forgetUserPassword = await User.findOne({ email: email });

    if (!forgetUserPassword) {
      return res
        .status(400)
        .json({ message: "бүртгэлтэй цахим шуудангийн хаяг олдсонгүй." });
    }
    const randomOTPcode = Math.floor(Math.random() * 10_000)
      .toString()
      .padStart(4, "0");
    forgetUserPassword.randomOTPcode = randomOTPcode;
    await forgetUserPassword.save();
    await SendToEmail(randomOTPcode);
    res.status(200).json({
      message: "Бүртгэлтэй цахим шуудан руу кодыг амжилттай илгээлээ.",
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      message: "Цахим шуудан руу код илгээхэд ямар нэгэн алдаа гарлаа",
    });
  }
};

export const verifyRandomOtpCode = async (req: Request, res: Response) => {
  const { email, randomOTPcode } = req.body;
  console.log("randomItp", randomOTPcode);
  const findVerifyUser = await User.findOne({
    email: email,
    randomOTPcode: randomOTPcode,
  });
  if (!findVerifyUser) {
    return res.status(400).json({
      message: "бүртгэлтэй хэрэглэгч эсвэл нэг удаагийн код олдсонгүй",
    });
  }

  const resetTokenCode = crypto.randomBytes(25).toString("hex");
  const hashResetTokenCode = crypto
    .createHash("sha256")
    .update(resetTokenCode)
    .digest("hex");
  findVerifyUser.passwordResetToken = hashResetTokenCode;
  findVerifyUser.passwordResetTokenExp = new Date(Date.now() + 10 * 60 * 1000);
  await findVerifyUser.save();

  await SendToEmail(
    `<a href="http://localhost:3000/forgetpassword/passwordrecovery?resettokencode=${resetTokenCode}&email=${email}">Нууц үг сэргээх холбоос</a>`
  );
  res.status(200).json({
    message:
      "бүртгэлтэй цахим шуудангийн хаяг руу нууц үг сэргээх холбоосыг илгээсэн.",
  });
};

export const recreatePassword = async (req: Request, res: Response) => {
  const { password, resetTokenCode } = req.body;

  const hashResetTokenCode = crypto
    .createHash("sha256")
    .update(resetTokenCode)
    .digest("hex");
  const findUserVerify = await User.findOne({
    passwordResetToken: hashResetTokenCode,
    passwordResetTokenExp: { $gt: Date.now() },
  });

  if (!findUserVerify) {
    return res.status(400).json({
      message: "Нэг удаагийн нууц кодын хүчинтэй хугацаа дууссан байна.",
    });
  }

  findUserVerify.password = password;
  await findUserVerify.save();
  res.status(200).json({ message: "Та нууц үгээ амжилттай сэргээлээ." });
};

export const saveAndUpdateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updateUser = await User.findByIdAndUpdate(id, req.body, { new: true });
  res.status(200).json({
    message: "Хэрэглэгчийн мэдээллийг амжилттай хадгалсан.",
    updateUser,
  });
};
