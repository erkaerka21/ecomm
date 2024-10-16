import { Request, Response } from "express";
import { Review } from "../models/review.model";

export const createReview = async (req: Request, res: Response) => {
  const { id } = req.user;
  const { productId } = req.params;
  const { reviewPoint, comment } = req.body;
  try {
    const createReview = await Review.create({
      user: id,
      product: productId,
      reviewPoint,
      comment,
    });
    res.status(200).json({ message: "review amjilttai.", createReview });
  } catch (error) {
    console.error("review bichihed yamar negen aldaa garlaa", error);
    res
      .status(400)
      .json({ message: "review bichihed yamar negen aldaa garlaa" });
  }
};

export const getReview = async (req: Request, res: Response) => {
  const { productId } = req.params;
  try {
    const getReview = await Review.find({ product: productId })
      .populate("user")
      .populate("product");
    res.status(200).json({ message: "reviewiig amjilttai harlaa.", getReview });
  } catch (error) {
    console.error("review unshihad yamar negen aldaa garlaa", error);
    res
      .status(400)
      .json({ message: "review unshihad yamar negen aldaa garlaa" });
  }
};
