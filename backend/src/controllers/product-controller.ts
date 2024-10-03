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

export const getAllProduct = async (req: Request, res: Response) => {
  try {
    const getAllProduct = await Products.find({}).populate("category");
    res
      .status(200)
      .json({ message: "get all product is very success", getAllProduct });
  } catch (error) {
    console.error("get all products is not success", error);
  }
};
export const getOneProduct = async (req: Request, res: Response) => {
  const { pid } = req.params;

  try {
    const getOneProduct = await Products.findById(pid).populate("category");
    res
      .status(200)
      .json({ message: "get only product is success", getOneProduct });
  } catch (error) {
    console.error("get one products is not success", error);
  }
};
