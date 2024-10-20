import { Request, Response } from "express";
import Order from "../models/order.model";

export const createOrder = async (req: Request, res: Response) => {
  const { id } = req.user;
  const {
    cardId,
    inOrder,
    lastname,
    firstname,
    phonenumber,
    address,
    addinformation,
  } = req.body;
  try {
    const createOrder = await Order.create({
      user: id,
      cards: [{ card: cardId, inOrder }],
      lastname,
      firstname,
      phonenumber,
      address,
      addinformation,
    });
    res.status(200).json({ message: "zahialgiig uusgesen", createOrder });
  } catch (error) {
    console.error("zahialga uusgehed aldaa garlaa", error);
    res
      .status(400)
      .json({ message: "zahialga uusgehed aldaa garlaa tottotototo" });
  }
};
export const getOrder = async (req: Request, res: Response) => {
  const { id } = req.user;
  try {
    const getOrder = await Order.findOne({ user: id });
    res
      .status(200)
      .json({ message: "zahialguudiig amjilttai harlaa", getOrder });
  } catch (error) {
    console.error("zahialga harahad aldaa garlaa", error);
    res
      .status(400)
      .json({ message: "zahialga harahad aldaa garlaa tottotototo" });
  }
};
