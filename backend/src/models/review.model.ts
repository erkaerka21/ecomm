import { model, Schema } from "mongoose";
interface reviewP {
  user: Schema.Types.ObjectId;
  product: Schema.Types.ObjectId;
  reviewPoint: number;
  comment: string;
  created_at: Date;
  updated_at: Date;
}

const reviewSchema = new Schema<reviewP>({
  user: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  product: { type: Schema.Types.ObjectId, required: true, ref: "Products" },
  reviewPoint: { type: Number, required: true },
  comment: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

export const Review = model<reviewP>("Review", reviewSchema);
