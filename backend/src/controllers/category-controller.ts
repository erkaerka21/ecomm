import { Request, Response } from "express";
import { Category } from "../models/category.model";

export const addCategory = async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;
    const addCategory = await Category.create({ name, description });
    res
      .status(201)
      .json({ message: "категорийг амжилттай бүртгэлээ.", addCategory });
  } catch (error) {
    console.error("категорийг бүртгэхэд ямар нэгэн алдаа гарлаа.", addCategory);
  }
};
