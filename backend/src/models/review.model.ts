import { model, Schema } from "mongoose";
interface reviewP {
  reviewPoint: number;
  comment: string;
  created_at: Date;
  updated_at: Date;
}

const reviewSchema = new Schema<reviewP>({
  reviewPoint: { type: Number, required: true },
  comment: { type: String, required: false },
});

export const Review = model("Review", reviewSchema);
