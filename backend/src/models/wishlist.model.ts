import { model, Schema } from "mongoose";

interface IWishlist {
  user: Schema.Types.ObjectId;
  products: [{ product: Schema.Types.ObjectId; price: Number }];
}

const wishlistSchema = new Schema<IWishlist>(
  {
    user: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          required: true,
          ref: "Products",
        },
        price: { type: Number, required: true },
      },
    ],
  },
  { timestamps: true }
);
const Wishlist = model<IWishlist>("Wishlist", wishlistSchema);
export default Wishlist;
