import { Request, Response } from "express";
import { Products } from "../models/products.model";
export const createProduct = async (req: Request, res: Response) => {
  const {
    name,
    description,
    size,
    price,
    discount,
    quantity,
    category,
    images,
    isNew,
  } = req.body;
  try {
    const createProduct = await Products.create({
      name,
      description,
      size,
      price,
      discount,
      quantity,
      category,
      images,
      isNew,
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
  const { id } = req.params;

  try {
    const getOneProduct = await Products.findById(id).populate("category");
    const relatedProduct = await Products.find({
      category: getOneProduct?.category,
    });
    res.status(200).json({
      message: "get only product is success",
      getOneProduct,
      relatedProduct,
    });
  } catch (error) {
    console.error("get one products is not success", error);
  }
};
