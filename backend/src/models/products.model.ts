import { model, Schema } from "mongoose";
// { type: String; enum: ["S", "M", "L", "XL", "XXL"] }
interface UProducts {
  name: string;
  description: string;
  price: number;
  size: string;
  images: [string];
  isNew: boolean;
  quantity: number;
  discount: number;
  category: Schema.Types.ObjectId;
}
const productsSchema = new Schema<UProducts>(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    size: {
      type: String,
      enum: ["S", "M", "L", "XL", "XXL", "XS"],
      default: "S",
    },
    images: { type: [String], default: ["zurag"] },
    isNew: { type: Boolean, default: true },
    quantity: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    category: { type: Schema.Types.ObjectId, required: true, ref: "Category" },
  },
  { timestamps: true }
);
export const Products = model("Products", productsSchema);
