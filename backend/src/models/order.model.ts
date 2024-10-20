import { model, Schema } from "mongoose";

interface IOrder {
  user: Schema.Types.ObjectId;
  cards: [{ card: Schema.Types.ObjectId; inOrder: boolean }];
  lastname: string;
  firstname: string;
  phonenumber: number;
  address: string;
  addinformation: string;
}

const orderSchema = new Schema<IOrder>(
  {
    user: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    cards: [
      {
        card: {
          type: Schema.Types.ObjectId,
          required: true,
          ref: "Cart",
        },
        inOrder: { type: Boolean, default: true },
      },
    ],
    lastname: { type: String, required: true },
    firstname: { type: String, required: true },
    phonenumber: { type: Number, required: true },
    address: { type: String, required: true },
    addinformation: { type: String, required: true },
  },
  { timestamps: true }
);
const Order = model<IOrder>("Order", orderSchema);
export default Order;
