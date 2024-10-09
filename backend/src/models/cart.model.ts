import { model, Schema } from "mongoose";

interface ICart {
  user: Schema.Types.ObjectId;
  products: [{ product: Schema.Types.ObjectId; quantity: Number }];
  totalAmount: number;
}

const cartSchema = new Schema<ICart>(
  {
    user: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          required: true,
          ref: "Products",
        },
        quantity: { type: Number, required: true },
      },
    ],
    totalAmount: { type: Number, default: 0 },
  },
  { timestamps: true }
);
const Cart = model<ICart>("Cart", cartSchema);
export default Cart;
