import { Request, Response } from "express";
import Cart from "../models/cart.model";
import User from "../models/user.model";

export const createCart = async (req: Request, res: Response) => {
  const { userId, productId, quantity, totalAmount } = req.body;
  try {
    const findUserCart = await Cart.findOne({ user: userId });
    if (!findUserCart) {
      const createCart = await Cart.create({
        user: userId,
        products: { product: productId, quantity: quantity },
        totalAmount: totalAmount,
      });
      res
        .status(200)
        .json({ message: "cartiig amjilttai uusgesen", createCart });
    } else {
      const checkDuplicatedProduct = findUserCart.products.findIndex(
        (productsOneItem) => productsOneItem.product.toString() === productId
      );
      if (checkDuplicatedProduct > -1) {
        findUserCart.products[checkDuplicatedProduct].quantity += quantity;
      } else {
        findUserCart.products.push({ product: productId, quantity });
      }

      const updatedCart = await findUserCart.save();
      res
        .status(200)
        .json({ message: "cartiig amjilttai shinechlelee", updatedCart });
    }
  } catch (error) {
    console.error("yamar negen aldaa garlaa", error);
    res.status(400).json({ message: "aldaa garlaa tottotototo" });
  }
};
