import { Request, Response } from "express";
import { Products } from "../models/products.model";
export const createProduct = async (req: Request, res: Response) => {
  const { name, description, price, quantity, category } = req.body;
  try {
    const createProduct = await Products.create({
      name,
      description,
      price,
      quantity,
      category,
    });
    res
      .status(201)
      .json({ message: "Бүтээгдэхүүнийг амжилттай бүртгэлээ.", createProduct });
  } catch (error) {
    console.error("бүтээгдэхүүнийг бүртгэхэд ямар нэгэн алдаа гарлаа.", error);
  }
};
