import { Request, Response } from "express";
import Cart from "../models/cart.model";

export const createAndAddCart = async (req: Request, res: Response) => {
  const { userId, productId, quantity, totalAmount, size } = req.body;
  console.log("reqiin body iig harah:", req.body);
  try {
    const findUserCart = await Cart.findOne({ user: userId });
    if (!findUserCart) {
      const createCart = await Cart.create({
        user: userId,
        products: { product: productId, quantity: quantity, size: size },
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
        findUserCart.products.push({ product: productId, quantity, size });
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

export const getUserCard = async (req: Request, res: Response) => {
  const { id } = req.user;
  try {
    const getMyCard = await Cart.findOne({ user: id }).populate(
      "products.product"
    );
    res.status(200).json({ message: "get my card successful", getMyCard });
  } catch (error) {
    res.status(400).json({ message: "something wrong with get my card" });
    console.error("something wrong with get my card", error);
  }
};

export const getAllCard = async (req: Request, res: Response) => {
  try {
    const getAllCard = await Cart.find({});

    res.status(200).json({ message: "get all card successful", getAllCard });
  } catch (error) {
    res.status(400).json({ message: "something wrong with get all card" });
    console.error("something wrong with get all card", error);
  }
};

export const changeProductQuantity = async (req: Request, res: Response) => {
  const { id } = req.user;
  const { productId } = req.params;
  const { quantity } = req.body;
  try {
    const findUser = await Cart.findOne({ user: id });
    if (!findUser) {
      return res.status(400).json({
        message: "бүтээгдэхүүний тоог өөрчилөхийн тулд заавал нэвтэрч орно уу",
      });
    }
    const chooseProduct = findUser.products.findIndex(
      (oneItem) => oneItem.product.toString() === productId
    );
    findUser.products[chooseProduct].quantity = quantity;

    const saveQuantityChange = await findUser?.save();
    res.status(200).json({
      message: "бүтээгдэхүүний тоо ширхэгийг амжилттай өөрчиллөө",
      saveQuantityChange,
    });
  } catch (error) {
    console.error(
      "бүтээгдэхүүний тоог өөрчилөхөд ямар нэгэн алдаа гарлаа",
      error
    );
    res.status(400).json({
      message: "бүтээгдэхүүний тоог өөрчилөхөд ямар нэгэн алдаа гарлаа",
    });
  }
};
export const deleteProductfromCart = async (req: Request, res: Response) => {
  // const { user, productId } = req.body;
  const { id } = req.user;
  const { productId } = req.params;
  try {
    const findUser = await Cart.findOne({ user: id }).populate(
      "products.product"
    );
    if (!findUser) {
      return res.status(400).json({
        message: "бүтээгдэхүүний тоог өөрчилөхийн тулд заавал нэвтэрч орно уу",
      });
    }
    const chooseProduct = findUser.products.findIndex(
      (oneItem) => oneItem.product.toString() === productId
    );
    findUser.products.splice(chooseProduct, 1);
    const saveChanges = await findUser.save();
    res.status(200).json({
      message: "бүтээгдэхүүнийг амжилттай устгалаа",
      saveChanges,
    });
  } catch (error) {
    console.error("бүтээгдэхүү устгахад ямар нэгэн алдаа гарлаа", error);
    res.status(400).json({
      message: "бүтээгдэхүү устгахад ямар нэгэн алдаа гарлаа",
    });
  }
};
