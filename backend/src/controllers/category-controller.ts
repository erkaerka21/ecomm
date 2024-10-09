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

export const getCategory = async (req: Request, res: Response) => {
  try {
    const getAllCategory = await Category.find({});
    res
      .status(200)
      .json({ message: "get all gategory amjilttai", getAllCategory });
  } catch (error) {
    console.error("get all products is not success", error);
  }
};
